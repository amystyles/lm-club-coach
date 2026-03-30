import type { Instructor, ClubCoach, Club, Assessment, DevelopmentNote } from './types';
import { Music, Dumbbell, Target, Heart, Zap } from 'lucide-react';

export const LM_PROGRAMS = [
  'BODYPUMP', 'BODYPUMP HEAVY', 'LES MILLS TONE', 'LES MILLS STRENGTH DEVELOPMENT',
  'BODYCOMBAT', 'BODYATTACK', 'BODYSTEP', 'LES MILLS SPRINT', 'THE TRIP',
  'RPM', 'BODYJAM', 'LES MILLS DANCE', 'BODYBALANCE', 'LES MILLS YOGA',
  'LES MILLS PILATES', 'LES MILLS CORE', 'LES MILLS GRIT', 'LES MILLS CEREMONY',
  'LES MILLS SHAPES', 'LES MILLS THRIVE', 'BORN TO MOVE'
];

export const KEY_ELEMENT_LABELS = {
  choreography: 'Choreography',
  technique: 'Technique',
  coaching: 'Coaching',
  connection: 'Connection',
  performance: 'Performance',
} as const;

export const KEY_ELEMENT_ICONS = {
  choreography: Music,
  technique: Dumbbell,
  coaching: Target,
  connection: Heart,
  performance: Zap,
} as const;

export const GRADE_LABELS = {
  1: { short: 'G1', label: 'Grade 1', description: { choreography: 'Accurate', technique: 'Clear & Safe', coaching: 'Follow Safely', connection: 'Respect & Care', performance: 'Prepared & Appropriate' } },
  2: { short: 'G2', label: 'Grade 2', description: { choreography: 'Smooth & Automatic', technique: 'Precise & Motivating', coaching: 'Professional Level', connection: 'Authentic Bond', performance: 'Team-Teaching with Music' } },
  3: { short: 'G3', label: 'Grade 3', description: { choreography: 'N/A (Max G2)', technique: 'Inspirational', coaching: 'Masterful', connection: 'Community Builder', performance: 'Inspirational' } },
} as const;

export const STAGE_DATA = [
  { stage: 1, name: 'Onboarding', subtitle: 'Pre-Training', color: '#0A0A0A', duration: '21 Days Before IT' },
  { stage: 2, name: 'IT \u2192 Certification', subtitle: '30 days to cert submission', color: '#333333', duration: '30 Days' },
  { stage: 3, name: 'Ready to Teach', subtitle: 'Post-cert to first slot', color: '#00CC4F', duration: 'Weeks 1-12' },
  { stage: 4, name: 'On Timetable', subtitle: 'Nailing the basics', color: '#00FF63', duration: 'Ongoing' },
  { stage: 5, name: 'Advanced', subtitle: 'Grade 2 Push & Growing Impact', color: '#5B3A8A', duration: '6–18+ months' },
  { stage: 6, name: 'World-Class', subtitle: 'Mastery & influence', color: '#FF623E', duration: 'Ongoing' },
];

export const COACH_STAGE_DATA = [
  { stage: 1, name: 'Identity & Foundations', subtitle: 'Role clarity, LMQ, 5KE language', duration: 'Weeks 1-2' },
  { stage: 2, name: 'Learn to Observe', subtitle: 'See what others miss', duration: 'Weeks 3-6' },
  { stage: 3, name: 'Develop & Deliver Feedback', subtitle: 'CRC, GROW, one thing at a time', duration: 'Weeks 7-12' },
  { stage: 4, name: 'Lead the Culture', subtitle: 'Team, Release cycle, development rhythm', duration: 'Months 4-6' },
  { stage: 5, name: 'Multiply the Standard', subtitle: 'Independent mastery, scale', duration: 'Ongoing' },
];

export const clubs: Club[] = [
  { id: 'club-1', name: 'Midtown Fitness Club', region: 'Northeast', deploymentPath: 'B', gfmName: 'Sarah Mitchell', instructorCount: 14, coachCount: 2 },
  { id: 'club-2', name: 'Westside Athletic Center', region: 'West', deploymentPath: 'A', gfmName: 'Marcus Chen', instructorCount: 22, coachCount: 3 },
  { id: 'club-3', name: 'Downtown Performance Gym', region: 'South', deploymentPath: 'C', gfmName: 'Elena Rodriguez', instructorCount: 8, coachCount: 1 },
];

