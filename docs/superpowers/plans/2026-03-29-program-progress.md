# Program Progress Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `ProgramProgress` dashboard component showing each instructor's per-program LMQ level, backed by a type-safe `ProgramEntry` data model.

**Architecture:** Extend `ProgramEntry` type → update mock data → migrate three consumers → create `ProgramProgress` component → wire into Dashboard. Each task is independently compilable; TypeScript is used as the verification gate throughout (no test suite exists in this project).

**Tech Stack:** TypeScript, React, Tailwind CSS, shadcn/ui Card

---

## Files

| Action | Path | Responsibility |
|---|---|---|
| Modify | `src/data/types.ts` | Add `ProgramEntry`, update `Instructor.programs` |
| Modify | `src/data/mock-data.ts` | Replace `string[]` programs with `ProgramEntry[]` for all 8 instructors |
| Modify | `src/pages/Dashboard.tsx` | Migrate badge pills to `program.name` |
| Modify | `src/pages/TeamRoster.tsx` | Migrate filter + badge pills to `program.name` |
| Modify | `src/pages/InstructorProfile.tsx` | Migrate badge display to `program.name` |
| Create | `src/components/ProgramProgress.tsx` | New heatmap component |
| Modify | `src/pages/Dashboard.tsx` | Import + render `ProgramProgress` in grid |

---

## Task 1: Add `ProgramEntry` type and update `Instructor`

**Files:**
- Modify: `src/data/types.ts`

- [ ] **Step 1: Add `ProgramEntry` interface and update `Instructor.programs`**

In `src/data/types.ts`, add the new interface directly above `Instructor` and change the `programs` field:

```ts
export interface ProgramEntry {
  name: string;
  lmqLevel: LMQLevel;
}

export interface Instructor {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  programs: ProgramEntry[];   // ← was: string[]
  stage: Stage;
  lmqLevel: LMQLevel;
  grades: KeyElementGrade[];
  priorityElement: KeyElement;
  mentorId?: string;
  clubId: string;
  joinDate: string;
  lastAssessment: string;
  nextAssessment?: string;
  goals: string[];
  riskLevel: 'low' | 'medium' | 'high';
  certDate?: string;
}
```

- [ ] **Step 2: Verify TypeScript errors (expected)**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1 | head -30
```

Expected: errors in `mock-data.ts`, `Dashboard.tsx`, `TeamRoster.tsx`, `InstructorProfile.tsx` — these are fixed in subsequent tasks.

---

## Task 2: Update mock data — all 8 instructors

**Files:**
- Modify: `src/data/mock-data.ts`

- [ ] **Step 1: Replace `programs` arrays for all 8 instructors**

Apply these exact replacements in `src/data/mock-data.ts`:

**ins-1 Jordan Silva** (currently line 58):
```ts
programs: [
  { name: 'BODYPUMP', lmqLevel: 3 },
  { name: 'BODYCOMBAT', lmqLevel: 2 },
  { name: 'RPM', lmqLevel: 1 },
],
```

**ins-2 Mia Thompson** (currently line 72):
```ts
programs: [
  { name: 'BODYPUMP', lmqLevel: 1 },
  { name: 'LES MILLS CORE', lmqLevel: 1 },
],
```

**ins-3 Alex Rivera** (currently line 86):
```ts
programs: [
  { name: 'BODYCOMBAT', lmqLevel: 7 },
  { name: 'BODYATTACK', lmqLevel: 5 },
  { name: 'BODYPUMP', lmqLevel: 4 },
],
```

**ins-4 Priya Patel** (currently line 100):
```ts
programs: [
  { name: 'BODYBALANCE', lmqLevel: 2 },
  { name: 'LES MILLS YOGA', lmqLevel: 1 },
],
```

**ins-5 Marcus Johnson** (currently line 114):
```ts
programs: [
  { name: 'BODYPUMP', lmqLevel: 5 },
  { name: 'RPM', lmqLevel: 3 },
  { name: 'LES MILLS DANCE', lmqLevel: 2 },
],
```

**ins-6 Kayla Wright** (currently line 128):
```ts
programs: [
  { name: 'LES MILLS DANCE', lmqLevel: 4 },
  { name: 'BODYJAM', lmqLevel: 3 },
],
```

**ins-7 David Kim** (currently line 142):
```ts
programs: [
  { name: 'BODYPUMP', lmqLevel: 1 },
],
```

**ins-8 Aisha Brown** (currently line 156):
```ts
programs: [
  { name: 'BODYPUMP', lmqLevel: 8 },
  { name: 'BODYCOMBAT', lmqLevel: 6 },
  { name: 'BODYATTACK', lmqLevel: 5 },
],
```

Note: `ClubCoach.programs` is a separate `string[]` field on a different interface — do not touch it.

- [ ] **Step 2: Verify — errors should reduce (mock-data now clean)**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1 | grep "mock-data"
```

