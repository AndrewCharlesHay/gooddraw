CREATE TABLE `donations` (
	`id` text PRIMARY KEY NOT NULL,
	`race_id` text NOT NULL,
	`side` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`payment_ref` text NOT NULL,
	`status` text DEFAULT 'captured' NOT NULL,
	`donor_name` text NOT NULL,
	`donor_address` text NOT NULL,
	`donor_city` text NOT NULL,
	`donor_state` text NOT NULL,
	`donor_zip` text NOT NULL,
	`donor_employer` text NOT NULL,
	`donor_occupation` text NOT NULL,
	`us_citizen_confirm` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `donations_payment_ref_unique` ON `donations` (`payment_ref`);--> statement-breakpoint
CREATE TABLE `races` (
	`id` text PRIMARY KEY NOT NULL,
	`cycle` integer NOT NULL,
	`state` text NOT NULL,
	`district` text,
	`chamber` text NOT NULL,
	`candidate_a` text NOT NULL,
	`candidate_b` text NOT NULL,
	`party_a` text NOT NULL,
	`party_b` text NOT NULL,
	`total_a` integer DEFAULT 0 NOT NULL,
	`total_b` integer DEFAULT 0 NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `settlements` (
	`id` text PRIMARY KEY NOT NULL,
	`race_id` text NOT NULL,
	`period_start` integer NOT NULL,
	`period_end` integer NOT NULL,
	`total_a` integer NOT NULL,
	`total_b` integer NOT NULL,
	`winner_side` text NOT NULL,
	`campaign_payout` integer NOT NULL,
	`charity_payout` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`notes` text,
	`created_at` integer,
	FOREIGN KEY (`race_id`) REFERENCES `races`(`id`) ON UPDATE no action ON DELETE no action
);