export const instructors: Instructor[] = [
  {
    id: 'ins-1', name: 'Jordan Silva', initials: 'JS', programs: [
      { name: 'BODYPUMP', lmqLevel: 3 },
      { name: 'BODYCOMBAT', lmqLevel: 2 },
      { name: 'RPM', lmqLevel: 1 },
    ],
    stage: 4, lmqLevel: 3, clubId: 'club-1', joinDate: '2024-06-15', lastAssessment: '2026-02-12',
    nextAssessment: '2026-05-12', certDate: '2024-09-20', riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2026-02-12' },
      { element: 'technique', grade: 2, lastAssessed: '2026-02-12' },
      { element: 'coaching', grade: 2, lastAssessed: '2026-02-12' },
      { element: 'connection', grade: 1, lastAssessed: '2026-02-12' },
      { element: 'performance', grade: 2, lastAssessed: '2026-02-12' },
    ],
    priorityElement: 'connection',
    goals: ['Achieve Connection Grade 2 by Q2', 'Use participant names genuinely 3x per class', 'Begin Look, See & Respond practice'],
  },
  {
    id: 'ins-2', name: 'Mia Thompson', initials: 'MT', programs: [
      { name: 'BODYPUMP', lmqLevel: 1 },
      { name: 'LES MILLS CORE', lmqLevel: 1 },
    ],
    stage: 2, lmqLevel: 1, clubId: 'club-1', joinDate: '2026-01-10', lastAssessment: '2026-03-01',
    certDate: undefined, riskLevel: 'medium',
    grades: [
      { element: 'choreography', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'technique', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'coaching', grade: 1, lastAssessed: '2026-03-01' },
    ],
    priorityElement: 'choreography',
    goals: ['Complete IMT within 2 weeks', 'Submit certification video by Day 30', 'Achieve Choreography Grade 1 consistently'],
  },
  {
    id: 'ins-3', name: 'Alex Rivera', initials: 'AR', programs: [
      { name: 'BODYCOMBAT', lmqLevel: 7 },
      { name: 'BODYATTACK', lmqLevel: 5 },
      { name: 'BODYPUMP', lmqLevel: 4 },
    ],
    stage: 6, lmqLevel: 7, clubId: 'club-1', joinDate: '2021-03-20', lastAssessment: '2026-01-15',
    nextAssessment: '2026-04-15', certDate: '2021-06-01', riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2026-01-15' },
      { element: 'technique', grade: 3, lastAssessed: '2026-01-15' },
      { element: 'coaching', grade: 2, lastAssessed: '2026-01-15' },
      { element: 'connection', grade: 2, lastAssessed: '2026-01-15' },
      { element: 'performance', grade: 2, lastAssessed: '2026-01-15' },
    ],
    priorityElement: 'coaching',
    goals: ['Achieve Coaching Grade 3', 'Begin Presenter pathway', 'Mentor 1 new instructor this quarter'],
  },
  {
    id: 'ins-4', name: 'Priya Patel', initials: 'PP', programs: [
      { name: 'BODYBALANCE', lmqLevel: 2 },
      { name: 'LES MILLS YOGA', lmqLevel: 1 },
    ],
    stage: 3, lmqLevel: 2, clubId: 'club-1', joinDate: '2025-08-01', lastAssessment: '2025-12-10',
    nextAssessment: '2026-03-10', certDate: '2025-11-15', riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2025-12-10' },
      { element: 'technique', grade: 1, lastAssessed: '2025-12-10' },
      { element: 'coaching', grade: 1, lastAssessed: '2025-12-10' },
      { element: 'connection', grade: 1, lastAssessed: '2025-12-10' },
      { element: 'performance', grade: 1, lastAssessed: '2025-12-10' },
    ],
    priorityElement: 'technique',
    goals: ['Secure regular timetable slot within 8 weeks', 'Team-teach 3 classes with mentor', 'Build Technique to G2'],
  },
  {
    id: 'ins-5', name: 'Marcus Johnson', initials: 'MJ', programs: [
      { name: 'BODYPUMP', lmqLevel: 5 },
      { name: 'RPM', lmqLevel: 3 },
      { name: 'LES MILLS DANCE', lmqLevel: 2 },
    ],
    stage: 4, lmqLevel: 5, clubId: 'club-1', joinDate: '2023-01-15', lastAssessment: '2026-02-28',
    nextAssessment: '2026-05-28', certDate: '2023-04-20', riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2026-02-28' },
      { element: 'technique', grade: 2, lastAssessed: '2026-02-28' },
      { element: 'coaching', grade: 2, lastAssessed: '2026-02-28' },
      { element: 'connection', grade: 2, lastAssessed: '2026-02-28' },
      { element: 'performance', grade: 1, lastAssessed: '2026-02-28' },
    ],
    priorityElement: 'performance',
    goals: ['Achieve Performance Grade 2', 'Work on dramatic contrast', 'Master team-teaching with music'],
  },
  {
    id: 'ins-6', name: 'Kayla Wright', initials: 'KW', programs: [
      { name: 'LES MILLS DANCE', lmqLevel: 4 },
      { name: 'BODYJAM', lmqLevel: 3 },
    ],
    stage: 4, lmqLevel: 4, clubId: 'club-1', joinDate: '2023-09-01', lastAssessment: '2026-01-20',
    nextAssessment: '2026-04-20', certDate: '2023-12-01', riskLevel: 'medium',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2026-01-20' },
      { element: 'technique', grade: 2, lastAssessed: '2026-01-20' },
      { element: 'coaching', grade: 1, lastAssessed: '2026-01-20' },
      { element: 'connection', grade: 2, lastAssessed: '2026-01-20' },
      { element: 'performance', grade: 2, lastAssessed: '2026-01-20' },
    ],
    priorityElement: 'coaching',
    goals: ['Build Layer 2 coaching consistency', 'Achieve Coaching G2 by next quarter', 'Add ≥2 L2 cues per track'],
  },
  {
    id: 'ins-7', name: 'David Kim', initials: 'DK', programs: [
      { name: 'BODYPUMP', lmqLevel: 1 },
    ],
    stage: 1, lmqLevel: 1, clubId: 'club-1', joinDate: '2026-03-01', lastAssessment: 'N/A',
    riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 1 },
      { element: 'technique', grade: 1 },
      { element: 'coaching', grade: 1 },
    ],
    priorityElement: 'choreography',
    goals: ['Complete all pre-work videos', 'Observe 4+ live BODYPUMP classes', 'Practice allocated track with mentor'],
  },
  {
    id: 'ins-8', name: 'Aisha Brown', initials: 'AB', programs: [
      { name: 'BODYPUMP', lmqLevel: 8 },
      { name: 'BODYCOMBAT', lmqLevel: 6 },
      { name: 'BODYATTACK', lmqLevel: 5 },
    ],
    stage: 6, lmqLevel: 8, clubId: 'club-1', joinDate: '2020-02-01', lastAssessment: '2026-03-01',
    nextAssessment: '2026-06-01', certDate: '2020-05-15', riskLevel: 'low',
    grades: [
      { element: 'choreography', grade: 2, lastAssessed: '2026-03-01' },
      { element: 'technique', grade: 3, lastAssessed: '2026-03-01' },
      { element: 'coaching', grade: 3, lastAssessed: '2026-03-01' },
      { element: 'connection', grade: 2, lastAssessed: '2026-03-01' },
      { element: 'performance', grade: 2, lastAssessed: '2026-03-01' },
    ],
    priorityElement: 'connection',
    goals: ['Achieve Connection G3', 'Begin TAP Coach pathway', 'Mentor 2 instructors this quarter'],
  },
];

