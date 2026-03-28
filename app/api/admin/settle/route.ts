import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { donations, races, settlements } from "@/drizzle/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { calcSettlement } from "@/lib/settlement";

export const runtime = "edge";

export async function POST(req: Request) {
  const { env } = getCloudflareContext();

  // Simple password auth
  const authHeader = req.headers.get("x-admin-password");
  if (authHeader !== env.ADMIN_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { periodStart, periodEnd, preview } = await req.json() as { periodStart: string; periodEnd: string; preview: boolean };
  if (!periodStart || !periodEnd) {
    return Response.json({ error: "periodStart and periodEnd required (ISO strings)" }, { status: 400 });
  }

  const start = new Date(periodStart);
  const end = new Date(periodEnd);
  const db = getDb(env.DB);

  // Aggregate donations per race in the period
  const rows = await db
    .select({
      raceId: donations.raceId,
      side: donations.side,
      total: sql<number>`sum(${donations.amountCents})`.as("total"),
    })
    .from(donations)
    .where(
      and(
        eq(donations.status, "captured"),
        gte(donations.createdAt, start),
        lte(donations.createdAt, end)
      )
    )
    .groupBy(donations.raceId, donations.side);

  // Build per-race totals map
  const totalsMap = new Map<string, { A: number; B: number }>();
  for (const row of rows) {
    if (!totalsMap.has(row.raceId)) totalsMap.set(row.raceId, { A: 0, B: 0 });
    const entry = totalsMap.get(row.raceId)!;
    if (row.side === "A") entry.A = row.total;
    else entry.B = row.total;
  }

  if (totalsMap.size === 0) {
    return Response.json({ message: "No captured donations in period", previews: [] });
  }

  // Fetch race metadata
  const raceIds = [...totalsMap.keys()];
  const raceRows = await db.select().from(races).where(
    sql`${races.id} in ${raceIds}`
  );
  const raceMap = new Map(raceRows.map((r) => [r.id, r]));

  const previews = [...totalsMap.entries()].map(([raceId, { A, B }]) => {
    const race = raceMap.get(raceId)!;
    return calcSettlement(
      raceId,
      race.candidateA,
      race.candidateB,
      race.state,
      race.district,
      race.chamber,
      A,
      B
    );
  });

  // If preview mode, return without writing
  if (preview) {
    return Response.json({ previews });
  }

  // Write settlement records and mark donations settled
  const now = new Date();
  for (const p of previews) {
    const settlementId = crypto.randomUUID();
    await db.insert(settlements).values({
      id: settlementId,
      raceId: p.raceId,
      periodStart: start,
      periodEnd: end,
      totalA: p.totalA,
      totalB: p.totalB,
      winnerSide: p.winnerSide,
      campaignPayout: p.campaignPayout,
      charityPayout: p.charityPayout,
      status: "pending",
      createdAt: now,
    });
  }

  // Mark donations in period as settled
  await db
    .update(donations)
    .set({ status: "settled" })
    .where(
      and(
        eq(donations.status, "captured"),
        gte(donations.createdAt, start),
        lte(donations.createdAt, end)
      )
    );

  return Response.json({ success: true, settled: previews.length, previews });
}
