import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { KEY_ELEMENT_ICONS, KEY_ELEMENT_LABELS } from '@/data/mock-data';

export default function LMQReference() {
  const keyElementDetails = {
    choreography: {
      description: 'The ability to perform and teach routines with precision, timing, and consistency.',
      grades: {
        1: {
          title: 'Accurate',
          criteria: 'In time ≥75%, ≤2 significant errors',
          details: [
            'Follows the choreography with acceptable accuracy',
            'Maintains reasonable timing with music',
            'Demonstrates at least 75% competency in routine execution',
          ],
        },
        2: {
          title: 'Smooth & Automatic',
          criteria: 'In time ALL tracks, ≤1 error. Unlocks Level 2+',
          details: [
            'Perfect timing across all choreography tracks',
            'Execution is smooth and automatic',
            'Minimal errors (≤1) in full class',
            'GATEWAY GRADE: Required to unlock Level 2 and higher',
          ],
        },
        3: {
          title: 'N/A',
          criteria: 'Maximum Grade 2 for Choreography',
          details: [
            'Choreography does not advance to Grade 3',
            'Focus remains on maintaining Grade 2 excellence',
          ],
        },
      },
      drills: [
        'Reps Without Music: Practice tracks counting beats without audio cues',
        'Talk & Move Test: Teach cues while executing choreography flawlessly',
        'Count the Errors: Self-assess and identify mistakes in your performance',
        'Weakest Track Focus: Isolate the most challenging track and drill it daily',
      ],
    },
    technique: {
      description: 'Safe, effective exercise execution that motivates and inspires participants.',
      grades: {
        1: {
          title: 'Clear & Safe',
          criteria: '≥75% competency, maintains form',
          details: [
            'Demonstrates exercises with acceptable form and safety',
            'At least 75% of exercises performed correctly',
            'Maintains posture and alignment standards',
            'Uses correct breathing techniques',
          ],
        },
        2: {
          title: 'Precise & Motivating',
          criteria: '≥85% competency, motivates participants',
          details: [
            '85% or higher competency across all exercises',
            'Form is precise and inspiring to watch',
            'Motivates participants through confident demonstration',
            'Provides subtle corrections and encouragement',
          ],
        },
        3: {
          title: 'Inspirational',
          criteria: '100% competency, inspires',
          details: [
            'Flawless execution across all exercises (100%)',
            'Presence is magnetic and deeply inspirational',
            'Demonstrates mastery and effortless competence',
            'Elevates the entire room with energy and confidence',
          ],
        },
      },
      drills: [
        'Exercise Audit: Record and review all movements for form quality',
        'Record Side-On: Film yourself from the side to check alignment',
        'Weight Selection Practice: Master appropriate loading for each exercise',
        'Correction Drills: Practice common form corrections on loop',
      ],
    },
    coaching: {
      description: 'Cueing at multiple levels (Layer 1, 2, 3) to guide, motivate, and inspire.',
      grades: {
        1: {
          title: 'Follow Safely',
          criteria: 'Track intro, ≥4 L1 cues, setups, compulsory cues',
          details: [
            'Opens track with clear introduction',
            'Provides ≥4 Layer 1 (form/safety) cues per track',
            'Includes exercise setups and positioning cues',
            'Delivers compulsory cues at required moments',
          ],
        },
        2: {
          title: 'Professional',
          criteria: '≥4 L1 + ≥2 L2 + ≥2 L3 cues per track',
          details: [
            '≥4 Layer 1 (form/safety) cues for protection',
            '≥2 Layer 2 (motivation/performance) cues for engagement',
            '≥2 Layer 3 (inspiration) cues for elevation',
            'Layered coaching is fluent and natural',
          ],
        },
        3: {
          title: 'Masterful',
          criteria: '≥3 L2 + ≥3 L3 at inspirational level. Targeted correction',
          details: [
            '≥3 Layer 2 cues with motivational power',
            '≥3 Layer 3 cues at inspirational mastery level',
            'Targeted corrections based on real-time observation',
            'Seamless integration of all coaching layers',
          ],
        },
      },
      drills: [
        'Layer Map a Track: Plan L1, L2, L3 cues before teaching',
        'Count Your Layers: Record class and tally cues per layer',
        'Imagery Practice: Develop and deliver powerful visual language',
        'Leave Space: Practice teaching with intentional silence and pauses',
      ],
    },
    connection: {
      description: 'Building genuine relationships and community with participants.',
      grades: {
        1: {
          title: 'Respect & Care',
          criteria: 'Welcoming intro, SMARTSTART, ≥1 connection tool, warm tone',
          details: [
            'Opens class with genuine warmth and welcome',
            'Uses SMARTSTART framework for introductions',
            'Employs at least 1 connection tool (greeting, check-in, etc.)',
            'Maintains warm, caring tone throughout class',
          ],
        },
        2: {
          title: 'Authentic Bond',
          criteria: 'Names used, LSR 2-3x, "we/us" language, 75% class intro elements',
          details: [
            'Uses participant names authentically and meaningfully',
            'Practices Look, See & Respond 2-3 times per class',
            'Uses inclusive "we/us" language to build community',
            'Incorporates 75% of standard class intro elements',
          ],
        },
        3: {
          title: 'Community Builder',
          criteria: 'CRC ≥4x, Four Quadrant scanning, genuine love evident',
          details: [
            'Uses Connect/Recommend/Commend (CRC) ≥4 times per class',
            'Scans and engages all four quadrants of the room',
            'Genuine love and care for participants is unmistakable',
            'Creates a sense of belonging and community',
          ],
        },
      },
      drills: [
        'Learn 3 Names: Memorize 3 new participant names each class',
        'Look See & Respond: Practice observing and responding to participants',
        'Four Quadrants: Deliberately engage front, back, left, right areas',
        '10-Minute Rule: Stay 10 minutes after class to connect with participants',
      ],
    },
    performance: {
      description: 'Matching energy, presence, and interpretation to the music and message.',
      grades: {
        1: {
          title: 'Prepared & Appropriate',
          criteria: 'Within Essence ~75%, contrasting energy levels',
          details: [
            'Stays within class Essence approximately 75% of the time',
            'Demonstrates contrasting energy levels between sections',
            'Shows intentionality in presence and delivery',
            'Prepares and practices the performance aspect',
          ],
        },
        2: {
          title: 'Team-Teaching with Music',
          criteria: 'Matches music ~75%, dramatic contrast, high enjoyment',
          details: [
            'Matches the music and energy approximately 75% of the time',
            'Creates dramatic contrast between sections',
            'Generates high enjoyment and engagement from participants',
            'Performs with confidence and intentionality',
          ],
        },
        3: {
          title: 'Inspirational',
          criteria: 'High interpretation ~75%, 5 Voices, Empowering Beliefs, Essence 100%',
          details: [
            'High musical interpretation (~75% of the time)',
            'Employs all 5 Voices (Mentor, Warrior, Wise, Dreamer, Leader)',
            'Communicates empowering beliefs to the room',
            'Maintains Essence 100% of the time',
          ],
        },
      },
      drills: [
        'Map the Musical Arc: Identify and practice musical peaks and valleys',
        'Silence Practice: Teach with intentional pauses and silence',
        'Study the 5 Voices: Practice each voice and when to use it',
        'Find Your Essence Signature: Develop and refine your unique presence',
      ],
    },
  };

  const lmqLevels = [
    {
      level: 1,
      choreography: 'G1',
      other: 'Technique G1 · Coaching G1',
      minConditions: 'Connection OR Performance — G1 min',
    },
    {
      level: 2,
      choreography: 'G2',
      other: 'All other KEs Grade 1',
      minConditions: 'Technique & Coaching G1 min · Connection OR Performance G1 min',
    },
    {
      level: 3,
      choreography: 'G2',
      other: '+ ONE other KE G2 · all others G1',
      minConditions: 'Same as Level 2',
    },
    {
      level: 4,
      choreography: 'G2',
      other: '+ TWO other KEs G2 · one G3 allowed',
      minConditions: 'Same as Level 2',
    },
    {
      level: 5,
      choreography: 'G2',
      other: '+ THREE other KEs G2 · one G1 allowed',
      minConditions: 'Same as Level 2',
    },
    {
      level: 6,
      choreography: 'G2',
      other: '+ FOUR other KEs G2',
      minConditions: 'Connection AND Performance G1 min',
    },
    {
      level: 7,
      choreography: 'G2',
      other: '+ ONE other KE G3 · remaining G2',
      minConditions: 'Connection AND Performance G1 min',
    },
    {
      level: 8,
      choreography: 'G2',
      other: '+ TWO other KEs G3 · remaining G2',
      minConditions: 'Same as Level 7',
    },
    {
      level: 9,
      choreography: 'G2',
      other: '+ THREE other KEs G3 · remaining G2',
      minConditions: 'Same as Level 7',
    },
    {
      level: 10,
      choreography: 'G2',
      other: 'ALL other KEs G3',
      minConditions: 'Same as Level 7',
    },
  ];

  const isPremiumLevel = (level: number) => level >= 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            LMQ Level Reference Guide
          </h1>
          <p className="text-lg text-slate-600">
            How grades across the 5 Key Elements combine to determine an instructor's LMQ Level (1–10)
          </p>
        </div>

        {/* Section 1: Key Rules */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">⚠️</span> Always Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 font-medium mb-2">Minimum Grade 1</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Technique: Grade 1</li>
                  <li>• Coaching: Grade 1</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🔓</span> Gateway Grade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 font-medium mb-2">Required for Level 2+</p>
                <p className="text-sm text-slate-600">
                  Choreography Grade 2 unlocks Level 2 and all higher levels
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">📊</span> Active Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 font-medium mb-2">Movement Rules</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Levels 1–6.5: Cannot drop below previous</li>
                  <li>• Levels 7–10: Can move up or down</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Section 2: Level Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">LMQ Level Progression</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-900 text-white">
                <TableRow className="border-0">
                  <TableHead className="text-white font-bold">Level</TableHead>
                  <TableHead className="text-white font-bold">Choreography</TableHead>
                  <TableHead className="text-white font-bold">+ Other Key Elements</TableHead>
                  <TableHead className="text-white font-bold">Min. Conditions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lmqLevels.map((row, idx) => (
                  <TableRow
                    key={row.level}
                    className={`
                      border-b border-slate-200 transition-colors
                      ${isPremiumLevel(row.level)
                        ? 'bg-amber-50 hover:bg-amber-100'
                        : idx % 2 === 0
                          ? 'bg-white hover:bg-slate-50'
                          : 'bg-slate-50 hover:bg-slate-100'}
                    `}
                  >
                    <TableCell>
                      <span className="font-bold text-lg text-slate-900">
                        {row.level}
                        {row.level === 6 && <span className="text-xs text-slate-500">.5</span>}
                      </span>
                      {isPremiumLevel(row.level) && (
                        <Badge variant="secondary" className="ml-2 bg-amber-200 text-amber-900">
                          Premium
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold">
                        {row.choreography}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">{row.other}</TableCell>
                    <TableCell className="text-sm text-slate-600">{row.minConditions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Section 3: Key Elements Detail */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">5 Key Elements Detailed Reference</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {(Object.entries(keyElementDetails) as Array<[keyof typeof keyElementDetails, typeof keyElementDetails[keyof typeof keyElementDetails]]>).map(
              ([element, details]) => (
                <AccordionItem
                  key={element}
                  value={element}
                  className="border border-slate-300 rounded-lg px-4 bg-white data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">
                        {KEY_ELEMENT_ICONS[element as keyof typeof KEY_ELEMENT_ICONS]}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">
                          {KEY_ELEMENT_LABELS[element as keyof typeof KEY_ELEMENT_LABELS]}
                        </p>
                        <p className="text-sm text-slate-600">{details.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-6 space-y-6">
                    {/* Grade Breakdown */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4">Grade Breakdown</h4>
                      <div className="space-y-4">
                        {Object.entries(details.grades).map(([gradeKey, grade]) => (
                          <div
                            key={gradeKey}
                            className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <Badge variant="secondary" className="mt-1 font-bold">
                                Grade {gradeKey}
                              </Badge>
                              <div>
                                <p className="font-bold text-slate-900">{grade.title}</p>
                                <p className="text-sm text-slate-600 italic">{grade.criteria}</p>
                              </div>
                            </div>
                            <ul className="ml-4 space-y-1">
                              {grade.details.map((detail, idx) => (
                                <li key={idx} className="text-sm text-slate-700 list-disc">
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practice Drills */}
                    <div className="pt-4 border-t border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-3">Practice Drills</h4>
                      <ul className="space-y-2">
                        {details.drills.map((drill, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-700">
                            <span className="text-slate-400 font-bold">•</span>
                            <span>{drill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
