# Supabase Setup — Berget Law Entity Manager

**Status: Phase 0.** No Supabase project is connected yet. This document
will become the real setup guide starting in Phase 1; the steps below are
the planned process so Phase 1 can be executed directly against them.

## 1. Create the Supabase project

1. Create a Supabase account/organization for Berget Law if one does not
   already exist.
2. Create a new project (suggested name: `berget-law-entity-manager`).
3. Choose a region close to the firm's primary location.
4. Set a strong database password and store it in the firm's password
   manager — not in this repo, not in chat, not in an env file that gets
   committed.

## 2. Collect environment variables

From Project Settings → API, collect:

| Variable | Where it's used | Sensitivity |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server | Public (RLS protects data) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | **Secret** — never expose to the browser, never commit |

Create a local `.env.local` (already covered by `.gitignore`) with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

For any deployed environment, set these as platform environment variables
(e.g. Vercel project settings) rather than committing a file.

## 3. Disable public sign-ups

In Authentication → Settings, disable "Allow new users to sign up" (or
equivalent) for any non-local environment. This is an internal tool — new
accounts should be created by an admin, not by public registration. It is
acceptable to temporarily enable sign-up locally for development
convenience, but never in a deployed environment.

## 4. Run migrations (Phase 1+)

Once Phase 1/2 migrations exist in this repo (likely under `supabase/migrations`
once the Supabase CLI is added to the project), run them with the Supabase
CLI:

```bash
npx supabase login
npx supabase link --project-ref YOUR-PROJECT-REF
npx supabase db push
```

This section will be updated with exact commands once the migration
tooling is added in Phase 1.

## 5. Seed data

Phase 1 seeds:

- One `firms` row: `firm_name = "Berget Law"`, `firm_slug = "berget-law"`,
  `default_registered_agent_fee = 250`, `default_state = "MT"`.
- One demo admin `profiles` row, linked to a Supabase Auth user created
  manually (see "Demo admin user" below).

Phase 5 seeds Montana `state_rules` rows. Phase 15 seeds full demo data
(8 clients, 25 entities, etc.).

## 6. Demo admin user

For the demo/dev environment:

1. In Supabase Authentication → Users, manually create a user with the
   firm's demo email and a strong temporary password (do not reuse a real
   personal password).
2. Insert a matching `profiles` row with `role = 'admin'` and `firm_id`
   set to the Berget Law firm row.
3. Document the exact demo credentials in a secure, non-committed location
   (e.g. the firm's password manager) — not in this file, since this file
   is committed to the repo.

## 7. Storage buckets (Phase 9)

Create a private bucket (e.g. `documents`) with public access disabled.
Access will be via signed URLs generated server-side, scoped by the same
firm/RLS rules as the database. Exact bucket policies will be documented
here when Phase 9 lands.

## 8. Backups

Note the backup/retention tier chosen for the production project here once
selected (Phase 1 or later), so the firm has a record of its recovery
posture.