Expected: no errors in `mock-data.ts`. Errors remain in the three consumer files.

---

## Task 3: Migrate Dashboard instructor card badges

**Files:**
- Modify: `src/pages/Dashboard.tsx` (lines ~224–232)

- [ ] **Step 1: Update program badge pills in instructor cards**

Find this block (around line 224):
```tsx
{instructor.programs.slice(0, 2).map((program) => (
  <Badge key={program} variant="secondary" className="text-xs bg-slate-100">
    {program.length > 12 ? program.slice(0, 10) + '...' : program}
  </Badge>
))}
{instructor.programs.length > 2 && (
  <Badge variant="secondary" className="text-xs bg-slate-100">
    +{instructor.programs.length - 2}
  </Badge>
)}
```

Replace with:
```tsx
{instructor.programs.slice(0, 2).map((program) => (
  <Badge key={program.name} variant="secondary" className="text-xs bg-slate-100">
    {program.name.length > 12 ? program.name.slice(0, 10) + '...' : program.name}
  </Badge>
))}
{instructor.programs.length > 2 && (
  <Badge variant="secondary" className="text-xs bg-slate-100">
    +{instructor.programs.length - 2}
  </Badge>
)}
```

- [ ] **Step 2: Verify Dashboard compiles clean**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1 | grep "Dashboard"
```

Expected: no errors in `Dashboard.tsx`.

---

## Task 4: Migrate TeamRoster filter and badge pills

**Files:**
- Modify: `src/pages/TeamRoster.tsx` (lines ~96–98 and ~329–341)

- [ ] **Step 1: Fix program filter predicate (line ~97)**

Find:
```ts
filtered = filtered.filter((inst) =>
  inst.programs.includes(programFilter)
);
```

Replace with:
```ts
filtered = filtered.filter((inst) =>
  inst.programs.some((p) => p.name === programFilter)
);
```

- [ ] **Step 2: Fix program badge pills in table rows (lines ~329–341)**

Find:
```tsx
{instructor.programs.slice(0, 2).map((program) => (
  <span
    key={program}
    className="text-[10px] font-medium text-lm-ink-mid bg-lm-subtle px-2 py-0.5 rounded"
  >
    {program}
  </span>
))}
{instructor.programs.length > 2 && (
  <span className="text-[10px] font-medium text-lm-ink-muted bg-lm-subtle px-2 py-0.5 rounded">
    +{instructor.programs.length - 2}
  </span>
)}
```

Replace with:
```tsx
{instructor.programs.slice(0, 2).map((program) => (
  <span
    key={program.name}
    className="text-[10px] font-medium text-lm-ink-mid bg-lm-subtle px-2 py-0.5 rounded"
  >
    {program.name}
  </span>
))}
{instructor.programs.length > 2 && (
  <span className="text-[10px] font-medium text-lm-ink-muted bg-lm-subtle px-2 py-0.5 rounded">
    +{instructor.programs.length - 2}
  </span>
)}
```

- [ ] **Step 3: Verify TeamRoster compiles clean**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1 | grep "TeamRoster"
```

Expected: no errors in `TeamRoster.tsx`.

---

## Task 5: Migrate InstructorProfile badge display

**Files:**
- Modify: `src/pages/InstructorProfile.tsx` (lines ~156–160)

