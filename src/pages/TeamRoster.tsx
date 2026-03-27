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

interface TeamRosterProps {
  onViewInstructor: (id: string) => void;
}

const GRADE_COLORS: Record<number, string> = {
  1: 'bg-slate-400',
  2: 'bg-blue-500',
  3: 'bg-green-500',
};

const RISK_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const AVATAR_COLORS: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-teal-500',
  3: 'bg-amber-500',
  4: 'bg-purple-500',
  5: 'bg-rose-500',
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
  if (dateString === 'N/A' || !dateString) return 'N/A';
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

  const getPriorityElementLabel = (
    element: string
  ): { label: string; icon: string } => {
    return {
      label: KEY_ELEMENT_LABELS[element as keyof typeof KEY_ELEMENT_LABELS],
      icon: KEY_ELEMENT_ICONS[element as keyof typeof KEY_ELEMENT_ICONS],
    };
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Roster</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and monitor all instructors across your team
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Add Instructor
        </Button>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Search by Name
              </label>
              <Input
                placeholder="Filter by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Stage
              </label>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {[1, 2, 3, 4, 5].map((stage) => (
                    <SelectItem key={stage} value={stage.toString()}>
                      {getStageName(stage)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Program
              </label>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue />
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Risk Level
              </label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="lmq">LMQ Level</SelectItem>
                  <SelectItem value="stage">Stage</SelectItem>
                  <SelectItem value="assessed">Last Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow className="hover:bg-gray-50">
                <TableHead className="text-xs font-semibold text-gray-700 w-48">
                  Instructor
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-40">
                  Programs
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-28">
                  Stage
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-24 text-center">
                  LMQ Level
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20 text-center">
                  {KEY_ELEMENT_LABELS.choreography.slice(0, 3)}
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20 text-center">
                  {KEY_ELEMENT_LABELS.technique.slice(0, 3)}
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20 text-center">
                  {KEY_ELEMENT_LABELS.coaching.slice(0, 3)}
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20 text-center">
                  {KEY_ELEMENT_LABELS.connection.slice(0, 3)}
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20 text-center">
                  {KEY_ELEMENT_LABELS.performance.slice(0, 3)}
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-32">
                  Priority
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-24">
                  Risk
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-32">
                  Last Assessed
                </TableHead>
                <TableHead className="text-xs font-semibold text-gray-700 w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedInstructors.map((instructor) => {
                const priorityElement = getPriorityElementLabel(
                  instructor.priorityElement
                );
                return (
                  <TableRow
                    key={instructor.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onViewInstructor(instructor.id)}
                      >
                        <Avatar
                          className={`h-8 w-8 text-white font-semibold text-xs ${
                            AVATAR_COLORS[instructor.stage]
                          }`}
                        >
                          <AvatarFallback>
                            {instructor.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {instructor.name}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex gap-1 flex-wrap">
                        {instructor.programs.slice(0, 2).map((program) => (
                          <Badge
                            key={program}
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {program}
                          </Badge>
                        ))}
                        {instructor.programs.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            +{instructor.programs.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {getStageName(instructor.stage)}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="text-center">
                        <span className="font-bold text-gray-900">
                          {instructor.lmqLevel}
                        </span>
                      </div>
                    </TableCell>

                    {KEY_ELEMENT_ORDER.map((element) => {
                      const grade = getGradeForElement(instructor, element);
                      const isPriority = instructor.priorityElement === element;
                      return (
                        <TableCell key={element} className="py-4">
                          <div className="flex items-center justify-center relative">
                            <Badge
                              className={`${GRADE_COLORS[grade]} text-white text-xs font-semibold px-2 py-1`}
                            >
                              G{grade}
                            </Badge>
                            {isPriority && (
                              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                          </div>
                        </TableCell>
                      );
                    })}

                    <TableCell className="py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">
                          {priorityElement.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {priorityElement.label}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <Badge
                        className={`text-xs font-medium ${
                          RISK_COLORS[instructor.riskLevel]
                        }`}
                        variant="outline"
                      >
                        {instructor.riskLevel.charAt(0).toUpperCase() +
                          instructor.riskLevel.slice(1)}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-4">
                      <span className="text-sm text-gray-600">
                        {formatDate(instructor.lastAssessment)}
                      </span>
                    </TableCell>

                    <TableCell className="py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-3 text-blue-600 hover:bg-blue-50"
                        onClick={() => onViewInstructor(instructor.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
        <span className="text-sm text-gray-600">
          Showing{' '}
          <span className="font-semibold text-gray-900">
            {filteredAndSortedInstructors.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900">
            {instructors.length}
          </span>{' '}
          instructors
        </span>
      </div>
    </div>
  );
}
