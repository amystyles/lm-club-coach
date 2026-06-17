/**
 * PILOT ONLY — program resource map (no copyrighted content).
 *
 * Usage:
 *   resolveResource('BODYPUMP HEAVY', 'notesApp') → URL
 *   interpolate('{notesLabel}', program) → display string
 *
 * Replace PLACEHOLDER_* values before production pilot.
 * Do NOT commit real handbook PDFs or choreography text here.
 */

export const PILOT_PROGRAMS = [
  'BODYPUMP HEAVY',
  'LES MILLS STRENGTH DEVELOPMENT',
  'LES MILLS SHAPES',
  'THE TRIP',
] as const;

export type PilotProgram = (typeof PILOT_PROGRAMS)[number];

/** Resource keys referenced by keActivities (video.program / link keys) */
export type ResourceKey =
  | 'releasesApp'           // Choreography / release notes entry
  | 'masterclassAllocated'  // Allocated track / profile masterclass
  | 'masterclassRelease'    // Browse release masterclasses
  | 'techniqueReference'    // Technique worksheets / N.E.T.T. section
  | 'coachingToolbox'       // Layer cues, compulsory cues, scripting
  | 'connectionHandbook'    // Connection tools overview (link only)
  | 'smartstartGuide'       // SMARTSTART section
  | 'certificationToolbox'  // Post-work / cert resources (Stage 2+)
  | 'atPreWork';            // Advanced Training pre-work (later stages)

/** Display tokens — swap per program without changing activity steps */
export interface ProgramLabels {
  notesLabel: string;       // e.g. "Release Notes" | "Choreography Notes" | "Ride profile"
  sectionTerm: string;      // e.g. "track" | "section" | "combination"
  masterclassLabel: string; // e.g. "Masterclass" | "Ride film"
  cuesLabel: string;        // e.g. "Compulsory Cues" | "Key coaching cues"
  hasCompulsoryCues: boolean;
  family: 'strength' | 'cycle';
}

export interface ProgramResources {
  id: PilotProgram;
  labels: ProgramLabels;
  links: Record<ResourceKey, string | null>;
}

