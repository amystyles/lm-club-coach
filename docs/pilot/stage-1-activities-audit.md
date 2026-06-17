# Stage 1 Activities Audit (Onboarding — 21 items)

**Context:** The Development Pathway screen showing **0/21 COMPLETED** is **Stage 1: Onboarding**, not Stage 2 (IT → Certification). This audit covers those 21 `keActivities` in `src/data/stage-sessions.ts`.

**Pilot programs:** BODYPUMP HEAVY · LES MILLS STRENGTH DEVELOPMENT · LES MILLS SHAPES · THE TRIP

**Legend**

| Tag | Meaning |
|-----|---------|
| **A** | Process only — safe in app; no LM asset required |
| **B** | Process + external link — activity in app; content lives in Releases App / toolbox / LM systems |
| **C** | Too program-specific or IP-heavy in current form — rewrite or defer for pilot |

**Delivery type (proposed)**

| Type | Who uses it |
|------|-------------|
| `coach-activity` | Club Coach / GFM assigns and debriefs |
| `instructor-tool` | Instructor uses before/during/after class (coach note optional) |

---

## Choreography (5)

| # | Activity | A/B/C | Delivery | Pilot notes |
|---|----------|-------|----------|-------------|
| 1 | Choreography Notes Breakdown | **B** | `coach-activity` | Steps are instructor-facing; description is coach-facing. Link to `{notesLabel}` in Releases App — do not embed notes. Strength family shares pattern; Trip uses ride profile language. |
| 2 | Learning Check | **A** | `instructor-tool` | Memory recall — no asset. Rename "compulsory cues" per program if needed. |
| 3 | Allocated Track Preparation | **B** | `instructor-tool` | Masterclass link only (`allocated-track`). Coach checks automaticity in debrief. |
| 4 | Self-Film & Review | **A** | `instructor-tool` | Pure process; ideal pilot tool. Optional reflection field in UI. |
| 5 | Masterclass Video — Voices Off | **B** | `instructor-tool` | Same masterclass link; tests automaticity without presenter voice. |

---

## Technique (3)

| # | Activity | A/B/C | Delivery | Pilot notes |
|---|----------|-------|----------|-------------|
| 6 | Technique Practice Worksheets | **B** | `instructor-tool` | Steps reference N.E.T.T. / Technique Reference — **link to handbook section**, do not paste worksheet content. Trip: bike/setup terminology. |
| 7 | Self-Film & Compare | **B** | `instructor-tool` | Masterclass compare — link out. "Set Position" / ROM language may vary by program family. |
| 8 | Self-Film & Compare (Technique Focus) | **B** | `instructor-tool` | Same as #7; ties to assessment notes when available in app. |

---

## Coaching (3)

| # | Activity | A/B/C | Delivery | Pilot notes |
|---|----------|-------|----------|-------------|
| 9 | Coaching & Scripting Worksheets | **B** | `coach-activity` | Layer 1/2/3 scripting — process in app; full cue lists stay in notes/handbook. |
| 10 | Compulsory Cues Identification | **B** | `instructor-tool` | Highlights in Releases App notes — link only. "Compulsory cues" may not apply equally to Trip/Shapes — use `{cuesLabel}` token. |
| 11 | Scripting Worksheet | **B** | `coach-activity` | Duplicate-ish of #9; consider merging for pilot to reduce maintenance. |

---

## Connection (7)

| # | Activity | A/B/C | Delivery | Pilot notes |
|---|----------|-------|----------|-------------|
| 12 | Connection Tools Reflection | **A** | `coach-activity` | Lists tool names only — no full curriculum. Coach helps pick 2–3 tools. |
| 13 | Facing Fear Tools | **A** | `instructor-tool` | Empowering Belief / Grounding — process only; sensitive; optional private reflection field. |
| 14 | C.R.C. Practice (Connect, Recommend, Commend) | **A** | `instructor-tool` | Rehearsal with partner/mirror — ship as tool; coach observes timing/quality. |
| 15 | **Four Quadrants** | **A** | **`instructor-tool`** | **Priority pilot tool.** Rewrite description to instructor voice; add quadrant checklist + post-class reflection. Coach debrief in collapsed `coachNote`. |
| 16 | C.R.C. In-Class Practice | **A** | `instructor-tool` | Steps already instructor-ready; fix description ("Set the challenge" → instructor framing). |
| 17 | SMARTSTART Practice | **B** | `instructor-tool` | Framework name only; optional link to handbook SMARTSTART section — no full script in app. |
| 18 | Name Game | **A** | `instructor-tool` | Fully portable across all 4 pilot programs. |

---

## Performance (3)

| # | Activity | A/B/C | Delivery | Pilot notes |
|---|----------|-------|----------|-------------|
| 19 | Program Essence Study | **B** | `coach-activity` | Watch masterclass — link out. Essence **descriptions** are IP — coach discusses in person; app shows "what to look for" prompts only. |
| 20 | Energy Mapping | **A** | `instructor-tool` | Music arc mapping — works for strength + Trip with `{sectionTerm}` (track vs ride). |
| 21 | 5 Voices Practice | **B** | `instructor-tool` | Voice names are LM terminology — brief labels OK; full Voice curriculum stays external. Trip may use different vocal patterns — confirm with handbook. |

---

## Summary counts

| Tag | Count | Action |
|-----|-------|--------|
| **A** | 9 | Ship as-is with copy/voice fixes |
| **B** | 12 | Wire `pilot-program-resources` links; no embedded content |
| **C** | 0 | None deferred — but **#11** merge candidate with #9 |

| Delivery | Count |
|----------|-------|
| `instructor-tool` | 14 |
| `coach-activity` | 7 |

---

## Pilot priorities (recommended order)

1. **Four Quadrants** — instructor-tool UI + reflection (Connection KE showcase)
2. **Name Game** + **CRC In-Class** — quick wins, all programs
3. **Self-Film & Review** — no external deps
4. Wire **B** items for **BODYPUMP HEAVY** first (closest to current copy), then Strength Dev / Shapes, then Trip
5. Stage 2 audit — separate pass before IT-stage pilot

---

## What we need from you (see `CONTRIBUTING-DATA.md`)

- Confirmed external URLs per program (Releases App, toolbox, masterclass entry points)
- Optional: Supabase `program_resources` table if links should be editable without deploy
- Optional: PDF handbooks — for **label/URL mapping only**, not pasted into repo
