import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const races = sqliteTable("races", {
  id: text("id").primaryKey(),
  cycle: integer("cycle").notNull(), // e.g. 2026
  state: text("state").notNull(), // "OH"
  district: text("district"), // null for Senate
  chamber: text("chamber").notNull(), // "house" | "senate"
  candidateA: text("candidate_a").notNull(),
  candidateB: text("candidate_b").notNull(),
  partyA: text("party_a").notNull(), // "R" | "D" | "I"
  partyB: text("party_b").notNull(),
  totalA: integer("total_a").notNull().default(0), // cents
  totalB: integer("total_b").notNull().default(0), // cents
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const donations = sqliteTable("donations", {
  id: text("id").primaryKey(),
  raceId: text("race_id")
    .notNull()
    .references(() => races.id),
  side: text("side").notNull(), // "A" | "B"
  amountCents: integer("amount_cents").notNull(),
  paymentRef: text("payment_ref").notNull().unique(), // mock or Stripe ID
  status: text("status").notNull().default("captured"), // captured | settled
  // FEC-required fields
  donorName: text("donor_name").notNull(),
  donorAddress: text("donor_address").notNull(),
  donorCity: text("donor_city").notNull(),
  donorState: text("donor_state").notNull(),
  donorZip: text("donor_zip").notNull(),
  donorEmployer: text("donor_employer").notNull(),
  donorOccupation: text("donor_occupation").notNull(),
  usCitizenConfirm: integer("us_citizen_confirm", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const settlements = sqliteTable("settlements", {
  id: text("id").primaryKey(),
  raceId: text("race_id")
    .notNull()
    .references(() => races.id),
  periodStart: integer("period_start", { mode: "timestamp" }).notNull(),
  periodEnd: integer("period_end", { mode: "timestamp" }).notNull(),
  totalA: integer("total_a").notNull(),
  totalB: integer("total_b").notNull(),
  winnerSide: text("winner_side").notNull(), // "A" | "B" | "tie"
  campaignPayout: integer("campaign_payout").notNull(),
  charityPayout: integer("charity_payout").notNull(),
  status: text("status").notNull().default("pending"), // pending | paid
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export type Race = typeof races.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type Settlement = typeof settlements.$inferSelect;
