import Link from "next/link";
import type { Race } from "@/lib/mock-races";

function fmt(cents: number) {
  const n = cents / 100;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

interface Props {
  race: Race;
  size?: "sm" | "md";
  hrefD?: string;
  hrefR?: string;
}

export function RaceBar({ race, size = "md", hrefD, hrefR }: Props) {
  const total = race.democrat.amountCents + race.republican.amountCents;
  const dPct = total > 0 ? (race.democrat.amountCents / total) * 100 : 50;
  const rPct = 100 - dPct;
  const isSmall = size === "sm";

  const dName = (
    <div className="text-left">
      <span className={`font-semibold text-blue-700 ${isSmall ? "text-xs" : "text-sm"}`}>
        {race.democrat.name}
      </span>
      <span className={`block text-blue-600 font-bold ${isSmall ? "text-xs" : "text-sm"}`}>
        {fmt(race.democrat.amountCents)}
      </span>
    </div>
  );

  const rName = (
    <div className="text-right">
      <span className={`font-semibold text-red-700 ${isSmall ? "text-xs" : "text-sm"}`}>
        {race.republican.name}
      </span>
      <span className={`block text-red-600 font-bold ${isSmall ? "text-xs" : "text-sm"}`}>
        {fmt(race.republican.amountCents)}
      </span>
    </div>
  );

  return (
    <div className="w-full">
      {/* Candidate names + amounts */}
      <div className="flex justify-between mb-1">
        {hrefD ? <Link href={hrefD} className="hover:opacity-75 transition-opacity">{dName}</Link> : dName}
        {hrefR ? <Link href={hrefR} className="hover:opacity-75 transition-opacity">{rName}</Link> : rName}
      </div>

      {/* Split bar — blue left, red right */}
      <div className="flex rounded-full overflow-hidden h-3">
        {hrefD ? (
          <Link
            href={hrefD}
            className="bg-blue-500 hover:bg-blue-600 transition-colors"
            style={{ width: `${dPct}%` }}
          />
        ) : (
          <div className="bg-blue-500 transition-all duration-300" style={{ width: `${dPct}%` }} />
        )}
        {hrefR ? (
          <Link
            href={hrefR}
            className="bg-red-500 hover:bg-red-600 transition-colors"
            style={{ width: `${rPct}%` }}
          />
        ) : (
          <div className="bg-red-500 transition-all duration-300" style={{ width: `${rPct}%` }} />
        )}
      </div>

      {/* Percentages */}
      <div className={`flex justify-between mt-0.5 text-xs text-gray-400`}>
        <span>{dPct.toFixed(0)}%</span>
        <span>{rPct.toFixed(0)}%</span>
      </div>
    </div>
  );
}
