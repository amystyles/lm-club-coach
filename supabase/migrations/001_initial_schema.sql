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
