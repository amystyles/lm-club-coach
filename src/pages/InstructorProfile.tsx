import { useState } from 'react';
import type { KeyElement } from '@/data/types';
import { instructors, assessments, developmentNotes, KEY_ELEMENT_LABELS, GRADE_LABELS } from '@/data/mock-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

interface InstructorProfileProps {
  instructorId: string;
  onBack: () => void;
}

const SKILLS_DEMONSTRATED = {
  choreography: {
    1: 'Accurate execution. Follows routine structure. Basic flow.',
    2: 'Smooth, automatic execution. In time with music. Zero significant errors.',
    3: 'N/A (Max G2 for Choreography)',
  },
  technique: {
    1: 'Clear, safe demonstration. ≥75% competency.',
    2: 'Precise execution. Weight selection motivates.',
    3: '100% competency. Inspirational form.',
  },
  coaching: {
    1: 'Track intro, ≥4 L1 cues, setups per exercise.',
    2: 'Professional L1+L2+L3 coaching.',
    3: '≥3 L2 + ≥3 L3 at inspirational level.',
  },
  connection: {
    1: 'Welcoming, inclusive, ≥1 connection tool per track.',
    2: 'Authentic bond. Names used, LSR 2-3x, "we/us" language.',
    3: 'CRC ≥4x, Four Quadrant scanning.',
  },
  performance: {
    1: 'Prepared, within Essence ~75%.',
    2: 'Team-teaches with music. Dramatic contrast.',
    3: 'High interpretation. 5 Voices. Empowering Beliefs.',
  },
} as const;

const UNLOCK_NEXT = {
  choreography: {
    1: 'Zero errors in full track. Automatic response to music.',
    2: 'G2 is highest grade. Maintain standard.',
    3: 'N/A',
  },
  technique: {
    1: '≥85% competency. Technique motivates participants.',
    2: '100% competency. Inspirational form.',
    3: 'Maintain and mentor others.',
  },
  coaching: {
    1: '≥2 L2 + ≥2 L3 cues per track.',
    2: '≥3 L2 + ≥3 L3 at inspirational level.',
    3: 'Maintain and mentor others.',
  },
  connection: {
    1: 'Names used, LSR 2-3x, "we/us" language.',
    2: 'CRC ≥4x, Four Quadrant scanning.',
    3: 'Maintain and mentor others.',
  },
  performance: {
    1: 'Team-teaches with music. Dramatic contrast.',
    2: 'High interpretation. 5 Voices. Empowering Beliefs.',
    3: 'Maintain and mentor others.',
  },
} as const;

const PRACTICE_DRILLS = {
  connection: [
    'Learn 3 Names Per Class',
    'Look, See & Respond',
    'Four Quadrants Practice',
    'The 10-Minute Rule',
  ],
  coaching: [
    'Layer Map a Track',
    'Count Your Layers',
    'Imagery Practice',
    'Leave Space',
  ],
  choreography: [
    'Reps Without Music',
    'Talk & Move Test',
    'Count the Errors',
    'Weakest Track Focus',
  ],
  technique: [
    'Exercise Audit',
    'Record Side-On',
    'Weight Selection Practice',
    'Correction Drills',
  ],
  performance: [
    'Map the Musical Arc',
    'Silence Practice',
    'Study the 5 Voices',
    'Find Your Essence Signature',
  ],
} as const;

