# Coach Progress Dashboard & Session Locking — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Coach Progress section to the Dashboard showing each coach's stage and session progress, and lock ClubCoachPath sessions so they unlock sequentially.

**Architecture:** Session completion state is lifted into App.tsx as `Record<coachId, string[]>` and passed down as props. ClubCoachPath receives the set of completed session IDs and an `onCompleteSession` callback. Dashboard receives the same data to render a CoachProgressPanel. Session locking is derived from the ordered session arrays in `coachPathStages`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide icons

---

## File Map

| File | Change |
|---|---|
| `src/data/types.ts` | Add `completedSessionIds?: string[]` to `ClubCoach` |
| `src/data/mock-data.ts` | Seed `completedSessionIds` on both coaches |
| `src/App.tsx` | Lift session completion state; wire props to Dashboard + ClubCoachPath |
| `src/pages/ClubCoachPath.tsx` | Accept `completedSessionIds` + `onCompleteSession`; add lock/unlock UI + Mark Complete |
| `src/pages/Dashboard.tsx` | Accept `completedSessionIds`; render new CoachProgressPanel section |
| `src/components/CoachProgressPanel.tsx` | **New** — compact card per coach: stage, sessions done/total, next session, Prep link |

---

## Task 1: Extend ClubCoach type and seed mock data

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/data/mock-data.ts`

- [ ] **Step 1: Add `completedSessionIds` to ClubCoach type**

In `src/data/types.ts`, add the field to `ClubCoach`:

```ts
export interface ClubCoach {
  id: string;
  name: string;
  initials: string;
  coachStage: CoachStage;
  instructorIds: string[];
  clubId: string;
  lmqLevel: LMQLevel;
  programs: string[];
  yearsTeaching: number;
  skillsCompleted: string[];
  tapCoachId?: string;
  completedSessionIds: string[];   // ← add this
}
```

- [ ] **Step 2: Seed completedSessionIds in mock-data.ts**

coach-1 is at coachStage 4, so seed all of stages 1–3 sessions plus the first session of stage 4.
coach-2 is at coachStage 2, so seed only the first session of stage 1.

In `src/data/mock-data.ts`, update the `coaches` array:

```ts
export const coaches: ClubCoach[] = [
  {
    id: 'coach-1', name: 'Aisha Brown', initials: 'AB', coachStage: 4,
    instructorIds: ['ins-1', 'ins-2', 'ins-4', 'ins-7'], clubId: 'club-1',
    lmqLevel: 8, programs: ['BODYPUMP', 'BODYCOMBAT', 'LES MILLS CORE', 'LES MILLS GRIT'],
    yearsTeaching: 6,
    skillsCompleted: ['Reading an LMQ Profile', 'Team Baseline Discovery', 'Evidence-Based Observation', 'CRC Conversation Delivery', 'GROW Model Facilitation'],
    completedSessionIds: ['S1-1', 'S1-2', 'S2-1', 'S2-2', 'S2-3', 'S3-1', 'S3-2', 'S3-3', 'S4-1'],
  },
  {
    id: 'coach-2', name: 'Alex Rivera', initials: 'AR', coachStage: 2,
    instructorIds: ['ins-5', 'ins-6'], clubId: 'club-1',
    lmqLevel: 7, programs: ['BODYCOMBAT', 'BODYATTACK', 'LES MILLS GRIT'],
    yearsTeaching: 5,
    skillsCompleted: ['Reading an LMQ Profile', 'Team Baseline Discovery'],
    completedSessionIds: ['S1-1'],
  },
];
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors (or only pre-existing ones unrelated to this change).

- [ ] **Step 4: Commit**

```bash
git add src/data/types.ts src/data/mock-data.ts
git commit -m "feat: add completedSessionIds to ClubCoach type and seed mock data"
```

---

## Task 2: Lift session completion state into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Import coaches and coachPathStages in App.tsx**

```tsx
import { coaches } from './data/mock-data';
import { coachPathStages } from './data/coach-path-data';
```

- [ ] **Step 2: Add completion state and handlers in App.tsx**

Inside the `App` function, add state initialised from mock data, plus a toggle handler:

```tsx
const [completedSessionIds, setCompletedSessionIds] = useState<Record<string, string[]>>(
  () => Object.fromEntries(coaches.map(c => [c.id, c.completedSessionIds]))
);

const handleCompleteSession = (coachId: string, sessionId: string) => {
  setCompletedSessionIds(prev => {
    const current = prev[coachId] ?? [];
    if (current.includes(sessionId)) return prev;
    return { ...prev, [coachId]: [...current, sessionId] };
  });
};
```

- [ ] **Step 3: Wire props to ClubCoachPath and Dashboard**

In `renderPage`, update the two cases. Hardcode `coach-1` as the active coach for the ClubCoachPath demo (same as the current implicit convention):

