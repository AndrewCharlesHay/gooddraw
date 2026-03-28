# Future Features

## Authentication & Accounts
- OAuth login (Google, Apple) so donors can track their donation history
- "My Donations" page showing all pledges, match status, and settlement outcomes
- Email notifications when an opposing donation matches yours
- Account dashboard showing total sent to charity across all races

## Payments
- Real Stripe integration replacing the mock checkout
- Donation receipt emails with FEC disclosure information
- Contribution limit enforcement per donor per candidate per cycle ($3,300)
- Refund flow if a donation cannot be settled (e.g. candidate withdraws)

## Races & Data
- Live race data from OpenFEC API replacing mock data
- Automatic race updates as primaries resolve and candidates change
- House races for all 435 districts, not just sampled ones
- Historical settlement archive showing past matched amounts per race

## Matching & Settlement
- Real-time match meter showing how close two sides are to canceling out
- Notifications when your donation gets fully matched
- Configurable settlement cadence (weekly vs monthly) per admin
- Settlement CSV export for ACH disbursement to campaigns and charity

## Charity
- Charity confirmation page after settlement showing the St. Jude donation receipt
- Running total of all money sent to St. Jude across the platform
- Charity impact stories tied to settlement events

## Discovery & Sharing
- Share your donation pledge on social media ("I just canceled $50 for [candidate]")
- Leaderboard by state showing most active matching races
- Email/SMS alerts when a race you care about gets a large opposing donation
- Embeddable race widget for third-party sites

## Admin & Compliance
- FEC report generation in the required electronic filing format
- Audit log of all donations and settlements
- Admin role management (not just a single shared password)
- Rate limiting and fraud detection on the checkout API
