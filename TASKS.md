# Tasks — Berget Law Entity Manager

This file tracks granular tasks per phase. Check items off as they land.
See `PHASES.md` for the narrative roadmap and acceptance criteria per
phase, and `CHANGELOG.md` for what has actually shipped.

## Phase 0 — Project setup and documentation

- [x] Create Next.js + TypeScript app
- [x] Add Tailwind CSS (v4, CSS-based theme)
- [x] Add shadcn/ui-style component primitives (button, card, badge, input,
      label, textarea, separator, table, dialog, sheet, dropdown-menu,
      select, tabs)
- [x] Create main app layout (sidebar + topbar shell)
- [x] Create sidebar navigation (desktop) and slide-over nav (mobile)
- [x] Create placeholder pages for all 11 nav items
- [x] Create all required markdown tracking files
- [x] Add full phased roadmap to `PHASES.md`
- [x] Add MVP checklist to `TASKS.md`
- [x] Add project purpose/setup instructions to `README.md`
- [x] Verify `npm run build` and `npm run lint` pass
- [x] Verify pages render (manual curl/HTML check of dashboard + entities)

## Phase 1 — Supabase setup and authentication

- [ ] Document Supabase project creation in `SUPABASE_SETUP.md`
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
      `SUPABASE_SERVICE_ROLE_KEY` env handling
- [ ] Configure Supabase client (browser + server)
- [ ] Add Supabase Auth (login/logout)
- [ ] Disable public self-registration by default
- [ ] Protected app shell (redirect unauthenticated users)
- [ ] Demo admin user setup note
- [ ] `firms` table + seed Berget Law
- [ ] `profiles` table with role field (admin, attorney, staff, billing,
      read_only)

## Phase 2 — Core database schema

- [ ] `clients`, `entities`, `principals` tables
- [ ] `state_rules`, `annual_reports` tables
- [ ] `tasks`, `billing_records` tables
- [ ] `documents`, `communications`, `templates` tables
- [ ] `audit_logs` table
- [ ] `calendar_connections`, `calendar_events` tables
- [ ] RLS policies scoped by `firm_id`
- [ ] Indexes on `firm_id`, `client_id`, `entity_id`, due dates, statuses,
      filing number
- [ ] `updated_at` triggers
- [ ] Document schema in `DATA_MODEL.md`

## Phase 3 — Entity management module

- [ ] Active entities list: search, filters, status badges, columns, row
      actions
- [ ] Add Entity workflow (client link, fee override, initial tickler,
      audit log)
- [ ] Edit Entity workflow (audit log of old/new values)
- [ ] Archive/Remove workflow (reason required, hidden from active view,
      visible in archived view)
- [ ] Entity Detail page with all required sections and action buttons

## Phase 4 — Client management module

- [ ] Active clients list: search, filters, entity count, billing summary
- [ ] Client Detail page with related entities/tasks/billing/docs/comms
- [ ] Create/edit/archive client workflows
- [ ] Add entity from client page

## Phase 5 — Multi-state rules engine, Montana first

- [ ] State Rules page (list/filter/add/edit/deactivate)
- [ ] Montana seed rules in `state_rules` table
- [ ] Entities can associate with a state rule
- [ ] Annual report creation suggests due dates from state rules
- [ ] Editable fees/notes, "last verified" date shown

## Phase 6 — Annual report and compliance workflow

- [ ] Annual Reports page: year selector, campaign dashboard, status/billing
      buckets, table
- [ ] Create Annual Campaign workflow (no duplicates, auto tasks)
- [ ] Quick status/billing actions
- [ ] Annual Report Detail page

## Phase 7 — Task and tickler system

- [ ] Tasks page views (my tasks, due today/this week, overdue, waiting,
      completed, snoozed)
- [ ] Daily Work Queue on Dashboard
- [ ] Task actions (complete, snooze, reassign, edit, note, open linked
      record)
- [ ] Auto-create tasks on entity add / campaign create / status changes /
      billing events

## Phase 8 — Billing feature

- [ ] Firm default registered agent fee in Settings
- [ ] Per-entity/per-record fee override
- [ ] Billing dashboard (billed/collected/outstanding/etc.)
- [ ] Billing record workflows (create, mark sent/paid/waived/written off)
- [ ] Billing status syncs to linked annual report

## Phase 9 — Documents and file uploads

- [ ] Supabase Storage bucket, private access only
- [ ] Upload/download workflow from entity/client/annual report
- [ ] Documents page with search/filter
- [ ] Allowed file type validation

## Phase 10 — Communication log and templates

- [ ] Communication log (note/email/call/letter/internal)
- [ ] Templates CRUD with merge fields
- [ ] 7 initial templates seeded
- [ ] Generate Email workflow (merge, edit, copy, save to log)

## Phase 11 — Google Calendar integration for demo

- [ ] Internal calendar page (month/week/list views)
- [ ] Google Calendar connect flow, secure token storage
- [ ] Create calendar event from task
- [ ] Create campaign milestone reminder events
- [ ] Outlook/Microsoft Graph architecture notes

## Phase 12 — Reports and exports

- [ ] All 12 report views
- [ ] CSV export for entities, annual reports, billing records
- [ ] Print-friendly report views

## Phase 13 — Audit log and safety improvements

- [ ] Audit log page/section
- [ ] All required actions logged
- [ ] RLS policies documented
- [ ] `SECURITY_NOTES.md` finalized

## Phase 14 — AI assistant (optional)

- [ ] Missing information checker
- [ ] Email drafter
- [ ] Filing prep memo
- [ ] Annual report year-over-year comparison
- [ ] Reinstatement checklist drafting
- [ ] Entity history summary
- [ ] AI safety: review-required banners, usage logging, feature toggle

## Phase 15 — Demo polish

- [ ] Seed realistic demo data (8 clients, 25 entities)
- [ ] Finalize `DEMO_SCRIPT.md`
- [ ] Full walkthrough QA pass

---

## Final MVP acceptance checklist

- [ ] Log in
- [ ] See the Berget Law dashboard
- [ ] Add a client
- [ ] Add a new entity
- [ ] View all active entities
- [ ] Search/filter/sort active entities
- [ ] Edit entity information
- [ ] Archive/remove an entity without permanently deleting it
- [ ] View archived/inactive entities
- [ ] Track multi-state entity information
- [ ] Use Montana annual report rules for demo
- [ ] Create annual report campaign records
- [ ] Track annual report status
- [ ] Track client confirmation status
- [ ] Track billing status
- [ ] Set default registered agent fee
- [ ] Override fee per entity
- [ ] Create billing records
- [ ] Mark bills paid/unpaid/waived
- [ ] Create and complete tasks
- [ ] View daily work queue
- [ ] Upload documents
- [ ] Log communications
- [ ] Generate email text from templates
- [ ] Create Google Calendar reminders
- [ ] Export reports
- [ ] Use the app as a real internal registered agent tracking system
