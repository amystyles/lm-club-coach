import type { Instructor } from '@/data/types';
import { instructors, assessments, STAGE_DATA, KEY_ELEMENT_LABELS } from '@/data/mock-data';
import KeyElementHeatmap from '@/components/KeyElementHeatmap';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Users, TrendingUp, ClipboardList, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  onViewInstructor: (id: string) => void;
}


const AVATAR_COLORS: Record<number, string> = {
  1: 'bg-lm-dark',
  2: 'bg-lm-ink-mid',
  3: 'bg-amber-500',
  4: 'bg-purple-500',
  5: 'bg-rose-500',
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

function getLMQDistribution(): Record<number, number> {
  const dist: Record<number, number> = {};
  for (let i = 1; i <= 10; i++) {
    dist[i] = 0;
  }
  instructors.forEach((inst) => {
    dist[inst.lmqLevel]++;
  });
  return dist;
}

function getStageDistribution(): Record<number, number> {
  const dist: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    dist[i] = 0;
  }
  instructors.forEach((inst) => {
    dist[inst.stage]++;
  });
  return dist;
}


export default function Dashboard({ onViewInstructor }: DashboardProps) {
  const averageLMQ = (
    instructors.reduce((sum, inst) => sum + inst.lmqLevel, 0) / instructors.length
  ).toFixed(1);

  const assessmentsDue = assessments.filter((a) => a.status === 'scheduled').length;
  const atRiskInstructors = instructors.filter(
    (inst) => inst.riskLevel === 'medium' || inst.riskLevel === 'high'
  ).length;

  const stageDist = getStageDistribution();
  const maxStageCount = Math.max(...Object.values(stageDist));

  const scheduledAssessments = assessments.filter((a) => a.status === 'scheduled');

  return (
    <div className="w-full space-y-6 p-6">
      <div>
        <h1 className="mb-2">
          Team Overview
        </h1>
        <p className="text-sm text-gray-600 mt-1">Coach dashboard for managing instructor development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-2 border-t-lm-green">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-lm-ink-muted font-medium">Total Instructors</p>
                <p className="text-3xl font-bold mt-2">{instructors.length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-lm-subtle">
                <Users className="w-5 h-5 text-lm-ink-mid" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-2 border-t-lm-green">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-lm-ink-muted font-medium">Average LMQ Level</p>
                <p className="text-3xl font-bold mt-2">{averageLMQ}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-lm-subtle">
                <TrendingUp className="w-5 h-5 text-lm-ink-mid" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-2 border-t-lm-green">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-lm-ink-muted font-medium">Assessments Due</p>
                <p className="text-3xl font-bold mt-2">{assessmentsDue}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-lm-subtle">
                <ClipboardList className="w-5 h-5 text-lm-ink-mid" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-2 border-t-lm-red">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-lm-ink-muted font-medium">At-Risk Instructors</p>
                <p className="text-3xl font-bold mt-2">{atRiskInstructors}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-50">
                <AlertTriangle className="w-5 h-5 text-lm-red" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <KeyElementHeatmap />
        </div>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Development Stages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {STAGE_DATA.map((stageInfo) => {
              const count = stageDist[stageInfo.stage] || 0;
              const percentage = maxStageCount > 0 ? (count / maxStageCount) * 100 : 0;
              return (
                <div key={stageInfo.stage} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: stageInfo.color }}
                  >
                    <span className="text-xs font-bold text-white">{stageInfo.stage}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{stageInfo.name}</p>
                    <p className="text-xs text-gray-500">{count} instructor{count !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="w-16 h-2 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                    <div
                      className="h-full"
                      style={{ width: `${percentage}%`, backgroundColor: stageInfo.color }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">
          Instructor Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {instructors.map((instructor) => {
            const stageInfo = STAGE_DATA.find((s) => s.stage === instructor.stage);
            const riskBg = instructor.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';

            return (
              <Card
                key={instructor.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onViewInstructor(instructor.id)}
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10" style={{ backgroundColor: AVATAR_COLORS[instructor.stage] }}>
                      <AvatarFallback className="text-white font-bold">{instructor.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{instructor.name}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        LMQ Level {instructor.lmqLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {instructor.programs.slice(0, 2).map((program) => (
                      <Badge key={program.name} variant="secondary" className="text-xs bg-slate-100">
                        {program.name.length > 12 ? program.name.slice(0, 10) + '...' : program.name}
                      </Badge>
                    ))}
                    {instructor.programs.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-slate-100">
                        +{instructor.programs.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 justify-start">
                    {KEY_ELEMENT_ORDER.map((element) => {
                      const grade = getGradeForElement(instructor, element);
                      return (
                        <div
                          key={element}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: GRADE_COLORS[grade] }}
                          title={`${KEY_ELEMENT_LABELS[element]}: Grade ${grade}`}
                        >
                          {KEY_ELEMENT_SHORT[element]}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-xs text-gray-600">
                    <span className="text-orange-600 font-medium">↑ Priority: </span>
                    {KEY_ELEMENT_LABELS[instructor.priorityElement]}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: stageInfo?.color || '#999' }}
                      >
                        {instructor.stage}
                      </div>
                      <span className="text-sm text-gray-700">{stageInfo?.name}</span>
                    </div>
                    {instructor.riskLevel !== 'low' && (
                      <Badge className={`text-xs ${riskBg}`} variant="outline">
                        {instructor.riskLevel === 'high' ? 'High Risk' : 'At Risk'}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Assessments</CardTitle>
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
                            if (instructor) onViewInstructor(instructor.id);
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
  );
}
