/**
 * Seed races from the OpenFEC API into a local D1 database.
 *
 * Usage:
 *   OPENFEC_KEY=<your-key> npx tsx scripts/seed-races.ts
 *
 * Get a free API key at: https://api.open.fec.gov/developers/
 *
 * This script fetches general-election candidates for the current cycle
 * and pairs them into races. Because FEC data doesn't always have a clean
 * opponent pairing, it uses a best-effort approach: group by state+district,
 * pick the top R and top D by total_receipts, and create a race for each pair.
 *
 * For a real deployment, review and manually curate the races table.
 */

import { randomUUID } from "crypto";

const FEC_KEY = process.env.OPENFEC_KEY;
const CYCLE = 2026;
const DB_NAME = "good-draw"; // must match wrangler.toml database_name

if (!FEC_KEY) {
  console.error("OPENFEC_KEY env var is required. Get one at https://api.open.fec.gov/developers/");
  process.exit(1);
}

interface FECCandidate {
  candidate_id: string;
  name: string;
  party: string;
  state: string;
  district: string | null;
  office: string; // "H" | "S"
  total_receipts: number;
}

async function fetchCandidates(office: "H" | "S"): Promise<FECCandidate[]> {
  const results: FECCandidate[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL("https://api.open.fec.gov/v1/candidates/");
    url.searchParams.set("api_key", FEC_KEY!);
    url.searchParams.set("election_year", String(CYCLE));
    url.searchParams.set("office", office);
    url.searchParams.set("election_full", "true");
    url.searchParams.set("party", ""); // all parties
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", "-receipts");

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`FEC API error: ${res.status} ${await res.text()}`);
      break;
    }
    const data = await res.json() as { results: FECCandidate[]; pagination: { pages: number } };
    results.push(...data.results);
    if (page >= data.pagination.pages) break;
    page++;
    // Respect rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  return results;
}

interface Race {
  id: string;
  cycle: number;
  state: string;
  district: string | null;
  chamber: string;
  candidateA: string;
  candidateB: string;
  partyA: string;
  partyB: string;
}

function pairCandidates(candidates: FECCandidate[], chamber: "house" | "senate"): Race[] {
  // Group by state + district
  const groups = new Map<string, FECCandidate[]>();
  for (const c of candidates) {
    const key = chamber === "senate" ? c.state : `${c.state}-${c.district ?? "00"}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c);
  }

  const races: Race[] = [];
  for (const [, group] of groups) {
    // Pick top R and top D by receipts
    const rep = group.find((c) => c.party === "REP");
    const dem = group.find((c) => c.party === "DEM");
    if (!rep || !dem) continue; // skip uncontested or third-party-only

    const state = group[0].state;
    const district = chamber === "senate" ? null : (group[0].district ?? null);

    races.push({
      id: randomUUID(),
      cycle: CYCLE,
      state,
      district,
      chamber,
      candidateA: titleCase(rep.name),
      candidateB: titleCase(dem.name),
      partyA: "R",
      partyB: "D",
    });
  }
  return races;
}

function titleCase(name: string): string {
  // FEC names are often "LAST, FIRST" — convert to "First Last"
  const parts = name.split(",").map((p) => p.trim());
  if (parts.length === 2) {
    const [last, first] = parts;
    return `${capitalize(first)} ${capitalize(last)}`;
  }
  return name
    .split(" ")
    .map(capitalize)
    .join(" ");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

async function main() {
  console.log(`Fetching ${CYCLE} House candidates from OpenFEC…`);
  const houseCandidates = await fetchCandidates("H");
  console.log(`  → ${houseCandidates.length} candidates`);

  console.log(`Fetching ${CYCLE} Senate candidates from OpenFEC…`);
  const senateCandidates = await fetchCandidates("S");
  console.log(`  → ${senateCandidates.length} candidates`);

  const houseRaces = pairCandidates(houseCandidates, "house");
  const senateRaces = pairCandidates(senateCandidates, "senate");
  const allRaces = [...houseRaces, ...senateRaces];

  console.log(`\nPaired ${houseRaces.length} House races and ${senateRaces.length} Senate races.`);
  console.log(`Total: ${allRaces.length} races to insert.\n`);

  if (allRaces.length === 0) {
    console.log("No races to insert. The ${CYCLE} cycle may not have candidate data yet.");
    return;
  }

  // Generate SQL for wrangler d1 execute
  const values = allRaces
    .map(
      (r) =>
        `('${r.id}', ${r.cycle}, '${r.state}', ${r.district ? `'${r.district}'` : "NULL"}, '${r.chamber}', ` +
        `'${r.candidateA.replace(/'/g, "''")}', '${r.candidateB.replace(/'/g, "''")}', '${r.partyA}', '${r.partyB}', 0, 0, ${Math.floor(Date.now() / 1000)})`
    )
    .join(",\n  ");

  const sql = `INSERT OR IGNORE INTO races (id, cycle, state, district, chamber, candidate_a, candidate_b, party_a, party_b, total_a, total_b, created_at) VALUES\n  ${values};`;

  const { writeFileSync } = await import("fs");
  writeFileSync("seed.sql", sql, "utf8");
  console.log("SQL written to seed.sql");
  console.log("\nRun this to apply:");
  console.log(`  npx wrangler d1 execute ${DB_NAME} --local --file=seed.sql`);
  console.log(`  npx wrangler d1 execute ${DB_NAME} --file=seed.sql  # for production`);
}

main().catch(console.error);
