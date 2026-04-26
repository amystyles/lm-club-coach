# Supabase Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Supabase auth and real data persistence to the Club Coach app, replacing mock instructor/assessment data so the app scales across multiple clubs and users.

**Architecture:** A Supabase client singleton is initialized once in `src/lib/supabase.ts`. An `AuthContext` wraps the app and resolves auth state on load — it renders `<Login>` if unauthenticated, `<ClubPicker>` if the user has multiple clubs and hasn't selected one, then the existing app shell. Data hooks (`useInstructors`, `useAssessments`) replace the direct mock-data imports in the three pages that use live data. Static lookup data (STAGE_DATA, KEY_ELEMENT_LABELS, LM_PROGRAMS, GRADE_LABELS) stays in mock-data.ts.

**Tech Stack:** React 19, TypeScript, Vite, @supabase/supabase-js, react-hook-form, zod, shadcn/ui (already installed)

---

## File Map

**Create:**
- `src/lib/supabase.ts` — Supabase client singleton
- `src/lib/auth.ts` — signIn, signOut, getSession wrappers
- `src/context/AuthContext.tsx` — auth state, profile, clubs, activeClub
- `src/pages/Login.tsx` — email + password form
- `src/pages/ClubPicker.tsx` — multi-club selector (shown when user has > 1 club)
- `src/hooks/useInstructors.ts` — fetches instructors for activeClub
- `src/hooks/useAssessments.ts` — fetches assessments for activeClub
- `supabase/migrations/001_initial_schema.sql` — full DDL + RLS
- `supabase/seed.sql` — mock data as SQL inserts
- `.env.local` — Supabase URL + anon key (never committed)
- `.env.example` — template for env vars (committed)

**Modify:**
- `src/App.tsx` — wrap with AuthProvider, add auth gate
- `src/pages/Dashboard.tsx` — swap mock imports for `useInstructors` + `useAssessments`
- `src/pages/TeamRoster.tsx` — swap `instructors` mock import for `useInstructors`
- `src/pages/AssessmentCenter.tsx` — swap mock imports for both hooks

---

## Task 1: Install @supabase/supabase-js and create env files

**Files:**
- Modify: `package.json` (via pnpm)
- Create: `.env.local`
- Create: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Install the Supabase JS client**

```bash
cd /Users/amy.styles/lm-club-coach
pnpm add @supabase/supabase-js
```

Expected: `@supabase/supabase-js` appears in `dependencies` in package.json.

- [ ] **Step 2: Create `.env.local` with your Supabase credentials**

Get these from your Supabase project dashboard → Settings → API.

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

- [ ] **Step 3: Create `.env.example` (safe to commit)**

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

- [ ] **Step 4: Ensure `.env.local` is gitignored**

Open `.gitignore` and confirm `.env.local` is listed. If not, add it:
```
.env.local
```

- [ ] **Step 5: Commit**

```bash
git add .env.example .gitignore package.json pnpm-lock.yaml
git commit -m "feat: install @supabase/supabase-js"
```

---

## Task 2: Create Supabase client singleton

**Files:**
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Create `src/lib/supabase.ts`**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 2: Verify the app still starts**

```bash
pnpm dev
```

