# Changelog

All notable changes to the Berget Law Entity Manager project are recorded
here, organized by phase.

## Phase 0 — Project setup and documentation

**Date:** 2026-06-19

### What was completed

- Scaffolded a Next.js 16 (App Router) + TypeScript app with Tailwind CSS v4.
- Hand-installed a shadcn/ui-style component library (the `ui.shadcn.com`
  registry was not reachable from the build sandbox) with consistent theme
  tokens, including the status color system (active/due-soon/waiting/late/
  archived/ready-to-file/needs-review).
- Built the app shell: desktop sidebar, mobile slide-over nav, topbar.
- Created placeholder pages for all 11 primary navigation items: Dashboard,
  Entities, Clients, Annual Reports, Tasks/Ticklers, Billing, Documents,
  Calendar, Reports, State Rules, Settings.
- Built a real (non-placeholder) Dashboard shell with summary cards and a
  work-queue empty state, ready for Phase 1+ data.
- Created all required markdown tracking files: `README.md`,
  `PROJECT_PLAN.md`, `PHASES.md`, `TASKS.md`, `CHANGELOG.md`,
  `DATA_MODEL.md`, `SECURITY_NOTES.md`, `API_ROUTES.md`, `USER_GUIDE.md`,
  `SUPABASE_SETUP.md`, `GOOGLE_CALENDAR_SETUP.md`, `DEMO_SCRIPT.md`.

### Files changed

- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`,
  `postcss.config.mjs` — project scaffolding
- `components.json` — shadcn-compatible config (manual setup)
- `src/lib/utils.ts` — `cn()` class-merge helper
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` — root
  layout, redirect to `/dashboard`, theme tokens
- `src/app/(app)/layout.tsx` and one `page.tsx` per nav item — shared shell
  + placeholder pages
- `src/components/ui/*` — button, card, badge, input, label, textarea,
  separator, table, dialog, sheet, dropdown-menu, select, tabs
- `src/components/layout/*` — `nav-items.ts`, `sidebar.tsx`, `topbar.tsx`,
  `mobile-nav.tsx`, `app-shell.tsx`
- `src/components/page-header.tsx`, `src/components/empty-state.tsx`,
  `src/components/placeholder-page.tsx`
- All 12 markdown tracking files (new)

### How to test this phase

```bash
npm install
npm run build   # confirms type-check + all 12 routes prerender
npm run lint     # no errors
npm run dev      # visit http://localhost:3000, confirm redirect to /dashboard
```

Manually verify:

- Visiting `/` redirects to `/dashboard`.
- The sidebar (desktop) and hamburger menu (mobile width) both link to all
  11 nav items and highlight the active page.
- Each nav page loads without error and shows a clear "this arrives in
  Phase N" empty state (Dashboard shows real summary card placeholders
  instead, since it is the most-used page).

### Known limitations

- No backend yet — no Supabase, no auth, no real data. All pages are static
  placeholders except the Dashboard's visual shell.
- No tests yet (no business logic exists yet to test).
- `npm audit` reports 2 moderate severity advisories in transitive
  dependencies from `create-next-app`'s default toolchain; not addressed
  in Phase 0 since they don't affect runtime security of this app and
  fixing them requires breaking changes upstream tools may not yet support.

### Next recommended step

Phase 1: Supabase setup and authentication — environment variables, Supabase
client, Supabase Auth login/logout, protected app shell, and the `firms` /
`profiles` tables (seeding the Berget Law firm record).
