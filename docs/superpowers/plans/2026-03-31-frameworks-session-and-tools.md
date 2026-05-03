# Frameworks Session & Model Reference Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new Stage 1 session ("The Frameworks Behind Club Coach") and three model reference tools (Dreyfus, ETAs, SSDL) to the Club Coach Pathway.

**Architecture:** All content lives in `src/data/coach-path-data.ts` (session data) and `src/pages/ClubCoachPath.tsx` (tool components + wiring). No new files — both targets already exist and follow established patterns. No schema changes needed; the new session uses existing `Session` interface fields.

**Tech Stack:** React, TypeScript, Tailwind CSS, Lucide icons

---

## File Map

| File | Change |
|---|---|
| `src/data/coach-path-data.ts` | Rename S1-2→S1-3, S1-3→S1-4, S1-4→S1-5; insert new S1-2 session object at index 1 of `coachPathStages[1].sessions` |
| `src/pages/ClubCoachPath.tsx` | Extend `ViewMode` type; add 3 tool components; add 3 sidebar entries; add 3 render cases |

---

## Task 1: Rename existing session IDs and insert new session in coach-path-data.ts

**Files:**
- Modify: `src/data/coach-path-data.ts`

- [ ] **Step 1: Rename the three existing Stage 1 session IDs**

In `src/data/coach-path-data.ts`, find the three existing Stage 1 sessions and update their `id` fields:

```typescript
// S1-2 becomes S1-3
id: 'S1-3',   // was 'S1-2' — Understanding the LMQ

// S1-3 becomes S1-4
id: 'S1-4',   // was 'S1-3' — Your First Observation

// S1-4 becomes S1-5
id: 'S1-5',   // was 'S1-4' — Observation Debrief
```

- [ ] **Step 2: Insert the new S1-2 session at index 1 of `coachPathStages[1].sessions`**

Insert the following object as the second item in the `sessions` array (after the `S1-1` Welcome session):

