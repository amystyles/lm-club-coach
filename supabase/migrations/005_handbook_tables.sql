-- Program handbook resources (Vimeo links, IT activities) and page maps for pilot programs.
-- Verified against uploaded handbook MD exports (2026-06-17).

create table public.handbook_resources (
  program_code text primary key,
  it_data jsonb not null default '{}',
  source_handbook_release text,
  last_verified_at timestamptz,
  last_verified_by uuid references public.profiles(id),
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.handbook_pages (
  program_code text primary key references public.handbook_resources(program_code) on delete cascade,
  pages jsonb not null default '{}',
  source_handbook_release text,
  last_verified_at timestamptz,
  last_verified_by uuid references public.profiles(id),
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index handbook_pages_pages_gin on public.handbook_pages using gin (pages);

alter table public.handbook_resources enable row level security;
alter table public.handbook_pages enable row level security;

create policy "authenticated users can read handbook_resources"
  on public.handbook_resources for select
  using (auth.role() = 'authenticated');

create policy "authenticated users can read handbook_pages"
  on public.handbook_pages for select
  using (auth.role() = 'authenticated');

-- Seed pilot program handbook data
insert into public.handbook_resources (program_code, it_data, source_handbook_release, last_verified_at, version)
values
  ('BODYPUMP HEAVY', $json${"toolbox": "https://vimeo.com/showcase/11918816", "technique": [{"title": "BODYPUMP HEAVY Technique Foundations", "duration": ""}, {"title": "BODYPUMP HEAVY Strength Training Principles", "duration": ""}], "activities": {"COACHING": ["Coaching & Scripting Worksheets \u2014 script Layer 1, 2, 3 cues", "Strength education coaching \u2014 explaining progressive overload"], "TECHNIQUE": ["Heavy lifting technique \u2014 strength training principles, progressive overload", "Weight selection and role modelling", "Self-Film & Compare"], "CONNECTION": ["Connection Tools Reflection", "Facing Fear Tools", "C.R.C. (Connect, Recommend, Commend)", "Four Quadrants"], "PERFORMANCE": ["Music, Actions, Voice, Amplify & Commit framework", "Strength role modelling presence", "Empowering Beliefs"], "CHOREOGRAPHY": ["Choreography Notes Breakdown", "Allocated Track Preparation \u2014 practice alongside Masterclass video"]}, "postToolbox": "https://vimeo.com/showcase/11918817"}$json$::jsonb, null, '2026-06-17'::timestamptz, 1),
  ('LES MILLS SHAPES', $json${"toolbox": "https://vimeo.com/showcase/11758506", "technique": [{"title": "SHAPES Technique: Foundations", "duration": ""}, {"title": "SHAPES Technique: Strength Moves", "duration": ""}, {"title": "SHAPES Technique: Cardio Moves", "duration": ""}, {"title": "SHAPES Technique: Core Moves", "duration": ""}, {"title": "SHAPES Technique: Flexibility Moves", "duration": ""}, {"title": "SHAPES Technique: HIIT Moves", "duration": ""}], "activities": {"COACHING": ["Coaching & Scripting Worksheets", "Options and modifications coaching"], "TECHNIQUE": ["Shapes technique \u2014 strength, cardio, core, flexibility, HIIT", "Self-Film & Compare"], "CONNECTION": ["Connection Tools Reflection", "Facing Fear Tools", "C.R.C. (Connect, Recommend, Commend)"], "PERFORMANCE": ["Music, Actions, Voice, Amplify & Commit framework", "Empowering Beliefs"], "CHOREOGRAPHY": ["Choreography Notes Breakdown", "Allocated Track Preparation"]}, "postToolbox": null}$json$::jsonb, null, '2026-06-17'::timestamptz, 1),
  ('LES MILLS STRENGTH DEVELOPMENT', $json${"toolbox": "https://vimeo.com/showcase/11764360", "technique": [{"title": "Strength Development Technique: Foundations", "duration": ""}, {"title": "Strength Development Technique: Key Movements", "duration": ""}, {"title": "Strength Development Technique: Progressions", "duration": ""}, {"title": "Strength Development Technique: Equipment", "duration": ""}], "activities": {"COACHING": ["Coaching & Scripting Worksheets", "Strength education coaching"], "TECHNIQUE": ["Strength development technique \u2014 key movements, progressions, equipment", "Self-Film & Compare"], "CONNECTION": ["Connection Tools Reflection", "Facing Fear Tools", "C.R.C. (Connect, Recommend, Commend)"], "PERFORMANCE": ["Music, Actions, Voice, Amplify & Commit framework", "Empowering Beliefs"], "CHOREOGRAPHY": ["Choreography Notes Breakdown", "Allocated Track Preparation"]}, "postToolbox": null}$json$::jsonb, 'STRENGTH DEVELOPMENT IT Handbook 2025', '2026-06-17'::timestamptz, 1),
  ('THE TRIP', $json${"toolbox": "https://vimeo.com/showcase/10916685", "technique": [{"title": "Bike Setup", "duration": ""}, {"title": "House of Technique", "duration": ""}, {"title": "P.R.P \u2013 Position, Resistance, Pace", "duration": ""}], "activities": {"CHOREOGRAPHY": ["The Workout \u2014 complete Training Release Workout", "Choreography \u2014 match music and visuals to training variables", "Allocated Track Preparation"], "TECHNIQUE": ["Bike setup and P.R.P", "House of Technique positions", "Self-Film & Compare \u2014 allocated track review"], "COACHING": ["Coaching your sweet spot \u2014 Layer 1 & 2", "Plan and Script", "80/20 Simple Silent Filter"], "CONNECTION": ["Connection to Riders and Workout", "Athletic & Animated", "Adding Connection", "C.R.C. for allocated track"], "PERFORMANCE": ["Your Authentic Self", "Vocal Contrast", "External Objectives"]}, "postToolbox": null}$json$::jsonb, 'THE TRIP FINAL HANDBOOK 2023', '2026-06-17'::timestamptz, 1);

insert into public.handbook_pages (program_code, pages, source_handbook_release, last_verified_at, version)
values
  ('BODYPUMP HEAVY', $json${"C.R.C.": 21, "5 Voices": 25, "Four Quadrants": 21, "Compulsory Cues": 8, "Musical Mapping": 25, "Amplify & Commit": 26, "Teach One Person": 21, "Facing Fear Tools": 23, "Empowering Beliefs": 23, "Look, See & Respond": 21, "Self-Film & Compare": 4, "Music, Actions, Voice": 25, "Allocated Track Preparation": 4, "Connection Tools Reflection": 22, "Learning Check \u2014 Coaching": 15, "Choreography Notes Breakdown": 7, "Learning Check \u2014 Technique": 13, "Technique Practice Worksheets": 12, "Coaching & Scripting Worksheets": 16, "Learning Check \u2014 Choreography": 10}$json$::jsonb, null, '2026-06-17'::timestamptz, 1),
  ('LES MILLS SHAPES', $json${"C.R.C.": 58, "5 Voices": 25, "Musical Mapping": 25, "Facing Fear Tools": 23, "Empowering Beliefs": 26, "Self-Film & Compare": 4, "Music, Actions, Voice": 25, "Allocated Track Preparation": 4, "Connection Tools Reflection": 22, "Learning Check \u2014 Coaching": 15, "Choreography Notes Breakdown": 7, "Learning Check \u2014 Technique": 13, "Technique Practice Worksheets": 11, "Learning Check \u2014 Choreography": 9, "Four Quadrants": 58, "Coaching & Scripting Worksheets": 42, "Look, See & Respond": 58, "Teach One Person": 58}$json$::jsonb, null, '2026-06-17'::timestamptz, 1),
  ('LES MILLS STRENGTH DEVELOPMENT', $json${"C.R.C.": 27, "5 Voices": 31, "Compulsory Cues": 12, "Musical Mapping": 31, "Facing Fear Tools": 29, "Empowering Beliefs": 32, "Self-Film & Compare": 4, "Music, Actions, Voice": 31, "Allocated Track Preparation": 4, "Connection Tools Reflection": 28, "Learning Check \u2014 Coaching": 22, "Choreography Notes Breakdown": 7, "Learning Check \u2014 Technique": 14, "Technique Practice Worksheets": 15, "Coaching & Scripting Worksheets": 20, "Learning Check \u2014 Choreography": 12}$json$::jsonb, 'STRENGTH DEVELOPMENT IT Handbook 2025', '2026-06-17'::timestamptz, 1),
  ('THE TRIP', $json${"The Workout": 11, "Choreography Notes Breakdown": 15, "Bike Setup": 17, "Technique Practice Worksheets": 17, "Learning Check \u2014 Technique": 17, "Learning Check \u2014 Coaching": 21, "Coaching & Scripting Worksheets": 24, "Self-Film & Compare": 24, "Prework Review": 27, "Learning Check \u2014 Choreography": 27, "Plan and Script": 33, "Teaching Practice 1": 33, "Connection Tools Reflection": 35, "C.R.C.": 35, "Athletic & Animated": 41, "Adding Connection": 41, "Your Authentic Self": 45, "5 Voices": 47, "Music, Actions, Voice": 45, "Vocal Contrast": 47, "External Objectives": 47, "Teaching Practice 2": 51, "Allocated Track Preparation": 15, "Empowering Beliefs": 45}$json$::jsonb, null, '2026-06-17'::timestamptz, 1);
