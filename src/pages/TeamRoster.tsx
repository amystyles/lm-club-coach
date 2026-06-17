import { useState, useMemo } from 'react';
import type { Instructor } from '@/data/types';
import { STAGE_DATA, KEY_ELEMENT_LABELS, LM_PROGRAMS } from '@/data/mock-data';
import { useData } from '@/context/DataContext';
import AddInstructorSheet from '@/components/AddInstructorSheet';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ChevronRight, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface TeamRosterProps {
  onViewInstructor: (id: string, source: 'dashboard' | 'roster') => void;
}

const GRADE_COLORS: Record<number, string> = {
  1: 'bg-lm-subtle text-lm-dark border border-lm-sunken',
  2: 'bg-red-50 text-lm-red border border-red-200',
  3: 'bg-lm-green-mid text-lm-dark border border-lm-green/30',
};

const GRADE_LABELS: Record<number, string> = {
  1: 'Grade 1',
  2: 'Grade 2',
  3: 'Grade 3',
};

const RISK_COLORS: Record<string, string> = {
  low: 'bg-lm-subtle text-lm-ink-mid',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  high: 'bg-red-50 text-lm-red border border-red-200',
};

const KEY_ELEMENT_ORDER = [
  'choreography',
  'technique',
  'coaching',
  'connection',
  'performance',
] as const;

function getGradeForElement(instructor: Instructor, element: string): number {
  const grade = instructor.grades.find((g) => g.element === element);
  return grade?.grade || 1;
}