```typescript
{
  id: 'S1-2',
  title: 'The Frameworks Behind Club Coach',
  subtitle: 'Understanding the system you are about to use',
  coachRole: {
    summary: "Guide. You're not teaching theory — you're showing a new Club Coach the tools they're about to use and why they exist.",
    context: "This session gives new Club Coaches the philosophical foundation before they start using the system. Understanding why Club Coach works the way it does makes every subsequent session more coherent. Don't lecture — use the tools in the reference panel as you walk through each framework.",
    principle: "When you understand the why behind a tool, you use it better.",
  },
  coachingSession: {
    goals: [
      "Coach understands that LMQ is the standard everything in Club Coach is built around",
      "Coach can name each model and explain in one sentence why Club Coach uses it",
      "Coach sees how the models connect as a system, not as separate frameworks",
    ],
    what: "Understand the research behind Club Coach — the five frameworks that explain why the system works the way it does. This is not theory for its own sake: each model maps directly to something you'll use every time you coach an instructor.",
    why: "The world's most effective development systems — medical residencies, elite sports, military training — share a common insight: growth is non-linear and must be coached differently at every stage. Club Coach is built on that insight. Understanding the why behind each tool means you'll use it with intention, not just habit.",
    how: [
      "Open the LMQ Reference and establish it as the north star — the standard Club Coach is built to drive alignment with",
      "Open the Dreyfus Model tool: walk through the five stages of skill acquisition, each requiring qualitatively different coaching",
      "Open the ETAs tool: walk through graduated trust levels that replace pass/fail with a real picture of what an instructor can do unsupervised",
      "Open the SSDL tool: walk through the four coaching roles that adapt to where the instructor sits on the self-direction spectrum",
      "Connect the models as a system: Dreyfus tells you where they are, SSDL tells you how to coach them, ETAs tell you when to trust them, E-P-E is the conversation, Implementation Intentions make change stick",
    ],
    prompts: [
      {
        label: 'Dreyfus',
        prompts: [
          "Think of an instructor you know well. Where do you think they sit for Choreography vs Connection — are they at the same stage for both?",
          "If someone is a Novice in one Key Element and Proficient in another — how should your coaching change between those two conversations?",
        ],
      },
      {
        label: 'ETAs',
        prompts: [
          "For that same instructor — what would you need to see before you'd trust them to deliver a class completely unsupervised?",
          "Where on the Trust Map do you think most instructors in your club sit right now for 'Deliver a complete class independently'?",
        ],
      },
      {
        label: 'SSDL',
        prompts: [
          "How do you currently adjust the way you talk to instructors at different experience levels? What changes — and what stays the same?",
          "Think of a time when you gave an experienced instructor detailed step-by-step instructions. How did that land?",
        ],
      },
      {
        label: 'Implementation Intentions',
        prompts: [
          "Think of a piece of feedback you've given an instructor that didn't stick. What if-then plan would have made it more likely to land?",
          "What is the difference between 'work on your connection' and 'If I start the squat track, I will scan all four quadrants before the first rep'?",
        ],
      },
      {
        label: 'E-P-E',
        prompts: [
          "What is your instinct when you see an instructor do something wrong — to tell them, or to ask them what they noticed first?",
          "Why does asking first change what happens next?",
        ],
      },
    ],
  },
  sessionPlan: {
    totalDuration: '45 min',
    format: '1:1 with TAP Coach',
    blocks: [
      {
        duration: '5 min',
        title: 'Check-In',
        steps: [
          "Brief recap from Session 1 — any questions about Club Coach or the pathway",
          "Frame the session: today is about understanding why Club Coach works the way it does before you start using it",
        ],
      },
      {
        duration: '5 min',
        title: 'LMQ as the North Star',
        steps: [
          "Open the LMQ Reference together",
          "Establish: the LMQ is the standard. Everything in Club Coach traces back to it. Your job as a Club Coach is to drive alignment between each instructor and that standard.",
          "Ask: which of the 5 Key Elements do you feel least confident assessing right now?",
        ],
        tip: "Don't go deep into the LMQ here — that's Session 3. Just establish it as the foundation everything else is built on.",
      },
      {
        duration: '25 min',
        title: 'The Five Frameworks',
        steps: [
          "Dreyfus (5 min): Open the Dreyfus Model tool. Walk through the five stages. Ask: 'Think of an instructor you know — where are they for Choreography vs Connection? Same stage?'",
          "ETAs (5 min): Open the ETAs tool. Walk through the trust levels and the 8 activities. Ask: 'What would you need to see before you'd trust someone to teach completely unsupervised?'",
          "SSDL (5 min): Open the SSDL tool. Walk through the four coaching roles. Ask: 'Have you ever coached someone with the wrong approach for their stage? What happened?'",
          "Implementation Intentions (5 min): Explain the if-then format. Open the Intention Builder. Ask: 'What's the difference between \"work on your connection\" and a specific if-then plan?'",
          "E-P-E (5 min): Explain Elicit–Provide–Elicit. Open Conversation Templates. Ask: 'What happens when you lead with your observation instead of asking first?'",
        ],
        tip: "Keep each to 5 minutes. The depth comes in later sessions — this session is about the map, not the territory.",
      },
      {
        duration: '5 min',
        title: 'How They Connect',
        steps: [
          "Dreyfus tells you where the instructor is. SSDL tells you how to coach them. ETAs tell you when to trust them.",
          "E-P-E is how you have the conversation. Implementation Intentions make the change stick.",
          "LMQ is the standard all of this is in service of.",
        ],
      },
      {
        duration: '5 min',
        title: 'Close & Commit',
        steps: [
          "Ask: which model stands out as most immediately useful to you — and why?",
          "Form one implementation intention together: 'If [specific coaching moment this week], then I will [apply one model specifically].'",
          "Confirm the next session time.",
        ],
      },
    ],
  },
  content: [],
},
```

- [ ] **Step 3: Verify the app builds and Stage 1 shows 5 sessions**

Run: `pnpm dev` (already running) and open http://localhost:5173/

Navigate to Club Coach Path → Stage 1. Confirm:
- Session list shows 5 sessions
- Session 2 is "The Frameworks Behind Club Coach"
- Sessions 3–5 are the original sessions (Understanding the LMQ, Your First Observation, Observation Debrief)
- Brief/Plan/Prompts tabs all render content for the new session

- [ ] **Step 4: Commit**

```bash
git add src/data/coach-path-data.ts
git commit -m "feat: add Frameworks session as Stage 1 session 2, renumber S1-2 through S1-4"
```

---

## Task 2: Add three tool components to ClubCoachPath.tsx

**Files:**
- Modify: `src/pages/ClubCoachPath.tsx`

- [ ] **Step 1: Add Brain, ShieldCheck, and Layers to the Lucide import**

Find the existing import line at the top of `src/pages/ClubCoachPath.tsx`:

```typescript
import {
  AlertTriangle, CheckCircle2, Info, Star, Clock,
  Eye, Megaphone, Check, Target,
  GraduationCap, MessageSquareQuote, NotebookPen, Shield,
  CalendarClock, Users, BookOpen, Plus,
  ChevronRight,
} from 'lucide-react';
```

Add `Brain, ShieldCheck, Layers` to the import:

```typescript
import {
  AlertTriangle, CheckCircle2, Info, Star, Clock,
  Eye, Megaphone, Check, Target,
  GraduationCap, MessageSquareQuote, NotebookPen, Shield,
  CalendarClock, Users, BookOpen, Plus,
  ChevronRight, Brain, ShieldCheck, Layers,
} from 'lucide-react';
```

- [ ] **Step 2: Add the DreyfusModelTool component**

Insert the following component immediately before the `/* ── Main Page ──*/` comment (line ~750 in the original file, after the `IntentionBuilder` closing brace):

```tsx
/* ─────────────────────────────────────────────
   Dreyfus Model Tool
   ───────────────────────────────────────────── */
function DreyfusModelTool() {
  const stages = [
    {
      stage: 'Novice',
      color: '#64748b',
      coachRole: 'Authority',
      description: "Follows rules. Needs step-by-step instruction. Cannot deviate from what they've been taught.",
      approach: 'Direct — give specific instructions and checklists.',
    },
    {
      stage: 'Advanced Beginner',
      color: '#2563EB',
      coachRole: 'Mentor',
      description: 'Starting to recognise patterns. Understands context but still relies on guidelines.',
      approach: 'Guide — demonstrate and explain why.',
    },
    {
      stage: 'Competent',
      color: '#D97706',
      coachRole: 'Facilitator',
      description: 'Can problem-solve with support. Makes conscious choices. Feels responsibility for outcomes.',
      approach: 'Facilitate — ask questions, let them work through it.',
    },
    {
      stage: 'Proficient',
      color: '#059669',
      coachRole: 'Consultant',
      description: 'Strong intuition. Sees the whole picture. Mostly self-directed.',
      approach: 'Consult — prompt reflection, they lead.',
    },
    {
      stage: 'Expert',
      color: '#0a0a0a',
      coachRole: 'Peer',
      description: 'Intuitive mastery. Acts without conscious deliberation. Difficult to articulate their own expertise.',
      approach: 'Delegate — support their mentoring of others.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">The Dreyfus Model</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Skill stages and what they mean for how you coach each Key Element.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          An instructor is not at one stage globally — they are at different stages for different Key Elements. Someone Proficient in Choreography may be a Novice in Connection. Your coaching approach must shift accordingly.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Five Stages</p>
        </div>
        <div className="space-y-3">
          {stages.map((s) => (
            <div key={s.stage} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.stage}
                </span>
                <span className="text-xs text-lm-ink-muted font-medium">Coach as {s.coachRole}</span>
              </div>
              <p className="text-sm text-lm-ink-mid leading-relaxed mb-2">{s.description}</p>
              <p className="text-xs font-semibold text-lm-dark italic">{s.approach}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">Where you see this in Club Coach</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          The <span className="font-semibold text-lm-dark">Dreyfus Stage by Domain</span> card on every Instructor Profile shows each instructor's current stage per Key Element. The italicised coaching approach next to each stage tells you exactly how to coach that skill.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add the ETAsTool component**

Insert immediately after `DreyfusModelTool`:

```tsx
/* ─────────────────────────────────────────────
   ETAs Tool
   ───────────────────────────────────────────── */
