export interface SettlementPreview {
  raceId: string;
  candidateA: string;
  candidateB: string;
  state: string;
  district: string | null;
  chamber: string;
  totalA: number; // cents
  totalB: number; // cents
  matched: number; // cents
  margin: number; // cents
  winnerSide: "A" | "B" | "tie";
  campaignPayout: number; // cents → winning campaign
  charityPayout: number; // cents → charity
}

export function calcSettlement(
  raceId: string,
  candidateA: string,
  candidateB: string,
  state: string,
  district: string | null,
  chamber: string,
  totalA: number,
  totalB: number
): SettlementPreview {
  const matched = Math.min(totalA, totalB);
  const margin = Math.abs(totalA - totalB);
  const charityPayout = matched * 2;
  const campaignPayout = margin;
  const winnerSide: "A" | "B" | "tie" =
    totalA > totalB ? "A" : totalB > totalA ? "B" : "tie";

  return {
    raceId,
    candidateA,
    candidateB,
    state,
    district,
    chamber,
    totalA,
    totalB,
    matched,
    margin,
    winnerSide,
    campaignPayout,
    charityPayout,
  };
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
