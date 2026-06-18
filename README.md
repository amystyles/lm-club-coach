# LM Club Coach

Les Mills instructor development platform for Club Coaches and GFMs. Track instructor grades, run observations, manage development notes, and follow the Club Coach Path curriculum.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 10+
- A [Supabase](https://supabase.com/) project

## Local setup

1. **Install dependencies**

```bash
pnpm install
```

2. **Configure environment**

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL (Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_ADMIN_EMAIL` | Email allowed to create coach accounts via **Add Coach** |

3. **Apply database migrations**

In the Supabase SQL editor (or via Supabase CLI), run in order:

- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_feature_completion.sql`
- `supabase/migrations/003_custom_sessions_and_notes_review.sql`
- `supabase/migrations/004_custom_sessions_session_data.sql`
- `supabase/migrations/005_handbook_tables.sql`
- `supabase/migrations/006_tap_ap_service.sql`

4. **Seed demo data (optional)**

```bash
# Run supabase/seed.sql in the SQL editor
```

5. **Deploy the admin edge function**

```bash
supabase functions deploy create-user
```

Set these secrets on the function:

- `ADMIN_EMAIL` — same value as `VITE_ADMIN_EMAIL`
- `SUPABASE_SERVICE_ROLE_KEY` — from Supabase Settings → API

6. **Start the dev server**

```bash
pnpm dev
```

Open http://localhost:5173

## First user

Accounts are admin-provisioned (no public sign-up). To create the first coach:

1. Create a user in Supabase Auth (Dashboard → Authentication → Users), or use the **Add Coach** screen after signing in as the admin email.
2. Link the user to a club via `user_clubs` if not created by the edge function.
3. Sign in with email + password.

## Production (Vercel)

1. Connect the GitHub repo to Vercel.
2. Set environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_EMAIL`.
3. Deploy from `main` — build command: `pnpm run build`, output: `dist`.

Live app: https://lm-club-coach.vercel.app

## Features

| Area | Status |
|------|--------|
| Login / password reset | Supabase Auth |
| Multi-club picker | `user_clubs` |
| Instructor roster + add | `instructors` table |
| Grade & trust assessments | `instructor_grades`, `trust_overrides` |
| Observations | Assessment Centre → New Observation |
| Development notes | Instructor profile |
| Session notes & coach path progress | `session_progress` |
| TAP AP enrollment & sign-off | `coach_path_enrollments`, `tap_coach_assignments` |
| TAP Coach dashboard | `TapCoachDashboard` |
| LMUS admin enrollment | `LmusAdminPanel` |
| Custom pathway sessions | `custom_sessions` |
| Admin: create coach + club | `create-user` edge function |

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm preview  # preview production build
pnpm lint     # ESLint
```

## Docs

- `docs/superpowers/specs/2026-04-26-supabase-integration-design.md` — auth & schema design
- `docs/superpowers/plans/` — feature implementation plans
