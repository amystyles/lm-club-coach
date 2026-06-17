import { useState } from 'react';
import type { Instructor } from '@/data/types';
import { STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { useData } from '@/context/DataContext';
import type { UserProfile } from '@/context/AuthContext';
import KeyElementHeatmap from '@/components/KeyElementHeatmap';
import ProgramProgress from '@/components/ProgramProgress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Users, TrendingUp, ClipboardList, AlertTriangle, ChevronRight } from 'lucide-react';
import CoachProgressPanel from '@/components/CoachProgressPanel';
import SessionNotesReviewPanel from '@/components/SessionNotesReviewPanel';

interface DashboardProps {
  onViewInstructor: (id: string, source: 'dashboard' | 'roster') => void;
  completedSessionIds: Record<string, string[]>;
  onNavigate: (page: string) => void;
  coachProfile: UserProfile | null;
}


const AVATAR_COLORS: Record<number, string> = {
  1: '#0A0A0A',
  2: '#0A0A0A',
  3: '#0A0A0A',
  4: '#0A0A0A',
  5: '#0A0A0A',
  6: '#0A0A0A',
};

const GRADE_COLORS: Record<number, string> = {
  1: 'bg-lm-dark',
  2: 'bg-lm-red',
  3: 'bg-lm-green',
};

const KEY_ELEMENT_ORDER: (keyof typeof KEY_ELEMENT_LABELS)[] = [
  'choreography',
  'technique',
  'coaching',
  'connection',
  'performance',
];

const KEY_ELEMENT_SHORT = {
  choreography: 'C',
  technique: 'T',
  coaching: 'Co',
  connection: 'Cn',
  performance: 'P',
};

function getGradeForElement(instructor: Instructor, element: keyof typeof KEY_ELEMENT_LABELS): number {
  const grade = instructor.grades.find((g) => g.element === element);
  return grade?.grade || 1;
}

function getStageDistribution(instructors: Instructor[]): Record<number, number> {
  const dist: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    dist[i] = 0;
  }
  instructors.forEach((inst) => {
    dist[inst.stage]++;
  });
  return dist;
}

const NEXT_MILESTONE: Record<number, string> = {
  1: 'Complete IT submission',
  2: 'Submit full class video for Certification',
  3: 'Get on club timetable',
  4: 'Eligible for Grade Review',
  5: 'Deepen mastery across all Key Elements',
  6: 'Continue development & mentor others',
};


