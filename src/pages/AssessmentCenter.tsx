import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { Assessment, KeyElement, Grade } from '@/data/types';
import { assessments, instructors, LM_PROGRAMS, KEY_ELEMENT_LABELS } from '@/data/mock-data';

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

const getAssessmentTypeColor = (type: string) => {
  switch (type) {
    case 'observation':
      return 'bg-lm-subtle text-lm-ink-mid';
    case 'certification':
      return 'bg-purple-100 text-purple-800';
    case 'grade-review':
      return 'bg-orange-100 text-orange-800';
    case 'quarterly':
      return 'bg-lm-green-mid text-lm-dark';
    default:
      return 'bg-lm-subtle text-lm-ink-muted';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled':
      return 'bg-lm-subtle text-lm-ink-mid';
    case 'completed':
      return 'bg-lm-green-mid text-lm-dark';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-lm-subtle text-lm-ink-muted';
  }
};

const AssessmentCard: React.FC<{ assessment: Assessment }> = ({ assessment }) => {
  const instructor = instructors.find((i) => i.id === assessment.instructorId);
  if (!instructor) return null;

  const feedbackPreview = assessment.feedback.substring(0, 100) + (assessment.feedback.length > 100 ? '...' : '');

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <p className="font-semibold text-sm">{instructor.name}</p>
              <p className="text-xs text-gray-500">{assessment.program}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 mr-4">
          <Badge className={`text-xs ${getAssessmentTypeColor(assessment.type)}`}>
            {assessment.type}
          </Badge>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={`text-xs ${getStatusColor(assessment.status)}`}>
            {assessment.status}
          </Badge>
          {assessment.status === 'completed' && (
            <Badge variant="secondary" className="text-xs">
              LMQ {assessment.overallLevel}
            </Badge>
          )}
        </div>
      </div>

      {assessment.status === 'completed' && feedbackPreview && (
        <>
          <Separator className="my-3" />
          <p className="text-xs text-gray-600 italic">{feedbackPreview}</p>
        </>
      )}
    </Card>
  );
};

