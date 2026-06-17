import type { CoachPrompt, Session, SessionPlanBlock } from '@/data/stage-sessions';

export interface CustomSessionData {
  coachRole?: {
    summary: string;
    context: string;
    principle: string;
  };
  coachingSession?: {
    what: string;
    why: string;
    how: string[];
    goals?: string[];
    lmqAlignment?: string;
    prompts?: CoachPrompt[];
  };
  sessionPlan?: {
    totalDuration: string;
    format: string;
    blocks: SessionPlanBlock[];
  };
  proTip?: string;
}

export interface CustomSessionFormValues {
  title: string;
  subtitle: string;
  proTip: string;
  coachRoleSummary: string;
  coachRoleContext: string;
  coachRolePrinciple: string;
  what: string;
  why: string;
  how: string;
  goals: string;
  lmqAlignment: string;
  planDuration: string;
  planFormat: string;
  blocks: SessionPlanBlock[];
  promptGroups: CoachPrompt[];
}

export function linesToArray(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function emptyBlock(): SessionPlanBlock {
  return { duration: '5 min', title: '', steps: [''] };
}

export function emptyPromptGroup(): CoachPrompt {
  return { label: '', prompts: [''] };
}

export function defaultFormValues(): CustomSessionFormValues {
  return {
    title: '',
    subtitle: '',
    proTip: '',
    coachRoleSummary: '',
    coachRoleContext: '',
    coachRolePrinciple: '',
    what: '',
    why: '',
    how: '',
    goals: '',
    lmqAlignment: '',
    planDuration: '30 min',
    planFormat: '1:1 conversation',
    blocks: [emptyBlock()],
    promptGroups: [],
  };
}

export function formValuesToSessionData(values: CustomSessionFormValues): CustomSessionData {
  const how = linesToArray(values.how);
  const goals = linesToArray(values.goals);
  const blocks = values.blocks
    .map((block) => ({
      ...block,
      title: block.title.trim(),
      duration: block.duration.trim() || '5 min',
      steps: block.steps.map((step) => step.trim()).filter(Boolean),
      tip: block.tip?.trim() || undefined,
    }))
    .filter((block) => block.title && block.steps.length > 0);

  const promptGroups = values.promptGroups
    .map((group) => ({
      label: group.label.trim(),
      prompts: group.prompts.map((prompt) => prompt.trim()).filter(Boolean),
    }))
    .filter((group) => group.label && group.prompts.length > 0);

  const coachRole =
    values.coachRoleSummary.trim() ||
    values.coachRoleContext.trim() ||
    values.coachRolePrinciple.trim()
      ? {
          summary: values.coachRoleSummary.trim(),
          context: values.coachRoleContext.trim(),
          principle: values.coachRolePrinciple.trim(),
        }
      : undefined;

  const coachingSession =
    values.what.trim() || values.why.trim() || how.length > 0
      ? {
          what: values.what.trim(),
          why: values.why.trim(),
          how,
          goals: goals.length > 0 ? goals : undefined,
          lmqAlignment: values.lmqAlignment.trim() || undefined,
          prompts: promptGroups.length > 0 ? promptGroups : undefined,
        }
      : undefined;

  const sessionPlan =
    values.planDuration.trim() || values.planFormat.trim() || blocks.length > 0
      ? {
          totalDuration: values.planDuration.trim() || '30 min',
          format: values.planFormat.trim() || '1:1 conversation',
          blocks,
        }
      : undefined;

  return {
    coachRole,
    coachingSession,
    sessionPlan,
    proTip: values.proTip.trim() || undefined,
  };
}

export function sessionDataToFormValues(
  title: string,
  subtitle: string,
  duration: string,
  data: CustomSessionData,
): CustomSessionFormValues {
  return {
    title,
    subtitle,
    proTip: data.proTip ?? '',
    coachRoleSummary: data.coachRole?.summary ?? '',
    coachRoleContext: data.coachRole?.context ?? '',
    coachRolePrinciple: data.coachRole?.principle ?? '',
    what: data.coachingSession?.what ?? '',
    why: data.coachingSession?.why ?? '',
    how: (data.coachingSession?.how ?? []).join('\n'),
    goals: (data.coachingSession?.goals ?? []).join('\n'),
    lmqAlignment: data.coachingSession?.lmqAlignment ?? '',
    planDuration: data.sessionPlan?.totalDuration ?? duration ?? '30 min',
    planFormat: data.sessionPlan?.format ?? '1:1 conversation',
    blocks: data.sessionPlan?.blocks?.length ? data.sessionPlan.blocks : [emptyBlock()],
    promptGroups: data.coachingSession?.prompts ?? [],
  };
}

export function buildSessionFromCustomRow(
  rowId: string,
  title: string,
  subtitle: string,
  duration: string,
  sessionData: CustomSessionData,
): Session {
  const planDuration = sessionData.sessionPlan?.totalDuration ?? duration;

  return {
    id: `custom-${rowId}`,
    title,
    subtitle: subtitle || 'Custom session',
    content: [],
    coachRole: sessionData.coachRole,
    coachingSession: sessionData.coachingSession,
    sessionPlan: sessionData.sessionPlan
      ? { ...sessionData.sessionPlan, totalDuration: planDuration }
      : {
          totalDuration: planDuration,
          format: 'Custom session',
          blocks: [],
        },
    proTip: sessionData.proTip,
  };
}