Expected: No console errors. The throw will only fire if env vars are missing.

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat: add Supabase client singleton"
```

---

## Task 3: Create auth helpers

**Files:**
- Create: `src/lib/auth.ts`

- [ ] **Step 1: Create `src/lib/auth.ts`**

```typescript
import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat: add auth helpers (signIn, signOut, getSession)"
```

---

## Task 4: Create database schema (run in Supabase SQL editor)

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

This SQL is run once in your Supabase project → SQL editor. It creates all tables, RLS policies, and a trigger to auto-create profiles on user signup.

- [ ] **Step 1: Create `supabase/migrations/001_initial_schema.sql`**

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── Tables ───────────────────────────────────────────────────────────────────

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  initials text not null,
  email text not null,
  title text not null check (title in ('Club Coach', 'GFM')),
  created_at timestamptz default now()
);

create table public.clubs (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  region text not null,
  deployment_path text not null check (deployment_path in ('A', 'B', 'C')),
  gfm_name text not null,
  created_at timestamptz default now()
);

create table public.user_clubs (
  user_id uuid references public.profiles(id) on delete cascade,
  club_id uuid references public.clubs(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, club_id)
);

create table public.instructors (
  id uuid default uuid_generate_v4() primary key,
  club_id uuid references public.clubs(id) on delete cascade not null,
  name text not null,
  initials text not null,
  stage int not null check (stage between 1 and 6),
  lmq_level int not null check (lmq_level between 1 and 10),
  priority_element text not null check (priority_element in ('choreography','technique','coaching','connection','performance')),
  mentor_id uuid references public.instructors(id),
  join_date date not null,
  last_assessment date,
  next_assessment date,
  risk_level text not null check (risk_level in ('low','medium','high')),
  cert_date date,
  goals text[] default '{}',
  created_at timestamptz default now()
);

create table public.instructor_programs (
  id uuid default uuid_generate_v4() primary key,
  instructor_id uuid references public.instructors(id) on delete cascade not null,
  name text not null,
  lmq_level int not null check (lmq_level between 1 and 10)
);

create table public.instructor_grades (
  id uuid default uuid_generate_v4() primary key,
  instructor_id uuid references public.instructors(id) on delete cascade not null,
  element text not null check (element in ('choreography','technique','coaching','connection','performance')),
  grade int not null check (grade between 1 and 3),
  notes text,
  last_assessed date
);

create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  club_id uuid references public.clubs(id) on delete cascade not null,
  instructor_id uuid references public.instructors(id) on delete cascade not null,
  assessor_id uuid references public.profiles(id) not null,
  date date not null,
  program text not null,
  type text not null check (type in ('observation','certification','grade-review','quarterly')),
  grades jsonb default '[]',
  overall_level int not null check (overall_level between 1 and 10),
  feedback text default '',
  recommendations text[] default '{}',
  status text not null check (status in ('scheduled','completed','draft')),
  created_at timestamptz default now()
);

create table public.development_notes (
  id uuid default uuid_generate_v4() primary key,
  club_id uuid references public.clubs(id) on delete cascade not null,
  instructor_id uuid references public.instructors(id) on delete cascade not null,
  author_id uuid references public.profiles(id) not null,
  date date not null,
  key_element text not null check (key_element in ('choreography','technique','coaching','connection','performance')),
  observation text not null,
  recommendation text not null,
  follow_up text,
  grade int check (grade between 1 and 3),
  created_at timestamptz default now()
);

-- ─── Auto-create profile on signup ────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, initials, email, title)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.email),
    coalesce(new.raw_user_meta_data->>'initials', upper(substring(new.email, 1, 2))),
    new.email,
    coalesce(new.raw_user_meta_data->>'title', 'Club Coach')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Row Level Security ────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.clubs enable row level security;
alter table public.user_clubs enable row level security;
alter table public.instructors enable row level security;
alter table public.instructor_programs enable row level security;
alter table public.instructor_grades enable row level security;
alter table public.assessments enable row level security;
alter table public.development_notes enable row level security;

-- profiles: any authenticated user can read; only owner can update
create policy "authenticated users can read profiles"
  on public.profiles for select using (auth.role() = 'authenticated');
create policy "users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- clubs: readable by members only
create policy "club members can read clubs"
  on public.clubs for select using (
    id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

-- user_clubs: readable by the owning user only
create policy "users can read own club memberships"
  on public.user_clubs for select using (user_id = auth.uid());

-- instructors: full CRUD for club members
create policy "club members can read instructors"
  on public.instructors for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can insert instructors"
  on public.instructors for insert with check (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can update instructors"
  on public.instructors for update using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

-- instructor_programs: via club membership
create policy "club members can read instructor_programs"
  on public.instructor_programs for select using (
    instructor_id in (
      select id from public.instructors
      where club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );
create policy "club members can insert instructor_programs"
  on public.instructor_programs for insert with check (
    instructor_id in (
      select id from public.instructors
      where club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );

-- instructor_grades: via club membership
create policy "club members can read instructor_grades"
  on public.instructor_grades for select using (
    instructor_id in (
      select id from public.instructors
      where club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );
create policy "club members can insert instructor_grades"
  on public.instructor_grades for insert with check (
    instructor_id in (
      select id from public.instructors
      where club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );
create policy "club members can update instructor_grades"
  on public.instructor_grades for update using (
    instructor_id in (
      select id from public.instructors
      where club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );

-- assessments: full CRUD for club members
create policy "club members can read assessments"
  on public.assessments for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can insert assessments"
  on public.assessments for insert with check (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can update assessments"
  on public.assessments for update using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

-- development_notes: full CRUD for club members
create policy "club members can read development_notes"
  on public.development_notes for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can insert development_notes"
  on public.development_notes for insert with check (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
create policy "club members can update development_notes"
  on public.development_notes for update using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
```

