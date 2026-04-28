import { useState } from 'react';
import type { KeyElement, Stage, Instructor } from '@/data/types';
import { STAGE_DATA, KEY_ELEMENT_LABELS, LM_PROGRAMS } from '@/data/mock-data';
import { useData } from '@/context/DataContext';
import AssessGradesSheet from '@/components/AssessGradesSheet';
import AssessTrustSheet from '@/components/AssessTrustSheet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Info } from 'lucide-react';
import TrustMap from '@/components/profile/TrustMap';

interface InstructorProfileProps {
  instructorId: string;
  onBack: () => void;
  source: 'dashboard' | 'roster';
}

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

function getGrade(instructor: Instructor, element: KeyElement): number | null {
  return instructor.grades.find(g => g.element === element)?.grade ?? null;
}

function pillStyle(lmqLevel: number): string {
  if (lmqLevel >= 7) return 'border border-green-500/20 text-green-700 bg-green-500/10 dark:text-green-400 dark:border-green-500/30';
  if (lmqLevel >= 4) return 'border border-amber-500/20 text-amber-700 bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30';
  return 'border border-red-500/20 text-red-600 bg-red-500/10 dark:text-red-400 dark:border-red-500/30';
}

type DreyfusStage = 'Not yet assessed' | 'Novice' | 'Advanced Beginner' | 'Competent' | 'Proficient' | 'Expert';

function getDreyfusStage(grade: number | null, element: KeyElement, stage: Stage): DreyfusStage {
  if (grade === null) return 'Not yet assessed';
  if (grade === 1) return stage <= 2 ? 'Novice' : 'Advanced Beginner';
  if (grade === 2) return (element === 'choreography' || stage === 5) ? 'Proficient' : 'Competent';
  return 'Expert';
}

const DREYFUS_GUIDANCE: Record<DreyfusStage, string> = {
  'Not yet assessed': 'Observe — this element is not yet in scope',
  'Novice': 'Direct — give specific instructions and checklists',
  'Advanced Beginner': 'Guide — demonstrate and explain why',
  'Competent': 'Facilitate — ask questions, let them problem-solve',
  'Proficient': 'Consult — prompt reflection, they lead',
  'Expert': 'Delegate — support their mentoring of others',
};

const DREYFUS_BADGE: Record<DreyfusStage, string> = {
  'Not yet assessed': 'bg-muted text-muted-foreground',
  'Novice': 'bg-muted text-muted-foreground',
  'Advanced Beginner': 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  'Competent': 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Proficient': 'bg-green-500/10 text-green-700 dark:text-green-400',
  'Expert': 'bg-foreground text-background',
};

const TYPE_LABELS: Record<string, string> = {
  quarterly: 'Quarterly Review',
  observation: 'Observation',
  certification: 'Certification',
  'grade-review': 'Grade Review',
};

const INTENTIONS: Record<KeyElement, string> = {
  connection: "If I'm coaching a working track, then I will scan all four quadrants and use one participant's name before the track ends.",
  choreography: "If I feel myself falling behind the music in a transition, then I will hold the current move for one extra count, reset my timing, and cue the next exercise cleanly.",
  coaching: "If I see someone struggling with form, then I will move toward them, mirror the correct movement, and give one specific correction.",
  technique: "If I begin the squat track, then I will check my own alignment in the mirror and demonstrate one perfect rep before cueing participants.",
  performance: "If the music peaks, then I will commit fully to the energy — no holding back — and let my expression lead the room.",
};

