# Instructor Profile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing InstructorProfile view with a full-screen detail page showing Key Element grades, Teaching Trust Map, Dreyfus coaching guidance, assessment history, and a current focus implementation intention.

**Architecture:** Five tasks in dependency order: mock data fix → navigation wiring → TrustMap sub-component → InstructorProfile shell replacement → final verify. No test suite exists; `npx tsc --noEmit` is the verification gate throughout.

**Tech Stack:** TypeScript, React, Tailwind CSS, shadcn/ui (Card, Badge, Button, Avatar)

---

## Files

| Action | Path | Responsibility |
|---|---|---|
| Modify | `src/data/mock-data.ts` | Remove connection + performance grades for ins-2 and ins-7 |
| Modify | `src/App.tsx` | Add `previousPage` state; update `handleViewInstructor` to accept source |
| Modify | `src/pages/Dashboard.tsx` | Update `onViewInstructor` prop type and call sites to pass `'dashboard'` |
| Modify | `src/pages/TeamRoster.tsx` | Update `onViewInstructor` prop type and call site to pass `'roster'` |
| Create | `src/components/profile/TrustMap.tsx` | Section 2: entrustment derivation + 5-dot indicator display |
| Replace | `src/pages/InstructorProfile.tsx` | Header + sections 1, 3, 4, 5; imports TrustMap |

---

## Task 1: Remove N/A grades from mock data

**Files:**
- Modify: `src/data/mock-data.ts`

Connection and Performance are not assessed at Initial Training (Stage 1 and Stage 2). Remove those grade entries for Mia Thompson (ins-2, Stage 2) and David Kim (ins-7, Stage 1).

- [ ] **Step 1: Update ins-2 Mia Thompson grades**

Find this block in `src/data/mock-data.ts` (around line 82):
```ts
    grades: [
      { element: 'choreography', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'technique', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'coaching', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'connection', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'performance', grade: 1, lastAssessed: '2026-03-01' },
    ],
```

Replace with:
```ts
    grades: [
      { element: 'choreography', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'technique', grade: 1, lastAssessed: '2026-03-01' },
      { element: 'coaching', grade: 1, lastAssessed: '2026-03-01' },
    ],
```

- [ ] **Step 2: Update ins-7 David Kim grades**

Find this block (around line 168):
```ts
    grades: [
      { element: 'choreography', grade: 1 },
      { element: 'technique', grade: 1 },
      { element: 'coaching', grade: 1 },
      { element: 'connection', grade: 1 },
      { element: 'performance', grade: 1 },
    ],
```

Replace with:
```ts
    grades: [
      { element: 'choreography', grade: 1 },
      { element: 'technique', grade: 1 },
      { element: 'coaching', grade: 1 },
    ],
```

- [ ] **Step 3: Verify compile**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output. (KeyElementHeatmap falls back to Grade 1 for absent elements — acceptable.)

---

