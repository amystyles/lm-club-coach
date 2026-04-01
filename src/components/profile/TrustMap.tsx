import { useState } from 'react';
import type { Instructor, KeyElement } from '@/data/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface TrustMapProps {
  instructor: Instructor;
}

const ETAs = [
  'Execute choreography with accuracy & timing',
  'Can lead 2–3 tracks safely and effectively in a team taught class',
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
  const [supervisionInfoOpen, setSupervisionInfoOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <div className="flex-1">
            <CardTitle className="text-white text-sm leading-tight">Teaching Trust Map</CardTitle>
            <p className="text-white/40 text-xs mt-0.5">What can this instructor be trusted to do?</p>
          </div>
          <button
            onClick={() => setSupervisionInfoOpen(o => !o)}
            className="flex-shrink-0 text-white/40 hover:text-lm-green transition-colors"
            aria-label="About supervision levels"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
        {supervisionInfoOpen && (
          <div className="px-5 py-4 bg-[#111] border-b border-white/8 space-y-4">
            <div>
              <p className="text-white text-xs font-bold mb-1">What are Supervision Levels?</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Supervision levels tell you how much oversight an instructor needs for each competency. They're derived from the Dreyfus stages and the instructor's demonstrated reliability.
              </p>
            </div>
            <div className="space-y-3">
              {([
                { level: 'Observe only', desc: 'Not yet ready to perform this task. The instructor is still learning the foundations.' },
                { level: 'Direct supervision', desc: 'You need to be present. The instructor is still developing this skill and needs real-time guidance and correction.' },
                { level: 'Indirect supervision', desc: 'You don\'t need to be in the room, but check in regularly. The instructor is competent but benefits from periodic observation.' },
                { level: 'Unsupervised', desc: 'The instructor is self-directed here. Your role is to stretch and challenge, not monitor.' },
                { level: 'Can supervise others', desc: 'This instructor is ready to support and develop others in this area.' },
              ] as const).map(({ level, desc }) => (
                <div key={level} className="flex gap-2.5 text-xs">
                  <span className="text-lm-green/80 font-semibold w-36 flex-shrink-0">{level}</span>
                  <span className="text-white/40">{desc}</span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed border-t border-white/8 pt-3">
              Supervision is about the task, not the person. An instructor can be <span className="text-white/60">Unsupervised</span> for class delivery and still need <span className="text-white/60">Direct supervision</span> when mentoring a new instructor.
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
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
