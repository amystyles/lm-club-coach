'use client';

import { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { COACH_STAGE_DATA, coaches } from '@/data/mock-data';

export default function ClubCoachPath() {
  const [selectedStage, setSelectedStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const currentCoach = coaches[0];

  const renderStageDetail = (stage: 1 | 2 | 3 | 4 | 5) => {
    switch (stage) {
      case 1:
        return <Stage1Content />;
      case 2:
        return <Stage2Content />;
      case 3:
        return <Stage3Content />;
      case 4:
        return <Stage4Content />;
      case 5:
        return <Stage5Content />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4">
            <h1 className="mb-2">
              LM COACH
            </h1>
            <h2 className="text-3xl text-slate-700 font-semibold mb-4">
              Club Coach Development Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Instructors are the heartbeat of your club. Club Coaches are the people who keep it strong.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              5 Development Stages
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              TAP Delivered
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              LMQ + 5KE Framework
            </Badge>
          </div>
        </div>

        {/* Stage Progress Timeline */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Development Stage Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between px-4 py-8">
                {COACH_STAGE_DATA.map((stageData, index) => (
                  <div key={stageData.stage} className="flex flex-col items-center flex-1">
                    {/* Stage Circle */}
                    <div className="relative mb-4">
                      {stageData.stage < currentCoach.coachStage ? (
                        // Completed
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center border-4 border-green-100">
                          <Check className="w-7 h-7 text-white" />
                        </div>
                      ) : stageData.stage === currentCoach.coachStage ? (
                        // Current
                        <div className="w-14 h-14 rounded-full bg-lm-dark flex items-center justify-center border-4 border-lm-sunken">
                          <span className="text-white font-bold text-lg">{stageData.stage}</span>
                        </div>
                      ) : (
                        // Pending
                        <div className="w-14 h-14 rounded-full border-4 border-slate-300 flex items-center justify-center bg-slate-50">
                          <span className="text-slate-400 font-bold text-lg">{stageData.stage}</span>
                        </div>
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < COACH_STAGE_DATA.length - 1 && (
                      <div className="absolute top-7 left-1/2 w-[calc(100%-56px)] h-1 -translate-y-1/2 pointer-events-none">
                        <div
                          className={`h-full ${
                            stageData.stage < currentCoach.coachStage ? 'bg-green-500' : 'bg-slate-300'
                          }`}
                        />
                      </div>
                    )}

                    {/* Stage Label */}
                    <p className="text-sm font-semibold text-slate-800 text-center max-w-24">
                      {stageData.name}
                    </p>
                    <p className="text-xs text-slate-500 text-center mt-1 max-w-24">
                      {stageData.duration}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stage Detail Cards */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Stage Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedStage.toString()}
                onValueChange={(val) => setSelectedStage(parseInt(val) as 1 | 2 | 3 | 4 | 5)}
              >
                <TabsList className="grid w-full grid-cols-5">
                  {COACH_STAGE_DATA.map((stage) => (
                    <TabsTrigger key={stage.stage} value={stage.stage.toString()}>
                      <span className="hidden sm:inline">Stage {stage.stage}</span>
                      <span className="sm:hidden">{stage.stage}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="mt-8">
                  {renderStageDetail(selectedStage as 1 | 2 | 3 | 4 | 5)}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Current Coach Status */}
        {currentCoach && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Current Coach Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {currentCoach.initials}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{currentCoach.name}</h3>
                  <p className="text-slate-600 mt-1">LMQ Level {currentCoach.lmqLevel}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Current Stage</p>
                  <Badge className="bg-lm-dark text-white">
                    Stage {currentCoach.coachStage}: {COACH_STAGE_DATA[currentCoach.coachStage - 1]?.name}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-3">Coaching Instructors</p>
                  <p className="text-sm text-slate-700">
                    {currentCoach.instructorIds.length} instructor{currentCoach.instructorIds.length !== 1 ? 's' : ''} developing
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-2">Years Teaching</p>
                  <p className="text-lg font-semibold text-slate-900">{currentCoach.yearsTeaching} years</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Skills Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-700">Skills Completed</p>
                    <p className="text-sm text-slate-600">
                      {currentCoach.skillsCompleted.length} / 15
                    </p>
                  </div>
                  <Progress value={(currentCoach.skillsCompleted.length / 15) * 100} className="h-2" />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  {currentCoach.skillsCompleted.map((skill) => (
                    <div key={skill} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-700">{skill}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

/* Stage Content Components */

function Stage1Content() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Identity & Foundations</h3>
        <p className="text-slate-700 text-base leading-relaxed">
          Every great Club Coach starts by asking: what does it actually take to develop someone?
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Timeline</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { phase: 'Day 1', activity: 'Discovery Session' },
            { phase: 'Days 2-5', activity: 'Team Baseline' },
            { phase: 'Days 5-10', activity: 'Priorities Set' },
            { phase: 'End Wk 2', activity: 'Development Plan Live' },
          ].map((item) => (
            <div key={item.phase} className="bg-lm-subtle p-4 rounded-lg border border-lm-sunken">
              <p className="text-xs font-semibold text-lm-ink-mid mb-1">{item.phase}</p>
              <p className="text-sm text-slate-700">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Skills Built</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Reading an LMQ Profile',
            'Identifying the Priority Lever',
            'Team Baseline Discovery',
            'Club Needs & Goals Mapping',
            'Using the Development Tool',
            'Masterclass as Benchmark',
          ].map((skill) => (
            <div key={skill} className="flex items-center gap-2 text-slate-700">
              <Circle className="w-2 h-2 fill-lm-dark text-lm-dark" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">TAP Coach Role</h4>
        <p className="text-slate-700">
          Leads the Discovery Session. Uses club context to build Team Baseline. Sets first priorities.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">Key Deliverable</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Team Baseline complete</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Development Tracker live</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Priorities agreed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Stage2Content() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Learn to Observe</h3>
        <p className="text-slate-700 text-base leading-relaxed">
          The difference between watching a class and observing one is the difference between a manager and a mentor.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Timeline</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { phase: 'Wk 3', activity: 'Shadow Observe' },
            { phase: 'Wk 4', activity: 'Co-Observe Live' },
            { phase: 'Wk 5', activity: 'Self-Review' },
            { phase: 'Wk 6', activity: 'Solo Attempt' },
          ].map((item) => (
            <div key={item.phase} className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="text-xs font-semibold text-teal-700 mb-1">{item.phase}</p>
              <p className="text-sm text-slate-700">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Skills Built</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Reading a Class in Real Time',
            'Evidence-Based Observation',
            'Finding the One Thing',
            'Self-Review Facilitation',
            'Masterclass as Benchmark',
            'Updating LMQ Tool',
          ].map((skill) => (
            <div key={skill} className="flex items-center gap-2 text-slate-700">
              <Circle className="w-2 h-2 fill-teal-500 text-teal-500" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Observation Protocol</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="font-semibold text-slate-900 mb-2">BEFORE</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Check LMQ profile</li>
              <li>• Decide KE focus</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="font-semibold text-slate-900 mb-2">DURING</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Collect evidence</li>
              <li>• Not impressions</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="font-semibold text-slate-900 mb-2">AFTER</p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Write recommendation</li>
              <li>• Update tool</li>
              <li>• Schedule CRC within 24hrs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">Key Deliverable</h4>
        <p className="text-slate-700">
          3 solo observation frameworks completed and reviewed by TAP
        </p>
      </div>
    </div>
  );
}

function Stage3Content() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Develop & Deliver Feedback</h3>
        <p className="text-slate-700 text-base leading-relaxed">
          The first time they said exactly the right thing, and watched something shift.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Timeline</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { phase: 'Wk 7-8', activity: 'CRC Introduction' },
            { phase: 'Wk 9-10', activity: 'CRC Practice' },
            { phase: 'Wk 11', activity: 'GROW Conversations' },
            { phase: 'Wk 12', activity: 'Independent Cycle' },
          ].map((item) => (
            <div key={item.phase} className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 mb-1">{item.phase}</p>
              <p className="text-sm text-slate-700">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Skills Built</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'CRC Delivery',
            'GROW Facilitation',
            'One-Priority Discipline',
            'Creating Commitment',
            'Post-Observation Updates',
            'Navigating Difficult Conversations',
          ].map((skill) => (
            <div key={skill} className="flex items-center gap-2 text-slate-700">
              <Circle className="w-2 h-2 fill-amber-500 text-amber-500" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">CRC Method</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="font-bold text-red-700 text-lg mb-2">C</p>
            <p className="font-semibold text-slate-900 mb-2">Connect</p>
            <p className="text-sm text-slate-700">Build trust and context for the conversation</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="font-bold text-red-700 text-lg mb-2">R</p>
            <p className="font-semibold text-slate-900 mb-2">Recommend</p>
            <p className="text-sm text-slate-700">Share clear, evidence-based suggestion</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="font-bold text-red-700 text-lg mb-2">C</p>
            <p className="font-semibold text-slate-900 mb-2">Commend</p>
            <p className="text-sm text-slate-700">Recognize effort and progress</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">GROW Model</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-bold text-green-700 text-lg mb-2">G</p>
            <p className="font-semibold text-slate-900 mb-2">Goal</p>
            <p className="text-sm text-slate-700">What do they want to achieve?</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-bold text-green-700 text-lg mb-2">R</p>
            <p className="font-semibold text-slate-900 mb-2">Reality</p>
            <p className="text-sm text-slate-700">Where are they now?</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-bold text-green-700 text-lg mb-2">O</p>
            <p className="font-semibold text-slate-900 mb-2">Options</p>
            <p className="text-sm text-slate-700">What are the possibilities?</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-bold text-green-700 text-lg mb-2">W</p>
            <p className="font-semibold text-slate-900 mb-2">Will</p>
            <p className="text-sm text-slate-700">What will they commit to?</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">Key Deliverable</h4>
        <p className="text-slate-700">
          Full Observe→CRC→Tracker cycle completed independently × 3
        </p>
      </div>
    </div>
  );
}

function Stage4Content() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Lead the Culture</h3>
        <p className="text-slate-700 text-base leading-relaxed">
          Team culture is transformative.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Timeline</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { phase: 'Month 4', activity: 'Team Meeting Design' },
            { phase: 'Month 4-5', activity: 'Release Prep Leadership' },
            { phase: 'Month 5', activity: 'Cert Readiness Support' },
            { phase: 'Month 6', activity: 'First Quarterly Review' },
          ].map((item) => (
            <div key={item.phase} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 mb-1">{item.phase}</p>
              <p className="text-sm text-slate-700">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Skills Built</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Team Meeting Facilitation',
            'Release Cycle Leadership',
            'Certification Readiness',
            'Development Story Telling',
            'Quarterly Planning',
            'Independent Ownership',
          ].map((skill) => (
            <div key={skill} className="flex items-center gap-2 text-slate-700">
              <Circle className="w-2 h-2 fill-purple-500 text-purple-500" />
              <span className="text-sm">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Monthly Team Meeting Structure</h4>
        <div className="space-y-3">
          {[
            { phase: 'Open', duration: '5 min', activity: 'One Win' },
            { phase: 'Deep Dive', duration: '20 min', activity: 'One KE' },
            { phase: 'Release Preview', duration: '10 min', activity: 'What\'s Coming' },
            { phase: 'Close', duration: '10 min', activity: 'One Commitment' },
          ].map((item) => (
            <div key={item.phase} className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="w-20">
                <p className="font-semibold text-slate-900">{item.phase}</p>
                <p className="text-xs text-slate-500">{item.duration}</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <p className="text-slate-700">{item.activity}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">Key Deliverable</h4>
        <p className="text-slate-700">
          First Quarterly Review presented to GF Manager
        </p>
      </div>
    </div>
  );
}

function Stage5Content() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">Multiply the Standard</h3>
        <p className="text-slate-700 text-base leading-relaxed">
          A Club Coach at Stage 5 is not just developing instructors — they are developing a culture.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Ongoing Activities</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { activity: 'LMQ Grade Reviews', description: 'Ongoing assessment and development' },
            { activity: 'Quarterly Advanced Development', description: 'Strategic growth planning' },
            { activity: 'Annual Advanced Training', description: 'Skill deepening and renewal' },
            { activity: 'Build the Next Coach', description: 'Succession planning and legacy' },
          ].map((item) => (
            <div key={item.activity} className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <p className="font-semibold text-slate-900 mb-2">{item.activity}</p>
              <p className="text-sm text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4">Capabilities at Stage 5</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-lm-dark flex items-center justify-center text-white font-bold text-sm">
                →
              </div>
              <h5 className="font-semibold text-slate-900">As a Coach</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Walks into any class and names priority in 5 min</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Delivers CRC conversations instructors look forward to</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Knows every instructor's learning story</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Reads the room and adjusts approach</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                ★
              </div>
              <h5 className="font-semibold text-slate-900">As a Leader</h5>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Runs monthly team meeting with clarity and culture</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Leads quarterly Release cycle independently</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Partners with GF Manager on strategic planning</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Builds and develops the next Club Coach</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4">The Final Stage: Building the Next Coach</h4>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="font-semibold text-slate-900 mb-2">Recognise</p>
            <p className="text-sm text-slate-700">Identify potential coaches</p>
          </div>
          <div className="text-2xl text-amber-600">→</div>
          <div className="text-center flex-1">
            <p className="font-semibold text-slate-900 mb-2">Invest</p>
            <p className="text-sm text-slate-700">Develop their skills</p>
          </div>
          <div className="text-2xl text-amber-600">→</div>
          <div className="text-center flex-1">
            <p className="font-semibold text-slate-900 mb-2">Release</p>
            <p className="text-sm text-slate-700">Launch their journey</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-3">Key Deliverable</h4>
        <p className="text-slate-700 text-lg">
          They are building the next Club Coach. The standard now outlives them.
        </p>
      </div>
    </div>
  );
}
