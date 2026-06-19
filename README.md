# Berget Law Entity Manager

An internal tool for Berget Law to manage its registered agent practice: which
business entities it represents, when their annual reports and compliance
deadlines are due, whether clients have been billed and paid, and where the
related documents and correspondence live.

This is **not** a public SaaS product. It is built for one firm
(Berget Law), with no client portal and no public registration. Staff and
attorneys log in with firm-issued accounts only.

## Why this exists

Registered agent work is deadline-driven and detail-heavy. A missed annual
report can mean a client's entity gets administratively dissolved. This tool
exists to give the firm one source of truth for:

- Which entities are active, and who is responsible for them
- When each entity's annual report or compliance task is due
- Whether the client has confirmed information, been billed, and paid
- Where the supporting documents and communications live
- What to do today (the daily work queue)

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui-style components (hand-installed, see note below) |
| Backend / DB | Supabase (Postgres, Auth, Storage) |
| Calendar | Google Calendar API (Outlook/Microsoft Graph planned for later) |
| Document generation | Template-based DOCX/PDF (later phase) |
| AI features | Optional, later phase only |

> **Note on shadcn/ui:** the `ui.shadcn.com` registry was not reachable from
> this build environment, so the component primitives in
> `src/components/ui` were hand-written to match the standard shadcn/ui
> "new-york" style and API. They are drop-in compatible with the shadcn CLI
> if you want to add more components later (`npx shadcn@latest add <name>`)
> once you have registry access.

## Project status

This repo is being built in phases. See [`PHASES.md`](./PHASES.md) for the
full roadmap and [`TASKS.md`](./TASKS.md) for the MVP checklist. See
[`CHANGELOG.md`](./CHANGELOG.md) for what has shipped so far.

Currently complete: **Phase 0 — project setup and documentation.**

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000) and redirects
to `/dashboard`.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

### Environment variables

Not required yet for Phase 0 (no backend is connected). Phase 1 will add
Supabase environment variables — see [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
for the full list and setup steps once that phase lands.

## Live preview (GitHub Pages)

For early-phase reviewing only, this repo is configured to publish a
static export to GitHub Pages via `.github/workflows/deploy-pages.yml` on
every push to `main` or the current dev branch. Pages is enabled
(Source: "GitHub Actions"), and it is live at:

```
https://bergetson.github.io/Registered-Agent-Software/
```

**This only works while the app has no server-side features.** GitHub
Pages serves static files only — it cannot run Supabase Auth session
handling, API routes, server actions, or file uploads. `next.config.ts`
uses `output: "export"` to produce a static build. Once Phase 1
(authentication) needs real server-side logic, this static export will
need to be revisited — either by moving to a Node-capable host (e.g.
Vercel) or by keeping auth fully client-side. Until then, this is a
convenient way to click through the UI shell without running it locally.

## Project structure

```
src/
  app/
    page.tsx              # redirects to /dashboard
    layout.tsx             # root HTML layout, fonts
    (app)/                 # route group sharing the sidebar/topbar shell
      layout.tsx
      dashboard/
      entities/
      clients/
      annual-reports/
      tasks/
      billing/
      documents/
      calendar/
      reports/
      state-rules/
      settings/
  components/
    ui/                    # shadcn-style primitives (button, card, table, ...)
    layout/                # sidebar, topbar, mobile nav, app shell
    page-header.tsx
    empty-state.tsx
    placeholder-page.tsx
  lib/
    utils.ts                # cn() class merge helper
```

## Documentation index

| File | Purpose |
| --- | --- |
| `PROJECT_PLAN.md` | Goals, assumptions, scope, and architecture decisions |
| `PHASES.md` | Full phased build roadmap with status |
| `TASKS.md` | MVP checklist |
| `CHANGELOG.md` | What shipped in each phase |
| `DATA_MODEL.md` | Database schema and relationships |
| `SECURITY_NOTES.md` | Security model, RLS plan, data handling rules |
| `API_ROUTES.md` | API route inventory |
| `USER_GUIDE.md` | How staff/attorneys use the app |
| `SUPABASE_SETUP.md` | How to stand up the Supabase project |
| `GOOGLE_CALENDAR_SETUP.md` | How to configure Google Calendar integration |
| `DEMO_SCRIPT.md` | Step-by-step internal demo script |
