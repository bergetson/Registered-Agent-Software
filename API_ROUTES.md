# API Routes — Berget Law Entity Manager

**Status: Phase 0 — no API routes exist yet.** This document will be kept
in sync with actual Next.js route handlers / server actions as they are
built, starting in Phase 1.

## Approach

Most data access will go through Supabase's client libraries directly from
server components / server actions, relying on RLS for authorization
rather than hand-rolled REST endpoints for simple CRUD. Dedicated route
handlers (`src/app/api/.../route.ts`) will be added only where something
beyond simple CRUD is needed: third-party callbacks (Google OAuth),
file-serving with extra checks, CSV export streaming, etc.

## Planned route handlers (by phase)

### Phase 1 — Auth

| Route | Method | Purpose |
| --- | --- | --- |
| `/auth/callback` | GET | Supabase Auth redirect/callback handler |

### Phase 9 — Documents

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/documents/upload` | POST | Validate file type/size, store in Supabase Storage, write `documents` row |
| `/api/documents/[id]/download` | GET | Issue/redirect to a signed URL for a protected document |

### Phase 11 — Google Calendar

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/calendar/google/connect` | GET | Start Google OAuth flow |
| `/api/calendar/google/callback` | GET | Handle OAuth redirect, store encrypted tokens |
| `/api/calendar/events` | POST | Create a Google Calendar event from a task or milestone |

### Phase 12 — Reports/exports

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/reports/[report-type]/export` | GET | Stream a CSV export for the given report/filter set |

### Phase 14 — AI (optional)

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/ai/[feature]` | POST | Server-side call to the AI provider; always returns "review required" output, never performs the underlying action itself |

## Server actions (no dedicated REST routes)

Most create/edit/archive/status-change operations for clients, entities,
annual reports, tasks, billing records, communications, and templates are
expected to be implemented as Next.js Server Actions colocated with their
forms, rather than as separate API routes. This file will list them by
name once implemented if useful, but the source of truth for behavior is
always the code.
