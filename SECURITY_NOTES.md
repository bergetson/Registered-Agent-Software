# Security Notes — Berget Law Entity Manager

This is an internal law-firm tool handling client and entity records.
Security posture should match that sensitivity even though the user base
is small. **Status: Phase 0** — no backend exists yet, so most items below
are the plan to be implemented in Phase 1+ and revisited each phase.

## Access model

- Internal-only. No public registration, no client portal, no client
  login. Accounts are created by an admin (Phase 1).
- Supabase Auth handles authentication. Public self-registration is
  disabled by default; it may be temporarily enabled for local development
  only, and must never be enabled in a deployed environment.
- Every user has a role: `admin`, `attorney`, `staff`, `billing`,
  `read_only` (stored on `profiles.role`). UI and, where it matters, RLS
  policies should respect role boundaries (e.g. `read_only` cannot
  edit/delete; `billing` may need write access to billing records but not
  necessarily entity legal details — exact role-to-permission mapping to
  be finalized in Phase 1/13).

## Data isolation

- Every major table carries `firm_id`. Even though only Berget Law exists
  today, Row Level Security policies will scope all reads/writes to
  `auth.uid()`'s `profiles.firm_id`. This is defense in depth, not a step
  toward multi-tenant SaaS.
- RLS will be enabled on every table from the migration that creates it
  (Phase 2 onward). No table should ship without RLS enabled, even
  temporarily.

## Secrets and environment variables

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public
  by design (anon key is safe to ship to the browser given RLS is
  correctly enforced).
- `SUPABASE_SERVICE_ROLE_KEY` is server-only, never sent to the client,
  never logged, and only used in trusted server contexts (e.g. server
  actions/route handlers that must bypass RLS for a specific, audited
  reason).
- `.env.local` (or equivalent) must never be committed. `.gitignore`
  already excludes standard Next.js env files via the `create-next-app`
  default.
- Google Calendar OAuth tokens (`calendar_connections.access_token_encrypted`,
  `refresh_token_encrypted`) are stored encrypted at rest and are never
  returned to the client; calendar actions happen server-side.

## File storage

- Supabase Storage buckets for documents are private, not public. Access is
  via signed URLs or server-mediated requests, scoped by the same
  `firm_id`/RLS logic as the database.
- Allowed file types are restricted to the list in `DATA_MODEL.md`
  (`documents.document_type` plus extension/mime allowlist: PDF, DOCX,
  XLSX, CSV, PNG, JPG, TXT).

## Data we deliberately do not store

- Secretary of State account passwords or credentials.
- Full payment card / bank account data (no payment processing in the
  MVP — billing is internal tracking only).
- Unnecessary sensitive personal data (e.g. SSNs) unless a specific,
  justified business need arises later — not assumed by default.

## Deletion policy

- No permanent delete by default for entities or clients. "Remove" means
  archive / inactive / "no longer represented," preserving history for
  compliance and malpractice-defense reasons.
- Any future hard-delete capability (e.g. for GDPR-style requests, which
  are unlikely given this is a US-only internal tool) would require an
  explicit admin-only, audited, two-step confirmation flow — not built in
  the MVP.

## Audit logging

- `audit_logs` records who changed what and when, including before/after
  values for edits, across entities, clients, annual reports, billing,
  tasks, documents, templates, and calendar events (Phase 13 finalizes
  coverage).
- Audit logs themselves are append-only from the application's
  perspective; no UI path to edit or delete an audit log entry.

## Backups / recovery

- Supabase manages automated Postgres backups at the project tier the firm
  selects; document the specific backup/retention settings chosen for the
  production project in `SUPABASE_SETUP.md` once Phase 1 stands up the
  project.
- Before any destructive migration, prefer additive changes; do not drop
  columns/tables with live data without a reviewed migration plan.

## Known gaps as of Phase 0

- No authentication exists yet, so there is currently no protected route
  enforcement, no RLS, and no audit logging — the app is a static UI shell.
  These all land starting Phase 1.
- This file will be revised at the end of every phase that touches
  security-relevant surface area (auth, RLS, storage, calendar tokens,
  audit logging).
