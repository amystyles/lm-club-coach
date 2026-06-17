import { supabase } from '@/lib/supabase';

/** Pilot programs with handbook_resources / handbook_pages rows in Supabase */
export const HANDBOOK_PROGRAMS = [
  'BODYPUMP HEAVY',
  'LES MILLS STRENGTH DEVELOPMENT',
  'LES MILLS SHAPES',
  'THE TRIP',
] as const;

export type HandbookProgramCode = (typeof HANDBOOK_PROGRAMS)[number];

export interface HandbookItData {
  toolbox: string | null;
  postToolbox: string | null;
  technique: { title: string; duration: string }[];
  activities: Record<string, string[]>;
}

export interface HandbookResource {
  programCode: string;
  itData: HandbookItData;
  sourceHandbookRelease: string | null;
}

export interface HandbookPages {
  programCode: string;
  pages: Record<string, number>;
  sourceHandbookRelease: string | null;
}

export interface HandbookData {
  resource: HandbookResource;
  pages: HandbookPages;
}

const POST_WORK_VIDEO_PROGRAMS = new Set([
  'refining-choreography',
  'refining-technique',
  'refining-coaching',
  'connection',
  'performance',
]);

const LEARNING_CHECK_BY_ELEMENT: Record<string, string> = {
  Choreography: 'Learning Check — Choreography',
  Technique: 'Learning Check — Technique',
  Coaching: 'Learning Check — Coaching',
  Connection: 'Learning Check — Connection',
  Performance: 'Learning Check — Performance',
};

/** Map app activity titles to handbook_pages keys where they differ */
const TITLE_ALIASES: Record<string, string> = {
  'Self-Film & Review': 'Self-Film & Compare',
  'Self-Film & Compare (Technique Focus)': 'Self-Film & Compare',
  'C.R.C. Practice (Connect, Recommend, Commend)': 'C.R.C.',
  'C.R.C. In-Class Practice': 'C.R.C.',
  'Scripting Worksheet': 'Coaching & Scripting Worksheets',
  'Compulsory Cues Identification': 'Compulsory Cues',
  'Masterclass Video — Voices Off': 'Allocated Track Preparation',
};

export function isHandbookProgram(program: string): program is HandbookProgramCode {
  return (HANDBOOK_PROGRAMS as readonly string[]).includes(program);
}

function mapItData(raw: unknown): HandbookItData {
  const data = (raw ?? {}) as Record<string, unknown>;
  return {
    toolbox: typeof data.toolbox === 'string' ? data.toolbox : null,
    postToolbox: typeof data.postToolbox === 'string' ? data.postToolbox : null,
    technique: Array.isArray(data.technique)
      ? data.technique.map((t) => {
          const row = t as Record<string, string>;
          return { title: row.title ?? '', duration: row.duration ?? '' };
        })
      : [],
    activities: typeof data.activities === 'object' && data.activities !== null
      ? (data.activities as Record<string, string[]>)
      : {},
  };
}

export async function fetchHandbook(programCode: string): Promise<HandbookData | null> {
  const [resourceResult, pagesResult] = await Promise.all([
    supabase
      .from('handbook_resources')
      .select('program_code, it_data, source_handbook_release')
      .eq('program_code', programCode)
      .maybeSingle(),
    supabase
      .from('handbook_pages')
      .select('program_code, pages, source_handbook_release')
      .eq('program_code', programCode)
      .maybeSingle(),
  ]);

  if (resourceResult.error) throw new Error(resourceResult.error.message);
  if (pagesResult.error) throw new Error(pagesResult.error.message);
  if (!resourceResult.data || !pagesResult.data) return null;

  return {
    resource: {
      programCode: resourceResult.data.program_code,
      itData: mapItData(resourceResult.data.it_data),
      sourceHandbookRelease: resourceResult.data.source_handbook_release,
    },
    pages: {
      programCode: pagesResult.data.program_code,
      pages: (pagesResult.data.pages ?? {}) as Record<string, number>,
      sourceHandbookRelease: pagesResult.data.source_handbook_release,
    },
  };
}

/** Resolve handbook page number for an activity title within a Key Element group */
export function resolveHandbookPage(
  activityTitle: string,
  keyElement: string,
  pages: Record<string, number>,
): number | null {
  if (pages[activityTitle] != null) return pages[activityTitle];

  if (activityTitle === 'Learning Check') {
    const learningCheckKey = LEARNING_CHECK_BY_ELEMENT[keyElement];
    if (learningCheckKey && pages[learningCheckKey] != null) {
      return pages[learningCheckKey];
    }
  }

  const alias = TITLE_ALIASES[activityTitle];
  if (alias && pages[alias] != null) return pages[alias];

  const normalized = activityTitle.toLowerCase();
  for (const [key, page] of Object.entries(pages)) {
    const keyLower = key.toLowerCase();
    if (normalized.includes(keyLower) || keyLower.includes(normalized)) {
      return page;
    }
  }

  return null;
}

/** Resolve Vimeo showcase URL for an activity video reference */
export function resolveVideoUrl(
  itData: HandbookItData | null | undefined,
  videoProgram?: string,
): string | null {
  if (!itData?.toolbox && !itData?.postToolbox) return null;
  if (!videoProgram) return itData.toolbox;

  if (POST_WORK_VIDEO_PROGRAMS.has(videoProgram)) {
    return itData.postToolbox ?? itData.toolbox;
  }

  return itData.toolbox;
}
