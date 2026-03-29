# Program Progress — Design Spec

**Date:** 2026-03-29
**Status:** Approved

## Problem

The current `lmqLevel` on an instructor is a single number, but each program an instructor teaches has its own LMQ level. A single number misrepresents reality and gives coaches no useful signal about where each instructor stands per program.

## Goal

Add a `ProgramProgress` component to the Dashboard that shows every instructor's per-program LMQ level at a glance, using the per-program data already described in the domain.

---

## Data Model Change

### New type in `types.ts`

```ts
export interface ProgramEntry {
  name: string;
  lmqLevel: LMQLevel;
}
```

### Updated `Instructor` interface

```ts
programs: ProgramEntry[];   // was: string[]
```

The top-level `lmqLevel: LMQLevel` field is retained — it is used by the Dashboard "Average LMQ Level" stat card and is out of scope for this change.

### Mock data updates (`mock-data.ts`)

All 8 instructors updated with explicit per-program LMQ values:

| Instructor | Programs |
|---|---|
| Jordan Silva | BODYPUMP L3, BODYCOMBAT L2, RPM L1 |
| Mia Thompson | BODYPUMP L1, LES MILLS CORE L1 |
| Alex Rivera | BODYCOMBAT L7, BODYATTACK L5, BODYPUMP L4 |
| Priya Patel | BODYBALANCE L2, LES MILLS YOGA L1 |
| Marcus Johnson | BODYPUMP L5, RPM L3, LES MILLS DANCE L2 |
| Kayla Wright | LES MILLS DANCE L4, BODYJAM L3 |
| David Kim | BODYPUMP L1 |
| Aisha Brown | BODYPUMP L8, BODYCOMBAT L6, BODYATTACK L5 |

---

## New Component: `ProgramProgress`

**File:** `src/components/ProgramProgress.tsx`

**Data source:** imports `instructors` directly from `@/data/mock-data` (same pattern as `KeyElementHeatmap`).

**Layout:** Card wrapper with title "Program Development" and subtitle "LMQ level per program per instructor". Table rows = instructors sorted alphabetically. Each row: instructor name (left-aligned, font-medium) | program pills.

**Program pill format:** `"BODYPUMP L3"` — inline badge with border, color-coded by level range:
- L1–3: `border-red-200 text-red-700 bg-red-50` (developing)
- L4–6: `border-amber-200 text-amber-700 bg-amber-50` (established)
- L7–10: `border-green-200 text-green-700 bg-green-50` (advanced)

---

## Dashboard Layout

Current `lg:grid-cols-5` row (unchanged):
- `KeyElementHeatmap` — `lg:col-span-3`
- Development Stages — `lg:col-span-2`

New row below, full-width:
- `ProgramProgress` — `lg:col-span-5`

---

## Consumer File Updates

Three existing files use `instructor.programs` as `string[]` and require mechanical migration to `ProgramEntry[]`:

| File | Change |
|---|---|
| `Dashboard.tsx` | Badge pills: `program` → `program.name` |
| `TeamRoster.tsx` | Program filter: `programs.includes(x)` → `programs.some(p => p.name === x)`; badge pills: `program` → `program.name` |
| `InstructorProfile.tsx` | Program list: `program` → `program.name` |

---

## Out of Scope

- Removing or recomputing the top-level `lmqLevel` field
- Editing or adding real program data beyond the 8 specified instructors
- Any changes to `ClubCoachPath`, `LMQReference`, or `FeedbackBuilder`