## Task 2: Navigation wiring

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/Dashboard.tsx`
- Modify: `src/pages/TeamRoster.tsx`

The back button must return the user to whichever view they came from. This requires tracking the source in App.tsx and threading it through.

- [ ] **Step 1: Update App.tsx**

Replace the full contents of `src/App.tsx` with:

```tsx
import { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import TeamRoster from './pages/TeamRoster';
import { InstructorProfile } from './pages/InstructorProfile';
import AssessmentCenter from './pages/AssessmentCenter';
import DevelopmentPathway from './pages/DevelopmentPathway';
import ClubCoachPath from './pages/ClubCoachPath';
import LMQReference from './pages/LMQReference';
import FeedbackBuilder from './pages/FeedbackBuilder';

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Team overview & instructor development' },
  roster: { title: 'Instructor Team', subtitle: 'All instructors at a glance' },
  assessments: { title: 'Assessment Centre', subtitle: 'Observations, certifications & grade reviews' },
  development: { title: 'Development Pathway', subtitle: 'From Day One to World-Class' },
  'coach-path': { title: 'Club Coach Path', subtitle: 'Your development as a Club Coach' },
  'lmq-reference': { title: 'LMQ Reference', subtitle: 'Levels, grades & key elements' },
  feedback: { title: 'Feedback Builder', subtitle: 'CRC & GROW guided tools' },
  profile: { title: 'Instructor Profile', subtitle: 'Individual development view' },
};

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<'dashboard' | 'roster'>('dashboard');

  const handleViewInstructor = (id: string, source: 'dashboard' | 'roster' = 'dashboard') => {
    setSelectedInstructorId(id);
    setPreviousPage(source);
    setActivePage('profile');
  };

  const handleBackFromProfile = () => {
    setActivePage(previousPage);
    setSelectedInstructorId(null);
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    if (page !== 'profile') {
      setSelectedInstructorId(null);
    }
  };

  const pageInfo = PAGE_TITLES[activePage] || { title: 'LM Club Coach' };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')} />;
      case 'roster':
        return <TeamRoster onViewInstructor={(id) => handleViewInstructor(id, 'roster')} />;
      case 'assessments':
        return <AssessmentCenter />;
      case 'development':
        return <DevelopmentPathway onNavigate={handleNavigate} />;
      case 'coach-path':
        return <ClubCoachPath />;
      case 'lmq-reference':
        return <LMQReference />;
      case 'feedback':
        return <FeedbackBuilder />;
      case 'profile':
        return selectedInstructorId ? (
          <InstructorProfile
            instructorId={selectedInstructorId}
            onBack={handleBackFromProfile}
            source={previousPage}
          />
        ) : (
          <Dashboard onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')} />
        );
      default:
        return <Dashboard onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')} />;
    }
  };

  return (
    <div>
      <AppLayout
        activePage={activePage}
        onNavigate={handleNavigate}
        pageTitle={pageInfo.title}
        subtitle={pageInfo.subtitle}
      >
        {renderPage()}
      </AppLayout>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Verify compile**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: errors in `Dashboard.tsx` and `TeamRoster.tsx` because their prop interfaces still declare `onViewInstructor: (id: string) => void`. Fix those next.

- [ ] **Step 3: Update Dashboard.tsx prop interface**

In `src/pages/Dashboard.tsx`, find:
```ts
interface DashboardProps {
  onViewInstructor: (id: string) => void;
}
```

Replace with:
```ts
interface DashboardProps {
  onViewInstructor: (id: string, source: 'dashboard' | 'roster') => void;
}
```

- [ ] **Step 4: Update TeamRoster.tsx prop interface**

In `src/pages/TeamRoster.tsx`, find:
```ts
interface TeamRosterProps {
  onViewInstructor: (id: string) => void;
}
```

Replace with:
```ts
interface TeamRosterProps {
  onViewInstructor: (id: string, source: 'dashboard' | 'roster') => void;
}
```

- [ ] **Step 5: Update Dashboard call sites**

In `src/pages/Dashboard.tsx`, there are two call sites:

Line ~215 (instructor card click):
```ts
onClick={() => onViewInstructor(instructor.id)}
```
Replace with:
```ts
onClick={() => onViewInstructor(instructor.id, 'dashboard')}
```

Line ~325 (upcoming assessments "View" button):
```ts
if (instructor) onViewInstructor(instructor.id)
```
Replace with:
```ts
if (instructor) onViewInstructor(instructor.id, 'dashboard')
```

- [ ] **Step 6: Update TeamRoster call site**

In `src/pages/TeamRoster.tsx`, line ~310:
```ts
onClick={() => onViewInstructor(instructor.id)
```
Replace with:
```ts
onClick={() => onViewInstructor(instructor.id, 'roster')
```

- [ ] **Step 7: Verify full compile clean**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 8: Commit**

```bash
cd /Users/amy.styles/lm-club-coach && git add src/data/mock-data.ts src/App.tsx src/pages/Dashboard.tsx src/pages/TeamRoster.tsx && git commit -m "fix: remove N/A grades for IT-stage instructors; add source tracking to profile navigation"
```

---

## Task 3: Create TrustMap component

**Files:**
- Create: `src/components/profile/TrustMap.tsx`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p /Users/amy.styles/lm-club-coach/src/components/profile
```

Create `src/components/profile/TrustMap.tsx`:

```tsx
import type { Instructor, KeyElement } from '@/data/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TrustMapProps {
  instructor: Instructor;
}

const ETAs = [
  'Lead a safe warm-up & cool-down',
  'Execute choreography with accuracy & timing',
  'Coach technique corrections in real-time',
  'Adapt intensity for mixed-ability participants',
  'Build connection with every participant',
  'Manage equipment failure or participant injury',
  'Deliver a complete class independently',
  'Mentor newer instructors',
] as const;

const LEVEL_LABELS = [
  'Observe only',
  'Direct supervision',
  'Indirect supervision',
  'Unsupervised',
  'Can supervise others',
] as const;

