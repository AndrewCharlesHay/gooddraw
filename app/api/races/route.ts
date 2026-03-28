import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { races } from "@/drizzle/schema";
import { asc } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const all = await db.select().from(races).orderBy(asc(races.state), asc(races.district));
  return Response.json(all);
}
