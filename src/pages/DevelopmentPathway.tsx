import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { STAGE_DATA } from '@/data/mock-data';

export default function DevelopmentPathway() {
  const [activeStage, setActiveStage] = useState('1');

  const stageDetails = {
    1: {
      name: 'Onboarding',
      subtitle: 'Pre-training prep & mindset',
      duration: 'Weeks 1-8',
      color: 'hsl(217, 85%, 55%)',
      content: [
        {
          week: 'Week 1-2: Welcome & Assign',
          tasks: [
            'Mentor assigned within 48 hours',
            'App access provisioned',
            'Assigned choreography track',
          ],
        },
        {
          week: 'Week 3-4: Watch & Learn',
          tasks: [
            'Pre-work videos completed',
            'Observe 4+ live classes minimum',
            'Mentor shares personal story and journey',
          ],
        },
        {
          week: 'Week 5-6: Practice & Script',
          tasks: [
            'Prepare assigned track with music',
            'Script Layer 1, 2, and 3 cues',
            'Film self-review and practice independently',
          ],
        },
        {
          week: 'Week 7-8: IMT Readiness',
          tasks: [
            'All pre-work completed',
            'Development goals set',
            'Mindset work: "Make Fear Your Friend"',
            'Ready for Instructor Master Training (IMT)',
          ],
        },
      ],
    },
    2: {
      name: 'Training → Cert',
      subtitle: 'IMT to certification',
      duration: '30 Days',
      color: 'hsl(160, 65%, 45%)',
      content: [
        {
          week: 'Day 0: IMT Complete',
          tasks: ['Feedback received', '30-day clock starts immediately'],
        },
        {
          week: 'Days 1-7: Debrief & Plan',
          tasks: [
            'Feedback reviewed in detail',
            'Practice plan activated with clear milestones',
            'Key focus areas identified',
          ],
        },
        {
          week: 'Days 7-25: Practice & Refine',
          tasks: [
            'Teach small group runs (6-8 participants)',
            'KE-aligned feedback from mentor each session',
            'Iterate on technique, choreography, coaching',
            'Build confidence in real teaching',
          ],
        },
        {
          week: 'Day 30: Cert Submission',
          tasks: [
            'Video submitted for assessment',
            'LMQ level awarded',
            'Certification milestone reached',
          ],
        },
      ],
      warning: {
        title: 'The Danger Zone: Days 7-20',
        description:
          'This is when many new instructors stall. The initial enthusiasm fades, self-doubt creeps in, and practice feels repetitive. Stay in close contact with your mentor. Schedule small group runs. Keep the momentum alive.',
      },
    },
    3: {
      name: 'Ready to Teach',
      subtitle: 'Post-cert to first slot',
      duration: 'Weeks 1-12',
      color: 'hsl(35, 88%, 55%)',
      content: [
        {
          week: 'Week 1: Cert Celebration',
          tasks: ['Celebrate the achievement', 'Recognize effort and growth'],
        },
        {
          week: 'Week 2-4: Team Teach',
          tasks: [
            'Co-teach 2-4 live classes with experienced mentor',
            'Learn club rhythm and participant patterns',
            'Build confidence in live environment',
          ],
        },
        {
          week: 'Week 5-8: First Solo Classes',
          tasks: [
            'Mentor present in studio for first solo teaches',
            'Feedback immediately after each class',
            'Gradual reduction of mentor presence',
          ],
        },
        {
          week: 'Week 8-12: Timetable Slot',
          tasks: [
            'Regular slot secured on class timetable',
            'Quarterly LMQ assessment scheduled',
            'Begins ongoing development journey',
          ],
        },
      ],
    },
    4: {
      name: 'On Timetable',
      subtitle: 'Nailing the basics',
      duration: 'Ongoing',
      color: 'hsl(280, 60%, 55%)',
      content: [
        {
          week: 'First 4 Weeks: Choreo Lock-In',
          tasks: [
            'Every track on beat, zero significant errors',
            'Automatic execution across all choreography',
            'Consistent professional performance',
          ],
        },
        {
          week: 'Weeks 4-12: Technique Consistency',
          tasks: [
            'Safe demonstration every class',
            'Layer 1 (form/safety) coaching fluent and automatic',
            'Participants know they can trust your technique',
          ],
        },
        {
          week: 'Month 3+: Coaching Layers',
          tasks: [
            'Layer 2 coaching introduced and developed',
            'Balanced mix of safety, motivation, and inspiration',
            'More personalized feedback to participants',
          ],
        },
        {
          week: 'Quarterly: LMQ Assessment',
          tasks: [
            'Grade update against all 5 Key Elements',
            'Feedback on growth across programming',
            'Goals set for next quarter',
          ],
        },
      ],
    },
    5: {
      name: 'World-Class',
      subtitle: 'Mastery & influence',
      duration: 'Ongoing',
      color: 'hsl(350, 68%, 55%)',
      content: [
        {
          week: 'KE 4 Connection Mastery',
          tasks: [
            'Learn and use participant names authentically',
            'Look, See & Respond (LSR) 2-3x per class',
            'Connect/Recommend/Commend (CRC) ≥4x per class',
            'Four Quadrant scanning and engagement',
          ],
        },
        {
          week: 'KE 5 Performance Mastery',
          tasks: [
            'Master the 5 Voices (Mentor, Warrior, Wise, Dreamer, Leader)',
            'Dramatic contrast between sections',
            'Empowering Beliefs communicated consistently',
          ],
        },
        {
          week: 'LMQ 7+ Grade 3 Emerging',
          tasks: [
            'Grade 3 Technique: Inspirational execution',
            'Grade 3 Coaching: Powerful imagery and targeted correction',
            'Grade 3 Connection or Performance: Masterful level',
          ],
        },
        {
          week: 'Beyond: Expanding Influence',
          tasks: [
            'Club Mentor: Develop new instructors',
            '2nd Program Mastery: Expand repertoire',
            'Presenter Pathway: Share expertise at conferences',
            'TAP Coach Candidate: Train assessment partners',
          ],
        },
      ],
    },
  };

  const deploymentPaths = [
    {
      letter: 'A',
      name: 'Club-Led Development',
      description: 'Club General Fitness Manager assigns and manages mentors; TAP sets benchmarks and assessment standards.',
      focus: ['Club mentor ownership', 'Consistent local support', 'Clear progression pathways'],
    },
    {
      letter: 'B',
      name: 'Mentor + TAP Partnership',
      description: 'Club Mentor leads day-to-day development; TAP Coach builds capability and provides quarterly assessments.',
      focus: ['Collaborative approach', 'Expert guidance + local support', 'Balanced accountability'],
    },
    {
      letter: 'C',
      name: 'TAP Coach Direct',
      description: 'TAP Coaching provides high-touch, expert-led development and frequent assessment contact.',
      focus: ['High-touch support', 'Expert-led development', 'Intensive capability building'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Instructor Development Pathway
          </h1>
          <p className="text-lg text-slate-600">
            From Day One to World-Class
          </p>
        </div>

        {/* Section 1: Stage Overview */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">The 5-Stage Journey</h2>

          {/* Desktop: Horizontal Flow */}
          <div className="hidden md:flex items-center justify-between gap-2 mb-8">
            {STAGE_DATA.map((stage, idx) => (
              <React.Fragment key={stage.stage}>
                <button
                  onClick={() => setActiveStage(stage.stage.toString())}
                  className="flex-1"
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      activeStage === stage.stage.toString()
                        ? 'ring-2 ring-offset-2 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    style={{
                      borderLeft: `4px solid ${stage.color}`,
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                          style={{ backgroundColor: stage.color }}
                        >
                          {stage.stage}
                        </span>
                      </div>
                      <CardTitle className="text-base text-slate-900">
                        {stage.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {stage.duration}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </button>
                {idx < STAGE_DATA.length - 1 && (
                  <div className="flex items-center justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: Vertical Flow */}
          <div className="md:hidden space-y-3 mb-8">
            {STAGE_DATA.map((stage) => (
              <button
                key={stage.stage}
                onClick={() => setActiveStage(stage.stage.toString())}
                className="w-full"
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    activeStage === stage.stage.toString()
                      ? 'ring-2 ring-offset-2 shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    borderLeft: `4px solid ${stage.color}`,
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: stage.color }}
                      >
                        {stage.stage}
                      </span>
                      <div className="text-left">
                        <CardTitle className="text-sm text-slate-900">
                          {stage.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {stage.duration}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </button>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Section 2: Stage Details */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Stage Breakdown</h2>

          <Tabs value={activeStage} onValueChange={setActiveStage} className="w-full">
            <TabsList className="grid w-full grid-cols-5 gap-2 h-auto bg-slate-100 p-2">
              {STAGE_DATA.map((stage) => (
                <TabsTrigger
                  key={stage.stage}
                  value={stage.stage.toString()}
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs md:text-sm"
                >
                  <span className="hidden sm:inline">Stage {stage.stage}</span>
                  <span className="sm:hidden">{stage.stage}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(stageDetails).map(([stageKey, stage]) => {
              const numKey = parseInt(stageKey) as 1 | 2 | 3 | 4 | 5;
              const stageData = stageDetails[numKey];
              const hasWarning = 'warning' in stageData && stageData.warning;
              return (
              <TabsContent key={stageKey} value={stageKey} className="mt-8 space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {stage.name}
                    </h3>
                    <p className="text-slate-600">{stage.subtitle}</p>
                    <Badge variant="outline" className="mt-3">
                      {stage.duration}
                    </Badge>
                  </div>

                  {hasWarning && (
                    <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertTitle className="text-red-900 font-bold">
                        {(stageData as any).warning.title}
                      </AlertTitle>
                      <AlertDescription className="text-red-800 mt-2">
                        {(stageData as any).warning.description}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-5">
                    {stage.content.map((section, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          {section.week}
                        </h4>
                        <ul className="space-y-2">
                          {section.tasks.map((task, taskIdx) => (
                            <li key={taskIdx} className="text-slate-700 text-sm flex gap-2">
                              <span className="text-slate-400 font-bold">•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            );
            })}
          </Tabs>
        </div>

        <Separator className="my-12" />

        {/* Section 3: Deployment Paths */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Club Deployment Paths</h2>
          <p className="text-slate-600 mb-8">
            Development looks different depending on club resources and partnership model. Choose the path that best matches your club.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentPaths.map((path) => (
              <Card key={path.letter} className="border-t-4 shadow-md hover:shadow-lg transition-shadow" style={{ borderTopColor: 'hsl(217, 85%, 55%)' }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg">{path.name}</CardTitle>
                      <CardDescription className="mt-2">Path {path.letter}</CardDescription>
                    </div>
                    <span className="text-4xl font-bold text-slate-200">
                      {path.letter}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {path.description}
                  </p>
                  <div>
                    <p className="text-xs font-bold text-slate-900 uppercase mb-2 tracking-wide">
                      Key Features
                    </p>
                    <ul className="space-y-2">
                      {path.focus.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