export const coaches: ClubCoach[] = [
  {
    id: 'coach-1', name: 'Aisha Brown', initials: 'AB', coachStage: 4,
    instructorIds: ['ins-1', 'ins-2', 'ins-4', 'ins-7'], clubId: 'club-1',
    lmqLevel: 8, programs: ['BODYPUMP', 'BODYCOMBAT', 'LES MILLS CORE', 'LES MILLS GRIT'],
    yearsTeaching: 6, skillsCompleted: ['Reading an LMQ Profile', 'Team Baseline Discovery', 'Evidence-Based Observation', 'CRC Conversation Delivery', 'GROW Model Facilitation'],
  },
  {
    id: 'coach-2', name: 'Alex Rivera', initials: 'AR', coachStage: 2,
    instructorIds: ['ins-5', 'ins-6'], clubId: 'club-1',
    lmqLevel: 7, programs: ['BODYCOMBAT', 'BODYATTACK', 'LES MILLS GRIT'],
    yearsTeaching: 5, skillsCompleted: ['Reading an LMQ Profile', 'Team Baseline Discovery'],
  },
];

export const assessments: Assessment[] = [
  {
    id: 'asmt-1', instructorId: 'ins-1', assessorId: 'coach-1', assessorRole: 'coach',
    date: '2026-02-12', program: 'BODYPUMP', type: 'quarterly', status: 'completed',
    grades: [
      { element: 'choreography', grade: 2 },
      { element: 'technique', grade: 2 },
      { element: 'coaching', grade: 2 },
      { element: 'connection', grade: 1 },
      { element: 'performance', grade: 2 },
    ],
    overallLevel: 3,
    feedback: 'Jordan continues to show strong technical ability across all programs. Choreography is automatic — zero significant errors observed. Coaching layers are improving with consistent L2 cues in peak tracks. The clear development priority is Connection — moving from Grade 1 to Grade 2.',
    recommendations: ['Use participant names genuinely in Squat and Chest tracks', 'Practice Look, See & Respond 2-3x per class', 'Stay 10 minutes after class for the next 4 weeks'],
  },
  {
    id: 'asmt-2', instructorId: 'ins-3', assessorId: 'coach-1', assessorRole: 'coach',
    date: '2026-01-15', program: 'BODYCOMBAT', type: 'quarterly', status: 'completed',
    grades: [
      { element: 'choreography', grade: 2 },
      { element: 'technique', grade: 3 },
      { element: 'coaching', grade: 2 },
      { element: 'connection', grade: 2 },
      { element: 'performance', grade: 2 },
    ],
    overallLevel: 7,
    feedback: 'Alex is performing at an elite level. Technique is inspirational — 100% competency across all tracks. Connection has grown significantly with genuine participant engagement. The next growth area is Coaching toward Grade 3: masterful, targeted correction with powerful imagery.',
    recommendations: ['Develop 2-3 powerful imagery cues per track', 'Practice leaving intentional silence', 'Begin Presenter pathway application'],
  },
  {
    id: 'asmt-3', instructorId: 'ins-2', assessorId: 'coach-1', assessorRole: 'coach',
    date: '2026-03-20', program: 'BODYPUMP', type: 'observation', status: 'scheduled',
    grades: [], overallLevel: 1,
    feedback: '', recommendations: [],
  },
];

export const developmentNotes: DevelopmentNote[] = [
  {
    id: 'note-1', instructorId: 'ins-1', authorId: 'coach-1', date: '2026-02-12',
    keyElement: 'connection', observation: 'Jordan engaged warmly with the front row but did not scan the back quadrants. No participant names were used during the Squat or Chest tracks.',
    recommendation: 'Learn 3 names per class for the next 4 weeks. Use each name once during class. Start with the Squat track — it\'s the longest and gives the most opportunity.',
    grade: 1,
  },
  {
    id: 'note-2', instructorId: 'ins-3', authorId: 'coach-1', date: '2026-01-15',
    keyElement: 'coaching', observation: 'Layer 1 and 2 coaching is strong and consistent. Layer 3 moments were present but could be more intentional. Over-instructed during the recovery tracks.',
    recommendation: 'Practice teaching one full track with only 6 cues — maximum impact, minimum noise. Develop 2-3 powerful imagery cues for the Combat tracks.',
    grade: 2,
  },
];
