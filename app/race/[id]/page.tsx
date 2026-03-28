import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { races } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RaceClient } from "./RaceClient";
import type { Metadata } from "next";

export const runtime = "edge";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [race] = await db.select().from(races).where(eq(races.id, id));
  if (!race) return { title: "Race not found" };
  const label =
    race.chamber === "senate"
      ? `${race.state} Senate`
      : `${race.state}-${race.district} House`;
  return {
    title: `${race.candidateA} vs ${race.candidateB} — ${label} | Good Draw`,
    description: `Donate to ${race.candidateA} or ${race.candidateB}. Matched donations go to charity.`,
  };
}

export default async function RacePage({ params }: Props) {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);
  const [race] = await db.select().from(races).where(eq(races.id, id));
  if (!race) notFound();

  const label =
    race.chamber === "senate"
      ? `${race.state} Senate`
      : `${race.state}-${race.district} House`;

  return (
    <div>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
        ← All races
      </Link>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
          {label} · {race.cycle}
        </p>
        <h1 className="text-3xl font-bold">
          {race.candidateA} vs {race.candidateB}
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <RaceClient initialRace={race} />
      </div>

      <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        <strong>Legal notice:</strong> Contributions to federal candidates are not tax-deductible.
        Maximum $3,300 per candidate per election. US citizens and permanent residents only.
        This site is a proof of concept — no real money is transferred.
      </div>
    </div>
  );
}
