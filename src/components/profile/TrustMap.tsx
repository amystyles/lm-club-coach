import type { Instructor, KeyElement } from '@/data/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TrustMapProps {
  instructor: Instructor;
}

const ETAs = [
  'Lead a safe warm-up & cool-down',
  'Execute choreography with accuracy & timing',
  'Coach technique corrections in real-time',
  'Adapt intensity for mixed-ability participants',
  'Build connection with every participant',
  'Manage equipment failure or participant injury',
  'Deliver a complete class independently',
  'Mentor newer instructors',
] as const;

const LEVEL_LABELS = [
  'Observe only',
  'Direct supervision',
  'Indirect supervision',
  'Unsupervised',
  'Can supervise others',
] as const;

function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}

function avgPresent(grades: (number | null)[]): number | null {
  const present = grades.filter((g): g is number => g !== null);
  if (present.length === 0) return null;
  return Math.round(present.reduce((s, g) => s + g, 0) / present.length);
}

function getEntrustmentLevel(instructor: Instructor, etaIndex: number): 1 | 2 | 3 | 4 | 5 {
  const cho = getGrade(instructor, 'choreography');
  const tec = getGrade(instructor, 'technique');
  const coa = getGrade(instructor, 'coaching');
  const con = getGrade(instructor, 'connection');
  const stage = instructor.stage;

  let level: number;

  switch (etaIndex) {
    case 0: {
      // warm-up/cool-down: avg(technique, coaching) → G1=2, G2=3, G3=4
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 1: {
      // choreography: null=1, G1=2, G2=4 (G2 is ceiling for choreography)
      if (cho === null) level = 1;
      else if (cho === 1) level = 2;
      else level = 4;
      break;
    }
    case 2: {
      // technique corrections: avg(technique, coaching) → G1=2, G2=3, G3=4
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 3: {
      // adapt intensity: avg of present from {coaching, connection} → G1=2, G2=3, G3=4
      const avg = avgPresent([coa, con]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 4: {
      // build connection: null=1, G1=2, G2=3, G3=4
      if (con === null) level = 1;
      else if (con === 1) level = 2;
      else if (con === 2) level = 3;
      else level = 4;
      break;
    }
    case 5: {
      // manage failure/injury: stage S1-2=1, S3=2, S4=3, S5=4
      if (stage <= 2) level = 1;
      else if (stage === 3) level = 2;
      else if (stage === 4) level = 3;
      else level = 4;
      break;
    }
    case 6: {
      // deliver independently: stage directly maps 1→1, 2→2, 3→3, 4→4, 5→5
      level = stage;
      break;
    }
    case 7: {
      // mentor others: avg(coaching, connection) + stage check
      const avg = avgPresent([coa, con]);
      if (avg === null || avg < 2) level = 1;
      else if (stage < 4) level = 2;
      else if (avg >= 3 && stage === 5) level = 5;
      else level = 3;
      break;
    }
    default:
      level = 1;
  }

  // Stage 1-2 cap: ETAs 0-4 max level 2; ETA 7 max level 1
  if (stage <= 2) {
    if (etaIndex <= 4) level = Math.min(level, 2);
    if (etaIndex === 7) level = Math.min(level, 1);
  }

  return Math.max(1, Math.min(5, level)) as 1 | 2 | 3 | 4 | 5;
}

export default function TrustMap({ instructor }: TrustMapProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Teaching Trust Map</CardTitle>
        <p className="text-xs text-muted-foreground">What can this instructor be trusted to do?</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {ETAs.map((eta, i) => {
          const level = getEntrustmentLevel(instructor, i);
          return (
            <div key={eta} className="flex items-start gap-3">
              <span className="flex-1 text-sm font-medium text-foreground pt-0.5">{eta}</span>
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  {([1, 2, 3, 4, 5] as const).map(dot => (
                    <span
                      key={dot}
                      className={`w-3 h-3 rounded-full ${dot <= level ? 'bg-lm-dark' : 'bg-slate-200 border border-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{LEVEL_LABELS[level - 1]}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
