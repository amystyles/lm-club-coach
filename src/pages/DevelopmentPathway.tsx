import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, ArrowRight, Info, Star, Clock, MessageCircle, Eye, Megaphone, Check } from 'lucide-react';
import { STAGE_DATA } from '@/data/mock-data';

export default function DevelopmentPathway() {
  const [activeStage, setActiveStage] = useState('1');

  const stageDetails = {
    1: {
      name: 'Onboarding',
      subtitle: 'Pre-Training',
      duration: '21 Days Before IT',
      color: 'hsl(217, 85%, 55%)',
      coachRole: {
        summary: 'Your job is to build excitement, set clear expectations, and make sure the instructor completes all pre-work before their training weekend.',
        context: 'The pre-work is assigned by LMUS 21 days before IT — your role is to welcome the instructor first, then guide and support them through it.',
        principle: 'A prepared instructor is a confident instructor.',
      },
      keyElementFocus: {
        title: 'This stage is all about building a strong foundation in the first three Key Elements',
        elements: [
          { name: 'Choreography', description: 'Are they in sync with the music?' },
          { name: 'Technique', description: 'Are they demonstrating safe and effective form?' },
          { name: 'Coaching', description: 'Are their cues clear and layered?' },
        ],
      },
      instructorPreWork: {
        title: 'What the Instructor Is Doing',
        description: 'LMUS assigns 5-10 hours of pre-work. The instructor will work through videos, handbook activities, and allocated track preparation at their own pace.',
        phases: [
          {
            name: '1. Watch & Learn',
            items: [
              'Introduction to Les Mills Initial Training',
              'Choreography and Music',
              'Technique Foundations',
              'Coaching Layers 1-3',
              'How to Film and Self-review',
            ],
          },
          {
            name: '2. Complete Handbook Activities',
            items: [
              'Break down their allocated track',
              'Practice cueing and scripting',
              'Reflect on their learning',
            ],
          },
          {
            name: '3. Prepare Allocated Track',
            items: [
              'Practice with music — transitions, tempo changes, track focus',
              'Apply the 3 Key Elements: Choreography, Technique, Coaching',
              'Film themselves teaching, watch it back, identify strengths and areas to improve',
            ],
          },
          {
            name: '4. Get Ready for Initial Training',
            items: [
              'Handbook (digital or printed), Les Mills Releases App',
              'Choreography Notes & Masterclass video',
              'Music and playback device, filming device',
              'If online: quiet space, up to 3 devices, test tech 24 hours in advance',
            ],
          },
        ],
      },
      content: [
        {
          week: 'Day 1: Welcome & Connect',
          tasks: [
            'Reach out personally — phone call or face-to-face, not just email',
            'Introduce yourself as their Club Coach and what that means for them',
            'Share your own story: why you coach, what excites you about their journey',
            'Set the tone — this is a big deal and you are here to support them every step',
          ],
        },
        {
          week: 'Days 1-3: Set Expectations',
          tasks: [
            'Walk through the 21-day pre-work timeline so nothing is a surprise',
            'Explain each component: Watch & Learn videos, handbook activities, track prep, self-filming',
            'Agree on a check-in rhythm (e.g. weekly catch-up, message thread)',
            'Share what a great IT experience looks like when someone arrives fully prepared',
          ],
        },
        {
          week: 'Days 3-10: Support Watch & Learn',
          tasks: [
            'Check in — have they started the pre-work videos? Any questions?',
            'Help them understand the 5 Key Elements and why Choreography, Technique, and Coaching come first',
            'Encourage them to observe 4+ live classes at the club — point them to strong instructors to watch',
            'Connect them with an experienced instructor or mentor to shadow and ask questions',
          ],
        },
        {
          week: 'Days 10-17: Guide Track Preparation',
          tasks: [
            'Check they are breaking down their allocated track with Choreography Notes',
            'Encourage them to practice with music — not just reading, but moving and cueing',
            'Offer a low-pressure run-through of their track — just you and them',
            'Watch for the 3 Key Elements: Are they on the beat? Safe form? Clear cues?',
            'Normalise nerves — every great instructor felt this way before their first IT',
          ],
        },
        {
          week: 'Days 17-21: IT Readiness Check',
          tasks: [
            'Confirm all LMUS pre-work is 100% complete — videos watched, handbook done, track prepared',
            'Ask them to film a self-review of their track if they haven\'t already',
            'Final check-in: How are they feeling? Address any last concerns or blockers',
            'Logistics: confirm what to bring, where to go, what to expect on the day',
            'Send them off with genuine excitement and belief — they are ready',
          ],
        },
      ],
      proTip: 'Treat this stage like a rehearsal. The more effort they put in now, the more confident and prepared they\'ll feel during Initial Training.',
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2">
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
              const hasWarning = 'warning' in stageData && (stageData as any).warning;
              const hasCoachRole = 'coachRole' in stageData && (stageData as any).coachRole;
              const hasKeyElementFocus = 'keyElementFocus' in stageData && (stageData as any).keyElementFocus;
              const hasInstructorPreWork = 'instructorPreWork' in stageData && (stageData as any).instructorPreWork;
              const hasProTip = 'proTip' in stageData && (stageData as any).proTip;
              return (
              <TabsContent key={stageKey} value={stageKey} className="mt-8 space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {stage.name}
                    </h3>
                    <p className="text-slate-600">{stage.subtitle}</p>
                    <Badge variant="outline" className="mt-3">
                      <Clock className="w-3 h-3 mr-1" />
                      {stage.duration}
                    </Badge>
                  </div>

                  {/* Coach Role Banner */}
                  {hasCoachRole && (
                    <div className="mb-8 rounded-lg border border-lm-sunken bg-lm-subtle p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Megaphone className="w-5 h-5 text-lm-dark" />
                        <h4 className="font-bold text-lm-dark">Coach Role</h4>
                      </div>
                      <p className="text-lm-dark font-medium mb-2">
                        {(stageData as any).coachRole.summary}
                      </p>
                      <p className="text-lm-ink-mid text-sm mb-4">
                        {(stageData as any).coachRole.context}
                      </p>
                      <div className="flex items-center gap-2 bg-lm-green-mid rounded-md px-4 py-2.5">
                        <Star className="w-4 h-4 text-lm-dark flex-shrink-0" />
                        <p className="text-lm-dark font-semibold text-sm italic">
                          {(stageData as any).coachRole.principle}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Key Element Focus */}
                  {hasKeyElementFocus && (
                    <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 text-slate-700" />
                        <h4 className="font-bold text-slate-900">Key Element Focus</h4>
                      </div>
                      <p className="text-slate-700 font-medium mb-4">
                        {(stageData as any).keyElementFocus.title}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(stageData as any).keyElementFocus.elements.map((el: any) => (
                          <div key={el.name} className="bg-white rounded-md border border-slate-200 p-3">
                            <p className="font-semibold text-slate-900 text-sm">{el.name}</p>
                            <p className="text-slate-600 text-xs mt-1">{el.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructor Pre-Work (what they're doing) */}
                  {hasInstructorPreWork && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-5 h-5 text-slate-500" />
                        <h4 className="font-bold text-slate-900">{(stageData as any).instructorPreWork.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{(stageData as any).instructorPreWork.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(stageData as any).instructorPreWork.phases.map((phase: any) => (
                          <div key={phase.name} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                            <h5 className="font-semibold text-slate-900 text-sm mb-2">{phase.name}</h5>
                            <ul className="space-y-1.5">
                              {phase.items.map((item: string, i: number) => (
                                <li key={i} className="text-slate-600 text-xs flex gap-2">
                                  <span className="text-slate-400 mt-0.5">-</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warning */}
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

                  {/* Coach Actions Timeline */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-lm-dark" />
                      <h4 className="font-bold text-slate-900">Your Coach Actions</h4>
                    </div>
                    <div className="space-y-4">
                      {stage.content.map((section, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            {section.week}
                          </h4>
                          <ul className="space-y-2">
                            {section.tasks.map((task, taskIdx) => (
                              <li key={taskIdx} className="text-slate-700 text-sm flex gap-2">
                                <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip */}
                  {hasProTip && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-900 text-sm">Pro Tip</p>
                        <p className="text-amber-800 text-sm mt-1">{(stageData as any).proTip}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            );
            })}
          </Tabs>
        </div>

      </div>
    </div>
  );
}