export const pilotProgramResources: ProgramResources[] = [
  {
    id: 'BODYPUMP HEAVY',
    labels: {
      notesLabel: 'Release Notes',
      sectionTerm: 'track',
      masterclassLabel: 'Masterclass',
      cuesLabel: 'Compulsory Cues',
      hasCompulsoryCues: true,
      family: 'strength',
    },
    links: {
      releasesApp: 'PLACEHOLDER_BP_HEAVY_RELEASES_APP_URL',
      masterclassAllocated: 'PLACEHOLDER_BP_HEAVY_MASTERCLASS_ALLOCATED_URL',
      masterclassRelease: 'PLACEHOLDER_BP_HEAVY_MASTERCLASS_RELEASE_URL',
      techniqueReference: 'PLACEHOLDER_BP_HEAVY_TECHNIQUE_URL',
      coachingToolbox: 'PLACEHOLDER_BP_HEAVY_COACHING_TOOLBOX_URL',
      connectionHandbook: 'PLACEHOLDER_CONNECTION_TOOLS_URL',
      smartstartGuide: 'PLACEHOLDER_SMARTSTART_URL',
      certificationToolbox: null,
      atPreWork: null,
    },
  },
  {
    id: 'LES MILLS STRENGTH DEVELOPMENT',
    labels: {
      notesLabel: 'Release Notes',
      sectionTerm: 'track',
      masterclassLabel: 'Masterclass',
      cuesLabel: 'Compulsory Cues',
      hasCompulsoryCues: true,
      family: 'strength',
    },
    links: {
      releasesApp: 'PLACEHOLDER_STRENGTH_DEV_RELEASES_APP_URL',
      masterclassAllocated: 'PLACEHOLDER_STRENGTH_DEV_MASTERCLASS_ALLOCATED_URL',
      masterclassRelease: 'PLACEHOLDER_STRENGTH_DEV_MASTERCLASS_RELEASE_URL',
      techniqueReference: 'PLACEHOLDER_STRENGTH_DEV_TECHNIQUE_URL',
      coachingToolbox: 'PLACEHOLDER_STRENGTH_DEV_COACHING_TOOLBOX_URL',
      connectionHandbook: 'PLACEHOLDER_CONNECTION_TOOLS_URL',
      smartstartGuide: 'PLACEHOLDER_SMARTSTART_URL',
      certificationToolbox: null,
      atPreWork: null,
    },
  },
  {
    id: 'LES MILLS SHAPES',
    labels: {
      notesLabel: 'Release Notes',
      sectionTerm: 'track',
      masterclassLabel: 'Masterclass',
      cuesLabel: 'Key coaching cues',
      hasCompulsoryCues: false,
      family: 'strength',
    },
    links: {
      releasesApp: 'PLACEHOLDER_SHAPES_RELEASES_APP_URL',
      masterclassAllocated: 'PLACEHOLDER_SHAPES_MASTERCLASS_ALLOCATED_URL',
      masterclassRelease: 'PLACEHOLDER_SHAPES_MASTERCLASS_RELEASE_URL',
      techniqueReference: 'PLACEHOLDER_SHAPES_TECHNIQUE_URL',
      coachingToolbox: 'PLACEHOLDER_SHAPES_COACHING_TOOLBOX_URL',
      connectionHandbook: 'PLACEHOLDER_CONNECTION_TOOLS_URL',
      smartstartGuide: 'PLACEHOLDER_SMARTSTART_URL',
      certificationToolbox: null,
      atPreWork: null,
    },
  },
  {
    id: 'THE TRIP',
    labels: {
      notesLabel: 'Ride profile',
      sectionTerm: 'section',
      masterclassLabel: 'Ride film',
      cuesLabel: 'Key coaching cues',
      hasCompulsoryCues: false,
      family: 'cycle',
    },
    links: {
      releasesApp: 'PLACEHOLDER_TRIP_RELEASES_APP_URL',
      masterclassAllocated: 'PLACEHOLDER_TRIP_RIDE_FILM_URL',
      masterclassRelease: 'PLACEHOLDER_TRIP_MASTERCLASS_RELEASE_URL',
      techniqueReference: 'PLACEHOLDER_TRIP_TECHNIQUE_URL',
      coachingToolbox: 'PLACEHOLDER_TRIP_COACHING_TOOLBOX_URL',
      connectionHandbook: 'PLACEHOLDER_CONNECTION_TOOLS_URL',
      smartstartGuide: 'PLACEHOLDER_SMARTSTART_URL',
      certificationToolbox: null,
      atPreWork: null,
    },
  },
];

/** Map keActivity video.program slugs → resource keys */
export const activityVideoKeyMap: Record<string, ResourceKey> = {
  'allocated-track': 'masterclassAllocated',
  release: 'masterclassRelease',
  'refining-choreography': 'certificationToolbox',
  'refining-technique': 'certificationToolbox',
  'refining-coaching': 'certificationToolbox',
  connection: 'connectionHandbook',
  performance: 'certificationToolbox',
  'at-pre-work': 'atPreWork',
};

export function getProgramResources(program: string): ProgramResources | undefined {
  return pilotProgramResources.find((p) => p.id === program);
}

export function resolveLink(program: string, key: ResourceKey): string | null {
  return getProgramResources(program)?.links[key] ?? null;
}

export function interpolate(template: string, program: string): string {
  const labels = getProgramResources(program)?.labels;
  if (!labels) return template;
  return template
    .replace(/\{notesLabel\}/g, labels.notesLabel)
    .replace(/\{sectionTerm\}/g, labels.sectionTerm)
    .replace(/\{masterclassLabel\}/g, labels.masterclassLabel)
    .replace(/\{cuesLabel\}/g, labels.cuesLabel);
}
