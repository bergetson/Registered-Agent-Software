# Project Plan — Berget Law Entity Manager

## Mission

Help Berget Law never miss an entity deadline, always know which entities are
active, know which annual reports/compliance tasks are due, know which
clients have been billed and paid, and keep clean records for every entity.

## Who this is for

Internal attorneys and staff at one law firm (Berget Law) who perform
registered agent work. No clients log in. No public registration exists.

## Core assumptions (do not violate without explicit instruction)

- Internal-only tool, one firm, no client portal, no public registration.
- Backend is Supabase/Postgres.
- Calendar integration for the demo is Google Calendar only. Outlook/Microsoft
  Graph is documented as a future integration, not built in the MVP.
- Multi-state capability is built into the data model from the start, but
  Montana is the only state fully configured in the MVP.
- Billing is internal tracking only — a configurable flat registered agent
  fee per entity/year. No payment processing in the MVP.
- "Remove" never means hard delete. Entities and clients are archived /
  marked inactive / marked "no longer represented." History is preserved.
- AI features are a later, optional phase. The core workflow tool comes
  first and must work without AI.

## Working title

**Berget Law Entity Manager** (other name options considered: Registered
Agent Command Center, EntityDocket, RA OS — not used for the demo).

## Primary navigation

1. Dashboard
2. Entities
3. Clients
4. Annual Reports
5. Tasks / Ticklers
6. Billing
7. Documents
8. Calendar
9. Reports
10. State Rules
11. Settings

## Architecture decisions

| Decision | Rationale |
| --- | --- |
| Next.js App Router + TypeScript | Modern, server-friendly, good fit for Supabase server/client split |
| Tailwind v4 (CSS-based theme) | No `tailwind.config.js` needed; theme tokens live in `globals.css` as CSS variables, which also makes the status color system (green/yellow/orange/red/gray/blue/purple) trivial to theme consistently |
| shadcn/ui-style components, hand-installed | Registry (`ui.shadcn.com`) was unreachable from the build sandbox; components were hand-written to the same API so the project remains CLI-compatible later |
| Route group `(app)` with a shared shell layout | Sidebar/topbar render once; every nav page is a normal `page.tsx` under the group |
| `firm_id` on every major table | Even with one firm today, this keeps data modeling honest and avoids a future migration if a second firm or environment is ever needed. It is **not** a step toward multi-tenant SaaS — there is still no client portal or public signup |
| Soft delete / archive only | Entities and clients get `is_archived`/`status` fields rather than being deleted; required by firm recordkeeping needs |
| Template-based document/email generation before AI | Get a working, predictable feature before adding a non-deterministic one |

## Out of scope for the MVP

- Public client portal or client login
- Public self-registration
- Payment processing / merchant integration
- Outlook / Microsoft Graph calendar integration (architecture notes only)
- AI drafting/review features (Phase 14, optional, after the core tool works)
- Permanent deletion of entities/clients by default

## Success criteria

See the **Final MVP acceptance criteria** list in `TASKS.md`. In short: a
staff member can log in, manage clients and entities, run an annual report
campaign for Montana entities, track billing and tasks, upload documents,
log communications, generate template emails, create Google Calendar
reminders, and export reports — all without spreadsheets.
