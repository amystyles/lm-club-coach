-- TAP AP service: roles, enrollment, assignments, sign-offs, session status

alter table public.profiles
  add column if not exists app_role text not null default 'club_coach'
    check (app_role in ('club_coach', 'gfm', 'tap_coach', 'lmus_admin'));

-- Club members can list co-members (GFM team oversight)
create policy "club members can read co-member user_clubs"
  on public.user_clubs for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

create table if not exists public.coach_path_enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  club_id uuid references public.clubs(id) on delete cascade not null,
  enrolled_by uuid references public.profiles(id) not null,
  enrolled_at timestamptz not null default now(),
  status text not null default 'active'
    check (status in ('active', 'paused', 'completed', 'withdrawn')),
  unique (user_id, club_id)
);

create table if not exists public.tap_coach_assignments (
  id uuid default uuid_generate_v4() primary key,
  enrollment_id uuid references public.coach_path_enrollments(id) on delete cascade not null unique,
  tap_coach_user_id uuid references public.profiles(id) on delete cascade not null,
  assigned_by uuid references public.profiles(id) not null,
  assigned_at timestamptz not null default now(),
  active boolean not null default true
);

create table if not exists public.coach_path_stage_signoffs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  club_id uuid references public.clubs(id) on delete cascade not null,
  stage_number int not null check (stage_number between 1 and 5),
  signed_off_by uuid references public.profiles(id) not null,
  signed_off_at timestamptz not null default now(),
  unique (user_id, club_id, stage_number)
);

alter table public.session_progress
  add column if not exists completion_status text not null default 'not_started'
    check (completion_status in ('not_started', 'prepped', 'tap_confirmed')),
  add column if not exists tap_feedback text not null default '',
  add column if not exists tap_feedback_at timestamptz,
  add column if not exists tap_feedback_by uuid references public.profiles(id);

update public.session_progress
  set completion_status = 'tap_confirmed'
  where completed = true and completion_status = 'not_started';

alter table public.coach_path_enrollments enable row level security;
alter table public.tap_coach_assignments enable row level security;
alter table public.coach_path_stage_signoffs enable row level security;

create or replace function public.is_lmus_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and app_role = 'lmus_admin'
  );
$$;

create or replace function public.tap_assigned_enrollment_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select t.enrollment_id
  from public.tap_coach_assignments t
  where t.tap_coach_user_id = auth.uid() and t.active;
$$;

create or replace function public.tap_assigned_club_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select distinct e.club_id
  from public.coach_path_enrollments e
  join public.tap_coach_assignments t on t.enrollment_id = e.id
  where t.tap_coach_user_id = auth.uid() and t.active and e.status = 'active';
$$;

-- coach_path_enrollments policies
create policy "users read own enrollment"
  on public.coach_path_enrollments for select using (user_id = auth.uid());

create policy "club members read club enrollments"
  on public.coach_path_enrollments for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

create policy "tap reads assigned enrollments"
  on public.coach_path_enrollments for select using (
    id in (select public.tap_assigned_enrollment_ids())
  );

create policy "lmus admin manage enrollments"
  on public.coach_path_enrollments for all using (public.is_lmus_admin())
  with check (public.is_lmus_admin());

-- tap_coach_assignments policies
create policy "tap reads own assignments"
  on public.tap_coach_assignments for select using (tap_coach_user_id = auth.uid());

create policy "club members read tap assignments"
  on public.tap_coach_assignments for select using (
    enrollment_id in (
      select e.id from public.coach_path_enrollments e
      where e.club_id in (select club_id from public.user_clubs where user_id = auth.uid())
    )
  );

create policy "lmus admin manage tap assignments"
  on public.tap_coach_assignments for all using (public.is_lmus_admin())
  with check (public.is_lmus_admin());

-- stage signoffs policies
create policy "users read own stage signoffs"
  on public.coach_path_stage_signoffs for select using (user_id = auth.uid());

create policy "club members read club stage signoffs"
  on public.coach_path_stage_signoffs for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

create policy "tap insert assigned stage signoffs"
  on public.coach_path_stage_signoffs for insert with check (
    exists (
      select 1 from public.coach_path_enrollments e
      join public.tap_coach_assignments t on t.enrollment_id = e.id
      where e.user_id = coach_path_stage_signoffs.user_id
        and e.club_id = coach_path_stage_signoffs.club_id
        and t.tap_coach_user_id = auth.uid()
        and t.active
    )
    and signed_off_by = auth.uid()
  );

create policy "tap read assigned stage signoffs"
  on public.coach_path_stage_signoffs for select using (
    club_id in (select public.tap_assigned_club_ids())
  );

-- TAP session_progress: read + update assigned coaches
create policy "tap reads assigned coach session_progress"
  on public.session_progress for select using (
    exists (
      select 1 from public.coach_path_enrollments e
      join public.tap_coach_assignments t on t.enrollment_id = e.id
      where e.user_id = session_progress.user_id
        and e.club_id = session_progress.club_id
        and t.tap_coach_user_id = auth.uid()
        and t.active
    )
  );

create policy "tap updates assigned coach session_progress"
  on public.session_progress for update using (
    exists (
      select 1 from public.coach_path_enrollments e
      join public.tap_coach_assignments t on t.enrollment_id = e.id
      where e.user_id = session_progress.user_id
        and e.club_id = session_progress.club_id
        and t.tap_coach_user_id = auth.uid()
        and t.active
    )
  );

-- TAP read assessments and development notes in assigned clubs
create policy "tap reads assigned club assessments"
  on public.assessments for select using (
    club_id in (select public.tap_assigned_club_ids())
  );

create policy "tap reads assigned club development_notes"
  on public.development_notes for select using (
    club_id in (select public.tap_assigned_club_ids())
  );

-- TAP can insert session_progress for assigned coaches (first sign-off)
create policy "tap inserts assigned coach session_progress"
  on public.session_progress for insert with check (
    exists (
      select 1 from public.coach_path_enrollments e
      join public.tap_coach_assignments t on t.enrollment_id = e.id
      where e.user_id = session_progress.user_id
        and e.club_id = session_progress.club_id
        and t.tap_coach_user_id = auth.uid()
        and t.active
    )
  );

create policy "tap reads assigned club instructors"
  on public.instructors for select using (
    club_id in (select public.tap_assigned_club_ids())
  );
