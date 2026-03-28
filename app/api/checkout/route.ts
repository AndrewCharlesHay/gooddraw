import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { donations, races } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";

export const runtime = "edge";

const MAX_DONATION_CENTS = 330000; // $3,300

interface CheckoutBody {
  raceId: string;
  side: string;
  amountCents: number;
  donorName: string;
  donorAddress: string;
  donorCity: string;
  donorState: string;
  donorZip: string;
  donorEmployer: string;
  donorOccupation: string;
  usCitizenConfirm: boolean;
}

export async function POST(req: Request) {
  const body = await req.json() as CheckoutBody;

  const {
    raceId,
    side,
    amountCents,
    donorName,
    donorAddress,
    donorCity,
    donorState,
    donorZip,
    donorEmployer,
    donorOccupation,
    usCitizenConfirm,
  } = body;

  // Validation
  if (!raceId || !side || !amountCents) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (side !== "A" && side !== "B") {
    return Response.json({ error: "Invalid side" }, { status: 400 });
  }
  if (typeof amountCents !== "number" || amountCents < 100 || amountCents > MAX_DONATION_CENTS) {
    return Response.json(
      { error: `Donation must be between $1 and $3,300` },
      { status: 400 }
    );
  }
  if (!donorName || !donorAddress || !donorCity || !donorState || !donorZip) {
    return Response.json({ error: "Donor address is required" }, { status: 400 });
  }
  if (!donorEmployer || !donorOccupation) {
    return Response.json(
      { error: "Employer and occupation are required by federal law" },
      { status: 400 }
    );
  }
  if (!usCitizenConfirm) {
    return Response.json(
      { error: "You must confirm US citizenship or permanent residency" },
      { status: 400 }
    );
  }

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  // Verify race exists
  const [race] = await db.select().from(races).where(eq(races.id, raceId));
  if (!race) return Response.json({ error: "Race not found" }, { status: 404 });

  const donationId = crypto.randomUUID();
  const paymentRef = `mock_${crypto.randomUUID()}`;
  const now = new Date();

  await db.insert(donations).values({
    id: donationId,
    raceId,
    side,
    amountCents,
    paymentRef,
    status: "captured",
    donorName,
    donorAddress,
    donorCity,
    donorState,
    donorZip,
    donorEmployer,
    donorOccupation,
    usCitizenConfirm: true,
    createdAt: now,
  });

  // Increment race total
  if (side === "A") {
    await db
      .update(races)
      .set({ totalA: sql`${races.totalA} + ${amountCents}` })
      .where(eq(races.id, raceId));
  } else {
    await db
      .update(races)
      .set({ totalB: sql`${races.totalB} + ${amountCents}` })
      .where(eq(races.id, raceId));
  }

  // Return updated totals
  const [updated] = await db.select().from(races).where(eq(races.id, raceId));

  return Response.json({ success: true, donationId, totalA: updated.totalA, totalB: updated.totalB });
}
