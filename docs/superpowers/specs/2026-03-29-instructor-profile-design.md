# Instructor Profile — Design Spec

**Date:** 2026-03-29
**Status:** Approved

## Goal

Replace the existing `InstructorProfile.tsx` with a full-screen detail view giving coaches a complete, actionable picture of one instructor — competency grades, entrustment levels, Dreyfus coaching guidance, assessment history, and a current focus intention.

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| Replace | `src/pages/InstructorProfile.tsx` | Shell + header + sections 1, 3, 4, 5 |
| Create | `src/components/profile/TrustMap.tsx` | Section 2: Teaching Trust Map (ETAs, derivation, 5-dot indicator) |
| Modify | `src/data/mock-data.ts` | Remove connection + performance grades for Mia Thompson (ins-2) and David Kim (ins-7) |
| Modify | `src/App.tsx` | Add `previousPage` state, update `handleViewInstructor` signature to accept source |

---

## Data Model

### N/A Grades

`KeyElementGrade.grade` type stays `Grade = 1 | 2 | 3`. N/A is represented by **absence** — connection and performance entries are removed from the `grades` array for Stage 1 (Onboarding) and Stage 2 (IT → Certification) instructors.

**Instructors to update in mock-data.ts:**
- `ins-2` Mia Thompson (Stage 2): remove `connection` and `performance` from `grades`
- `ins-7` David Kim (Stage 1): remove `connection` and `performance` from `grades`

**Downstream impact:** `KeyElementHeatmap` and `TeamRoster` use `getGradeForElement` which falls back to Grade 1 for absent elements — acceptable approximation for those views.

**Helper used throughout profile:**
```ts
function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}
```
`null` = N/A throughout all profile logic.

---

## Navigation

### App.tsx changes

Add `previousPage` state:
```ts
const [previousPage, setPreviousPage] = useState<'dashboard' | 'roster'>('dashboard');
```

Update `handleViewInstructor` to accept source:
```ts
const handleViewInstructor = (id: string, source: 'dashboard' | 'roster' = 'dashboard') => {
  setSelectedInstructorId(id);
  setPreviousPage(source);
  setActivePage('profile');
};
```

Update `handleBackFromProfile`:
```ts
const handleBackFromProfile = () => {
  setActivePage(previousPage);
  setSelectedInstructorId(null);
};
```

Pass `previousPage` as prop to `InstructorProfile`:
```tsx
<InstructorProfile
  instructorId={selectedInstructorId}
  onBack={handleBackFromProfile}
  source={previousPage}
/>
```

### Dashboard.tsx

Instructor card `onClick`:
```ts
onClick={() => onViewInstructor(instructor.id, 'dashboard')}
```

### TeamRoster.tsx

Row `onClick`:
```ts
onClick={() => onViewInstructor(instructor.id, 'roster')}
```

Both `Dashboard` and `TeamRoster` already receive `onViewInstructor` prop — just add the second argument.

---

## InstructorProfile.tsx — Shell & Props

```ts
interface InstructorProfileProps {
  instructorId: string;
  onBack: () => void;
  source: 'dashboard' | 'roster';
}
```

Back button label: `source === 'roster' ? '← Back to Team' : '← Back to Dashboard'`

---

## Header Section

Dark banner (`bg-lm-dark text-white`) spanning full width. Layout:

```
[← Back to Dashboard]                           (top-left, white ghost button)

[Avatar circle]  [Name — Barlow Condensed, large, white]
                 [Stage badge]  [Program pills with LMQ level]
                 [Per-program LMQ: "BP L3  BC L2  RPM L1"]
```

- Avatar: `h-16 w-16 rounded-full bg-lm-subtle text-lm-dark` with initials
- Stage badge: coloured dot + stage name using `STAGE_DATA[instructor.stage - 1].color`
- Program pills: same red/amber/green style as `ProgramProgress` (`border-red-200 text-red-700 bg-red-50` for L1-3, amber for L4-6, green for L7-10), format `{name} L{lmqLevel}`

---

## Section 1 — Key Element Profile

Card with title "Key Element Profile".

Five rows, one per element in order: Choreography, Technique, Coaching, Connection, Performance.

Each row:
```
[Label]          [████████████░░░░░░░]  G2
```

Bar fill rules:
- Grade 1: 33% width, `bg-red-400`
- Grade 2: 67% width for Technique/Coaching/Connection/Performance; **100% width for Choreography** (G2 is its ceiling), `bg-amber-400`
- Grade 3: 100% width, `bg-green-500`
- N/A (absent grade): grey bar `bg-slate-100`, label shows "N/A" in `text-muted-foreground`

Choreography row appends "(max G2)" to the grade label.

**Priority Focus strip** below bars:
`bg-lm-subtle border-l-4 border-lm-green rounded` showing: `↑ Priority Focus: {elementLabel} — focus for next observation cycle`
Derived from `instructor.priorityElement`.

---

## Section 2 — Teaching Trust Map (`TrustMap.tsx`)

**Props:**
```ts
interface TrustMapProps {
  instructor: Instructor;
}
```

**Level labels:**
```ts
const LEVEL_LABELS = ['Observe only', 'Direct supervision', 'Indirect supervision', 'Unsupervised', 'Can supervise others'];
```

**ETA definitions:**
```ts
const ETAs = [
  'Lead a safe warm-up & cool-down',
  'Execute choreography with accuracy & timing',
  'Coach technique corrections in real-time',
  'Adapt intensity for mixed-ability participants',
  'Build connection with every participant',
  'Manage equipment failure or participant injury',
  'Deliver a complete class independently',
  'Mentor newer instructors',
];
```

