import Link from "next/link";
import { formatCents } from "@/lib/settlement";
import type { Race } from "@/drizzle/schema";

const PARTY_COLOR: Record<string, string> = {
  R: "text-red-600",
  D: "text-blue-600",
  I: "text-purple-600",
};

export function RaceCard({ race }: { race: Race }) {
  const matched = Math.min(race.totalA, race.totalB);
  const charityPot = matched * 2;
  const label =
    race.chamber === "senate"
      ? `${race.state} Senate`
      : `${race.state}-${race.district} House`;

  return (
    <Link
      href={`/race/${race.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label} · {race.cycle}
        </span>
        {charityPot > 0 && (
          <span className="text-xs font-semibold text-green-700 bg-green-50 rounded-full px-2 py-0.5">
            {formatCents(charityPot)} to charity
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className={`font-semibold ${PARTY_COLOR[race.partyA] ?? "text-gray-700"}`}>
            {race.candidateA}
          </span>
          <span className="text-sm text-gray-400 ml-1">({race.partyA})</span>
          <div className="text-sm text-gray-500">{formatCents(race.totalA)}</div>
        </div>
        <span className="text-gray-300 font-bold text-lg">vs</span>
        <div className="text-right">
          <span className={`font-semibold ${PARTY_COLOR[race.partyB] ?? "text-gray-700"}`}>
            {race.candidateB}
          </span>
          <span className="text-sm text-gray-400 ml-1">({race.partyB})</span>
          <div className="text-sm text-gray-500">{formatCents(race.totalB)}</div>
        </div>
      </div>
    </Link>
  );
}
