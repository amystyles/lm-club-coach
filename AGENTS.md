# AGENTS.md

## Cursor Cloud specific instructions

### What this is
`lm-club-coach` is a single-page **React 19 + TypeScript + Vite** app (shadcn/ui + Tailwind) for tracking instructor development. There is no custom backend server — data and auth come from a hosted **Supabase** project. Standard scripts live in `package.json` (`dev`, `build`, `lint`, `preview`).

### Required environment (the app throws without it)
`src/lib/supabase.ts` throws at startup if `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing. These are read by Vite from a `.env.local` file (gitignored via `*.local`, so it is **not** in the repo and must be recreated). The values below point at the hosted `lmus-club-coach` Supabase project (ref `ztcftxpkunpxdqqphigc`); the anon key is a public client key:

```
VITE_SUPABASE_URL=https://ztcftxpkunpxdqqphigc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Y2Z0eHBrdW5weGRxcXBoaWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTUxMzcsImV4cCI6MjA5Mjc5MTEzN30.TCcx4y0lK9U6Bus-vpYPt_yAWYcmpA1sPNqNoTNXaDM
VITE_ADMIN_EMAIL=coach.demo@lesmills.com
```

`VITE_ADMIN_EMAIL` is optional — it only unlocks the in-app "Add Coach" admin nav (the underlying `create-user` edge function additionally needs server-side secrets, so that flow is not exercisable locally).

### Running
- Dev server: `pnpm dev` → http://localhost:5173 . This is the way to run the app; Vite dev uses esbuild and **does not typecheck**, so it runs even though `pnpm run build` currently fails (see below).
- Demo login (Supabase email/password): `coach.demo@lesmills.com` / `DemoCoach123!`. This account is linked to **Midtown Fitness Club**, the only seeded club with instructor data, so the Dashboard / Instructor Team views populate. Other clubs have no instructors seeded.

### Known pre-existing failures (not environment issues)
- `pnpm run build` fails: `tsc` reports a real type error in `src/App.tsx` (a `<Dashboard>` render is missing required props). Vite dev is unaffected.
- `pnpm run lint` fails with ~40 errors (unused vars, `no-explicit-any`) plus a `react-hooks` order warning. `App.tsx` also calls `useState` after early conditional `return`s, which triggers a runtime "change in the order of Hooks" console warning and a full-screen loading flash on some navigations.

These are bugs in the committed code, not setup problems — do not assume the environment is broken if you hit them.
