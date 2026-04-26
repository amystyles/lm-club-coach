import { useState } from 'react';
import type { Instructor, KeyElement } from '@/data/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface TrustMapProps {
  instructor: Instructor;
  onAssess?: () => void;
}

const ETAs = [
  'Execute choreography with accuracy & timing',
  'Lead 2–3 tracks in a team taught class',
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

const LEVEL_COLORS = ['#94a3b8', '#f59e0b', '#3b82f6', '#00FF63', '#a855f7'] as const;

function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}

function avgPresent(grades: (number | null)[]): number | null {
  const present = grades.filter((g): g is number => g !== null);
  if (present.length === 0) return null;
  return Math.round(present.reduce((s, g) => s + g, 0) / present.length);
}

function calcEntrustmentLevel(instructor: Instructor, etaIndex: number): 1 | 2 | 3 | 4 | 5 {
  const cho = getGrade(instructor, 'choreography');
  const tec = getGrade(instructor, 'technique');
  const coa = getGrade(instructor, 'coaching');
  const con = getGrade(instructor, 'connection');
  const stage = instructor.stage;

  let level: number;

  switch (etaIndex) {
    case 0: {
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 1: {
      if (cho === null) level = 1;
      else if (cho === 1) level = 2;
      else level = 4;
      break;
    }
    case 2: {
      const avg = avgPresent([tec, coa]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 3: {
      const avg = avgPresent([coa, con]);
      if (avg === null || avg <= 1) level = 2;
      else if (avg === 2) level = 3;
      else level = 4;
      break;
    }
    case 4: {
      if (con === null) level = 1;
      else if (con === 1) level = 2;
      else if (con === 2) level = 3;
      else level = 4;
      break;
    }
    case 5: {
      if (stage <= 2) level = 1;
      else if (stage === 3) level = 2;
      else if (stage === 4) level = 3;
      else level = 4;
      break;
    }
    case 6: {
      level = stage;
      break;
    }
    case 7: {
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

  if (stage <= 2) {
    if (etaIndex <= 4) level = Math.min(level, 2);
    if (etaIndex === 7) level = Math.min(level, 1);
  }

  return Math.max(1, Math.min(5, level)) as 1 | 2 | 3 | 4 | 5;
}

export default function TrustMap({ instructor, onAssess }: TrustMapProps) {
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
          {onAssess && (
            <button
              onClick={onAssess}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mr-1 transition-colors"
              style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
            >
              Assess
            </button>
          )}
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
              <p className="text-white text-xs font-bold mb-1">Supervision Levels</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Each level tells you how much oversight this instructor needs for a specific task. Levels are auto-calculated from key element grades, but can be manually assessed and overridden by a coach.
              </p>
            </div>
            <div className="space-y-2">
              {LEVEL_LABELS.map((label, i) => (
                <div key={label} className="flex gap-2.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: LEVEL_COLORS[i] }} />
                  <span className="text-white/70 font-semibold w-36 flex-shrink-0">{label}</span>
                  <span className="text-white/40">
                    {['Not yet ready for this task.', 'You must be present.', 'Check in regularly.', 'Self-directed — no monitoring needed.', 'Ready to develop others here.'][i]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed border-t border-white/8 pt-3">
              Supervision is task-specific, not person-specific. An instructor can be <span className="text-white/60">Unsupervised</span> for class delivery and still need <span className="text-white/60">Direct supervision</span> when mentoring.
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-5 space-y-1">
        {ETAs.map((eta, i) => {
          const calculated = calcEntrustmentLevel(instructor, i);
          const override = instructor.trustOverrides[String(i)];
          const level = (override ?? calculated) as 1 | 2 | 3 | 4 | 5;
          const isOverridden = override !== undefined;
          const color = LEVEL_COLORS[level - 1];

          return (
            <div key={eta} className="flex items-center gap-3 py-2.5 border-b border-[#f4f4f4] last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-lm-dark leading-snug">{eta}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-semibold" style={{ color }}>{LEVEL_LABELS[level - 1]}</span>
                  {isOverridden && (
                    <span className="text-[9px] uppercase tracking-widest font-bold text-white bg-lm-dark/70 px-1.5 py-0.5 rounded">assessed</span>
                  )}
                </div>
              </div>

              <div className="flex gap-1 flex-shrink-0">
                {([1, 2, 3, 4, 5] as const).map(dot => (
                  <div
                    key={dot}
                    className="w-3 h-3 rounded-full transition-all"
                    style={{
                      backgroundColor: dot <= level ? color : '#e2e8f0',
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
