# Phased Roadmap — Berget Law Entity Manager

Status legend: ✅ Done · 🚧 In progress · ⬜ Not started

Each phase must leave the app in a working, demoable state. Markdown
tracking files are updated at the end of every phase with: what was
completed, files changed, how to test, known limitations, and next steps.

---

## Phase 0 — Project setup and documentation ✅

Scaffold the Next.js + TypeScript + Tailwind app, shadcn/ui-style component
library, sidebar navigation, placeholder pages for all 11 main nav items,
and all required tracking markdown files with the initial project plan.

## Phase 1 — Supabase setup and authentication ⬜

Stand up the Supabase project, environment variables, Supabase Auth
(no public self-registration), a protected app shell, login/logout, and the
`firms` / `profiles` tables with roles (admin, attorney, staff, billing,
read_only). Seed the Berget Law firm record.

## Phase 2 — Core database schema ⬜

Create all core tables: `clients`, `entities`, `principals`, `state_rules`,
`annual_reports`, `tasks`, `billing_records`, `documents`, `communications`,
`templates`, `audit_logs`, `calendar_connections`, `calendar_events`. Add
RLS policies scoped by `firm_id`, indexes, `updated_at` triggers, and soft
delete/archive fields. Document everything in `DATA_MODEL.md`.

## Phase 3 — Entity management module ⬜

The most important module: active entity list with search/filter/sort,
add/edit/archive workflows, audit logging, and a full entity detail page
(summary, client/contact, registered agent info, compliance status, annual
report history, billing, tasks, documents, communications, notes, activity
history).

## Phase 4 — Client management module ⬜

Client list, client detail page (contact info, related entities, billing,
documents, communications), create/edit/archive workflows, and the ability
to add an entity directly from a client page.

## Phase 5 — Multi-state rules engine, Montana first ⬜

`state_rules`-driven configuration for due dates and fees by state and
entity type. Montana annual report rules seeded (due April 15, season opens
January 1) for LLC, corporation, nonprofit, foreign LLC, foreign
corporation. Rules are editable, never hard-coded into the UI, and always
show a "last verified" date and a reminder to confirm current Secretary of
State rules.

## Phase 6 — Annual report and compliance workflow ⬜

Annual report campaigns: choose a year/state, generate `annual_reports`
records for active entities without duplicating existing ones, auto-create
follow-up tasks, and track status/billing/filing buckets with quick-action
updates. Annual report detail page ties it all together.

## Phase 7 — Task and tickler system ⬜

Daily work queue (overdue, due today, due this week, waiting, snoozed),
task CRUD linked to entities/clients/annual reports, and auto-created tasks
triggered by entity creation, campaign creation, status changes, and
billing events.

## Phase 8 — Billing feature ⬜

Internal billing tracking only (no payment processing). Firm-level default
registered agent fee, per-entity/per-record overrides, billing dashboard
(billed/collected/outstanding/overdue/paid/waived/written off), and
billing status synced back to linked annual reports.

## Phase 9 — Documents and file uploads ⬜

Supabase Storage-backed document uploads linked to entities, clients, and
annual reports. Private/protected access only — no public buckets. Allowed
types: PDF, DOCX, XLSX, CSV, PNG, JPG, TXT.

## Phase 10 — Communication log and templates ⬜

Manual communication logging (email/call/letter/meeting/note) and a
template system with merge fields (client name, entity name, due dates,
fees, responsible attorney/staff, etc.) to generate copyable email text and
optionally save it to the communication log. No automated email sending
yet.

## Phase 11 — Google Calendar integration for demo ⬜

Internal calendar view (tasks, annual report deadlines, billing
follow-ups, campaign milestones) plus a Google Calendar connection that can
create individual reminder events from tasks and campaign milestones
(season open, 60/30/15-day reviews, deadline, late review). No automatic
mass event creation. Outlook/Microsoft Graph documented as a future
integration only.

## Phase 12 — Reports and exports ⬜

A reports page covering active/archived entities, annual reports by
status, billing/collections, due dates, delinquent entities, reinstatement
queue, filed-this-year, waiting-on-client, ready-to-file, filed-but-unpaid,
and staff workload — each with CSV export and print-friendly views.

## Phase 13 — Audit log and safety improvements ⬜

Comprehensive audit logging of create/edit/archive/status-change events
across entities, clients, annual reports, billing, tasks, documents,
templates, and calendar events. Harden RLS, document security posture, and
add backup/export notes.

## Phase 14 — AI assistant (optional, later phase) ⬜

Staff-assisting (never autonomous) AI features: missing-information
checker, email drafter, filing prep memo, year-over-year annual report
comparison, reinstatement checklist drafting, entity history summarization.
AI never files, never sends email, never gives final legal advice, always
shows "review required," logs AI use against client data, and can be
disabled entirely.

## Phase 15 — Demo polish ⬜

Realistic seed data (8 clients, 25 entities, mostly Montana with a few
other-state placeholders, varied statuses), a polished walkthrough, and a
finished `DEMO_SCRIPT.md` covering login through report export.

---

## Final MVP acceptance criteria

By the end of the MVP, a staff member should be able to:

1. Log in / log out, with unauthenticated users blocked from protected pages.
2. See the Berget Law dashboard with a real daily work queue.
3. Add a client and add a new entity under that client.
4. View, search, filter, and sort active entities.
5. Edit entity information with an audit trail.
6. Archive/remove an entity without permanently deleting it, and view it
   later in an archived filter.
7. Track multi-state entity information, with Montana fully configured.
8. Create annual report campaign records without duplication.
9. Track annual report status, client confirmation status, and billing
   status independently.
10. Set a firm-wide default registered agent fee and override it per
    entity.
11. Create billing records and mark them paid/unpaid/waived/written off.
12. Create, complete, snooze, and reassign tasks, and see them on a daily
    work queue.
13. Upload and retrieve protected documents linked to records.
14. Log communications and generate email text from templates.
15. Create Google Calendar reminders from tasks and campaign milestones.
16. Export CSV reports.
17. Use the app as a real internal registered agent tracking system instead
    of spreadsheets.
