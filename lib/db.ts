import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/drizzle/schema";

// In Cloudflare Workers, DB is injected via the request context binding.
// Usage: const db = getDb(env.DB)
export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type Db = ReturnType<typeof getDb>;
