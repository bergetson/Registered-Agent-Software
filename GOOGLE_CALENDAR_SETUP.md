# Google Calendar Setup — Berget Law Entity Manager

**Status: Phase 0.** No calendar integration exists yet. This document
will become the real setup guide when Phase 11 lands; the steps below are
the planned process.

## Why Google Calendar (and not Outlook) for the MVP

The firm asked for a demo-ready calendar integration. Google Calendar has a
simpler OAuth/API surface for a small internal tool, so it is built first.
Outlook/Microsoft Graph is documented below as a future integration, not
built in the MVP.

## Planned setup steps (Phase 11)

1. Create a Google Cloud project for Berget Law (or use an existing
   workspace project if the firm already has one).
2. Enable the **Google Calendar API** for that project.
3. Configure an OAuth consent screen as "Internal" if the firm uses Google
   Workspace (restricts sign-in to firm accounts), or "External" with a
   limited test-user list otherwise.
4. Create OAuth 2.0 credentials (Web application type) with an authorized
   redirect URI pointing at `/api/calendar/google/callback` for each
   environment (local + deployed).
5. Store the client ID/secret as server-only environment variables:
   - `GOOGLE_CALENDAR_CLIENT_ID`
   - `GOOGLE_CALENDAR_CLIENT_SECRET`
   - `GOOGLE_CALENDAR_REDIRECT_URI`
6. In-app, a user connects their Google account from Settings or the
   Calendar page; the app stores the resulting encrypted access/refresh
   tokens in `calendar_connections` (see `DATA_MODEL.md`), never exposing
   them to the browser.

## Event creation philosophy

Per the project plan, the app does **not** auto-create a calendar event for
every entity — that would clutter the firm's calendar. Instead:

- Users create a Google Calendar event explicitly from a task.
- Campaign-level milestone reminders (season opens, 60/30/15-day reviews,
  deadline, late/delinquent review) can be created in bulk for a campaign,
  but only when a user chooses to do so — not automatically on campaign
  creation.

## Token security

- Access and refresh tokens are encrypted at rest in `calendar_connections`.
- Tokens are only read/used server-side; calendar API calls happen in
  server actions or route handlers, never directly from the browser.
- A user can disconnect their calendar at any time, which should revoke
  the stored tokens.

## Future integration: Outlook / Microsoft Graph

Not built in the MVP. When the firm wants Outlook support:

- Microsoft Graph's calendar API (`/me/events`) is the equivalent surface
  to Google Calendar's `events.insert`.
- The `calendar_connections.provider` and `calendar_events.provider`
  columns already support an `outlook` value, so no schema change should
  be needed — only a new provider implementation behind the same internal
  interface used for Google (e.g. a `CalendarProvider` abstraction with
  `createEvent`, `connect`, `disconnect` methods).
- Microsoft's OAuth flow (MSAL) and consent/admin-approval model differ
  from Google's and should be scoped as its own phase when prioritized.
- Reuse the same "explicit creation only, no bulk auto-events" philosophy
  described above.