- [ ] **Step 2: Run it in Supabase**

Go to your Supabase project → SQL editor → paste the full SQL above → Run.

Expected: All tables appear in Table Editor. No errors.

- [ ] **Step 3: Commit the migration file**

```bash
mkdir -p supabase/migrations
git add supabase/migrations/001_initial_schema.sql
git commit -m "feat: add Supabase schema, RLS, and profile trigger"
```

---

## Task 5: Seed mock data into Supabase

**Files:**
- Create: `supabase/seed.sql`

- [ ] **Step 1: Create `supabase/seed.sql`**

```sql
-- Seed clubs (fixed UUIDs so they can be referenced)
insert into public.clubs (id, name, region, deployment_path, gfm_name) values
  ('11111111-0000-0000-0000-000000000001', 'Midtown Fitness Club',      'Northeast', 'B', 'Sarah Mitchell'),
  ('11111111-0000-0000-0000-000000000002', 'Westside Athletic Center',  'West',      'A', 'Marcus Chen'),
  ('11111111-0000-0000-0000-000000000003', 'Downtown Performance Gym',  'South',     'C', 'Elena Rodriguez')
on conflict (id) do nothing;

-- Seed instructors for Midtown (club 1)
insert into public.instructors (id, club_id, name, initials, stage, lmq_level, priority_element, join_date, last_assessment, next_assessment, risk_level, cert_date, goals) values
  ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'Jordan Silva',   'JS', 4, 3,  'connection',   '2024-06-15', '2026-02-12', '2026-05-12', 'low',    '2024-09-20', ARRAY['Achieve Connection Grade 2 by Q2', 'Use participant names genuinely 3x per class', 'Begin Look, See & Respond practice']),
  ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'Mia Thompson',  'MT', 2, 1,  'choreography', '2026-01-10', '2026-03-01', null,          'medium', null,         ARRAY['Complete IMT within 2 weeks', 'Submit certification video by Day 30', 'Achieve Choreography Grade 1 consistently']),
  ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'Alex Rivera',   'AR', 6, 7,  'coaching',     '2021-03-20', '2026-01-15', '2026-04-15', 'low',    '2021-06-01', ARRAY['Achieve Coaching Grade 3', 'Begin Presenter pathway', 'Mentor 1 new instructor this quarter']),
  ('22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', 'Priya Patel',   'PP', 3, 2,  'technique',    '2025-08-01', '2025-12-10', '2026-03-10', 'low',    '2025-11-15', ARRAY['Secure regular timetable slot within 8 weeks', 'Team-teach 3 classes with mentor', 'Build Technique to G2']),
  ('22222222-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000001', 'Marcus Johnson','MJ', 4, 5,  'performance',  '2023-01-15', '2026-02-28', '2026-05-28', 'low',    '2023-04-20', ARRAY['Achieve Performance Grade 2', 'Work on dramatic contrast', 'Master team-teaching with music']),
  ('22222222-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001', 'Kayla Wright',  'KW', 4, 4,  'coaching',     '2023-09-01', '2026-01-20', '2026-04-20', 'medium', '2023-12-01', ARRAY['Build Layer 2 coaching consistency', 'Achieve Coaching G2 by next quarter', 'Add ≥2 L2 cues per track']),
  ('22222222-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000001', 'David Kim',     'DK', 1, 1,  'choreography', '2026-03-01', null,          null,          'low',    null,         ARRAY['Complete all pre-work videos', 'Observe 4+ live BODYPUMP classes', 'Practice allocated track with mentor']),
  ('22222222-0000-0000-0000-000000000008', '11111111-0000-0000-0000-000000000001', 'Aisha Brown',   'AB', 6, 8,  'connection',   '2020-02-01', '2026-03-01', '2026-06-01', 'low',    '2020-05-15', ARRAY['Achieve Connection G3', 'Begin TAP Coach pathway', 'Mentor 2 instructors this quarter'])
on conflict (id) do nothing;

-- Instructor programs
insert into public.instructor_programs (instructor_id, name, lmq_level) values
  ('22222222-0000-0000-0000-000000000001', 'BODYPUMP',    3),
  ('22222222-0000-0000-0000-000000000001', 'BODYCOMBAT',  2),
  ('22222222-0000-0000-0000-000000000001', 'RPM',         1),
  ('22222222-0000-0000-0000-000000000002', 'BODYPUMP',    1),
  ('22222222-0000-0000-0000-000000000002', 'LES MILLS CORE', 1),
  ('22222222-0000-0000-0000-000000000003', 'BODYCOMBAT',  7),
  ('22222222-0000-0000-0000-000000000003', 'BODYATTACK',  5),
  ('22222222-0000-0000-0000-000000000003', 'BODYPUMP',    4),
  ('22222222-0000-0000-0000-000000000004', 'BODYBALANCE', 2),
  ('22222222-0000-0000-0000-000000000004', 'LES MILLS YOGA', 1),
  ('22222222-0000-0000-0000-000000000005', 'BODYPUMP',    5),
  ('22222222-0000-0000-0000-000000000005', 'RPM',         3),
  ('22222222-0000-0000-0000-000000000005', 'LES MILLS DANCE', 2),
  ('22222222-0000-0000-0000-000000000006', 'LES MILLS DANCE', 4),
  ('22222222-0000-0000-0000-000000000006', 'BODYJAM',     3),
  ('22222222-0000-0000-0000-000000000007', 'BODYPUMP',    1),
  ('22222222-0000-0000-0000-000000000008', 'BODYPUMP',    8),
  ('22222222-0000-0000-0000-000000000008', 'BODYCOMBAT',  6),
  ('22222222-0000-0000-0000-000000000008', 'BODYATTACK',  5);

-- Instructor grades
insert into public.instructor_grades (instructor_id, element, grade, last_assessed) values
  ('22222222-0000-0000-0000-000000000001', 'choreography', 2, '2026-02-12'),
  ('22222222-0000-0000-0000-000000000001', 'technique',    2, '2026-02-12'),
  ('22222222-0000-0000-0000-000000000001', 'coaching',     2, '2026-02-12'),
  ('22222222-0000-0000-0000-000000000001', 'connection',   1, '2026-02-12'),
  ('22222222-0000-0000-0000-000000000001', 'performance',  2, '2026-02-12'),
  ('22222222-0000-0000-0000-000000000002', 'choreography', 1, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000002', 'technique',    1, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000002', 'coaching',     1, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000003', 'choreography', 2, '2026-01-15'),
  ('22222222-0000-0000-0000-000000000003', 'technique',    3, '2026-01-15'),
  ('22222222-0000-0000-0000-000000000003', 'coaching',     2, '2026-01-15'),
  ('22222222-0000-0000-0000-000000000003', 'connection',   2, '2026-01-15'),
  ('22222222-0000-0000-0000-000000000003', 'performance',  2, '2026-01-15'),
  ('22222222-0000-0000-0000-000000000004', 'choreography', 2, '2025-12-10'),
  ('22222222-0000-0000-0000-000000000004', 'technique',    1, '2025-12-10'),
  ('22222222-0000-0000-0000-000000000004', 'coaching',     1, '2025-12-10'),
  ('22222222-0000-0000-0000-000000000004', 'connection',   1, '2025-12-10'),
  ('22222222-0000-0000-0000-000000000004', 'performance',  1, '2025-12-10'),
  ('22222222-0000-0000-0000-000000000005', 'choreography', 2, '2026-02-28'),
  ('22222222-0000-0000-0000-000000000005', 'technique',    2, '2026-02-28'),
  ('22222222-0000-0000-0000-000000000005', 'coaching',     2, '2026-02-28'),
  ('22222222-0000-0000-0000-000000000005', 'connection',   2, '2026-02-28'),
  ('22222222-0000-0000-0000-000000000005', 'performance',  1, '2026-02-28'),
  ('22222222-0000-0000-0000-000000000006', 'choreography', 2, '2026-01-20'),
  ('22222222-0000-0000-0000-000000000006', 'technique',    2, '2026-01-20'),
  ('22222222-0000-0000-0000-000000000006', 'coaching',     1, '2026-01-20'),
  ('22222222-0000-0000-0000-000000000006', 'connection',   2, '2026-01-20'),
  ('22222222-0000-0000-0000-000000000006', 'performance',  2, '2026-01-20'),
  ('22222222-0000-0000-0000-000000000007', 'choreography', 1, null),
  ('22222222-0000-0000-0000-000000000007', 'technique',    1, null),
  ('22222222-0000-0000-0000-000000000007', 'coaching',     1, null),
  ('22222222-0000-0000-0000-000000000008', 'choreography', 2, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000008', 'technique',    3, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000008', 'coaching',     3, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000008', 'connection',   2, '2026-03-01'),
  ('22222222-0000-0000-0000-000000000008', 'performance',  2, '2026-03-01');
```

