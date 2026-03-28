"use client";

import { formatCents } from "@/lib/settlement";

interface Props {
  totalA: number;
  totalB: number;
  candidateA: string;
  candidateB: string;
}

export function ImpactMeter({ totalA, totalB, candidateA, candidateB }: Props) {
  const matched = Math.min(totalA, totalB);
  const charityPot = matched * 2;
  const margin = Math.abs(totalA - totalB);
  const total = totalA + totalB;
  const pctA = total > 0 ? (totalA / total) * 100 : 50;
  const pctB = total > 0 ? (totalB / total) * 100 : 50;

  return (
    <div className="space-y-4">
      {/* Bar */}
      <div className="flex rounded-full overflow-hidden h-6 text-xs font-semibold">
        <div
          className="bg-red-500 flex items-center justify-center text-white transition-all duration-500"
          style={{ width: `${pctA}%` }}
        >
          {pctA > 15 ? `${Math.round(pctA)}%` : ""}
        </div>
        <div
          className="bg-blue-500 flex items-center justify-center text-white transition-all duration-500"
          style={{ width: `${pctB}%` }}
        >
          {pctB > 15 ? `${Math.round(pctB)}%` : ""}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm">
        <span className="font-medium text-red-600">{candidateA}: {formatCents(totalA)}</span>
        <span className="font-medium text-blue-600">{candidateB}: {formatCents(totalB)}</span>
      </div>

      {/* Charity pot */}
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
        <p className="text-xs text-green-700 uppercase tracking-wider font-semibold mb-1">
          Going to Charity
        </p>
        <p className="text-2xl font-bold text-green-700">{formatCents(charityPot)}</p>
        <p className="text-xs text-green-600 mt-1">
          {matched > 0
            ? `${formatCents(matched)} canceled on each side → St. Jude Children's Research Hospital`
            : "Be the first to donate — your match doubles the charity impact!"}
        </p>
      </div>

      {/* Campaign payout */}
      {margin > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {totalA > totalB ? candidateA : candidateB}&apos;s campaign will receive the{" "}
          {formatCents(margin)} margin at settlement.
        </p>
      )}
    </div>
  );
}
