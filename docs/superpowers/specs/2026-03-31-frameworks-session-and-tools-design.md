# Design: Frameworks Session & Model Reference Tools
**Date:** 2026-03-31  
**Scope:** Club Coach Path — Stage 1 additions

---

## What we're building

Two additions to Stage 1 ("Learn to See") of the Club Coach Pathway:

1. **A new session: "The Frameworks Behind Club Coach"** — inserted as Session 2 (shifting current sessions 2–4 to 3–5)
2. **Three new Tools & Reference entries** — Dreyfus Model, ETAs, SSDL — each as a standalone panel alongside the existing Conversation Templates, Observation Framework, and Intention Builder

---

## Positioning

- **LMQ** = the standard. The north star. Every instructor development decision traces back to it.
- **Club Coach** = the alignment engine. Its purpose is driving instructors toward LMQ excellence.
- **The models** = the methodology. Research-backed reasons why Club Coach does what it does.

---

## Session: "The Frameworks Behind Club Coach"

**Position:** Session 2 in Stage 1 (after Welcome to Club Coach, before Understanding the LMQ)  
**Duration:** 45 min  
**Format:** 1:1 with TAP Coach  

### Coach role
- **Summary:** Guide. You're not teaching theory — you're showing a new Club Coach the tools they're about to use and explaining why they exist.
- **Context:** This session gives new Club Coaches the philosophical foundation before they start using the system. Understanding why Club Coach works the way it does makes every subsequent session more coherent.
- **Principle:** When you understand the why behind a tool, you use it better.

### Session goals
- Coach understands that LMQ is the standard everything in Club Coach is built around
- Coach can name each model and explain in one sentence why Club Coach uses it
- Coach sees how the models connect rather than viewing them as separate frameworks

### Narrative arc (positive framing)
Opens by establishing LMQ as the foundation — then Club Coach as the system built to drive alignment with it. Then each model is introduced as the answer to a real coaching question the new Club Coach will face:

| Coaching question | Model |
|---|---|
| Why does Club Coach assess differently for each Key Element? | Dreyfus Model |
| Why does Club Coach use graduated trust levels instead of pass/fail? | ETAs / Teaching Trust Map |
| Why does the coaching approach change by instructor stage? | SSDL (Grow) |
| Why does every session end with an if-then commitment? | Implementation Intentions |
| Why does Club Coach ask the instructor first before sharing feedback? | E-P-E / Motivational Interviewing |

### Session Plan blocks
1. **Connection recap (5 min)** — Brief check-in from Session 1; any questions about what Club Coach is
2. **LMQ as the standard (5 min)** — Establish LMQ as the north star; Club Coach's purpose is alignment with it
3. **The models walkthrough (25 min)** — ~5 min per model, each anchored to a real coaching question (see table above); TAP Coach introduces each, links it to the tool in the panel
4. **How they connect (5 min)** — Show the models aren't separate — they work as a system: Dreyfus tells you where the instructor is, SSDL tells you how to coach them, ETAs tell you when to trust them, E-P-E is how you have the conversation, Implementation Intentions make change stick
5. **Close & commit (5 min)** — One implementation intention: which model will you consciously apply in your next interaction with an instructor, and in what specific moment?

### Prompts tab
One reflective question per model:
- **Dreyfus:** "Think of an instructor you know well. Where do you think they sit for Choreography vs Connection — are they at the same stage for both?"
- **ETAs:** "For that same instructor — what would you need to see before you'd trust them to deliver a class completely unsupervised?"
- **SSDL:** "How do you currently adjust the way you talk to instructors at different experience levels? What changes?"
- **Implementation Intentions:** "Think of a piece of feedback you've given an instructor that didn't stick. What if-then plan would have made it more likely to land?"
- **E-P-E:** "What's your instinct when you see an instructor do something wrong — to tell them, or to ask them what they noticed first?"

---

## Three new Tools & Reference entries

Each tool follows the same panel pattern as existing tools. Content is reference-grade — deeper than the session intro, designed to be returned to.

### Tool 1: Dreyfus Model
**Sub:** Skill stages & what they mean for coaching  
**Content:**
- What it is: five stages of skill acquisition (Novice → Advanced Beginner → Competent → Proficient → Expert), each requiring qualitatively different coaching
- Why Club Coach uses it: an instructor can be at different stages for different Key Elements — Proficient in Choreography, Novice in Connection. This is why the Dreyfus Stage by Domain card exists in each instructor profile
- The key insight: don't coach the person at a uniform level — coach each skill at its actual stage
- Stage-by-stage coaching approach (matches what's shown in the Instructor Profile panel):
  - Novice: Direct — give specific instructions and checklists
  - Advanced Beginner: Guide — demonstrate and explain why
  - Competent: Facilitate — ask questions, let them problem-solve
  - Proficient: Consult — prompt reflection, they lead
  - Expert: Delegate — support their mentoring of others

### Tool 2: ETAs (Entrustable Teaching Activities)
**Sub:** Trust-based assessment & the Teaching Trust Map  
**Content:**
- What they are: real units of teaching work (not abstract competencies) assessed on a 5-level trust scale
- Why Club Coach uses them: replaces pass/fail with graduated trust — an instructor can be trusted for warm-up delivery but still need supervision for managing mixed-ability participants
- The 5 entrustment levels (matches what's in the Teaching Trust Map on each instructor profile)
- The 8 ETAs used in Club Coach and what each one means
- The key insight: entrustment is about the task, not the person — the same instructor can be at different levels for different activities
- Where to see it: the Teaching Trust Map on any Instructor Profile

### Tool 3: SSDL (Grow's Staged Self-Directed Learning)
**Sub:** Matching your coaching role to the instructor's stage  
**Content:**
- What it is: four stages of learner self-direction, each requiring a different coaching role (Authority → Motivator → Facilitator → Consultant)
- Why Club Coach uses it: the most common coaching failure is a mismatch — applying a directive approach to a self-directed instructor (patronising) or a hands-off approach to a dependent learner (abandoning). Club Coach prevents this by surfacing the right coaching role per skill
- The four stages and roles:
  - S1 Dependent: Coach as Authority — structured checklists, specific drills, directive feedback
  - S2 Interested: Coach as Motivator — curated examples, guided goal-setting, explain the why
  - S3 Involved: Coach as Facilitator — open-ended challenges, questions over answers
  - S4 Self-directed: Coach as Consultant — instructor leads, coach available on request
- The critical insight: an instructor can be S3 for energy and S1 for music-movement integration — same coach, different role, same session
- How it maps to Dreyfus: roughly aligned (Novice = S1, Expert = S4) but SSDL is about motivation and self-direction, Dreyfus is about capability and cognition

---

## Data changes

All changes are in `src/data/coach-path-data.ts`:

1. Insert new session with `id: 'S1-2'` at index 1 of `coachPathStages[1].sessions`. Rename existing session IDs: S1-2 → S1-3, S1-3 → S1-4, S1-4 → S1-5
2. No schema changes needed — new session uses existing `Session` interface fields

All tool changes are in `src/pages/ClubCoachPath.tsx`:

1. Add `ViewMode` union type entries: `'dreyfus-model' | 'etas' | 'ssdl'`
2. Add three tool components: `DreyfusModelTool`, `ETAsTool`, `SSDLTool`
3. Add three entries to the Tools & Reference button list
4. Add three cases to the `viewMode` render switch

---

## Out of scope

- No changes to any other stage's sessions or tools
- No changes to the Instructor Profile (Dreyfus and Trust Map panels stay as-is)
- No backend/persistence — all content is static data, consistent with the rest of the app