export function InstructorProfile({ instructorId, onBack }: InstructorProfileProps) {
  const instructor = instructors.find(i => i.id === instructorId);
  const [completedGoals, setCompletedGoals] = useState<Set<string>>(new Set());

  if (!instructor) {
    return (
      <div className="p-8">
        <Button onClick={onBack} variant="outline">Back</Button>
        <p className="mt-4 text-red-600">Instructor not found</p>
      </div>
    );
  }

  const instructorAssessments = assessments.filter(a => a.instructorId === instructorId);
  const instructorNotes = developmentNotes.filter(n => n.instructorId === instructorId);
  const priorityGrade = instructor.grades.find(g => g.element === instructor.priorityElement);

  const toggleGoal = (goal: string) => {
    const newCompleted = new Set(completedGoals);
    if (newCompleted.has(goal)) {
      newCompleted.delete(goal);
    } else {
      newCompleted.add(goal);
    }
    setCompletedGoals(newCompleted);
  };

  const getPracticeDrills = (element: KeyElement): readonly string[] => {
    return PRACTICE_DRILLS[element] || [];
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <Button onClick={onBack} variant="outline" className="mb-6">
          ← Back
        </Button>

        <div className="flex items-start gap-6 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-lm-subtle text-lm-dark text-lg font-bold">
              {instructor.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="mb-2">
              {instructor.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {instructor.programs.map(program => (
                <Badge key={program} variant="secondary">
                  {program}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              <Badge variant="outline">Stage {instructor.stage}</Badge>
              <Badge variant="outline">LMQ Level {instructor.lmqLevel}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: LMQ Profile Card */}
      <Card className="mb-8 border-2">
        <CardHeader>
          <CardTitle>LMQ Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {instructor.grades.map((gradeItem) => {
              const isPriority = gradeItem.element === instructor.priorityElement;
              const skillsText = SKILLS_DEMONSTRATED[gradeItem.element][gradeItem.grade as 1 | 2 | 3];
              const unlockText = UNLOCK_NEXT[gradeItem.element][gradeItem.grade as 1 | 2 | 3];
              const label = KEY_ELEMENT_LABELS[gradeItem.element];

              return (
                <div
                  key={gradeItem.element}
                  className={`pb-6 ${isPriority ? 'border-l-4 border-orange-500 pl-4 bg-orange-50 -mx-4 px-4 py-4' : 'border-b'}`}
                >
                  {isPriority && (
                    <div className="mb-2 text-sm font-semibold text-orange-700">← Priority</div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">
                      {label}
                    </h3>
                    <Badge className="bg-lm-subtle text-lm-dark border border-lm-sunken">
                      {GRADE_LABELS[gradeItem.grade].short}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-600 font-medium">Skills Demonstrated</p>
                      <p className="text-slate-700">{skillsText}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Unlock the Next Grade</p>
                      <p className="text-slate-700">{unlockText}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Two Columns - Development Goals & Assessment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Development Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Development Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {instructor.goals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50">
                  <Checkbox
                    checked={completedGoals.has(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                    className="mt-1"
                  />
                  <label
                    className={`flex-1 cursor-pointer text-sm ${
                      completedGoals.has(goal) ? 'line-through text-slate-400' : 'text-slate-700'
                    }`}
                  >
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment History */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
            {instructorAssessments.length === 0 ? (
              <p className="text-slate-500 text-sm">No assessments yet</p>
            ) : (
              <div className="space-y-4">
                {instructorAssessments.map((assessment) => (
                  <div key={assessment.id} className="pb-4 border-b last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{assessment.type}</p>
                        <p className="text-xs text-slate-500">{assessment.program}</p>
                      </div>
                      <Badge variant="outline">Level {assessment.overallLevel}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{assessment.date}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Development Notes */}
      {instructorNotes.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Development Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {instructorNotes.map((note) => (
                <div key={note.id} className="pb-6 border-b last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="font-semibold text-sm">{KEY_ELEMENT_LABELS[note.keyElement]}</p>
                        <p className="text-xs text-slate-500">{note.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-600 font-medium">Observation</p>
                      <p className="text-slate-700">{note.observation}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-medium">Recommendation</p>
                      <p className="text-slate-700">{note.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section 4: Practice Drills */}
      {priorityGrade && (
        <Card>
          <CardHeader>
            <CardTitle>
              Recommended Practice Drills for {KEY_ELEMENT_LABELS[instructor.priorityElement]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getPracticeDrills(instructor.priorityElement).map((drill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <p className="font-medium text-sm">{drill}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