- [ ] **Step 2: Run seed SQL in Supabase SQL editor**

Go to your Supabase project → SQL editor → paste seed.sql → Run.

Expected: 3 clubs, 8 instructors, programs, and grades visible in Table Editor.

- [ ] **Step 3: Create your user account**

In Supabase dashboard → Authentication → Users → Invite user.

Enter your email. In "User metadata" set:
```json
{
  "name": "Your Name",
  "initials": "YN",
  "title": "Club Coach"
}
```

The `handle_new_user` trigger auto-creates your profile row.

- [ ] **Step 4: Link your user to Midtown Fitness Club**

In Supabase SQL editor, replace the UUID with your actual user UUID (from Authentication → Users):

```sql
insert into public.user_clubs (user_id, club_id) values
  ('your-user-uuid-here', '11111111-0000-0000-0000-000000000001');
```

- [ ] **Step 5: Commit seed file**

```bash
git add supabase/seed.sql
git commit -m "feat: add seed data for mock clubs and instructors"
```

---

## Task 6: Create AuthContext

**Files:**
- Create: `src/context/AuthContext.tsx`

- [ ] **Step 1: Create `src/context/AuthContext.tsx`**

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Club } from '@/data/types';

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  title: 'Club Coach' | 'GFM';
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  clubs: Club[];
  activeClub: Club | null;
  setActiveClub: (club: Club) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data as UserProfile | null;
}

