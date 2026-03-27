import { useState, useMemo } from 'react';
import type { Instructor } from '@/data/types';
import {
  instructors,
  STAGE_DATA,
  KEY_ELEMENT_LABELS,
  KEY_ELEMENT_ICONS,
  LM_PROGRAMS,
} from '@/data/mock-data';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ChevronRight, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface TeamRosterProps {
  onViewInstructor: (id: string) => void;
}

const GRADE_COLORS: Record<number, string> = {
  1: 'bg-lm-dark text-white',
  2: 'bg-lm-red text-white',
  3: 'bg-lm-green text-lm-dark',
};

const GRADE_LABELS: Record<number, string> = {
  1: 'G1',
  2: 'G2',
  3: 'G3',
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
        inst.programs.includes(programFilter)
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
  }, [searchTerm, stageFilter, programFilter, riskFilter, sortBy]);

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
  const avgLMQ = (instructors.reduce((sum, i) => sum + i.lmqLevel, 0) / instructors.length).toFixed(1);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2">Instructor Team</h1>
          <p className="text-sm text-lm-ink-muted mt-1">
            {instructors.length} instructors across {STAGE_DATA.length} development stages
          </p>
        </div>
        <Button variant="dark" size="sm">
          + Add Instructor
        </Button>
      </div>

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
      <Card className="border-t-2 border-t-lm-green overflow-hidden">
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
                    onClick={() => onViewInstructor(instructor.id)}
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
                            key={program}
                            className="text-[10px] font-medium text-lm-ink-mid bg-lm-subtle px-2 py-0.5 rounded"
                          >
                            {program}
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
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-xs font-bold ${GRADE_COLORS[grade]}`}
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
  );
}