**Derivation function — `getEntrustmentLevel(instructor, etaIndex): 1|2|3|4|5`:**

Helper: average of present (non-null) grades only.

| ETA index | Signals | Rule |
|---|---|---|
| 0 (warm-up/cool-down) | avg(technique, coaching) | avg 1→2, avg 2→3, avg 3→4 |
| 1 (choreography) | choreography | null→1, G1→2, G2→4 |
| 2 (technique corrections) | avg(technique, coaching) | avg 1→2, avg 2→3, avg 3→4 |
| 3 (adapt intensity) | avg of present grades from {coaching, connection} | avg 1→2, avg 2→3, avg 3→4 |
| 4 (build connection) | connection | null→1, G1→2, G2→3, G3→4 |
| 5 (manage failure/injury) | stage | S1-2→1, S3→2, S4→3, S5→4 |
| 6 (deliver independently) | stage | S1→1, S2→2, S3→3, S4→4, S5→5 |
| 7 (mentor others) | avg of present grades from {coaching, connection} + stage check | avg<2→1, avg≥2+stage<4→2, avg≥2+stage≥4→3, avg≥3+stage=5→5 |

**Stage 1-2 cap:** ETAs 0–4 are capped at Level 2 max for Stage 1-2 instructors; ETA 7 (mentor others) is capped at Level 1 (Observe only) — a Stage 1-2 instructor cannot yet mentor others (ETAs 5 and 6 use stage directly so no additional cap needed).

**Average rounding:** `Math.round(avg)` before applying grade→level rule.

**Display — each row:**
```
[ETA name — text-sm font-medium]    [● ● ○ ○ ○]
                                     [level label — text-xs muted]
```

Filled dot: `w-3 h-3 rounded-full bg-lm-dark`
Empty dot: `w-3 h-3 rounded-full bg-slate-200 border border-slate-300`

---

## Section 3 — Dreyfus Stage by Domain

Card, title "Dreyfus Stage by Domain", subtitle "Coaching should be different for each skill".

**Derivation — `getDreyfusStage(grade: number | null, element: KeyElement, instructorStage: Stage)`:**

| Condition | Dreyfus Stage |
|---|---|
| grade null (N/A) | — (not yet assessed) |
| grade 1, instructor stage 1-2 | Novice |
| grade 1, instructor stage 3+ | Advanced Beginner |
| grade 2, instructor stage 3-4 | Competent |
| grade 2, instructor stage 5 | Proficient |
| grade 3 | Expert |
| grade 2, choreography (max G2) | Proficient (ceiling for choreography) |

**Coach guidance text:**
```ts
const DREYFUS_GUIDANCE = {
  'Not yet assessed': 'Observe — this element is not yet in scope',
  'Novice': 'Direct — give specific instructions and checklists',
  'Advanced Beginner': 'Guide — demonstrate and explain why',
  'Competent': 'Facilitate — ask questions, let them problem-solve',
  'Proficient': 'Consult — prompt reflection, they lead',
  'Expert': 'Delegate — support their mentoring of others',
};
```

**Each row:**
```
[Element label]   [Stage badge]   [Guidance — bg-lm-subtle italic text-sm px-3 py-1 rounded]
```

Stage badge colours: Novice `bg-slate-100 text-slate-600`, Advanced Beginner `bg-blue-50 text-blue-700`, Competent `bg-amber-50 text-amber-700`, Proficient `bg-green-50 text-green-700`, Expert `bg-lm-dark text-white`.

---

## Section 4 — Assessment History

Card, title "Assessment History". Filter `assessments` to `instructorId` + `status: 'completed'`. Sort most-recent first by `date`.

**Type labels:**
```ts
const TYPE_LABELS: Record<string, string> = {
  quarterly: 'Quarterly Review',
  observation: 'Observation',
  certification: 'Certification',
  'grade-review': 'Grade Review',
};
```

**Assessor name:** look up `assessorId` in coaches array. Fall back to `assessorId` string if not found.

**Table columns:** Date | Program | Type | Assessor | Overall Level

If no completed assessments: `<p className="text-sm text-muted-foreground">No completed assessments yet.</p>`

---

## Section 5 — Current Focus

Card with `border-l-4 border-lm-green bg-lm-subtle/40`. Title "Current Focus", subtitle "Implementation Intention".

**Intentions map:**
```ts
const INTENTIONS: Record<KeyElement, string> = {
  connection: "If I'm coaching a working track, then I will scan all four quadrants and use one participant's name before the track ends.",
  choreography: "If I feel myself falling behind the music in a transition, then I will hold the current move for one extra count, reset my timing, and cue the next exercise cleanly.",
  coaching: "If I see someone struggling with form, then I will move toward them, mirror the correct movement, and give one specific correction.",
  technique: "If I begin the squat track, then I will check my own alignment in the mirror and demonstrate one perfect rep before cueing participants.",
  performance: "If the music peaks, then I will commit fully to the energy — no holding back — and let my expression lead the room.",
};
```

Display as blockquote-style text (`text-sm italic text-foreground`) beneath the subtitle. No edit affordance in this version.

---

## Layout Order (top → bottom)

1. Header banner (dark, full-bleed)
2. Section 1: Key Element Profile
3. Section 2: Teaching Trust Map
4. Section 3: Dreyfus Stage by Domain
5. Section 4: Assessment History
6. Section 5: Current Focus

All sections are Cards separated by `space-y-6` within a `max-w-4xl mx-auto p-6` container.

---

## Out of Scope

- Editing intentions or goals
- Adding new development notes from this view
- Real-time grade updates
- Any changes to `KeyElementHeatmap`, `ProgramProgress`, `LMQReference`, or `FeedbackBuilder`