function ETAsTool() {
  const levels = [
    { level: 1, label: 'Observe only', description: 'Not yet ready. Still learning the foundations.' },
    { level: 2, label: 'Direct supervision', description: 'You need to be present. Still developing — needs real-time guidance and correction.' },
    { level: 3, label: 'Indirect supervision', description: "You don't need to be in the room, but check in regularly. Competent but benefits from periodic observation." },
    { level: 4, label: 'Unsupervised', description: 'Self-directed. Your role is to stretch and challenge, not monitor.' },
    { level: 5, label: 'Can supervise others', description: 'Ready to support and develop others in this area.' },
  ];

  const etas = [
    'Lead a safe warm-up & cool-down',
    'Execute choreography with accuracy & timing',
    'Coach technique corrections in real-time',
    'Adapt intensity for mixed-ability participants',
    'Build connection with every participant',
    'Manage equipment failure or participant injury',
    'Deliver a complete class independently',
    'Mentor newer instructors',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Entrustable Teaching Activities</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Trust-based assessment and the Teaching Trust Map.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          ETAs ask a different question from pass/fail: not "can this instructor demonstrate competency?" but "can I trust this instructor to do this activity unsupervised?" The answer is different for every activity — and that's the point.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Five Entrustment Levels</p>
        </div>
        <div className="space-y-2">
          {levels.map((l) => (
            <div key={l.level} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lm-dark text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {l.level}
              </span>
              <div>
                <p className="text-sm font-semibold text-lm-dark">{l.label}</p>
                <p className="text-xs text-lm-ink-muted mt-0.5 leading-relaxed">{l.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The 8 Teaching Activities</p>
        </div>
        <div className="space-y-1.5">
          {etas.map((eta, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-white">
              <span className="text-xs font-bold text-lm-ink-muted w-5 flex-shrink-0">{i + 1}</span>
              <span className="text-sm text-lm-ink-mid">{eta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">Where you see this in Club Coach</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          The <span className="font-semibold text-lm-dark">Teaching Trust Map</span> on every Instructor Profile shows the current entrustment level for each of these 8 activities. Entrustment is about the task, not the person — the same instructor can be at Level 4 for one activity and Level 2 for another.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Add the SSDLTool component**

Insert immediately after `ETAsTool`:

```tsx
/* ─────────────────────────────────────────────
   SSDL Tool
   ───────────────────────────────────────────── */
function SSDLTool() {
  const stages = [
    {
      code: 'S1',
      label: 'Dependent',
      role: 'Authority',
      color: '#64748b',
      description: 'Low self-direction. Needs explicit instruction and clear structure to function.',
      approach: "Structured checklists, specific drills, directive feedback. Tell them exactly what to do and why.",
    },
    {
      code: 'S2',
      label: 'Interested',
      role: 'Motivator',
      color: '#2563EB',
      description: 'Moderate self-direction. Responds to motivation. Wants to understand the reasoning behind feedback.',
      approach: "Curated examples, guided goal-setting, explain the why behind your asks.",
    },
    {
      code: 'S3',
      label: 'Involved',
      role: 'Facilitator',
      color: '#D97706',
      description: 'Intermediate self-direction. Explores with guidance. Capable of designing their own solutions.',
      approach: "Open-ended challenges, questions over answers. Let them design their own experiments.",
    },
    {
      code: 'S4',
      label: 'Self-directed',
      role: 'Consultant',
      color: '#059669',
      description: 'High self-direction. Sets own goals. Ready to mentor others.',
      approach: "Available on request. Prompt reflection — the instructor leads. Connect them to the right people.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Staged Self-Directed Learning</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Matching your coaching role to the instructor's stage.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          The most common coaching failure is a mismatch: directing a self-directed instructor feels patronising; going hands-off with a dependent learner feels abandoning. Club Coach surfaces the right coaching role per skill domain — so you never default to one mode for everyone.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Four Stages</p>
        </div>
        <div className="space-y-3">
          {stages.map((s) => (
            <div key={s.code} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.code}: {s.label}
                </span>
                <span className="text-xs text-lm-ink-muted font-medium">Coach as {s.role}</span>
              </div>
              <p className="text-sm text-lm-ink-mid leading-relaxed mb-2">{s.description}</p>
              <p className="text-xs font-semibold text-lm-dark italic">{s.approach}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">How SSDL maps to Dreyfus</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          Dreyfus describes <span className="font-semibold text-lm-dark">cognitive capability</span> — what an instructor can do. SSDL describes <span className="font-semibold text-lm-dark">motivational self-direction</span> — how much they drive their own learning. They often align (a Novice is usually S1) but not always — an experienced instructor returning from a break may be S3 in motivation but S1 in current capability.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify components compile**

Check the terminal running `pnpm dev` for TypeScript errors. Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ClubCoachPath.tsx
git commit -m "feat: add DreyfusModelTool, ETAsTool, SSDLTool components"
```

---

## Task 3: Wire tools into sidebar and render switch

**Files:**
- Modify: `src/pages/ClubCoachPath.tsx`

- [ ] **Step 1: Extend the ViewMode type**

Find:
```typescript
type ViewMode = 'session' | 'conversation-templates' | 'observation-framework' | 'intention-builder';
```

Replace with:
```typescript
type ViewMode = 'session' | 'conversation-templates' | 'observation-framework' | 'intention-builder' | 'dreyfus-model' | 'etas' | 'ssdl';
```

- [ ] **Step 2: Add three entries to the Tools & Reference sidebar list**

Find the existing tools array in the render (around line 927):
```tsx
{([
  { icon: MessageSquareQuote, label: 'Conversation Templates', sub: 'E-P-E scripts & question banks', tool: 'conversation-templates' as ViewMode },
  { icon: Eye, label: 'Observation Framework', sub: 'Structured class observation template', tool: 'observation-framework' as ViewMode },
  { icon: Target, label: 'Intention Builder', sub: 'If–then planning template', tool: 'intention-builder' as ViewMode },
]).map(...)
```

Replace with:
```tsx
{([
  { icon: MessageSquareQuote, label: 'Conversation Templates', sub: 'E-P-E scripts & question banks', tool: 'conversation-templates' as ViewMode },
  { icon: Eye, label: 'Observation Framework', sub: 'Structured class observation template', tool: 'observation-framework' as ViewMode },
  { icon: Target, label: 'Intention Builder', sub: 'If–then planning template', tool: 'intention-builder' as ViewMode },
  { icon: Brain, label: 'Dreyfus Model', sub: 'Skill stages & coaching approach per domain', tool: 'dreyfus-model' as ViewMode },
  { icon: ShieldCheck, label: 'ETAs', sub: 'Trust-based activities & the Teaching Trust Map', tool: 'etas' as ViewMode },
  { icon: Layers, label: 'SSDL', sub: "Matching your coaching role to the instructor's stage", tool: 'ssdl' as ViewMode },
]).map(...)
```

- [ ] **Step 3: Add three render cases to the tool panel switch**

Find:
```tsx
{viewMode === 'conversation-templates' ? (
  <ConversationTemplates />
) : viewMode === 'observation-framework' ? (
  <ObservationFramework />
) : viewMode === 'intention-builder' ? (
  <IntentionBuilder />
) : currentSession ? (
```

Replace with:
```tsx
{viewMode === 'conversation-templates' ? (
  <ConversationTemplates />
) : viewMode === 'observation-framework' ? (
  <ObservationFramework />
) : viewMode === 'intention-builder' ? (
  <IntentionBuilder />
) : viewMode === 'dreyfus-model' ? (
  <DreyfusModelTool />
) : viewMode === 'etas' ? (
  <ETAsTool />
) : viewMode === 'ssdl' ? (
  <SSDLTool />
) : currentSession ? (
```

- [ ] **Step 4: Verify all three tools render correctly**

Open http://localhost:5173/ → Club Coach Path → Stage 1. In the Tools & Reference panel, click each new tool:
- Dreyfus Model → renders five stages with coaching approach
- ETAs → renders five entrustment levels + 8 teaching activities
- SSDL → renders four stages with coaching roles

Check for TypeScript errors in the dev server terminal. Expected: none.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ClubCoachPath.tsx
git commit -m "feat: wire Dreyfus, ETAs, SSDL tools into Club Coach sidebar and render switch"
```

---

## Self-Review

**Spec coverage:**
- [x] New session "The Frameworks Behind Club Coach" as Session 2 in Stage 1 → Task 1
- [x] LMQ positioned as the north star in session narrative → Task 1 (coachingSession.how, sessionPlan blocks)
- [x] Positive framing throughout (no "why standard development fails") → Task 1 content
- [x] Problem-first narrative → Task 1 (sessionPlan "The Five Frameworks" block)
- [x] Prompts tab with one question per model → Task 1 (coachingSession.prompts)
- [x] Session 45 min, 1:1 format → Task 1 (sessionPlan.totalDuration / format)
- [x] Dreyfus tool with 5 stages → Task 2
- [x] ETAs tool with 5 levels + 8 activities → Task 2
- [x] SSDL tool with 4 stages → Task 2
- [x] Three new sidebar entries → Task 3
- [x] Three new render cases → Task 3
- [x] Existing session IDs renumbered → Task 1

**Placeholder scan:** No TBDs, TODOs, or vague steps. All code is complete.

**Type consistency:** `ViewMode` extended in Task 3 Step 1 before use in Step 2. `DreyfusModelTool`, `ETAsTool`, `SSDLTool` named consistently across Tasks 2 and 3. `Brain`, `ShieldCheck`, `Layers` added to import in Task 2 Step 1 before use in Task 3 Step 2.