export function InstructorProfile({ instructorId, onBack, source }: InstructorProfileProps) {
  const [dreyfusInfoOpen, setDreyfusInfoOpen] = useState(false);
  const [assessOpen, setAssessOpen] = useState(false);
  const [trustAssessOpen, setTrustAssessOpen] = useState(false);
  const { instructors, assessments } = useData();
  const instructor = instructors.find(i => i.id === instructorId);

  if (!instructor) {
    return (
      <div className="p-8">
        <Button onClick={onBack} variant="outline">← Back</Button>
        <p className="mt-4 text-red-600">Instructor not found</p>
      </div>
    );
  }

  const stageInfo = STAGE_DATA.find(s => s.stage === instructor.stage);
  const completedAssessments = assessments
    .filter(a => a.instructorId === instructorId && a.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const backLabel = source === 'roster' ? '← Back to Team' : '← Back to Dashboard';

  return (
    <div className="min-h-screen bg-background -mx-6 -mt-6">

      {/* Header banner */}
      <div
        className="relative overflow-hidden px-10 pt-10 pb-12"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 60%, #0d1a0d 100%)',
          borderTop: '3px solid #00FF63',
        }}
      >
        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 90% at 92% 70%, rgba(0,255,99,0.10) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 45% 55% at 55% 0%, rgba(0,255,99,0.05) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 35% 50% at -8% 30%, rgba(0,180,255,0.04) 0%, transparent 55%)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.055 }} />
        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
        />
        {/* Topographic contour ellipses */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 185" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <ellipse key={i} cx={1340} cy={160} rx={(i + 1) * 86} ry={(i + 1) * 86 * 0.28} fill="none" stroke="#00FF63" strokeWidth={1} strokeOpacity={0.07} />
          ))}
        </svg>
        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,99,0.25) 25%, rgba(0,255,99,0.45) 50%, rgba(0,255,99,0.25) 75%, transparent 100%)' }} />

        <div className="relative">
          {/* Back button — label treatment matching DP */}
          <div className="flex items-center gap-3 mb-10">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-white/50 hover:text-white hover:bg-white/10 -ml-2 text-sm p-2 h-auto"
            >
              {backLabel}
            </Button>
          </div>

          {/* Label line — mirrors "Instructor Development" label in DP */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-lm-green/60" />
            <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">
              Instructor Profile
            </span>
          </div>

          {/* Name + avatar row */}
          <div className="flex items-center gap-5 mb-5">
            <Avatar className="h-14 w-14 flex-shrink-0">
              <AvatarFallback className="text-lm-dark text-base font-bold" style={{ backgroundColor: '#00FF63' }}>
                {instructor.initials}
              </AvatarFallback>
            </Avatar>
            <h1 className="font-display font-bold leading-none text-white text-5xl md:text-6xl">
              {instructor.name}
            </h1>
          </div>

          {/* Stage badge + program pills */}
          <div className="flex items-center gap-2 flex-wrap pl-[4.75rem]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white/70 border border-white/15">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: stageInfo?.color ?? '#888' }}
              />
              {stageInfo?.name ?? `Stage ${instructor.stage}`}
            </span>
            {instructor.programs.map(program => (
              <span
                key={program.name}
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pillStyle(program.lmqLevel)}`}
              >
                {program.name} L{program.lmqLevel}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full p-6 space-y-6">

        {/* Section 1: Key Element Profile */}
        <Card>
          <CardHeader className="p-0">
            <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
              <div className="flex-1">
                <CardTitle className="text-white text-sm leading-tight">Key Element Profile</CardTitle>
              </div>
              <button
                onClick={() => setAssessOpen(true)}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors"
                style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
              >
                Assess
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            {KEY_ELEMENTS.map(element => {
              const grade = getGrade(instructor, element);
              const isChoreography = element === 'choreography';
              const label = KEY_ELEMENT_LABELS[element];

              let barWidthClass = '';
              let barColorClass = '';
              let gradeLabel = 'N/A';

              if (grade !== null) {
                // Choreography G2 is the ceiling — render full bar
                if (isChoreography && grade === 2) {
                  barWidthClass = 'w-full';
                } else if (grade === 1) {
                  barWidthClass = 'w-1/3';
                } else if (grade === 2) {
                  barWidthClass = 'w-2/3';
                } else {
                  barWidthClass = 'w-full';
                }
                barColorClass = grade === 1 ? 'bg-red-400' : grade === 2 ? 'bg-amber-400' : 'bg-green-500';
                gradeLabel = isChoreography && grade === 2 ? 'G2 (max)' : `G${grade}`;
              }

              return (
                <div key={element} className="flex items-center gap-3">
                  <span className="w-28 text-sm font-medium text-foreground flex-shrink-0">{label}</span>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    {grade !== null && (
                      <div className={`h-full rounded-full ${barWidthClass} ${barColorClass}`} />
                    )}
                  </div>
                  <span className={`w-16 text-xs font-medium text-right flex-shrink-0 ${grade === null ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {gradeLabel}
                  </span>
                </div>
              );
            })}

            <div className="mt-2 flex items-center gap-2 bg-lm-subtle border-l-4 border-lm-green rounded px-3 py-2">
              <span className="text-xs font-semibold text-foreground">
                ↑ Priority Focus: {KEY_ELEMENT_LABELS[instructor.priorityElement]} — focus for next observation cycle
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Teaching Trust Map */}
        <TrustMap instructor={instructor} onAssess={() => setTrustAssessOpen(true)} />

        {/* Section 3: Dreyfus Stage by Domain */}
        <Card>
          <CardHeader className="p-0">
            <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
              <div className="flex-1">
                <CardTitle className="text-white text-sm leading-tight">Dreyfus Stage by Domain</CardTitle>
                <p className="text-white/40 text-xs mt-0.5">Skills & Observation Guide</p>
              </div>
              <button
                onClick={() => setAssessOpen(true)}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors mr-1"
                style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
              >
                Assess
              </button>
              <button
                onClick={() => setDreyfusInfoOpen(o => !o)}
                className="flex-shrink-0 text-white/40 hover:text-lm-green transition-colors"
                aria-label="About the Dreyfus model"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            {dreyfusInfoOpen && (
              <div className="px-5 py-4 bg-[#111] border-b border-white/8 space-y-4">
                <div>
                  <p className="text-white text-xs font-bold mb-1">What is the Dreyfus Model?</p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    The Dreyfus model maps how instructors develop skill — from following rules to intuitive mastery. The key insight: an instructor can be at different stages for different Key Elements. Someone who is Proficient in Choreography might be a Novice in Connection. Each stage tells you <span className="text-white/80 font-semibold">how</span> to coach that specific skill.
                  </p>
                </div>
                <div className="space-y-2">
                  {([
                    { stage: 'Novice', desc: 'Needs clear rules and step-by-step instruction.', approach: 'Tell them exactly what to do.' },
                    { stage: 'Advanced Beginner', desc: 'Starting to recognise patterns.', approach: 'Guide — demonstrate and explain why.' },
                    { stage: 'Competent', desc: 'Can problem-solve with support.', approach: 'Facilitate — ask questions, let them work through it.' },
                    { stage: 'Proficient', desc: 'Strong intuition, mostly self-directed.', approach: 'Consult — prompt reflection, they lead.' },
                    { stage: 'Expert', desc: 'Intuitive mastery.', approach: 'Challenge — stretch their thinking.' },
                  ] as const).map(({ stage, desc, approach }) => (
                    <div key={stage} className="flex gap-2.5 text-xs">
                      <span className="text-white/50 font-semibold w-32 flex-shrink-0">{stage}</span>
                      <span className="text-white/40">{desc} <span className="text-lm-green/80 italic">{approach}</span></span>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed border-t border-white/8 pt-3">
                  The <span className="text-white/60 italic">italicised text</span> next to each stage below is your coaching approach — it tells you how to coach this instructor for that specific skill. The supervision levels in the Trust Map above are derived from these stages.
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-4 pb-5">
            {/* LMQ + grade summary row */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-lm-sunken flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted">LMQ Level</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-lm-dark text-white text-sm font-bold font-display">{instructor.lmqLevel}</span>
              </div>
              <div className="w-px h-4 bg-lm-sunken" />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted">Grades</span>
                {KEY_ELEMENTS.map(el => {
                  const g = getGrade(instructor, el);
                  return (
                    <span key={el} className="text-[10px] font-semibold text-lm-ink-mid">
                      {KEY_ELEMENT_LABELS[el].slice(0,3)}: <span className={g ? 'text-lm-dark font-bold' : 'text-lm-ink-muted'}>{g ? `G${g}` : '—'}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {KEY_ELEMENTS.map(element => {
                const grade = getGrade(instructor, element);
                const dreyfus = getDreyfusStage(grade, element, instructor.stage);
                const guidance = DREYFUS_GUIDANCE[dreyfus];
                const badgeClass = DREYFUS_BADGE[dreyfus];
                const GRADE_PILL: Record<number, string> = {
                  1: 'bg-lm-subtle text-lm-ink-mid border border-lm-sunken',
                  2: 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
                  3: 'bg-green-500/10 text-green-700 border border-green-500/20 dark:text-green-400 dark:border-green-500/30',
                };
                return (
                  <div key={element} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-lm-dark flex-1">{KEY_ELEMENT_LABELS[element]}</span>
                      {grade !== null && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${GRADE_PILL[grade]}`}>
                          G{grade}{element === 'choreography' && grade === 2 ? ' (max)' : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap pl-0">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex-shrink-0 ${badgeClass}`}>
                        {dreyfus}
                      </span>
                      <span className="flex-1 text-xs italic text-muted-foreground bg-lm-subtle px-3 py-1 rounded min-w-0">
                        {guidance}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Assessment History */}
        <Card>
          <CardHeader className="p-0">
            <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
              <div>
                <CardTitle className="text-white text-sm leading-tight">Assessment History</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            {completedAssessments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed assessments yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Program</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="text-left py-2 pr-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Assessor</th>
                    <th className="text-right py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {completedAssessments.map(a => (
                    <tr key={a.id}>
                      <td className="py-2 pr-3 text-xs">{a.date}</td>
                      <td className="py-2 pr-3 text-xs">{a.program}</td>
                      <td className="py-2 pr-3 text-xs">{TYPE_LABELS[a.type] ?? a.type}</td>
                      <td className="py-2 pr-3 text-xs text-muted-foreground">—</td>
                      <td className="py-2 text-xs text-right font-medium">L{a.overallLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Current Focus */}
        <Card className="border-l-4 border-lm-green bg-lm-subtle/40">
          <CardHeader className="p-0">
            <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
              <div>
                <CardTitle className="text-white text-sm leading-tight">Current Focus</CardTitle>
                <p className="text-white/40 text-xs mt-0.5">Implementation Intention</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <p className="text-sm italic text-foreground">
              {INTENTIONS[instructor.priorityElement]}
            </p>
          </CardContent>
        </Card>

        {/* Section 6: LM Journey */}
        {(() => {
          const lmProgramSet = new Set(LM_PROGRAMS);
          const nonLmPrograms = instructor.programs.filter(p => !lmProgramSet.has(p.name));
          const lmProgramsOnProfile = instructor.programs.filter(p => lmProgramSet.has(p.name));
          const hasLm = lmProgramsOnProfile.length > 0;
          const hasNonLm = nonLmPrograms.length > 0;
          const noPrograms = instructor.programs.length === 0;

          return (
            <Card>
              <CardHeader className="p-0">
                <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
                  <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-white text-sm leading-tight">LM Journey</CardTitle>
                    <p className="text-white/40 text-xs mt-0.5">Pathway to Les Mills certification & development</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-5">

                {/* 5 Key Elements universal note */}
                <div className="rounded-lg bg-lm-subtle border border-lm-sunken px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1.5">Universal Framework</p>
                  <p className="text-xs text-lm-dark leading-relaxed">
                    The 5 Key Elements — Choreography, Technique, Coaching, Connection, and Performance — are the foundation of great group fitness instruction regardless of format. Every assessment in this app uses this framework, whether the instructor teaches Les Mills or any other program.
                  </p>
                </div>

                {/* LM program status */}
                {hasLm && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-2">Active LM Programs</p>
                    <div className="flex flex-wrap gap-2">
                      {lmProgramsOnProfile.map(p => (
                        <span key={p.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-lm-dark text-white">
                          {p.name}
                          <span className="text-lm-green font-bold">LMQ {p.lmqLevel}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Non-LM programs with pathway nudge */}
                {(hasNonLm || noPrograms) && (
                  <div className="rounded-lg border-2 border-dashed border-lm-green/30 px-4 py-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-lm-green flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="text-xs font-bold text-lm-dark">
                          {noPrograms ? 'No programs added yet' : `Teaching ${nonLmPrograms.map(p => p.name).join(', ')} — not yet LM certified`}
                        </p>
                        <p className="text-xs text-lm-ink-muted mt-0.5 leading-relaxed">
                          The skills being developed here directly translate to LM certification. Grade 1 competency across all 5 Key Elements is the readiness signal for LM Initial Training.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pl-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted">LM Pathway Steps</p>
                      {[
                        { step: '1', label: 'Build G1 across all 5 Key Elements', done: KEY_ELEMENTS.every(el => (instructor.grades.find(g => g.element === el)?.grade ?? 0) >= 1) },
                        { step: '2', label: 'Recommend Initial Training (IT) for a suitable LM program', done: false },
                        { step: '3', label: 'Support through IT → Certification (Stage 1 & 2)', done: instructor.stage >= 3 },
                        { step: '4', label: 'First timetable slot — coach through Stage 3', done: instructor.stage >= 4 },
                        { step: '5', label: 'Ongoing LMQ development through regular assessment', done: instructor.lmqLevel >= 4 },
                      ].map(({ step, label, done }) => (
                        <div key={step} className="flex items-start gap-2.5">
                          <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold mt-0.5 ${done ? 'bg-lm-green text-lm-dark' : 'bg-lm-sunken text-lm-ink-muted'}`}>
                            {done ? '✓' : step}
                          </div>
                          <span className={`text-xs leading-snug ${done ? 'text-lm-ink-mid line-through' : 'text-lm-dark'}`}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key element → LM program alignment */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-3">Key Element → LM Program Alignment</p>
                  <div className="space-y-2">
                    {([
                      { element: 'Choreography', programs: 'BODYPUMP · BODYCOMBAT · BODYATTACK · BODYSTEP', note: 'Accuracy and timing under a structured release framework.' },
                      { element: 'Technique', programs: 'All LM Programs', note: 'LMQ level directly reflects technique mastery and self-correction.' },
                      { element: 'Coaching', programs: 'BODYPUMP · RPM · LES MILLS CORE', note: 'CRC framework — Connect, Recommend, Commend — is the LM coaching model.' },
                      { element: 'Connection', programs: 'BODYJAM · LES MILLS DANCE · BORN TO MOVE', note: 'Look, See & Respond. Making every participant feel seen.' },
                      { element: 'Performance', programs: 'BODYCOMBAT · BODYATTACK · RPM · THE TRIP', note: 'Commitment to the release energy. Leading from the front.' },
                    ] as const).map(({ element, programs, note }) => (
                      <div key={element} className="flex gap-3 py-2 border-b border-lm-sunken last:border-0">
                        <div className="w-24 flex-shrink-0">
                          <p className="text-[11px] font-bold text-lm-dark">{element}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-lm-ink-mid truncate">{programs}</p>
                          <p className="text-[10px] text-lm-ink-muted leading-relaxed mt-0.5">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          );
        })()}

      </div>

      <AssessGradesSheet
        open={assessOpen}
        onClose={() => setAssessOpen(false)}
        instructor={instructor}
      />
      <AssessTrustSheet
        open={trustAssessOpen}
        onClose={() => setTrustAssessOpen(false)}
        instructor={instructor}
      />
    </div>
  );
}
