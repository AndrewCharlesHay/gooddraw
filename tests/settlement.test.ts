import { describe, it, expect } from "vitest";
import { calcSettlement, formatCents } from "@/lib/settlement";

describe("formatCents", () => {
  it("formats whole dollars", () => {
    expect(formatCents(5000)).toBe("$50.00");
  });

  it("formats cents", () => {
    expect(formatCents(150)).toBe("$1.50");
  });

  it("formats zero", () => {
    expect(formatCents(0)).toBe("$0.00");
  });

  it("formats large amounts", () => {
    expect(formatCents(1_000_000)).toBe("$10,000.00");
  });
});

describe("calcSettlement", () => {
  const base = {
    raceId: "race-1",
    candidateA: "Alice",
    candidateB: "Bob",
    state: "OH",
    district: null,
    chamber: "senate",
  };

  it("calculates correctly when A wins", () => {
    const result = calcSettlement(
      base.raceId, base.candidateA, base.candidateB,
      base.state, base.district, base.chamber,
      15000, 10000
    );
    expect(result.matched).toBe(10000);
    expect(result.margin).toBe(5000);
    expect(result.charityPayout).toBe(20000); // matched * 2
    expect(result.campaignPayout).toBe(5000); // margin
    expect(result.winnerSide).toBe("A");
    expect(result.charityPayout + result.campaignPayout).toBe(15000 + 10000);
  });

  it("calculates correctly when B wins", () => {
    const result = calcSettlement(
      base.raceId, base.candidateA, base.candidateB,
      base.state, base.district, base.chamber,
      8000, 20000
    );
    expect(result.matched).toBe(8000);
    expect(result.margin).toBe(12000);
    expect(result.charityPayout).toBe(16000);
    expect(result.campaignPayout).toBe(12000);
    expect(result.winnerSide).toBe("B");
    expect(result.charityPayout + result.campaignPayout).toBe(8000 + 20000);
  });

  it("handles a tie — full amount goes to charity", () => {
    const result = calcSettlement(
      base.raceId, base.candidateA, base.candidateB,
      base.state, base.district, base.chamber,
      10000, 10000
    );
    expect(result.matched).toBe(10000);
    expect(result.margin).toBe(0);
    expect(result.charityPayout).toBe(20000);
    expect(result.campaignPayout).toBe(0);
    expect(result.winnerSide).toBe("tie");
  });

  it("handles zero donations", () => {
    const result = calcSettlement(
      base.raceId, base.candidateA, base.candidateB,
      base.state, base.district, base.chamber,
      0, 0
    );
    expect(result.charityPayout).toBe(0);
    expect(result.campaignPayout).toBe(0);
    expect(result.winnerSide).toBe("tie");
  });

  it("total disbursed always equals totalA + totalB", () => {
    const cases = [[100, 200], [500, 500], [0, 300], [1000, 1]];
    for (const [a, b] of cases) {
      const result = calcSettlement(
        base.raceId, base.candidateA, base.candidateB,
        base.state, base.district, base.chamber,
        a, b
      );
      expect(result.charityPayout + result.campaignPayout).toBe(a + b);
    }
  });

  it("passes through race metadata", () => {
    const result = calcSettlement(
      "race-42", "Candidate A", "Candidate B",
      "TX", "5", "house",
      1000, 2000
    );
    expect(result.raceId).toBe("race-42");
    expect(result.candidateA).toBe("Candidate A");
    expect(result.candidateB).toBe("Candidate B");
    expect(result.state).toBe("TX");
    expect(result.district).toBe("5");
    expect(result.chamber).toBe("house");
  });
});
