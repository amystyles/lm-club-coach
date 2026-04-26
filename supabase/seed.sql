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
