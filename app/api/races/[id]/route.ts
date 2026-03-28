import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { races } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [race] = await db.select().from(races).where(eq(races.id, id));
  if (!race) return new Response("Not found", { status: 404 });
  return Response.json(race);
}
