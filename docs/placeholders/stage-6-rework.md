# Stage 6 Rework — PLACEHOLDER

**Status:** Not started. Do not implement until Stage 5 is validated.

## What needs to change

Stage 6 ("World-Class") currently has generic session content that doesn't reflect the real presenter-level framework. It needs a full replacement similar to what was done for Stage 5.

## Source material

Content to be drawn from: **Section 12 Presenter program cards**

## Framework to implement

- **3 Dimensions** presenter framework
- **Levels 7–10 criteria** (LMQ progression at this stage)
- **Stage ownership** model — how the instructor takes ownership of their own development

## Approach

Same session structure as Stage 5 rework:
- Replace all sessions in the `6:` block of `src/data/stage-sessions.ts`
- Update `subtitle` field to reflect presenter-level framing
- Add `keActivities` grounded in the Section 12 content
- Keep all existing component patterns (coachRole, coachingSession, sessionPlan, prompts tabs)
- Do NOT touch any other stage

## Dependencies

- Stage 5 validated by Amy ✓ (complete this first)
- Section 12 Presenter program cards content provided