const NewObservationDialog: React.FC<{ isOpen: boolean; onOpenChange: (open: boolean) => void }> = ({
  isOpen,
  onOpenChange,
}) => {
  const [instructorId, setInstructorId] = useState('');
  const [program, setProgram] = useState('');
  const [date, setDate] = useState('');
  const [grades, setGrades] = useState<Record<KeyElement, Grade>>({
    choreography: 1,
    technique: 1,
    coaching: 1,
    connection: 1,
    performance: 1,
  });
  const [evidence, setEvidence] = useState<Record<KeyElement, string>>({
    choreography: '',
    technique: '',
    coaching: '',
    connection: '',
    performance: '',
  });
  const [oneThingFocus, setOneThingFocus] = useState('');
  const [crcConnect, setCrcConnect] = useState('');
  const [crcRecommend, setCrcRecommend] = useState('');
  const [crcCommend, setCrcCommend] = useState('');

  const handleGradeChange = (element: KeyElement, grade: Grade) => {
    setGrades((prev) => ({ ...prev, [element]: grade }));
  };

  const handleEvidenceChange = (element: KeyElement, value: string) => {
    setEvidence((prev) => ({ ...prev, [element]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      instructorId,
      program,
      date,
      grades,
      evidence,
      oneThingFocus,
      crcConnect,
      crcRecommend,
      crcCommend,
    });
    onOpenChange(false);
  };

  const handleReset = () => {
    setInstructorId('');
    setProgram('');
    setDate('');
    setGrades({ choreography: 1, technique: 1, coaching: 1, connection: 1, performance: 1 });
    setEvidence({ choreography: '', technique: '', coaching: '', connection: '', performance: '' });
    setOneThingFocus('');
    setCrcConnect('');
    setCrcRecommend('');
    setCrcCommend('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Observation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="instructor" className="text-sm font-medium mb-2 block">
                Instructor
              </Label>
              <Select value={instructorId} onValueChange={setInstructorId}>
                <SelectTrigger id="instructor">
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="program" className="text-sm font-medium mb-2 block">
                Program
              </Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {LM_PROGRAMS.map((prog) => (
                    <SelectItem key={prog} value={prog}>
                      {prog}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date" className="text-sm font-medium mb-2 block">
                Date
              </Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <Separator />

          {/* Key Elements */}
          <div>
            <h3 className="font-semibold text-sm mb-4">5 Key Elements</h3>
            <div className="space-y-5">
              {KEY_ELEMENTS.map((element) => (
                <div key={element} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-medium text-sm">{KEY_ELEMENT_LABELS[element]}</h4>
                  </div>

                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3].map((grade) => (
                      <Button
                        key={grade}
                        type="button"
                        variant={grades[element] === grade ? 'default' : 'outline'}
                        size="sm"
                        className="w-12 h-10"
                        onClick={() => handleGradeChange(element, grade as Grade)}
                      >
                        {grade}
                      </Button>
                    ))}
                  </div>

                  <Label htmlFor={`evidence-${element}`} className="text-xs text-gray-600 mb-2 block">
                    Evidence
                  </Label>
                  <Textarea
                    id={`evidence-${element}`}
                    placeholder="Describe what you observed..."
                    value={evidence[element]}
                    onChange={(e) => handleEvidenceChange(element, e.target.value)}
                    className="text-xs h-20"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* One Thing Focus */}
          <div>
            <Label htmlFor="oneThingFocus" className="text-sm font-medium mb-2 block">
              One Thing Focus
            </Label>
            <Textarea
              id="oneThingFocus"
              placeholder="What is the one key development priority?"
              value={oneThingFocus}
              onChange={(e) => setOneThingFocus(e.target.value)}
              className="text-sm h-20"
            />
          </div>

          <Separator />

          {/* CRC Section */}
          <div>
            <h3 className="font-semibold text-sm mb-4">CRC Feedback</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="connect" className="text-sm font-medium mb-2 block">
                  Connect
                </Label>
                <p className="text-xs text-gray-600 mb-2">
                  Eye contact, name, genuine observation of something working. Not a compliment — evidence.
                </p>
                <Textarea
                  id="connect"
                  placeholder="Enter connection statement..."
                  value={crcConnect}
                  onChange={(e) => setCrcConnect(e.target.value)}
                  className="text-sm h-20"
                />
              </div>

              <div>
                <Label htmlFor="recommend" className="text-sm font-medium mb-2 block">
                  Recommend
                </Label>
                <p className="text-xs text-gray-600 mb-2">
                  One development priority. Specific. Tied to a KE. A concrete next step with a date.
                </p>
                <Textarea
                  id="recommend"
                  placeholder="Enter recommendation..."
                  value={crcRecommend}
                  onChange={(e) => setCrcRecommend(e.target.value)}
                  className="text-sm h-20"
                />
              </div>

              <div>
                <Label htmlFor="commend" className="text-sm font-medium mb-2 block">
                  Commend
                </Label>
                <p className="text-xs text-gray-600 mb-2">
                  Affirm the strength and the instructor's capacity to grow. Based on what you observed.
                </p>
                <Textarea
                  id="commend"
                  placeholder="Enter commendation..."
                  value={crcCommend}
                  onChange={(e) => setCrcCommend(e.target.value)}
                  className="text-sm h-20"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => {
              handleReset();
              onOpenChange(false);
            }}>
              Cancel
            </Button>
            <Button type="submit" className="bg-lm-dark hover:bg-lm-dark/90 text-white">
              Submit Observation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function AssessmentCenter() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filterAssessments = (status?: string) => {
    if (!status || status === 'all') return assessments;
    return assessments.filter((a) => a.status === status);
  };

  return (
    <div className="min-h-screen -m-6">
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
              <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">Assessment</span>
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-2">The Growth Lab</h1>
            <p className="text-white/40 text-sm">Track observations, track growth</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors focus:outline-none"
                style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
              >
                <Plus className="w-4 h-4" />
                New Observation
              </button>
            </DialogTrigger>
            <NewObservationDialog isOpen={dialogOpen} onOpenChange={setDialogOpen} />
          </Dialog>
        </div>
      </div>

      <div className="w-full px-8 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterAssessments().length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                No assessments found.
              </Card>
            ) : (
              filterAssessments().map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            {filterAssessments('scheduled').length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                No scheduled assessments.
              </Card>
            ) : (
              filterAssessments('scheduled').map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filterAssessments('completed').length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                No completed assessments.
              </Card>
            ) : (
              filterAssessments('completed').map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))
            )}
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            {filterAssessments('draft').length === 0 ? (
              <Card className="p-8 text-center text-gray-500">
                No draft assessments.
              </Card>
            ) : (
              filterAssessments('draft').map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