function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}

function avgPresent(grades: (number | null)[]): number | null {
  const present = grades.filter((g): g is number => g !== null);
  if (present.length === 0) return null;
  return Math.round(present.reduce((s, g) => s + g, 0) / present.length);
}

function getEntrustmentLevel(instructor: Instructor, etaIndex: number): 1 | 2 | 3 | 4 | 5 {
  const cho = getGrade(instructor, 'choreography');
  const tec = getGrade(instructor, 'technique');
  const coa = getGrade(instructor, 'coaching');
  const con = getGrade(instructor, 'connection');
  const stage = instructor.stage;

  let level: number;

  switch (etaIndex) {
    case 0: {
      // warm-up/cool-down: avg(technique, coaching) → G1=2, G2=3, G3=4
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 1: {
      // choreography: null=1, G1=2, G2=4 (G2 is ceiling)
      if (cho === null) level = 1;
      else if (cho === 1) level = 2;
      else level = 4;
      break;
    }
    case 2: {
      // technique corrections: avg(technique, coaching) → G1=2, G2=3, G3=4
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 3: {
      // adapt intensity: avg of present from {coaching, connection} → G1=2, G2=3, G3=4
      const avg = avgPresent([coa, con]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 4: {
      // build connection: null=1, G1=2, G2=3, G3=4
      if (con === null) level = 1;
      else if (con === 1) level = 2;
      else if (con === 2) level = 3;
      else level = 4;
      break;
    }
    case 5: {
      // manage failure/injury: stage S1-2=1, S3=2, S4=3, S5=4
      if (stage <= 2) level = 1;
      else if (stage === 3) level = 2;
      else if (stage === 4) level = 3;
      else level = 4;
      break;
    }
    case 6: {
      // deliver independently: stage directly maps 1→1, 2→2, 3→3, 4→4, 5→5
      level = stage;
      break;
    }
    case 7: {
      // mentor others: avg(coaching, connection) + stage check
      const avg = avgPresent([coa, con]);
      if (avg === null || avg < 2) level = 1;
      else if (stage < 4) level = 2;
      else if (avg >= 3 && stage === 5) level = 5;
      else level = 3;
      break;
    }
    default:
      level = 1;
  }

  // Stage 1-2 cap: ETAs 0-4 max level 2; ETA 7 max level 1
  if (stage <= 2) {
    if (etaIndex <= 4) level = Math.min(level, 2);
    if (etaIndex === 7) level = Math.min(level, 1);
  }

  return Math.max(1, Math.min(5, level)) as 1 | 2 | 3 | 4 | 5;
}

export default function TrustMap({ instructor }: TrustMapProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Teaching Trust Map</CardTitle>
        <p className="text-xs text-muted-foreground">What can this instructor be trusted to do?</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {ETAs.map((eta, i) => {
          const level = getEntrustmentLevel(instructor, i);
          return (
            <div key={eta} className="flex items-start gap-3">
              <span className="flex-1 text-sm font-medium text-foreground pt-0.5">{eta}</span>
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  {([1, 2, 3, 4, 5] as const).map(dot => (
                    <span
                      key={dot}
                      className={`w-3 h-3 rounded-full ${dot <= level ? 'bg-lm-dark' : 'bg-slate-200 border border-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{LEVEL_LABELS[level - 1]}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify compile**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output.

---

## Task 4: Replace InstructorProfile.tsx

**Files:**
- Replace: `src/pages/InstructorProfile.tsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `src/pages/InstructorProfile.tsx` with:

```tsx
import type { KeyElement, Stage } from '@/data/types';
import type { Instructor } from '@/data/types';
import { instructors, assessments, coaches, STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import TrustMap from '@/components/profile/TrustMap';

interface InstructorProfileProps {
  instructorId: string;
  onBack: () => void;
  source: 'dashboard' | 'roster';
}

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}

function pillStyle(lmqLevel: number): string {
  if (lmqLevel >= 7) return 'border border-green-200 text-green-700 bg-green-50';
  if (lmqLevel >= 4) return 'border border-amber-200 text-amber-700 bg-amber-50';
  return 'border border-red-200 text-red-700 bg-red-50';
}

type DreyfusStage = 'Not yet assessed' | 'Novice' | 'Advanced Beginner' | 'Competent' | 'Proficient' | 'Expert';

function getDreyfusStage(grade: number | null, element: KeyElement, stage: Stage): DreyfusStage {
  if (grade === null) return 'Not yet assessed';
  if (grade === 1) return stage <= 2 ? 'Novice' : 'Advanced Beginner';
  if (grade === 2) return element === 'choreography' || stage === 5 ? 'Proficient' : 'Competent';
  return 'Expert';
}

const DREYFUS_GUIDANCE: Record<DreyfusStage, string> = {
  'Not yet assessed': 'Observe — this element is not yet in scope',
  'Novice': 'Direct — give specific instructions and checklists',
  'Advanced Beginner': 'Guide — demonstrate and explain why',
  'Competent': 'Facilitate — ask questions, let them problem-solve',
  'Proficient': 'Consult — prompt reflection, they lead',
  'Expert': 'Delegate — support their mentoring of others',
};

const DREYFUS_BADGE: Record<DreyfusStage, string> = {
  'Not yet assessed': 'bg-slate-100 text-slate-500',
  'Novice': 'bg-slate-100 text-slate-600',
  'Advanced Beginner': 'bg-blue-50 text-blue-700',
  'Competent': 'bg-amber-50 text-amber-700',
  'Proficient': 'bg-green-50 text-green-700',
  'Expert': 'bg-lm-dark text-white',
};

const TYPE_LABELS: Record<string, string> = {
  quarterly: 'Quarterly Review',
  observation: 'Observation',
  certification: 'Certification',
  'grade-review': 'Grade Review',
};

const INTENTIONS: Record<KeyElement, string> = {
  connection: "If I'm coaching a working track, then I will scan all four quadrants and use one participant's name before the track ends.",
  choreography: "If I feel myself falling behind the music in a transition, then I will hold the current move for one extra count, reset my timing, and cue the next exercise cleanly.",
  coaching: "If I see someone struggling with form, then I will move toward them, mirror the correct movement, and give one specific correction.",
  technique: "If I begin the squat track, then I will check my own alignment in the mirror and demonstrate one perfect rep before cueing participants.",
  performance: "If the music peaks, then I will commit fully to the energy — no holding back — and let my expression lead the room.",
};

export function InstructorProfile({ instructorId, onBack, source }: InstructorProfileProps) {
  const instructor = instructors.find(i => i.id === instructorId);

  if (!instructor) {
    return (
      <div className="p-8">
        <Button onClick={onBack} variant="outline">← Back</Button>
        <p className="mt-4 text-red-600">Instructor not found</p>
      </div>
    );
  }

  const stageInfo = STAGE_DATA.find(s => s.stage === instructor.stage);
  const completedAssessments = assessments
    .filter(a => a.instructorId === instructorId && a.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const backLabel = source === 'roster' ? '← Back to Team' : '← Back to Dashboard';

  return (
    <div className="min-h-screen bg-background">

      {/* Header banner */}
      <div className="bg-lm-dark text-white px-6 pt-4 pb-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:text-white hover:bg-white/10 mb-4 -ml-2"
        >
          {backLabel}
        </Button>

        <div className="flex items-start gap-5">
          <Avatar className="h-16 w-16 flex-shrink-0">
            <AvatarFallback className="bg-lm-subtle text-lm-dark text-lg font-bold">
              {instructor.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h1 className="text-white mb-2">{instructor.name}</h1>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: stageInfo?.color ?? '#888' }}
                />
                {stageInfo?.name ?? `Stage ${instructor.stage}`}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {instructor.programs.map(program => (
                <span
                  key={program.name}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pillStyle(program.lmqLevel)}`}
                >
                  {program.name} L{program.lmqLevel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* Section 1: Key Element Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Key Element Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {KEY_ELEMENTS.map(element => {
              const grade = getGrade(instructor, element);
              const isChoreography = element === 'choreography';
              const label = KEY_ELEMENT_LABELS[element];

              let barWidthClass = '';
              let barColorClass = '';
              let gradeLabel = 'N/A';

              if (grade !== null) {
                // Choreography G2 is the ceiling — render full bar
                if (isChoreography && grade === 2) {
                  barWidthClass = 'w-full';
                } else if (grade === 1) {
                  barWidthClass = 'w-1/3';
                } else if (grade === 2) {
                  barWidthClass = 'w-2/3';
                } else {
                  barWidthClass = 'w-full';
                }
                barColorClass = grade === 1 ? 'bg-red-400' : grade === 2 ? 'bg-amber-400' : 'bg-green-500';
                gradeLabel = isChoreography && grade === 2 ? 'G2 (max)' : `G${grade}`;
              }

              return (
                <div key={element} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium text-foreground flex-shrink-0">{label}</span>
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                    {grade !== null && (
                      <div className={`h-full rounded-full ${barWidthClass} ${barColorClass}`} />
                    )}
                  </div>
                  <span className={`w-16 text-xs font-medium text-right flex-shrink-0 ${grade === null ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {gradeLabel}
                  </span>
                </div>
              );
            })}

            <div className="mt-2 flex items-center gap-2 bg-lm-subtle border-l-4 border-lm-green rounded px-3 py-2">
              <span className="text-xs font-semibold text-foreground">
                ↑ Priority Focus: {KEY_ELEMENT_LABELS[instructor.priorityElement]} — focus for next observation cycle
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Teaching Trust Map */}
        <TrustMap instructor={instructor} />

        {/* Section 3: Dreyfus Stage by Domain */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Dreyfus Stage by Domain</CardTitle>
            <p className="text-xs text-muted-foreground">Coaching should be different for each skill</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {KEY_ELEMENTS.map(element => {
              const grade = getGrade(instructor, element);
              const dreyfus = getDreyfusStage(grade, element, instructor.stage);
              const guidance = DREYFUS_GUIDANCE[dreyfus];
              const badgeClass = DREYFUS_BADGE[dreyfus];
              return (
                <div key={element} className="flex items-center gap-3 flex-wrap">
                  <span className="w-28 text-sm font-medium text-foreground flex-shrink-0">
                    {KEY_ELEMENT_LABELS[element]}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${badgeClass}`}>
                    {dreyfus}
                  </span>
                  <span className="flex-1 text-xs italic text-muted-foreground bg-lm-subtle px-3 py-1 rounded min-w-0">
                    {guidance}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Section 4: Assessment History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
            {completedAssessments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed assessments yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Program</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Assessor</th>
                    <th className="text-right py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {completedAssessments.map(a => {
                    const assessorCoach = coaches.find(c => c.id === a.assessorId);
                    return (
                      <tr key={a.id}>
                        <td className="py-2 pr-3 text-xs">{a.date}</td>
                        <td className="py-2 pr-3 text-xs">{a.program}</td>
                        <td className="py-2 pr-3 text-xs">{TYPE_LABELS[a.type] ?? a.type}</td>
                        <td className="py-2 pr-3 text-xs">{assessorCoach?.name ?? a.assessorId}</td>
                        <td className="py-2 text-xs text-right font-medium">L{a.overallLevel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Current Focus */}
        <Card className="border-l-4 border-lm-green bg-lm-subtle/40">
          <CardHeader className="pb-2">
            <CardTitle>Current Focus</CardTitle>
            <p className="text-xs text-muted-foreground">Implementation Intention</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-foreground">
              {INTENTIONS[instructor.priorityElement]}
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify compile**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 3: Smoke-test in browser**

Dev server is running at `http://localhost:5173/`. Verify:

1. Dashboard → click any instructor card → profile opens with dark header, name, stage badge, program pills with LMQ levels
2. Back button shows "← Back to Dashboard" and returns to Dashboard
3. Instructor Team → click any row → profile opens
4. Back button shows "← Back to Team" and returns to Instructor Team
5. Jordan Silva (ins-1): Key Element bars show Connection as G1 (red, 1/3 fill), others G2 (amber); Priority Focus strip shows Connection
6. Mia Thompson (ins-2): Connection and Performance bars show "N/A" (empty bar, grey label); Trust Map ETA 5 (Build connection) shows Level 1
7. David Kim (ins-7): same N/A behaviour for Connection and Performance
8. Alex Rivera (ins-3, Stage 5): Trust Map ETA 7 (Mentor others) should show Level 3+ (coaching G2 + connection G2, stage 5 → avg 2, stage≥4 → Level 3)
9. Aisha Brown (ins-8, Stage 5): Technique G3 and Coaching G3 visible in Dreyfus as Expert
10. Section 4 Assessment History shows past assessments for Jordan Silva and Alex Rivera; "No completed assessments yet." for Mia Thompson

- [ ] **Step 4: Commit**

```bash
cd /Users/amy.styles/lm-club-coach && git add src/components/profile/TrustMap.tsx src/pages/InstructorProfile.tsx && git commit -m "feat: rebuild Instructor Profile with Key Element bars, Trust Map, Dreyfus stages, and implementation intention"
```
