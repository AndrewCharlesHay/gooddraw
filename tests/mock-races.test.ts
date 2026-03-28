import { describe, it, expect } from "vitest";
import {
  getRaceSlug,
  findRaceBySlug,
  getPrimaryRace,
  getStateFill,
  STATE_BY_ABBR,
} from "@/lib/mock-races";
import type { StateData } from "@/lib/mock-races";

// Minimal state fixtures so tests don't depend on real mock data changing
const senateState: StateData = {
  abbr: "TX",
  name: "Texas",
  races: [
    { type: "senate", label: "U.S. Senate", democrat: { name: "D", amountCents: 1000 }, republican: { name: "R", amountCents: 2000 } },
    { type: "house",  label: "House District 13", democrat: { name: "D2", amountCents: 500 }, republican: { name: "R2", amountCents: 300 } },
  ],
};

const governorOnlyState: StateData = {
  abbr: "AZ",
  name: "Arizona",
  races: [
    { type: "governor", label: "Governor", democrat: { name: "D", amountCents: 900 }, republican: { name: "R", amountCents: 800 } },
  ],
};

const atLargeState: StateData = {
  abbr: "AK",
  name: "Alaska",
  races: [
    { type: "house", label: "House At-Large", democrat: { name: "D", amountCents: 400 }, republican: { name: "R", amountCents: 600 } },
  ],
};

describe("getRaceSlug", () => {
  it("generates senate slug", () => {
    expect(getRaceSlug("TX", senateState.races[0])).toBe("tx-senate");
  });

  it("generates house slug with district number", () => {
    expect(getRaceSlug("TX", senateState.races[1])).toBe("tx-house-13");
  });

  it("generates governor slug", () => {
    expect(getRaceSlug("AZ", governorOnlyState.races[0])).toBe("az-governor");
  });

  it("generates at-large house slug", () => {
    expect(getRaceSlug("AK", atLargeState.races[0])).toBe("ak-house-al");
  });

  it("lowercases state abbreviation", () => {
    expect(getRaceSlug("OH", senateState.races[0])).toMatch(/^oh-/);
  });
});

describe("findRaceBySlug", () => {
  it("returns null for unknown state", () => {
    expect(findRaceBySlug("xx-senate")).toBeNull();
  });

  it("returns null for slug with no type", () => {
    expect(findRaceBySlug("tx")).toBeNull();
  });

  it("finds a senate race from real data", () => {
    const result = findRaceBySlug("tx-senate");
    expect(result).not.toBeNull();
    expect(result!.state.abbr).toBe("TX");
    expect(result!.race.type).toBe("senate");
  });

  it("finds a governor race from real data", () => {
    const result = findRaceBySlug("az-governor");
    expect(result).not.toBeNull();
    expect(result!.race.type).toBe("governor");
  });

  it("round-trips through getRaceSlug", () => {
    const state = STATE_BY_ABBR.get("TX")!;
    for (const race of state.races) {
      const slug = getRaceSlug("TX", race);
      const found = findRaceBySlug(slug);
      expect(found).not.toBeNull();
      expect(found!.race.type).toBe(race.type);
    }
  });
});

describe("getPrimaryRace", () => {
  it("prefers senate over governor and house", () => {
    const state: StateData = {
      abbr: "OH", name: "Ohio",
      races: [
        { type: "house",    label: "H", democrat: { name: "D", amountCents: 1 }, republican: { name: "R", amountCents: 1 } },
        { type: "senate",   label: "S", democrat: { name: "D", amountCents: 1 }, republican: { name: "R", amountCents: 1 } },
        { type: "governor", label: "G", democrat: { name: "D", amountCents: 1 }, republican: { name: "R", amountCents: 1 } },
      ],
    };
    expect(getPrimaryRace(state).type).toBe("senate");
  });

  it("falls back to governor when no senate", () => {
    expect(getPrimaryRace(governorOnlyState).type).toBe("governor");
  });

  it("falls back to first race when no senate or governor", () => {
    expect(getPrimaryRace(atLargeState).type).toBe("house");
  });
});

describe("getStateFill", () => {
  const dLeadsState: StateData = {
    abbr: "CA", name: "California",
    races: [{ type: "senate", label: "S", democrat: { name: "D", amountCents: 2000 }, republican: { name: "R", amountCents: 1000 } }],
  };
  const rLeadsState: StateData = {
    abbr: "TX", name: "Texas",
    races: [{ type: "senate", label: "S", democrat: { name: "D", amountCents: 1000 }, republican: { name: "R", amountCents: 2000 } }],
  };

  it("returns blue-700 when hovered and D leads", () => {
    expect(getStateFill(dLeadsState, true, false, false)).toBe("#1d4ed8");
  });

  it("returns red-700 when hovered and R leads", () => {
    expect(getStateFill(rLeadsState, true, false, false)).toBe("#b91c1c");
  });

  it("returns vibrant blue when selected and D leads", () => {
    expect(getStateFill(dLeadsState, false, true, true)).toBe("#3b82f6");
  });

  it("returns vibrant red when selected and R leads", () => {
    expect(getStateFill(rLeadsState, false, true, true)).toBe("#ef4444");
  });

  it("returns muted blue when another state is active and D leads", () => {
    expect(getStateFill(dLeadsState, false, false, true)).toBe("#bfdbfe");
  });

  it("returns muted red when another state is active and R leads", () => {
    expect(getStateFill(rLeadsState, false, false, true)).toBe("#fecaca");
  });

  it("returns vibrant blue by default when D leads", () => {
    expect(getStateFill(dLeadsState, false, false, false)).toBe("#3b82f6");
  });

  it("returns vibrant red by default when R leads", () => {
    expect(getStateFill(rLeadsState, false, false, false)).toBe("#ef4444");
  });

  it("hover takes priority over selected", () => {
    expect(getStateFill(dLeadsState, true, true, true)).toBe("#1d4ed8");
  });
});