```tsx
case 'dashboard':
  return (
    <Dashboard
      onViewInstructor={(id) => handleViewInstructor(id, 'dashboard')}
      completedSessionIds={completedSessionIds}
      onNavigate={handleNavigate}
    />
  );
case 'coach-path':
  return (
    <ClubCoachPath
      onNavigate={handleNavigate}
      completedSessionIds={completedSessionIds['coach-1'] ?? []}
      onCompleteSession={(sessionId) => handleCompleteSession('coach-1', sessionId)}
    />
  );
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: type errors on Dashboard and ClubCoachPath props — that's expected and will be fixed in the next two tasks.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: lift session completion state to App.tsx"
```

---

## Task 3: Session locking + Mark Complete in ClubCoachPath

**Files:**
- Modify: `src/pages/ClubCoachPath.tsx`

The locking rule: within each stage, session N is unlocked only if sessions 0…N-1 are all in `completedSessionIds`. The first session of every stage is always accessible (no cross-stage locking — coaches can start the next stage once they've begun it).

- [ ] **Step 1: Update ClubCoachPath props interface**

Find and replace the existing props at the top of the file:

```tsx
interface ClubCoachPathProps {
  onNavigate: (page: string) => void;
  completedSessionIds: string[];
  onCompleteSession: (sessionId: string) => void;
}

export default function ClubCoachPath({ onNavigate, completedSessionIds, onCompleteSession }: ClubCoachPathProps) {
```

- [ ] **Step 2: Add a helper to compute whether a session is locked**

Add this pure function near the top of the file (outside the component):

```tsx
function isSessionLocked(stageIndex: number, sessionIndex: number, completedIds: string[], sessions: { id: string }[]): boolean {
  if (sessionIndex === 0) return false; // first session always unlocked
  // locked if any prior session in this stage is not completed
  for (let i = 0; i < sessionIndex; i++) {
    if (!completedIds.includes(sessions[i].id)) return true;
  }
  return false;
}
```

- [ ] **Step 3: Render a lock overlay on locked sessions**

In ClubCoachPath, the sessions are rendered in a list inside each stage accordion/section. Find the block that renders each session card and wrap it with lock logic.

Import `Lock` from lucide-react if not already present:
```tsx
import { Lock, CheckCircle2, ... } from 'lucide-react';
```

Wrap the session card render with conditional locked state. The locked variant shows a greyed card with a lock icon and "Complete previous sessions to unlock" text instead of the full session content:

```tsx
{stageDetail.sessions.map((session, sessionIdx) => {
  const locked = isSessionLocked(stageIdx, sessionIdx, completedSessionIds, stageDetail.sessions);
  const completed = completedSessionIds.includes(session.id);

  if (locked) {
    return (
      <div
        key={session.id}
        className="rounded-xl border border-lm-sunken bg-lm-subtle opacity-60 px-5 py-4 flex items-center gap-3"
      >
        <Lock className="w-4 h-4 text-lm-ink-muted flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-lm-ink-mid">{session.title}</p>
          <p className="text-xs text-lm-ink-muted mt-0.5">Complete previous sessions to unlock</p>
        </div>
      </div>
    );
  }

  return (
    <div key={session.id} className="relative">
      {/* existing session card JSX */}
      {completed && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="w-4 h-4 text-lm-green" />
        </div>
      )}
      {/* existing session content */}
    </div>
  );
})}
```

- [ ] **Step 4: Add Mark Complete button inside the open session view**

Inside the session detail panel (the expanded tab area), add a "Mark Complete" button at the bottom of the Notes tab or as a footer action below the tabs. Find the bottom of the tab content area and add:

```tsx
{!completedSessionIds.includes(session.id) && (
  <div className="mt-6 pt-4 border-t border-lm-sunken flex justify-end">
    <button
      onClick={() => onCompleteSession(session.id)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-lm-green text-lm-dark text-sm font-bold hover:bg-lm-green/90 transition-colors"
    >
      <CheckCircle2 className="w-4 h-4" />
      Mark Session Complete
    </button>
  </div>
)}
{completedSessionIds.includes(session.id) && (
  <div className="mt-6 pt-4 border-t border-lm-sunken flex items-center gap-2 text-lm-green">
    <CheckCircle2 className="w-4 h-4" />
    <span className="text-sm font-semibold">Session completed</span>
  </div>
)}
```

- [ ] **Step 5: Verify in browser**

Open http://localhost:5173, navigate to Club Coach Path. Verify:
- Sessions after the first unlocked incomplete session are locked with the grey lock card
- Completed sessions show a green checkmark
- Clicking "Mark Complete" on an unlocked session unlocks the next one
- Session 1 is always accessible

- [ ] **Step 6: Commit**

```bash
git add src/pages/ClubCoachPath.tsx
git commit -m "feat: add session locking and mark-complete to ClubCoachPath"
```

---

## Task 4: Build CoachProgressPanel component

**Files:**
- Create: `src/components/CoachProgressPanel.tsx`

This component receives all coaches + their completion data and renders a row per coach showing: avatar, name, stage badge, progress bar (sessions done / total across all stages), next session title, and a "Prep" link that navigates to coach-path.

First, we need a helper to compute total sessions across all stages. Import `coachPathStages` from coach-path-data.

- [ ] **Step 1: Create the component**

```tsx
import { coachPathStages, COACH_STAGE_META } from '@/data/coach-path-data';
import type { ClubCoach } from '@/data/types';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

function getTotalSessions(): number {
  return Object.values(coachPathStages).reduce((sum, stage) => sum + stage.sessions.length, 0);
}

function getNextSession(completedIds: string[]): { stageNum: number; sessionTitle: string } | null {
  for (const [stageKey, stageDetail] of Object.entries(coachPathStages)) {
    for (const session of stageDetail.sessions) {
      if (!completedIds.includes(session.id)) {
        return { stageNum: Number(stageKey), sessionTitle: session.title };
      }
    }
  }
  return null;
}

interface CoachProgressPanelProps {
  coaches: ClubCoach[];
  completedSessionIds: Record<string, string[]>;
  onPrepSession: () => void;
}

export default function CoachProgressPanel({ coaches, completedSessionIds, onPrepSession }: CoachProgressPanelProps) {
  const totalSessions = getTotalSessions();

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <CardTitle className="text-white text-sm leading-tight">Coach Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-lm-sunken">
        {coaches.map(coach => {
          const completed = completedSessionIds[coach.id] ?? [];
          const stageMeta = COACH_STAGE_META.find(s => s.stage === coach.coachStage);
          const nextSession = getNextSession(completed);
          const pct = Math.round((completed.length / totalSessions) * 100);

          return (
            <div key={coach.id} className="px-5 py-4 flex items-center gap-4">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-lm-dark flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {coach.initials}
              </div>

              {/* Name + stage */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-lm-dark truncate">{coach.name}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                    style={{ backgroundColor: stageMeta?.color ?? '#666' }}
                  >
                    Stage {coach.coachStage}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={pct} className="h-1.5 flex-1" />
                  <span className="text-[11px] text-lm-ink-muted whitespace-nowrap">
                    {completed.length}/{totalSessions} sessions
                  </span>
                </div>
                {nextSession && (
                  <p className="text-xs text-lm-ink-muted mt-1 truncate">
                    Next: {nextSession.sessionTitle}
                  </p>
                )}
                {!nextSession && (
                  <p className="text-xs text-lm-green font-semibold mt-1">All sessions complete</p>
                )}
              </div>

              {/* Prep button */}
              <button
                onClick={onPrepSession}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-lm-sunken text-xs font-semibold text-lm-ink-mid hover:border-lm-green hover:text-lm-dark transition-colors"
              >
                Prep
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/CoachProgressPanel.tsx
git commit -m "feat: add CoachProgressPanel component"
```

---

## Task 5: Add Coach Progress section to Dashboard

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Update Dashboard props interface**

At the top of `Dashboard.tsx`, update the `DashboardProps` interface:

```tsx
interface DashboardProps {
  onViewInstructor: (id: string, source: 'dashboard' | 'roster') => void;
  completedSessionIds: Record<string, string[]>;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onViewInstructor, completedSessionIds, onNavigate }: DashboardProps) {
```

- [ ] **Step 2: Import CoachProgressPanel and coaches**

Add imports at the top of `Dashboard.tsx`:

```tsx
import CoachProgressPanel from '@/components/CoachProgressPanel';
import { instructors, assessments, coaches, STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
```

(coaches is being added to the existing mock-data import)

- [ ] **Step 3: Add the CoachProgressPanel to the dashboard layout**

Place it after the Development Stages / KeyElementHeatmap grid and before the Instructor Cards section:

```tsx
{/* Coach Progress */}
<CoachProgressPanel
  coaches={coaches}
  completedSessionIds={completedSessionIds}
  onPrepSession={() => onNavigate('coach-path')}
/>
```

- [ ] **Step 4: Verify in browser**

Open http://localhost:5173. On the Dashboard, scroll down — you should see the Coach Progress card with:
- Aisha Brown — Stage 4, progress bar ~60%, next session title, Prep button
- Alex Rivera — Stage 2, progress bar ~7%, next session title, Prep button
- Clicking "Prep" navigates to Club Coach Path

- [ ] **Step 5: Commit**

```bash
git add src/pages/Dashboard.tsx
git commit -m "feat: add Coach Progress section to Dashboard"
```

---

## Self-Review

**Spec coverage:**
- [x] Dashboard shows all coaches' stage, sessions completed, next steps → Task 4 + 5
- [x] Coaches can only access next session after completing prior ones → Task 3
- [x] Session action plan prep navigation → "Prep" button in CoachProgressPanel (Task 4)

**Placeholder scan:** None. All steps contain exact code.

**Type consistency:**
- `completedSessionIds: Record<string, string[]>` used consistently in App → Dashboard → CoachProgressPanel
- `completedSessionIds: string[]` (flat) used consistently in App → ClubCoachPath
- `onCompleteSession(sessionId: string)` matches the handler signature in App.tsx
