# Demo Script — Berget Law Entity Manager

**Status: Phase 0.** This is a placeholder outline. The full, working demo
script will be finalized in Phase 15 once every step below is backed by
real functionality and seed data. Steps are listed now so later phases
know what they need to support.

## Audience and framing

This is an internal demo for Berget Law decision-makers (partners,
office manager) to see how the tool replaces spreadsheets for registered
agent tracking. Emphasize throughout:

- One source of truth instead of scattered spreadsheets/shared drives.
- Nothing gets missed — deadlines, billing, and follow-ups are all visible.
- Removing an entity never destroys its history.
- Montana works today; other states are structurally ready, not bolted on
  later.

## Planned walkthrough steps

1. **Log in** as the demo admin user.
2. **Show the dashboard** — point out the daily work queue: overdue items,
   due-today items, upcoming annual report deadlines.
3. **Show active entities** — search, filter by state/status, sort by due
   date.
4. **Add a new entity** — pick or create a client, fill in entity details,
   note the registered agent fee defaults to the firm rate but can be
   overridden.
5. **Edit an entity** — change a field, show the audit trail recording the
   change.
6. **Archive/remove an entity** — show that it asks for a reason and that
   the entity disappears from the active list but is not deleted.
7. **View archived entities** — show it's still fully searchable there.
8. **Create an annual report campaign** — choose Montana and the current
   year, show that it generates report records for active Montana
   entities without duplicating existing ones.
9. **Update annual report statuses** — move one from "not started" through
   "client contacted" to "ready to file."
10. **Show the billing tracker** — outstanding vs. paid vs. overdue, and
    where the firm-wide default fee is configured.
11. **Generate an annual report client email** — pick a template, show the
    merge fields populate from the entity/client record, copy the result.
12. **Create a Google Calendar reminder** — from a task or a campaign
    deadline.
13. **Export an active entity report** — download the CSV.

## What to say if asked about scope

- No client portal and no public sign-up — this is staff-only by design.
- No payment processing yet — billing status is tracked, not collected,
  in the MVP.
- AI features are intentionally not part of this build yet; the firm asked
  for the core workflow tool to be solid first.

## Pre-demo checklist (fill in once Phase 15 lands)

- [ ] Seed data loaded (8 clients, 25 entities, mostly Montana)
- [ ] At least one task overdue and one due today, for the work queue
- [ ] At least one annual report in each status bucket
- [ ] At least one billing record in each status bucket
- [ ] Demo Google account connected for the calendar step
- [ ] Browser zoom/window sized for screen-share legibility