function formatDate(dateString: string): string {
  if (dateString === 'N/A' || !dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function TeamRoster({ onViewInstructor }: TeamRosterProps) {
  const { instructors, loading } = useData();

  const [addOpen, setAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedInstructors = useMemo(() => {
    let filtered = [...instructors];

    if (searchTerm) {
      filtered = filtered.filter((inst) =>
        inst.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (stageFilter !== 'all') {
      filtered = filtered.filter((inst) => inst.stage === parseInt(stageFilter));
    }

    if (programFilter !== 'all') {
      filtered = filtered.filter((inst) =>
        inst.programs.some((p) => p.name === programFilter)
      );
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter((inst) => inst.riskLevel === riskFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lmq':
          return b.lmqLevel - a.lmqLevel;
        case 'stage':
          return a.stage - b.stage;
        case 'assessed':
          return (
            new Date(b.lastAssessment).getTime() -
            new Date(a.lastAssessment).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [instructors, searchTerm, stageFilter, programFilter, riskFilter, sortBy]);

  if (loading) {
    return <div className="p-8 text-muted-foreground text-sm">Loading roster…</div>;
  }

  const getStageName = (stage: number): string => {
    const stageData = STAGE_DATA.find((s) => s.stage === stage);
    return stageData?.name || `Stage ${stage}`;
  };

  const getStageColor = (stage: number): string => {
    const stageData = STAGE_DATA.find((s) => s.stage === stage);
    return stageData?.color || '#888';
  };

  const getPriorityElementLabel = (element: string): string => {
    return KEY_ELEMENT_LABELS[element as keyof typeof KEY_ELEMENT_LABELS];
  };

  // Summary stats
  const atRiskCount = instructors.filter((i) => i.riskLevel === 'medium' || i.riskLevel === 'high').length;
  const avgLMQ = instructors.length === 0
    ? '—'
    : (instructors.reduce((sum, i) => sum + i.lmqLevel, 0) / instructors.length).toFixed(1);

  return (
    <div className="-m-6">
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
        <div className="relative flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-lm-green/60" />
              <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">Instructor Team</span>
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-2">Instructor Team</h1>
            <p className="text-white/40 text-sm">{instructors.length} instructors across {STAGE_DATA.length} development stages</p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors focus:outline-none"
            style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
          >
            + Add Instructor
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-t-2 border-t-lm-green">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-lm-subtle flex items-center justify-center">
              <Users className="w-4 h-4 text-lm-ink-mid" />
            </div>
            <div>
              <p className="text-2xl font-bold text-lm-dark font-display">{instructors.length}</p>
              <p className="text-xs text-lm-ink-muted">Total Instructors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-2 border-t-lm-green">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-lm-subtle flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-lm-ink-mid" />
            </div>
            <div>
              <p className="text-2xl font-bold text-lm-dark font-display">{avgLMQ}</p>
              <p className="text-xs text-lm-ink-muted">Avg LMQ Level</p>
            </div>
          </CardContent>
        </Card>
        <Card className={`border-t-2 ${atRiskCount > 0 ? 'border-t-lm-red' : 'border-t-lm-green'}`}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${atRiskCount > 0 ? 'bg-red-50' : 'bg-lm-subtle'}`}>
              <AlertTriangle className={`w-4 h-4 ${atRiskCount > 0 ? 'text-lm-red' : 'text-lm-ink-mid'}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-lm-dark font-display">{atRiskCount}</p>
              <p className="text-xs text-lm-ink-muted">Needs Attention</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lm-ink-muted" />
              <Input
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>

            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {STAGE_DATA.map((stage) => (
                  <SelectItem key={stage.stage} value={stage.stage.toString()}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {LM_PROGRAMS.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="lmq">LMQ Level</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
                <SelectItem value="assessed">Last Assessed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="px-5 py-3 bg-[#0d0d0d] flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <div>
            <p className="text-white text-sm font-bold leading-tight">Instructor Team</p>
            <p className="text-white/40 text-xs mt-0.5">{filteredAndSortedInstructors.length} instructor{filteredAndSortedInstructors.length !== 1 ? 's' : ''} shown</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-lm-subtle hover:bg-lm-subtle border-b border-lm-sunken">
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-48 py-3">
                  Instructor
                </TableHead>
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-40 py-3">
                  Programs
                </TableHead>
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-28 py-3">
                  Stage
                </TableHead>
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-20 text-center py-3">
                  LMQ
                </TableHead>
                {KEY_ELEMENT_ORDER.map((element) => (
                  <TableHead key={element} className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-16 text-center py-3">
                    {KEY_ELEMENT_LABELS[element].slice(0, 3)}
                  </TableHead>
                ))}
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-32 py-3">
                  Priority
                </TableHead>
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-24 py-3">
                  Risk
                </TableHead>
                <TableHead className="text-[10px] font-bold text-lm-ink-muted uppercase tracking-widest w-28 py-3">
                  Last Assessed
                </TableHead>
                <TableHead className="w-12 py-3" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedInstructors.map((instructor) => {
                const priorityLabel = getPriorityElementLabel(instructor.priorityElement);
                const isAtRisk = instructor.riskLevel === 'medium' || instructor.riskLevel === 'high';
                return (
                  <TableRow
                    key={instructor.id}
                    className={`border-b border-lm-sunken transition-colors cursor-pointer group ${
                      isAtRisk ? 'hover:bg-red-50/50' : 'hover:bg-lm-subtle/60'
                    }`}
                    onClick={() => onViewInstructor(instructor.id, 'roster')}
                  >
                    {/* Instructor */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-lm-dark text-white font-semibold text-[10px]">
                            {instructor.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-xs text-lm-dark uppercase tracking-wide">
                          {instructor.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* Programs */}
                    <TableCell className="py-3">
                      <div className="flex gap-1 flex-wrap">
                        {instructor.programs.slice(0, 2).map((program) => (
                          <span
                            key={program.name}
                            className="text-[10px] font-medium text-lm-ink-mid bg-lm-subtle px-2 py-0.5 rounded"
                          >
                            {program.name}
                          </span>
                        ))}
                        {instructor.programs.length > 2 && (
                          <span className="text-[10px] font-medium text-lm-ink-muted bg-lm-subtle px-2 py-0.5 rounded">
                            +{instructor.programs.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Stage */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getStageColor(instructor.stage) }}
                        />
                        <span className="text-xs text-lm-ink-mid uppercase tracking-wide">
                          {getStageName(instructor.stage)}
                        </span>
                      </div>
                    </TableCell>

                    {/* LMQ Level */}
                    <TableCell className="py-3">
                      <div className="text-center">
                        <span className="text-sm font-bold text-lm-dark font-display">
                          {instructor.lmqLevel}
                        </span>
                      </div>
                    </TableCell>

                    {/* 5 Key Elements */}
                    {KEY_ELEMENT_ORDER.map((element) => {
                      const grade = getGradeForElement(instructor, element);
                      const isPriority = instructor.priorityElement === element;
                      return (
                        <TableCell key={element} className="py-3">
                          <div className="flex items-center justify-center relative">
                            <span
                              className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${GRADE_COLORS[grade]}`}
                            >
                              {GRADE_LABELS[grade]}
                            </span>
                            {isPriority && (
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-lm-red rounded-full ring-2 ring-white" />
                            )}
                          </div>
                        </TableCell>
                      );
                    })}

                    {/* Priority Element */}
                    <TableCell className="py-3">
                      <span className="text-xs font-bold text-lm-dark uppercase tracking-wide">
                        {priorityLabel}
                      </span>
                    </TableCell>

                    {/* Risk */}
                    <TableCell className="py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          RISK_COLORS[instructor.riskLevel]
                        }`}
                      >
                        {instructor.riskLevel}
                      </span>
                    </TableCell>

                    {/* Last Assessed */}
                    <TableCell className="py-3">
                      <span className="text-xs text-lm-ink-muted">
                        {formatDate(instructor.lastAssessment)}
                      </span>
                    </TableCell>

                    {/* Arrow */}
                    <TableCell className="py-3">
                      <ChevronRight className="w-4 h-4 text-lm-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-lm-subtle border-t border-lm-sunken">
          <span className="text-xs text-lm-ink-muted">
            Showing{' '}
            <span className="font-semibold text-lm-dark">
              {filteredAndSortedInstructors.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-lm-dark">
              {instructors.length}
            </span>{' '}
            instructors
          </span>
        </div>
      </Card>
      </div>
      <AddInstructorSheet open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