- [ ] **Step 1: Fix program badge map**

Find:
```tsx
{instructor.programs.map(program => (
  <Badge key={program} variant="secondary">
    {program}
  </Badge>
))}
```

Replace with:
```tsx
{instructor.programs.map(program => (
  <Badge key={program.name} variant="secondary">
    {program.name}
  </Badge>
))}
```

- [ ] **Step 2: Verify full project compiles clean**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output (zero errors). If any remain, fix before proceeding.

- [ ] **Step 3: Commit the data model migration**

```bash
cd /Users/amy.styles/lm-club-coach && git add src/data/types.ts src/data/mock-data.ts src/pages/Dashboard.tsx src/pages/TeamRoster.tsx src/pages/InstructorProfile.tsx && git commit -m "refactor: migrate Instructor.programs to ProgramEntry[] with per-program LMQ levels"
```

---

## Task 6: Create ProgramProgress component

**Files:**
- Create: `src/components/ProgramProgress.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/ProgramProgress.tsx` with this content:

```tsx
import { instructors } from '@/data/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

function pillStyle(lmqLevel: number): string {
  if (lmqLevel >= 7) return 'border border-green-200 text-green-700 bg-green-50';
  if (lmqLevel >= 4) return 'border border-amber-200 text-amber-700 bg-amber-50';
  return 'border border-red-200 text-red-700 bg-red-50';
}

export default function ProgramProgress() {
  const sorted = [...instructors].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Program Development</CardTitle>
        <p className="text-xs text-muted-foreground">LMQ level per program per instructor</p>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            {sorted.map((instructor) => (
              <tr key={instructor.id}>
                <td className="py-2 pr-4 font-medium text-xs text-foreground w-36 align-middle">
                  {instructor.name}
                </td>
                <td className="py-2 align-middle">
                  <div className="flex flex-wrap gap-1.5">
                    {instructor.programs.map((program) => (
                      <span
                        key={program.name}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pillStyle(program.lmqLevel)}`}
                      >
                        {program.name} L{program.lmqLevel}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output.

---

## Task 7: Wire ProgramProgress into Dashboard

**Files:**
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Add import**

At the top of `src/pages/Dashboard.tsx`, after the `KeyElementHeatmap` import, add:

```tsx
import ProgramProgress from '@/components/ProgramProgress';
```

- [ ] **Step 2: Add full-width row below the charts grid**

In `Dashboard.tsx`, find the closing `</div>` of the `lg:grid-cols-5` grid (the one containing `KeyElementHeatmap` and Development Stages). Add a new row immediately after it:

```tsx
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-5">
          <ProgramProgress />
        </div>
      </div>
```

The section in context looks like:

```tsx
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <KeyElementHeatmap />
        </div>

        <Card className="lg:col-span-2">
          {/* Development Stages */}
          ...
        </Card>
      </div>

      {/* ← insert new grid row here */}

      <div>
        <h2 className="text-lg font-bold mb-4">
          Instructor Cards
        </h2>
```

- [ ] **Step 3: Final compile check**

```bash
cd /Users/amy.styles/lm-club-coach && npx tsc --noEmit 2>&1
```

Expected: no output.

- [ ] **Step 4: Smoke-test in browser**

Dev server should already be running at `http://localhost:5173/`. Open the Dashboard tab and verify:
- Key Element Heatmap still renders correctly
- Program Development table appears below it, full-width
- Each instructor row shows colored program pills (e.g. "BODYPUMP L3" in red, "BODYCOMBAT L7" in green)
- Aisha Brown shows BODYPUMP L8 in green, BODYCOMBAT L6 in amber, BODYATTACK L5 in amber
- TeamRoster program filter still works — filtering by "BODYPUMP" shows only instructors with a BODYPUMP entry
- Clicking an instructor card still opens InstructorProfile with program badges showing names (not `[object Object]`)

- [ ] **Step 5: Commit**

```bash
cd /Users/amy.styles/lm-club-coach && git add src/components/ProgramProgress.tsx src/pages/Dashboard.tsx && git commit -m "feat: add ProgramProgress component to Dashboard"
```