export default function Dashboard({ onViewInstructor, completedSessionIds, onNavigate, coachProfile }: DashboardProps) {
  const { instructors, assessments, loading } = useData();
  const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set());

  const coaches = coachProfile
    ? [{
        id: coachProfile.id,
        name: coachProfile.name,
        initials: coachProfile.initials,
        coachStage: 1 as const,
        instructorIds: instructors.map((i) => i.id),
        clubId: instructors[0]?.clubId ?? '',
        lmqLevel: 1 as const,
        programs: [],
        yearsTeaching: 0,
        skillsCompleted: [],
        completedSessionIds: completedSessionIds[coachProfile.id] ?? [],
      }]
    : [];

  if (loading) {
    return <div className="p-8 text-muted-foreground text-sm">Loading instructors…</div>;
  }


  const averageLMQ = instructors.length === 0
    ? '—'
    : (instructors.reduce((sum, inst) => sum + inst.lmqLevel, 0) / instructors.length).toFixed(1);

  const assessmentsDue = assessments.filter((a) => a.status === 'scheduled').length;
  const atRiskInstructors = instructors.filter(
    (inst) => inst.riskLevel === 'medium' || inst.riskLevel === 'high'
  ).length;

  const stageDist = getStageDistribution(instructors);

  const toggleStage = (stage: number) => {
    setExpandedStages(prev => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage);
      else next.add(stage);
      return next;
    });
  };

  const scheduledAssessments = assessments.filter((a) => a.status === 'scheduled');

  return (
    <div className="w-full -m-6">
      {/* ── Compact dark hero ── */}
      <div
        className="relative overflow-hidden px-8 pt-10 pb-11"
        style={{
          background: 'linear-gradient(140deg, #060606 0%, #0c0c0c 35%, #091409 65%, #080808 100%)',
          borderTop: '3px solid #00FF63',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 90% at 92% 70%, rgba(0,255,99,0.10) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 45% 55% at 55% 0%, rgba(0,255,99,0.05) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 35% 50% at -8% 30%, rgba(0,180,255,0.04) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.055 }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />
        {/* Topographic contour rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 185" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <ellipse key={i} cx={1340} cy={160} rx={(i + 1) * 86} ry={(i + 1) * 86 * 0.28} fill="none" stroke="#00FF63" strokeWidth={1} strokeOpacity={0.07} />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,99,0.25) 25%, rgba(0,255,99,0.45) 50%, rgba(0,255,99,0.25) 75%, transparent 100%)' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-lm-green/60" />
            <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">Dashboard</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-2">Team Overview</h1>
          <p className="text-white/40 text-sm">Coach dashboard for managing instructor development</p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Instructors', value: instructors.length, sub: `${instructors.filter(i => i.stage >= 3).length} on timetable`, accent: '#00FF63', icon: <Users className="w-3.5 h-3.5" /> },
          { label: 'Avg LMQ Level', value: averageLMQ, sub: 'across all instructors', accent: '#00FF63', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { label: 'Assessments Due', value: assessmentsDue, sub: 'scheduled this period', accent: '#00FF63', icon: <ClipboardList className="w-3.5 h-3.5" /> },
          { label: 'At Risk', value: atRiskInstructors, sub: 'need attention', accent: '#FF623E', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
        ].map(({ label, value, sub, accent, icon }) => (
          <div key={label} className="relative bg-card border border-border rounded-xl overflow-hidden group hover:border-opacity-60 transition-all">
            {/* Accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: accent }} />
            <div className="pl-5 pr-4 pt-4 pb-4">
              {/* Label row */}
              <div className="flex items-center gap-1.5 mb-3">
                <span style={{ color: accent }}>{icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
              </div>
              {/* Number */}
              <p className="font-display font-bold leading-none mb-1.5" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: accent }}>
                {value}
              </p>
              {/* Sub-stat */}
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <KeyElementHeatmap instructors={instructors} />
        </div>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Development Stages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {STAGE_DATA.map((stageInfo) => {
              const count = stageDist[stageInfo.stage] || 0;
              const isExpanded = expandedStages.has(stageInfo.stage);
              const stageInstructors = instructors.filter(i => i.stage === stageInfo.stage);
              return (
                <div key={stageInfo.stage}>
                  <button
                    onClick={() => toggleStage(stageInfo.stage)}
                    className="w-full flex items-center gap-2 py-2 px-1 rounded hover:bg-slate-50 cursor-pointer transition-colors text-left"
                  >
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: stageInfo.color }}
                    >
                      <span className="text-xs font-bold text-white">{stageInfo.stage}</span>
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground truncate">{stageInfo.name}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">({count})</span>
                  </button>

                  <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-10 pb-2 space-y-1.5">
                      {stageInstructors.map(instructor => {
                        const riskBg = instructor.riskLevel === 'high'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800';
                        const riskLabel = instructor.riskLevel === 'high' ? 'High Risk' : 'At Risk';
                        return (
                          <div key={instructor.id} className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground">{instructor.name}</span>
                            <span className="text-xs text-muted-foreground">— {NEXT_MILESTONE[stageInfo.stage]}</span>
                            {instructor.riskLevel !== 'low' && (
                              <Badge className={`text-xs ${riskBg}`} variant="outline">{riskLabel}</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-5">
          <ProgramProgress instructors={instructors} />
        </div>
      </div>

      {/* Coach Progress */}
      <CoachProgressPanel
        coaches={coaches}
        completedSessionIds={completedSessionIds}
        onPrepSession={() => onNavigate('coach-path')}
      />

      <SessionNotesReviewPanel />

      <div>
        <h2 className="text-lg font-bold mb-4">
          Instructor Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {instructors.map((instructor) => {
            const stageInfo = STAGE_DATA.find((s) => s.stage === instructor.stage);
            const stageColor = stageInfo?.color || '#999';
            const isAtRisk = instructor.riskLevel !== 'low';
            const riskLabel = instructor.riskLevel === 'high' ? 'High Risk' : 'At Risk';
            const riskStyle = instructor.riskLevel === 'high'
              ? 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
              : 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400';

            return (
              <div
                key={instructor.id}
                onClick={() => onViewInstructor(instructor.id, 'dashboard')}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                {/* Brand green top bar */}
                <div className="h-[3px] w-full bg-lm-green" />

                <div className="p-5">
                  {/* Header row: avatar + name + LMQ */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: AVATAR_COLORS[instructor.stage] }}
                    >
                      {instructor.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lm-dark text-base leading-tight">{instructor.name}</p>
                      <p className="text-xs text-lm-ink-muted mt-0.5 font-medium">LMQ Level {instructor.lmqLevel}</p>
                    </div>
                    {isAtRisk && (
                      <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${riskStyle}`}>
                        {riskLabel}
                      </span>
                    )}
                  </div>

                  {/* Programs */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {instructor.programs.slice(0, 2).map((program) => (
                      <span key={program.name} className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-lm-subtle text-lm-ink-mid border border-lm-sunken">
                        {program.name.length > 12 ? program.name.slice(0, 10) + '…' : program.name}
                      </span>
                    ))}
                    {instructor.programs.length > 2 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-lm-subtle text-lm-ink-muted border border-lm-sunken">
                        +{instructor.programs.length - 2}
                      </span>
                    )}
                  </div>

                  {/* KE grades row */}
                  <div className="flex gap-1.5 mb-4">
                    {KEY_ELEMENT_ORDER.map((element) => {
                      const grade = getGradeForElement(instructor, element);
                      const gradeColor = GRADE_COLORS[grade];
                      return (
                        <div
                          key={element}
                          className="flex-1 flex flex-col items-center gap-1"
                          title={`${KEY_ELEMENT_LABELS[element]}: Grade ${grade}`}
                        >
                          <div
                            className="w-full h-1.5 rounded-full"
                            style={{ backgroundColor: gradeColor }}
                          />
                          <span className="text-[9px] font-bold text-lm-ink-muted uppercase tracking-wide">
                            {KEY_ELEMENT_SHORT[element]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer: stage + priority */}
                  <div className="flex items-center justify-between pt-3 border-t border-lm-sunken">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: stageColor }}
                      >
                        {instructor.stage}
                      </div>
                      <span className="text-xs font-medium text-lm-ink-mid">{stageInfo?.name}</span>
                    </div>
                    <span className="text-[11px] text-lm-ink-muted">
                      <span className="text-orange-500 font-bold">↑ </span>
                      {KEY_ELEMENT_LABELS[instructor.priorityElement]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader className="p-0">
          <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
            <div>
              <CardTitle className="text-white text-sm leading-tight">Upcoming Assessments</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {scheduledAssessments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-600">No scheduled assessments at this time.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Instructor</TableHead>
                  <TableHead className="text-xs font-semibold">Program</TableHead>
                  <TableHead className="text-xs font-semibold">Date</TableHead>
                  <TableHead className="text-xs font-semibold">Assessor</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledAssessments.map((assessment) => {
                  const instructor = instructors.find((i) => i.id === assessment.instructorId);
                  return (
                    <TableRow key={assessment.id}>
                      <TableCell className="text-sm">{instructor?.name || 'Unknown'}</TableCell>
                      <TableCell className="text-sm">{assessment.program}</TableCell>
                      <TableCell className="text-sm">{assessment.date}</TableCell>
                      <TableCell className="text-sm">{assessment.assessorId}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (instructor) onViewInstructor(instructor.id, 'dashboard');
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
