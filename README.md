# Good Draw

**Political donations that cancel each other out — for good.**

Good Draw is a political donation matching platform where opposing donations neutralize each other and the matched amount goes to [St. Jude Children's Research Hospital](https://www.stjude.org) instead of the campaigns. Only the net difference reaches the winning candidate.

**Example:** $150 is raised for Candidate A and $100 for Candidate B.
- $200 (the matched portion) → St. Jude Children's Research Hospital
- $50 (the margin) → Candidate A's campaign
- $0 → Candidate B's campaign

Your donation still supports your candidate by canceling out the opposition — while redirecting money to children's cancer research instead of political advertising.

> **Legal notice:** This platform is a proof-of-concept. Before accepting real contributions, consult an election law attorney. See [FEC Advisory Opinion AO 2015-08](https://www.fec.gov/updates/ao-2015-08-company-may-operate-candidate-contribution-charitable-match-platform/) for the regulatory framework this model is based on.

---

## Features

- Interactive US map with hover/click to explore 2026 races
- Donate to either candidate in any US House, Senate, or Governor race
- FEC-compliant donation form (name, address, employer, occupation, citizenship confirmation)
- Settlement admin dashboard with CSV export
- Cloudflare Workers deployment with D1 (SQLite) database

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Hosting | Cloudflare Workers via [@opennextjs/cloudflare](https://github.com/opennextjs/opennextjs-cloudflare) |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle ORM |
| Styling | Tailwind CSS |
| Map | react-simple-maps |

---

## Local Development

```bash
npm install
npm run dev
```

The app runs locally against mocked data. No Cloudflare account or D1 database is needed for local development.

---

## Deployment

This project deploys to Cloudflare Workers. One-time setup:

**1. Create the D1 database**
```bash
npx wrangler d1 create good-draw
# Copy the database_id into wrangler.toml
```

**2. Set secrets**
```bash
npx wrangler secret put ADMIN_PASSWORD
```

**3. Apply migrations**
```bash
npm run db:migrate:prod
```

**4. Deploy**
```bash
npm run deploy
```

### CI/CD

Push to a `release/v*.*.*` branch to trigger an automated deploy via GitHub Actions.

Required GitHub configuration:
- **Secret** `CLOUDFLARE_API_TOKEN` — API token with Workers and D1 edit permissions
- **Secret** `ADMIN_PASSWORD` — password for the `/admin/settle` route
- **Variable** `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

---

## Settlement

At settlement time (weekly or monthly), for each race:

```
matched        = min(totalA, totalB)
charityPayout  = matched × 2         ← goes to St. Jude
campaignPayout = |totalA − totalB|   ← goes to the winning campaign

charityPayout + campaignPayout = totalA + totalB  ✓
```

The `/admin/settle` dashboard previews payouts before confirming and exports a CSV for manual ACH disbursement.

---

## Legal

This project is a proof-of-concept and does not process real payments. Before launching with real contributions:

1. Register a legal entity and open a dedicated bank account for pass-through funds
2. Consult an election law attorney (FEC conduit/bundler rules apply — see 11 CFR 110.6)
3. Enforce $3,300 per-candidate per-election contribution limits
4. Collect and store FEC-required donor disclosure fields for contributions >$200

Contributions to federal candidates are **not tax-deductible**.

---

## License

[AGPL-3.0](LICENSE)
