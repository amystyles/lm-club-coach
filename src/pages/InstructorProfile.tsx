import type { KeyElement, Stage, Instructor } from '@/data/types';
import { instructors, assessments, coaches, STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  if (lmqLevel >= 7) return 'border border-green-200 text-green-700 bg-green-50';
  if (lmqLevel >= 4) return 'border border-amber-200 text-amber-700 bg-amber-50';
  return 'border border-red-200 text-red-700 bg-red-50';
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
  'Not yet assessed': 'bg-slate-100 text-slate-500',
  'Novice': 'bg-slate-100 text-slate-600',
  'Advanced Beginner': 'bg-blue-50 text-blue-700',
  'Competent': 'bg-amber-50 text-amber-700',
  'Proficient': 'bg-green-50 text-green-700',
  'Expert': 'bg-lm-dark text-white',
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
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 80% at 85% 50%, rgba(0,255,99,0.07) 0%, transparent 70%)',
          }}
        />
        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
        />

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
          <CardHeader className="pb-3">
            <CardTitle>Key Element Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
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
        <TrustMap instructor={instructor} />

        {/* Section 3: Dreyfus Stage by Domain */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Dreyfus Stage by Domain</CardTitle>
            <p className="text-xs text-muted-foreground">Coaching should be different for each skill</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {KEY_ELEMENTS.map(element => {
              const grade = getGrade(instructor, element);
              const dreyfus = getDreyfusStage(grade, element, instructor.stage);
              const guidance = DREYFUS_GUIDANCE[dreyfus];
              const badgeClass = DREYFUS_BADGE[dreyfus];
              return (
                <div key={element} className="flex items-center gap-3 flex-wrap">
                  <span className="w-28 text-sm font-medium text-foreground flex-shrink-0">
                    {KEY_ELEMENT_LABELS[element]}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${badgeClass}`}>
                    {dreyfus}
                  </span>
                  <span className="flex-1 text-xs italic text-muted-foreground bg-lm-subtle px-3 py-1 rounded min-w-0">
                    {guidance}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Section 4: Assessment History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {completedAssessments.map(a => {
                    const assessorCoach = coaches.find(c => c.id === a.assessorId);
                    return (
                      <tr key={a.id}>
                        <td className="py-2 pr-3 text-xs">{a.date}</td>
                        <td className="py-2 pr-3 text-xs">{a.program}</td>
                        <td className="py-2 pr-3 text-xs">{TYPE_LABELS[a.type] ?? a.type}</td>
                        <td className="py-2 pr-3 text-xs">{assessorCoach?.name ?? a.assessorId}</td>
                        <td className="py-2 text-xs text-right font-medium">L{a.overallLevel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Current Focus */}
        <Card className="border-l-4 border-lm-green bg-lm-subtle/40">
          <CardHeader className="pb-2">
            <CardTitle>Current Focus</CardTitle>
            <p className="text-xs text-muted-foreground">Implementation Intention</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic text-foreground">
              {INTENTIONS[instructor.priorityElement]}
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
