# Supabase Integration — Design Spec
**Date:** 2026-04-26  
**Project:** LM Club Coach  
**Status:** Approved

---

## Overview

Add Supabase-backed authentication and real data persistence to the Club Coach app, replacing mock data and enabling the app to scale across multiple clubs and users. Users (Club Coaches and GFMs) share identical permissions and features — the only difference between the two is a display title.

---

## Auth

- **Provider:** Supabase Auth, email + password
- **Login screen** renders before the app shell; no authenticated content is accessible until login succeeds
- On successful auth, the app fetches the user's club memberships from `user_clubs`
- If the user belongs to **one club**, load that club directly into the dashboard
- If the user belongs to **multiple clubs**, show a club picker modal/screen before loading the dashboard
- Session is persisted via Supabase's built-in session management (localStorage); on page reload the user is not re-prompted for login if their session is valid

---

## Database Schema

All tables live in the Supabase `public` schema with RLS enabled.

### `profiles`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | FK → auth.users.id |
| name | text | Full display name |
| initials | text | 2–3 char display |
| email | text | |
| title | text | `'Club Coach'` or `'GFM'` — display only |
| created_at | timestamptz | |

### `clubs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| name | text | |
| region | text | |
| deployment_path | text | `'A'`, `'B'`, or `'C'` |
| gfm_name | text | |
| created_at | timestamptz | |

### `user_clubs`
| Column | Type | Notes |
|--------|------|-------|
| user_id | uuid | FK → profiles.id |
| club_id | uuid | FK → clubs.id |
| created_at | timestamptz | |

Primary key: `(user_id, club_id)`

### `instructors`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| club_id | uuid | FK → clubs.id |
| name | text | |
| initials | text | |
| stage | int | 1–6 |
| lmq_level | int | 1–10 |
| priority_element | text | |
| mentor_id | uuid | nullable, FK → instructors.id |
| join_date | date | |
| last_assessment | date | |
| next_assessment | date | nullable |
| risk_level | text | `'low'`, `'medium'`, `'high'` |
| cert_date | date | nullable |
| goals | text[] | |
| created_at | timestamptz | |

### `instructor_programs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| instructor_id | uuid | FK → instructors.id |
| name | text | Program name |
| lmq_level | int | 1–10 |

### `instructor_grades`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| instructor_id | uuid | FK → instructors.id |
| element | text | `choreography`, `technique`, `coaching`, `connection`, `performance` |
| grade | int | 1–3 |
| notes | text | nullable |
| last_assessed | date | nullable |

### `assessments`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| club_id | uuid | FK → clubs.id |
| instructor_id | uuid | FK → instructors.id |
| assessor_id | uuid | FK → profiles.id |
| date | date | |
| program | text | |
| type | text | `'observation'`, `'certification'`, `'grade-review'`, `'quarterly'` |
| overall_level | int | |
| feedback | text | |
| recommendations | text[] | |
| status | text | `'scheduled'`, `'completed'`, `'draft'` |
| created_at | timestamptz | |

### `development_notes`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | |
| club_id | uuid | FK → clubs.id |
| instructor_id | uuid | FK → instructors.id |
| author_id | uuid | FK → profiles.id |
| date | date | |
| key_element | text | |
| observation | text | |
| recommendation | text | |
| follow_up | text | nullable |
| grade | int | nullable |
| created_at | timestamptz | |

---

## Row Level Security

All data tables are protected by RLS. Users may only read/write rows where the `club_id` is in their `user_clubs` membership.

**Policy pattern (read):**
```sql
CREATE POLICY "club members can read"
ON instructors FOR SELECT
USING (
  club_id IN (
    SELECT club_id FROM user_clubs WHERE user_id = auth.uid()
  )
);
```

Same pattern applies to `assessments` and `development_notes`. Write policies (INSERT, UPDATE, DELETE) use the same `club_id` check.

`profiles` and `clubs` are readable by any authenticated user; `user_clubs` is readable only by the owning user.

---

## App-Level Changes

### New files
- `src/lib/supabase.ts` — Supabase client (singleton)
- `src/lib/auth.ts` — login, logout, session helpers
- `src/context/AuthContext.tsx` — React context providing `user`, `profile`, `activeClub`, `clubs`
- `src/pages/Login.tsx` — email/password login form
- `src/pages/ClubPicker.tsx` — shown when user has multiple clubs
- `src/hooks/useInstructors.ts` — replaces mock instructor data with Supabase query
- `src/hooks/useAssessments.ts` — replaces mock assessment data

### Modified files
- `src/App.tsx` — wrap with `AuthProvider`; render `<Login>` if unauthenticated, `<ClubPicker>` if no active club selected, otherwise render existing app shell
- `src/data/mock-data.ts` — retained as seed data and local fallback during development

### No changes to
- Existing page components (Dashboard, TeamRoster, etc.) — they receive data via hooks, not directly from mock-data
- Types in `src/data/types.ts` — schema maps directly to existing interfaces

---

## Seed Data

Existing mock data is used to seed the database during initial setup. A seed script (`supabase/seed.sql` or a one-time admin import) populates one or two clubs with current mock instructors so the app is usable immediately after migration.

---

## Out of Scope

- Instructor login / instructor-facing portal (deferred)
- Email invites / user onboarding flow (admin creates users manually in Supabase dashboard for now)
- Real-time subscriptions (standard fetch on load is sufficient)
- Password reset / magic link (can be added later via Supabase dashboard settings)