async function fetchClubs(userId: string): Promise<Club[]> {
  const { data } = await supabase
    .from('clubs')
    .select('*')
    .in('id', 
      (await supabase
        .from('user_clubs')
        .select('club_id')
        .eq('user_id', userId)
      ).data?.map((r: { club_id: string }) => r.club_id) ?? []
    );
  return (data ?? []).map((c: any) => ({
    id: c.id,
    name: c.name,
    region: c.region,
    deploymentPath: c.deployment_path,
    gfmName: c.gfm_name,
    instructorCount: 0,
    coachCount: 0,
  }));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeClub, setActiveClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      await hydrate(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await hydrate(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function hydrate(session: Session | null) {
    if (!session) {
      setUser(null);
      setProfile(null);
      setClubs([]);
      setActiveClub(null);
      return;
    }
    setUser(session.user);
    const [p, c] = await Promise.all([
      fetchProfile(session.user.id),
      fetchClubs(session.user.id),
    ]);
    setProfile(p);
    setClubs(c);
    setActiveClub(prev => prev ?? (c.length === 1 ? c[0] : null));
  }

  return (
    <AuthContext.Provider value={{ user, profile, clubs, activeClub, setActiveClub, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/context/AuthContext.tsx
git commit -m "feat: add AuthContext with user, profile, clubs, activeClub"
```

---

## Task 7: Create Login page

**Files:**
- Create: `src/pages/Login.tsx`

- [ ] **Step 1: Create `src/pages/Login.tsx`**

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await signIn(values.email, values.password);
    } catch (err: any) {
      setError(err.message ?? 'Login failed. Check your email and password.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">LM Club Coach</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" {...register('password')} />
              {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Login.tsx
git commit -m "feat: add Login page with email/password form"
```

---

## Task 8: Create ClubPicker page

**Files:**
- Create: `src/pages/ClubPicker.tsx`

Shown only when a user has more than one club and hasn't selected one yet this session.

- [ ] **Step 1: Create `src/pages/ClubPicker.tsx`**

```typescript
import { signOut } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, LogOut } from 'lucide-react';

export default function ClubPicker() {
  const { clubs, setActiveClub, profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome, {profile?.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a club to continue</p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => setActiveClub(club)}
            className="w-full text-left"
          >
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.region} · Path {club.deploymentPath}</p>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={signOut} className="gap-2 text-muted-foreground">
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ClubPicker.tsx
git commit -m "feat: add ClubPicker page for multi-club users"
```

---

## Task 9: Wire auth gate into App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Wrap the app with AuthProvider in `src/main.tsx`**

Open `src/main.tsx`. It currently looks like:
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Change it to:
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
```

- [ ] **Step 2: Add auth gate to `src/App.tsx`**

Add these imports at the top of `src/App.tsx` (after existing imports):
```typescript
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ClubPicker from './pages/ClubPicker';
```

Replace the `function App()` opening (before `const [activePage`) with:
```typescript
function App() {
  const { user, clubs, activeClub, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading…</div>
      </div>
    );
  }

  if (!user) return <Login />;
  if (!activeClub && clubs.length > 1) return <ClubPicker />;

  const [activePage, setActivePage] = useState('dashboard');
```

- [ ] **Step 3: Verify the auth gate works**

Run `pnpm dev`. 

Expected: The app shows the Login page. Enter your credentials. After login, if you have one club it goes straight to the dashboard; if multiple clubs, the club picker shows first.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: add auth gate — Login and ClubPicker before app shell"
```

---

## Task 10: Create useInstructors hook

**Files:**
- Create: `src/hooks/useInstructors.ts`

- [ ] **Step 1: Create `src/hooks/useInstructors.ts`**

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import type { Instructor, Stage, LMQLevel, KeyElement, Grade } from '@/data/types';

function mapInstructor(row: any): Instructor {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    clubId: row.club_id,
    stage: row.stage as Stage,
    lmqLevel: row.lmq_level as LMQLevel,
    priorityElement: row.priority_element as KeyElement,
    mentorId: row.mentor_id ?? undefined,
    joinDate: row.join_date,
    lastAssessment: row.last_assessment ?? 'N/A',
    nextAssessment: row.next_assessment ?? undefined,
    riskLevel: row.risk_level as 'low' | 'medium' | 'high',
    certDate: row.cert_date ?? undefined,
    goals: row.goals ?? [],
    programs: (row.instructor_programs ?? []).map((p: any) => ({
      name: p.name,
      lmqLevel: p.lmq_level as LMQLevel,
    })),
    grades: (row.instructor_grades ?? []).map((g: any) => ({
      element: g.element as KeyElement,
      grade: g.grade as Grade,
      notes: g.notes ?? undefined,
      lastAssessed: g.last_assessed ?? undefined,
    })),
  };
}

export function useInstructors() {
  const { activeClub } = useAuth();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeClub) return;
    setLoading(true);

    supabase
      .from('instructors')
      .select(`*, instructor_programs(*), instructor_grades(*)`)
      .eq('club_id', activeClub.id)
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          setInstructors((data ?? []).map(mapInstructor));
        }
        setLoading(false);
      });
  }, [activeClub?.id]);

  return { instructors, loading, error };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useInstructors.ts
git commit -m "feat: add useInstructors hook (Supabase query + type mapping)"
```

---

## Task 11: Create useAssessments hook

**Files:**
- Create: `src/hooks/useAssessments.ts`

- [ ] **Step 1: Create `src/hooks/useAssessments.ts`**

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import type { Assessment, KeyElement, Grade, LMQLevel } from '@/data/types';

function mapAssessment(row: any): Assessment {
  return {
    id: row.id,
    instructorId: row.instructor_id,
    assessorId: row.assessor_id,
    assessorRole: 'coach',
    date: row.date,
    program: row.program,
    type: row.type as Assessment['type'],
    grades: (row.grades ?? []).map((g: any) => ({
      element: g.element as KeyElement,
      grade: g.grade as Grade,
    })),
    overallLevel: row.overall_level as LMQLevel,
    feedback: row.feedback ?? '',
    recommendations: row.recommendations ?? [],
    status: row.status as Assessment['status'],
  };
}

export function useAssessments() {
  const { activeClub } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeClub) return;
    setLoading(true);

    supabase
      .from('assessments')
      .select('*')
      .eq('club_id', activeClub.id)
      .order('date', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          setAssessments((data ?? []).map(mapAssessment));
        }
        setLoading(false);
      });
  }, [activeClub?.id]);

  return { assessments, loading, error };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useAssessments.ts
git commit -m "feat: add useAssessments hook"
```

---

## Task 12: Update Dashboard to use hooks

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Replace mock data imports with hooks**

In `src/pages/Dashboard.tsx`, find this line:
```typescript
import { instructors, assessments, STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
```

Replace with:
```typescript
import { STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { useInstructors } from '@/hooks/useInstructors';
import { useAssessments } from '@/hooks/useAssessments';
```

- [ ] **Step 2: Call the hooks inside the component**

In the `Dashboard` component body, add at the top (before any existing logic):
```typescript
const { instructors, loading } = useInstructors();
const { assessments } = useAssessments();
```

- [ ] **Step 3: Add loading guard**

After the hook calls, add:
```typescript
if (loading) {
  return <div className="p-8 text-muted-foreground text-sm">Loading instructors…</div>;
}
```

- [ ] **Step 4: Verify the dashboard loads with real data**

With the dev server running, log in and check the Dashboard. The 8 seeded instructors should appear. No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Dashboard.tsx
git commit -m "feat: connect Dashboard to Supabase via useInstructors and useAssessments"
```

---

## Task 13: Update TeamRoster to use hooks

**Files:**
- Modify: `src/pages/TeamRoster.tsx`

- [ ] **Step 1: Replace mock data imports**

In `src/pages/TeamRoster.tsx`, find:
```typescript
import {
  instructors,
  STAGE_DATA,
  KEY_ELEMENT_LABELS,
  LM_PROGRAMS,
} from '@/data/mock-data';
```

Replace with:
```typescript
import { STAGE_DATA, KEY_ELEMENT_LABELS, LM_PROGRAMS } from '@/data/mock-data';
import { useInstructors } from '@/hooks/useInstructors';
```

- [ ] **Step 2: Call the hook and add loading guard**

In the `TeamRoster` component body, add at the top:
```typescript
const { instructors, loading } = useInstructors();

if (loading) {
  return <div className="p-8 text-muted-foreground text-sm">Loading roster…</div>;
}
```

- [ ] **Step 3: Verify**

Navigate to "Instructor Team" in the app. All 8 seeded instructors should appear. Filters should work as before.

- [ ] **Step 4: Commit**

```bash
git add src/pages/TeamRoster.tsx
git commit -m "feat: connect TeamRoster to Supabase via useInstructors"
```

---

## Task 14: Update AssessmentCenter to use hooks

**Files:**
- Modify: `src/pages/AssessmentCenter.tsx`

- [ ] **Step 1: Replace mock data imports**

In `src/pages/AssessmentCenter.tsx`, find:
```typescript
import { assessments, instructors, LM_PROGRAMS, KEY_ELEMENT_LABELS } from '@/data/mock-data';
```

Replace with:
```typescript
import { LM_PROGRAMS, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { useInstructors } from '@/hooks/useInstructors';
import { useAssessments } from '@/hooks/useAssessments';
```

- [ ] **Step 2: Call the hooks and add loading guard**

In the `AssessmentCenter` component body, add at the top:
```typescript
const { instructors, loading } = useInstructors();
const { assessments } = useAssessments();

if (loading) {
  return <div className="p-8 text-muted-foreground text-sm">Loading assessments…</div>;
}
```

- [ ] **Step 3: Verify**

Navigate to "Assessment Centre". Existing seeded assessments should appear. Creating a new assessment should write to Supabase (check Table Editor to confirm).

- [ ] **Step 4: Final smoke test**

Walk through the full app:
- [ ] Login works; bad credentials show an error
- [ ] Dashboard shows seeded instructors
- [ ] Instructor Team roster loads and filters work
- [ ] Assessment Centre shows seeded assessments
- [ ] Clicking an instructor opens their profile
- [ ] Page refresh keeps you logged in (session persisted)
- [ ] Sign out (add a sign-out button to the sidebar — see note below) returns to Login

> **Note on sign-out:** The Sidebar currently has a cosmetic role switcher. Replace it with a sign-out button calling `signOut()` from `@/lib/auth` — or add it to the TopBar. This is a small addition; pick whichever feels right.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AssessmentCenter.tsx
git commit -m "feat: connect AssessmentCenter to Supabase via hooks"
```

---

## Done

At this point the app:
- Requires login before showing any content
- Loads real instructor and assessment data from Supabase scoped to the user's club(s)
- Supports multiple clubs per user (GFM use case) via the ClubPicker
- Has full RLS — users can only see data for clubs they belong to
- Preserves sessions across page refreshes
