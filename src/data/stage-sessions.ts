export interface SessionAction {
  week: string;
  tasks: string[];
}

export interface KeyElement {
  name: string;
  description: string;
}

/** Coaching prompt — a question or instruction the coach should use */
export interface CoachPrompt {
  label: string;
  prompts: string[];
}

/** A single timed block in a structured session plan */
export interface SessionPlanBlock {
  duration: string;
  title: string;
  steps: string[];
  tip?: string;
}

/** Full structured session plan — a runnable agenda the coach follows */
export interface SessionPlan {
  totalDuration: string;
  format: string; // e.g. "1:1 conversation", "video review", "in-person or video call"
  blocks: SessionPlanBlock[];
}

/** Rich coaching session with WHAT / WHY / HOW structure */
export interface CoachingSession {
  what: string;
  why: string;
  how: string[];
  prompts?: CoachPrompt[];
  lmqAlignment?: string;
  goals?: string[];
}

export interface Session {
  id: string;
  title: string;
  subtitle: string;
  coachRole?: {
    summary: string;
    context: string;
    principle: string;
  };
  keyElementFocus?: {
    title: string;
    elements: KeyElement[];
  };
  /** Structured coaching session detail — WHAT / WHY / HOW */
  coachingSession?: CoachingSession;
  /** Timed session plan — the runnable agenda for this session */
  sessionPlan?: SessionPlan;
  instructorPreWork?: {
    title: string;
    description: string;
    phases: { name: string; items: string[] }[];
  };
  warning?: {
    title: string;
    description: string;
  };
  content: SessionAction[];
  proTip?: string;
}

export interface KEActivityItem {
  title: string;
  description: string;
  duration: string;
  steps: string[];
  video?: {
    label: string;
    program?: string;
  };
}

export interface KEActivityGroup {
  element: string;
  color: string;
  items: KEActivityItem[];
}

export interface StageDetail {
  name: string;
  subtitle: string;
  duration: string;
  color: string;
  sessions: Session[];
  keActivities?: KEActivityGroup[];
}

export const stageDetails: Record<number, StageDetail> = {
  1: {
    name: 'Onboarding',
    subtitle: 'Pre-Training',
    duration: '21 Days Before IT',
    color: '#0A0A0A',
    sessions: [
      /* ── Session 1: Welcome ── */
      {
        id: '1-kickoff',
        title: 'Welcome',
        subtitle: 'First session',
        coachRole: {
          summary: 'Meet the instructor, establish the coaching relationship, and understand where they are — whether they\'re brand new to Les Mills or joining your club with experience.',
          context: 'Not every instructor in this stage is doing pre-work for the first time. They may be an experienced instructor new to your team, transferring from another club, or returning after time away. This session is about connection first — find out who they are before you decide what they need.',
          principle: 'Know who\'s in front of you before you plan where they\'re going.',
        },
        keyElementFocus: {
          title: 'Setting the foundation for all 5 Key Elements',
          elements: [
            { name: 'Choreography', description: 'Introduce the importance of music and movement sync' },
            { name: 'Technique', description: 'Frame why safe and effective form matters from day one' },
            { name: 'Coaching', description: 'Set expectations for cueing and layered coaching' },
          ],
        },
        coachingSession: {
          what: 'A genuine meet and greet to establish the coaching relationship and understand the instructor\'s background, goals, and context — before deciding what support they need.',
          why: 'Not everyone in this stage is a first-time instructor. Some are experienced Les Mills instructors joining your team for the first time. The coaching approach needs to match who they are — and you can\'t know that without asking.',
          how: [
            'Introduce yourself as their Club Coach and explain your role (mentor, not assessor)',
            'Ask about their background — are they new to Les Mills, new to your club, or returning?',
            'Listen before you plan — understand their history, goals, and any concerns',
            'If they are doing pre-work for Initial Training: walk through the journey overview and review the Pre-work Checklist together',
            'If they\'re an experienced instructor joining the team: focus on understanding their current level and what support looks like for them',
            'Share your contact details and agree on how you\'ll check in going forward',
          ],
          prompts: [
            {
              label: 'Opening Questions',
              prompts: [
                'Tell me a bit about yourself — what\'s your background with Les Mills?',
                'What brings you to this club / what are you hoping to get out of this stage?',
                'What are you most excited about right now?',
                'What feels most challenging or uncertain?',
              ],
            },
            {
              label: 'For New Instructors (Pre-work)',
              prompts: [
                'What do you already know about Initial Training?',
                'Have you had a chance to look at the Pre-work Checklist yet?',
              ],
            },
            {
              label: 'For Experienced Instructors',
              prompts: [
                'What does your current teaching load look like?',
                'Where do you feel most confident — and where do you want to grow?',
              ],
            },
          ],
          lmqAlignment: 'Sets the foundation for all 5 Key Elements by establishing a growth mindset and a coaching relationship grounded in the instructor\'s actual context.',
          goals: [
            'Coaching relationship established — instructor knows who their Club Coach is and what to expect',
            'Instructor\'s background and context understood before any plan is made',
            'Next steps agreed and communication rhythm set',
          ],
        },
        instructorPreWork: {
          title: 'Pre-Work Checklist',
          description: 'Review this checklist together during the session. LMUS assigns 5\u201310 hours of pre-work covering videos, handbook activities, and allocated track preparation.',
          phases: [
            {
              name: '1. Watch & Learn',
              items: [
                'Introduction to Les Mills Initial Training',
                'Choreography and Music',
                'Technique Foundations',
                'Coaching Layers 1\u20133',
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
                'Practice with music \u2014 transitions, tempo changes, track focus',
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
            week: 'Coach Actions',
            tasks: [
              'Introduce yourself as their Club Coach and explain your role (mentor, not assessor)',
              'Ask about their background before making any assumptions',
              'Listen first — understand who they are and what they need',
              'Share your contact details and agree on next steps',
            ],
          },
        ],
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 — in-person or video call',
          blocks: [
            {
              duration: '10 min',
              title: 'Introductions',
              steps: [
                'Introduce yourself — name, your program(s), how long you\'ve been a Club Coach',
                'Be explicit: "I\'m your mentor, not an assessor — my job is to help you succeed"',
                'Ask: "Tell me a bit about yourself — what\'s your background with Les Mills?"',
                'Listen fully before moving on',
              ],
              tip: 'Don\'t assume they\'re a first-timer. Some instructors joining your team have years of Les Mills experience — start with curiosity, not a script.',
            },
            {
              duration: '15 min',
              title: 'Understand Their Context',
              steps: [
                'Ask: "What brings you to this club / what are you hoping to achieve in this stage?"',
                'If doing Initial Training pre-work: walk through the journey overview and review the Pre-work Checklist together',
                'If experienced and joining the team: explore their current teaching level and what support looks like for them',
                'Identify any concerns or gaps they\'re already aware of',
              ],
            },
            {
              duration: '5 min',
              title: 'Set Up the Coaching Relationship',
              steps: [
                'Share your contact details — how and when they can reach you',
                'Agree on the check-in rhythm: how often, in what format',
                'Confirm the next session or touchpoint',
                'Close with genuine energy and belief in them',
              ],
            },
          ],
        },
        proTip: 'The best first session is one where the instructor does most of the talking. Ask good questions, listen closely, and you\'ll know exactly how to coach them.',
      },
      /* ── Session 2: Initial Training Kickoff ── */
      {
        id: '1-it-kickoff',
        title: 'Initial Training Kickoff',
        subtitle: 'Pre-work start',
        coachRole: {
          summary: 'Set expectations for the pre-work journey and make sure the instructor is ready to start their LMUS pre-work with clarity and confidence.',
          context: 'Pre-work is the self-directed phase where the instructor lays groundwork before attending Initial Training. LMUS assigns 5–10 hours covering videos, handbook activities, and allocated track preparation. Your role is to support and guide — not deliver the training.',
          principle: 'Instructors who feel supported from day one are more confident and better prepared.',
        },
        keyElementFocus: {
          title: 'Setting the foundation for all 5 Key Elements',
          elements: [
            { name: 'Choreography', description: 'Introduce the importance of music and movement sync' },
            { name: 'Technique', description: 'Frame why safe and effective form matters from day one' },
            { name: 'Coaching', description: 'Set expectations for cueing and layered coaching' },
          ],
        },
        coachingSession: {
          what: 'Walk the instructor through their LMUS pre-work, set a timeline with milestones, and make sure they know what to expect at Initial Training.',
          why: 'Pre-work is the foundation for everything that happens at IT. Instructors who go in underprepared struggle — and the difference is almost always whether someone helped them understand what to focus on before they showed up.',
          how: [
            'Walk through the 4-stage journey overview: Pre-work \u2192 IT \u2192 Post-work \u2192 Certification',
            'Review the Pre-work Checklist together — videos, handbook activities, allocated track preparation',
            'Confirm their allocated track and access to the Releases App',
            'Set a realistic timeline with milestone dates',
            'Share your contact info and agree on the check-in rhythm',
          ],
          prompts: [
            {
              label: 'Opening Questions',
              prompts: [
                'What do you already know about Initial Training?',
                'Have you had a chance to look at the Pre-work Checklist yet?',
                'What are you most excited about? What feels most challenging?',
              ],
            },
          ],
          lmqAlignment: 'Sets the foundation for all 5 Key Elements by framing the entire development journey and establishing a growth mindset from day one.',
          goals: [
            'Instructor understands the full pre-work \u2192 IT \u2192 certification journey',
            'Pre-work Checklist reviewed with timeline and milestones set',
            'Coaching check-in rhythm agreed and contact details shared',
          ],
        },
        instructorPreWork: {
          title: 'Pre-Work Checklist',
          description: 'Review this checklist together during the session. LMUS assigns 5\u201310 hours of pre-work covering videos, handbook activities, and allocated track preparation.',
          phases: [
            {
              name: '1. Watch & Learn',
              items: [
                'Introduction to Les Mills Initial Training',
                'Choreography and Music',
                'Technique Foundations',
                'Coaching Layers 1\u20133',
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
                'Practice with music \u2014 transitions, tempo changes, track focus',
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
            week: 'Coach Actions',
            tasks: [
              'Walk through the 4-stage journey overview: Pre-work \u2192 IT \u2192 Post-work \u2192 Certification',
              'Review the Pre-work Checklist together',
              'Set a timeline with milestones',
              'Share your contact info for questions',
            ],
          },
        ],
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 — in-person or video call',
          blocks: [
            {
              duration: '5 min',
              title: 'Quick Reconnect',
              steps: [
                'Check in briefly — how are they feeling about starting the pre-work?',
                'Remind them of your role: "I\'m here to support you through this, not assess you"',
              ],
            },
            {
              duration: '10 min',
              title: 'Journey Overview',
              steps: [
                'Walk through the 4 stages: Pre-work \u2192 IT \u2192 Post-work \u2192 Certification',
                'Explain what each stage involves and roughly how long it takes',
                'Set the frame: "Everything you do in pre-work sets you up for Initial Training"',
                'Ask: "What do you already know about Initial Training?"',
              ],
              tip: 'Keep it visual and high-level. The goal is confidence, not information overload.',
            },
            {
              duration: '10 min',
              title: 'Pre-Work Checklist Review',
              steps: [
                'Open the Pre-Work Checklist together (LMUS assigned — 5–10 hours)',
                'Walk through each section: Watch & Learn videos, Handbook Activities, Track Preparation',
                'Set a realistic timeline with milestone dates',
                'Confirm their allocated track and access to the Releases App',
              ],
            },
            {
              duration: '5 min',
              title: 'Close & Next Steps',
              steps: [
                'Agree on the next check-in (Key Elements Check-in, Week 2–3)',
                'Remind them how to reach you with questions',
                'Send them off with genuine energy: "You\'re set up for this — let\'s go"',
              ],
            },
          ],
        },
        proTip: 'First impressions matter. A clear, structured kickoff removes the uncertainty that makes pre-work feel overwhelming.',
      },
      /* ── Session 3: Key Elements Check-in ── */
      {
        id: '1-ke-checkin',
        title: 'Key Elements Check-in',
        subtitle: 'Week 2\u20133',
        coachRole: {
          summary: 'Check the instructor\'s understanding of the first 3 Key Elements from their pre-work videos.',
          context: 'These are the foundation \u2014 if Choreography, Technique, and Coaching aren\'t solid before IT, the instructor will struggle. LMQ criteria require demonstrating all elements.',
          principle: 'You can\'t coach what you can\'t execute \u2014 check understanding before IT.',
        },
        keyElementFocus: {
          title: 'Deep-dive into the first three Key Elements',
          elements: [
            { name: 'Choreography', description: 'Music structure, beat counting, Choreography Notes literacy' },
            { name: 'Technique', description: 'Position Setup & Execution Setup for key exercises' },
            { name: 'Coaching', description: 'Layer 1 cues: track intro, muscle group, equipment, setup, compulsory cues & options' },
          ],
        },
        coachingSession: {
          what: 'Check the instructor\'s understanding of the first 3 Key Elements from their pre-work videos.',
          why: 'These are the foundation \u2014 if Choreography, Technique, and Coaching aren\'t solid before IT, the instructor will struggle. LMQ criteria require demonstrating all elements.',
          how: [
            'CHOREOGRAPHY check: Ask about their allocated track \u2014 sets of work, transitions, patterns. Confirm they understand music structure, beat counting, and can read their Choreography Notes.',
            'TECHNIQUE check: Ask them to walk through the Position Setup and Execution Setup for a key exercise in their track. Listen for: bar/plate position, alignment cues, muscle activation (Position) and body part & direction, target zones, stability (Execution).',
            'COACHING check: Ask them to script their Layer 1 cues for the first exercise. Listen for: track introduction, muscle group, equipment/weight selection, track focus, demo of complex moves, setup cues, compulsory cues & options.',
            'Use the Coaching Learning Check questions to probe understanding.',
            'Identify gaps and point them back to specific pre-work videos or handbook activities.',
            'Encourage them: "You\'re building the foundation \u2014 this is where confidence starts."',
          ],
          prompts: [
            {
              label: 'Choreography',
              prompts: [
                'Tell me about your allocated track \u2014 how many sets of work?',
                'What are the transitions?',
                'What\'s the pattern?',
              ],
            },
            {
              label: 'Technique',
              prompts: [
                'Walk me through the Position Setup for [key exercise in their track].',
                'Now the Execution Setup \u2014 body part & direction, target zones, stability.',
              ],
            },
            {
              label: 'Coaching',
              prompts: [
                'Script me your Layer 1 cues for the first exercise in your track.',
                'What\'s in a Track Introduction?',
                'What\'s the purpose of Layer 2 cues?',
                'Give me some Layer 3 cues you\'d use in your track.',
              ],
            },
          ],
          lmqAlignment: 'Directly assesses understanding of KE 1 (Choreography), KE 2 (Technique), and KE 3 (Coaching) \u2014 the three elements required for certification.',
          goals: [
            'Instructor can articulate their track structure and read Choreography Notes',
            'Instructor can demonstrate Position Setup and Execution Setup',
            'Instructor can script Layer 1 cues for their allocated track',
          ],
        },
        content: [
          {
            week: 'Choreography Check',
            tasks: [
              'Ask about their allocated track \u2014 how many sets of work? What are the transitions? What\'s the pattern?',
              'Confirm they understand the music structure and beat counting',
              'Verify they can read and use their Choreography Notes',
            ],
          },
          {
            week: 'Technique Check',
            tasks: [
              'Ask them to walk through the Position Setup for a key exercise',
              'Listen for: bar/plate position, alignment cues, muscle activation',
              'Check Execution Setup: body part & direction, target zones, stability',
            ],
          },
          {
            week: 'Coaching Check',
            tasks: [
              'Ask them to script Layer 1 cues for the first exercise in their track',
              'Listen for: track introduction, muscle group, equipment/weight selection, track focus',
              'Check for: demo of complex moves, setup cues, compulsory cues & options',
              'Use Coaching Learning Check questions to probe deeper understanding',
            ],
          },
        ],
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 — video call or in-person',
          blocks: [
            {
              duration: '3 min',
              title: 'Opening Check-In',
              steps: [
                'Quick reconnect: "How\'s the pre-work feeling so far?"',
                'Set the frame: "Today I\'m going to ask you some specific questions — not to test you, but to make sure you\'re set up well for IT"',
              ],
            },
            {
              duration: '8 min',
              title: 'Choreography Check',
              steps: [
                'Ask: "Tell me about your allocated track — how many sets of work? What are the transitions? What\'s the pattern?"',
                'Probe: "Can you describe the music structure for your track — when does it change tempo?"',
                'Check: "Can you read your Choreography Notes? Walk me through one exercise"',
                'Flag any gaps — point them back to the Choreography & Music pre-work video',
              ],
              tip: 'Don\'t accept vague answers. If they say "I think it\'s 3 sets" — get specific. Confidence here = less panic at IT.',
            },
            {
              duration: '10 min',
              title: 'Technique Check',
              steps: [
                'Ask: "Walk me through the Position Setup for a key exercise in your track"',
                'Listen for: bar/plate position, alignment cues, muscle activation',
                'Ask: "Now the Execution Setup — body part and direction, target zones, stability"',
                'If they struggle, don\'t give the answer — ask: "What does the handbook say about this exercise?"',
              ],
            },
            {
              duration: '7 min',
              title: 'Coaching Check',
              steps: [
                'Ask: "Script me your Layer 1 cues for the first exercise in your track"',
                'Listen for: track intro, muscle group, equipment/weight selection, track focus, demo note, setup cues, compulsory cues and options',
                'Ask: "What\'s the purpose of Layer 2 cues?" and "Give me a Layer 3 cue you\'d use in your track"',
                'Use the Coaching Learning Check questions from the handbook if needed',
              ],
            },
            {
              duration: '2 min',
              title: 'Wrap-Up & Gaps',
              steps: [
                'Summarise what was strong: "Your technique understanding is solid"',
                'Name 1–2 specific areas to revisit: "I\'d go back to the Coaching Layers video before we meet next"',
                'Confirm the timeline is on track for the Track Run-Through session',
                'Encourage them: "You\'re building the foundation — this is where confidence starts"',
              ],
            },
          ],
        },
        proTip: 'Don\'t just ask "how\'s the pre-work going?" \u2014 ask specific questions like "script me your Layer 1 cues" to check real understanding, not just completion.',
      },
      /* ── Session 3: Track Run-Through & Self-Review ── */
      {
        id: '1-track-review',
        title: 'Track Run-Through & Self-Review',
        subtitle: 'Week 3\u20134',
        coachRole: {
          summary: 'Watch the instructor\'s self-filmed track delivery and coach them on strengths and areas to develop before IT.',
          context: 'Self-review is a core skill in the LMQ framework. The instructor needs to be able to critically assess their own teaching. This session models how coaching and feedback work.',
          principle: 'Self-review builds the self-awareness that separates good instructors from great ones.',
        },
        keyElementFocus: {
          title: 'Practicing the blend of Choreography, Technique, and Coaching in a real delivery',
          elements: [
            { name: 'Choreography', description: 'Were they in time with the music and on the correct beat? Correct order and reps?' },
            { name: 'Technique', description: 'Did they show the Setup? Position Setup and Execution Setup demonstrated correctly?' },
            { name: 'Coaching', description: 'Did they say the Compulsory Cues? How clear were their Layer 1 cues?' },
          ],
        },
        coachingSession: {
          what: 'Watch the instructor\'s self-filmed track delivery and coach them on strengths and areas to develop before IT.',
          why: 'Self-review is a core skill in the LMQ framework. The instructor needs to be able to critically assess their own teaching. This session models how coaching and feedback work. LMQ alignment \u2014 practicing the blend of Choreography, Technique, and Coaching.',
          how: [
            'Ask the instructor to film themselves teaching their allocated track and share it before this session.',
            'Review the video using the 3 Key Element lens: Choreography (timing, beat, order, reps), Technique (Setup demonstration), Coaching (Compulsory Cues, Layer 1 clarity).',
            'Use the Partner Discussion Questions format from the BP handbook.',
            'Set 1\u20132 specific goals for them to work on before IT.',
            'Remind them of what to bring/prepare for IT day (the Get Ready checklist).',
            'Boost confidence: "You\'ve done the work \u2014 trust the process."',
          ],
          prompts: [
            {
              label: 'Self-Review Discussion',
              prompts: [
                'What worked well?',
                'What would you do differently next time?',
                'What is your strength in your instructing?',
              ],
            },
            {
              label: 'Choreography Review',
              prompts: [
                'Were you in time with the music and on the correct beat?',
                'Did you execute exercises in the correct order with the right reps?',
              ],
            },
            {
              label: 'Technique Review',
              prompts: [
                'Did you show the Setup?',
                'Were Position Setup and Execution Setup demonstrated correctly?',
              ],
            },
            {
              label: 'Coaching Review',
              prompts: [
                'Did you say the Compulsory Cues?',
                'How clear were your Layer 1 cues?',
              ],
            },
          ],
          lmqAlignment: 'Directly practises the integrated delivery of KE 1\u20133 and develops the self-review skill that underpins ongoing LMQ development.',
          goals: [
            'Instructor has filmed and self-reviewed their allocated track',
            '1\u20132 specific improvement goals set for the period before IT',
            'IT day logistics confirmed \u2014 instructor knows what to bring and what to expect',
          ],
        },
        content: [
          {
            week: 'Before This Session',
            tasks: [
              'Ask the instructor to film themselves teaching their allocated track',
              'Have them share the video with you before the session',
            ],
          },
          {
            week: 'During This Session',
            tasks: [
              'Review the video together using the 3 Key Element lens',
              'Use the Partner Discussion Questions: What worked well? What would you do differently? What is your strength?',
              'Set 1\u20132 specific goals to work on before IT',
            ],
          },
          {
            week: 'IT Readiness',
            tasks: [
              'Confirm all LMUS pre-work is 100% complete \u2014 videos watched, handbook done, track prepared',
              'Remind them of the Get Ready checklist: handbook, Releases App, choreography notes, masterclass video, music/playback device, filming device',
              'If online: quiet space, up to 3 devices, test tech 24 hours in advance',
              'Send them off with genuine excitement and belief \u2014 they are ready',
            ],
          },
        ],
        sessionPlan: {
          totalDuration: '45 min',
          format: 'Video call with screen share — or in-person with a device to play back the video',
          blocks: [
            {
              duration: '5 min',
              title: 'Set the Frame',
              steps: [
                'Open by celebrating: "The fact that you filmed yourself is huge — most people never do this"',
                'Explain the structure: "We\'ll watch together, then I\'ll ask you three questions before I say anything"',
                'Confirm you both have access to the video',
              ],
              tip: 'Watch the video together in silence the first time — no commentary. Let them sit with it.',
            },
            {
              duration: '10 min',
              title: 'Self-Review Discussion',
              steps: [
                'Ask: "What worked well?" — let them answer fully before you respond',
                'Ask: "What would you do differently next time?"',
                'Ask: "What do you think is your biggest strength as an instructor right now?"',
                'Listen more than you speak. Take notes on what they notice vs. what they miss.',
              ],
            },
            {
              duration: '8 min',
              title: 'Choreography Lens',
              steps: [
                'Ask: "Were you in time with the music and on the correct beat?"',
                'Ask: "Did you execute exercises in the correct order with the right reps?"',
                'If no, identify the specific moment — timestamp it if possible',
                'Remind them: "At IT, the Trainer will be watching for exactly this — get the music locked in"',
              ],
            },
            {
              duration: '8 min',
              title: 'Technique Lens',
              steps: [
                'Ask: "Did you show the Setup?"',
                'Ask: "Were Position Setup and Execution Setup demonstrated clearly?"',
                'Replay the specific moment together if needed',
                'Note: setup does not need to be perfect — it needs to be present and intentional',
              ],
            },
            {
              duration: '8 min',
              title: 'Coaching Lens',
              steps: [
                'Ask: "Did you say the Compulsory Cues?"',
                'Ask: "How clear were your Layer 1 cues? Would a first-timer know what to do?"',
                'Identify one coaching layer to focus on before IT',
                'Avoid over-coaching — they need confidence more than perfection right now',
              ],
            },
            {
              duration: '6 min',
              title: 'IT Readiness & Close',
              steps: [
                'Set 1–2 specific goals: "Before IT, focus on locking in your Compulsory Cues and the Execution Setup for [exercise]"',
                'Run the Get Ready checklist: handbook, Releases App, Choreography Notes, masterclass video, music/playback device, filming device',
                'If online IT: confirm quiet space, up to 3 devices, tech test 24 hours in advance',
                'Close with belief: "You\'ve done the work. Trust the process. You\'re ready."',
              ],
            },
          ],
        },
        proTip: 'Treat this session like a rehearsal for how coaching works at Les Mills. You\'re modelling the feedback process they\'ll experience throughout their career.',
      },
    ],
    keActivities: [
      {
        element: 'Choreography',
        color: '#6366f1',
        items: [
          {
            title: 'Choreography Notes Breakdown',
            description: 'Read through the Release Notes for your allocated track and break them down in your own words. Understanding transitions, tempo changes, and track focus is the foundation of clean delivery — you cannot teach what you do not understand.',
            duration: '15 min',
            steps: [
              'Get your Release Notes for the allocated track',
              'Read through and mark every transition and tempo change',
              'Identify the focus for each track (e.g. squat depth, range of motion)',
              'Write out the full exercise sequence in your own words',
              'Review your notes against the official Notes to check accuracy',
            ],
          },
          {
            title: 'Learning Check',
            description: 'Quiz yourself on the choreography without looking at the notes. Testing from memory reveals the gaps that reading over notes hides — if you cannot recall it, you cannot deliver it under pressure.',
            duration: '15 min',
            steps: [
              'Close the Choreography Notes',
              'Write from memory: the exercises in order for each track',
              'Write the count for each exercise',
              'Write the compulsory cues for each track',
              'Open the Notes and check your answers — note any gaps',
            ],
          },
          {
            title: 'Allocated Track Preparation',
            description: 'Practice your allocated track alongside the Masterclass video until the timing is automatic. The goal is to match the music so precisely that you could perform it with your eyes closed — true automaticity frees your attention for coaching.',
            duration: '30 min',
            video: { label: 'Watch Masterclass', program: 'allocated-track' },
            steps: [
              'Open the Masterclass video for your allocated track',
              'Practice the track alongside the video, focusing on matching timing exactly',
              'When you can follow along comfortably, try leading instead of following',
              'Repeat until you can perform it without watching the video',
              'Record yourself and check your timing against the music',
            ],
          },
          {
            title: 'Self-Film & Review',
            description: 'Film yourself teaching the track and watch it back with fresh eyes. Self-review exposes issues that feel invisible when you are inside the movement — timing drift, hesitations, and transitions that felt smooth but look choppy.',
            duration: '30 min',
            steps: [
              'Set up your phone to record your full body while teaching',
              'Teach or practice your allocated track on camera',
              'Watch the recording back: Am I on the beat? Are transitions clean?',
              'Note each moment of hesitation or late cueing',
              'Write down 2–3 specific things to fix before your next practice',
            ],
          },
          {
            title: 'Masterclass Video — Voices Off',
            description: 'Practice with the Masterclass video but mute the presenter, using only the music as your guide. If you need the voice to stay on track, you are following — not leading. Music-only practice reveals whether the choreography is truly automatic.',
            duration: '30 min',
            video: { label: 'Watch Masterclass', program: 'allocated-track' },
            steps: [
              'Open the Masterclass video for your allocated track',
              'Mute the presenter\'s voice (not the music)',
              'Attempt to lead the track using only the music as your guide',
              'Note any moments where you lost your place or the timing',
              'Repeat until you can lead through the full track without the voice',
            ],
          },
        ],
      },
      {
        element: 'Technique',
        color: '#f59e0b',
        items: [
          {
            title: 'Technique Practice Worksheets',
            description: 'Write out the Position Setup and Execution Setup for each exercise using the N.E.T.T. framework. Writing forces precision — you cannot hide vague technique knowledge behind physical habit when you have to put it into words.',
            duration: '20 min',
            steps: [
              'List every exercise in your allocated track',
              'For each exercise, write the Name and full Execution setup (N.E.T.T.)',
              'Write the Position Setup — what does correct starting position look like?',
              'Write the Target Zones — what muscles are working?',
              'Review against the Technique Reference to check accuracy',
            ],
          },
          {
            title: 'Self-Film & Compare',
            description: 'Film yourself performing key exercises and compare them side-by-side with the Masterclass video. Seeing the gap between your execution and the standard is more instructive than any description — it makes the correction concrete.',
            duration: '30 min',
            video: { label: 'Watch Masterclass', program: 'allocated-track' },
            steps: [
              'Open the Masterclass video and identify key exercises to compare',
              'Film yourself performing each exercise from the same angle',
              'Play your video side-by-side with the Masterclass',
              'Check Set Position: are your starting points aligned?',
              'Check ROM and Control — note your 2–3 biggest differences',
            ],
          },
          {
            title: 'Self-Film & Compare (Technique Focus)',
            description: 'Same as Self-Film & Compare, but targeting specifically the exercises you scored lowest on in your last assessment. Focused repetition on weak points accelerates improvement faster than general practice.',
            duration: '30 min',
            video: { label: 'Watch Masterclass', program: 'allocated-track' },
            steps: [
              'Review your last assessment notes — which exercises scored lowest?',
              'Film yourself performing those specific exercises',
              'Compare to the Masterclass video at the same angles',
              'Focus on Set Position, ROM, and Control for each',
              'Write a specific corrective action for each gap you find',
            ],
          },
        ],
      },
      {
        element: 'Coaching',
        color: '#0A0A0A',
        items: [
          {
            title: 'Coaching & Scripting Worksheets',
            description: 'Script out your Layer 1, Layer 2, and Layer 3 cues for each exercise word-for-word, then practice saying them aloud. Writing the cues first builds precision — you cannot accidentally ad-lib your way through safety cues in a real class.',
            duration: '30 min',
            steps: [
              'List every exercise in your allocated track',
              'For each exercise, script your Layer 1 cue (safety and setup)',
              'Add a Layer 2 cue (improve execution or correct a common error)',
              'Add a Layer 3 cue (motivate or educate)',
              'Practice saying all cues aloud — do they feel natural and timed to the music?',
            ],
          },
          {
            title: 'Compulsory Cues Identification',
            description: 'Go through your Choreography Notes and highlight every compulsory cue, then label each by coaching layer. Knowing which cues are non-negotiable — and why — means you deliver them even under pressure.',
            duration: '15 min',
            steps: [
              'Open your Choreography Notes and highlight all compulsory cues',
              'For each one, label it: Layer 1 (safety/setup), Layer 2 (execution), or Layer 3 (motivate)',
              'Ask: is this cue about safety, improvement, or motivation?',
              'Confirm you have at least 4 Layer 1 cues marked per track',
              'Review: are any compulsory cues missing from your current delivery?',
            ],
          },
          {
            title: 'Scripting Worksheet',
            description: 'Write out all three coaching layers for every exercise in your allocated track, aiming for specific minimums. Volume and variety in your scripted cues means you always have something real to say — and the best cues become habit.',
            duration: '30 min',
            steps: [
              'List all exercises in your allocated track',
              'Write at least 4 Layer 1 cues (safety and setup) per track',
              'Write at least 2 Layer 2 cues (improve execution) per track',
              'Write at least 2 Layer 3 cues (motivation and education) per track',
              'Practice delivering all cues aloud, timed to the music',
            ],
          },
        ],
      },
      {
        element: 'Connection',
        color: '#ef4444',
        items: [
          {
            title: 'Connection Tools Reflection',
            description: 'Review the full Connection Tools list and honestly assess which feel natural and which feel forced. Knowing your starting point lets you build on strengths and target the specific tools that will make the most difference in your next class.',
            duration: '15 min',
            steps: [
              'Review the Connection Tools list (Look, See & Respond; CRC; SMARTSTART; Names; Four Quadrants)',
              'Mark which tools feel natural and which feel forced',
              'For each forced tool, ask: what makes it feel unnatural?',
              'Choose 2–3 tools to commit to using in your next class',
              'Write down exactly when and how you will use each one',
            ],
          },
          {
            title: 'Facing Fear Tools',
            description: 'Work through the Empowering Belief and Grounding Technique exercises to identify and reframe your biggest fear about teaching. Fear is normal — the difference is whether it controls you or you control it.',
            duration: '20 min',
            steps: [
              'Write out the biggest fear you have about teaching (be honest)',
              'Work through the Empowering Belief exercise: what would you tell a nervous friend?',
              'Reframe your fear into an empowering belief statement',
              'Practice the Grounding Technique: breathe, root, and anchor yourself',
              'Read your reframe statement aloud before your next class',
            ],
          },
          {
            title: 'C.R.C. Practice (Connect, Recommend, Commend)',
            description: 'Practice the CRC conversation method with a partner or in front of a mirror, timing yourself to deliver it in under 60 seconds. Speed and specificity are the marks of a genuine CRC — practiced delivery makes it feel natural in class.',
            duration: '15 min',
            steps: [
              'Choose a partner or use a mirror',
              'Connect: make eye contact, use their name, acknowledge what you see',
              'Recommend one specific thing: name the movement and name the benefit',
              'Commend their effort: be specific, not generic ("great work")',
              'Time yourself — aim to deliver a complete CRC in under 60 seconds',
            ],
          },
          {
            title: 'Four Quadrants',
            description: 'In your next class, mentally divide the room into four sections and ensure you reach every quadrant with coaching and eye contact. The Four Quadrants habit ensures no participant feels invisible — and removes the natural tendency to coach only the front row.',
            duration: '10 min',
            steps: [
              'Mentally divide the room into 4 sections: front-left, front-right, back-left, back-right',
              'At the start of class, identify one person in each quadrant',
              'During each track, make eye contact and deliver at least one cue to each quadrant',
              'After class, note: which quadrant did I ignore? What got in the way?',
              'Repeat each class until coaching all four quadrants feels natural',
            ],
          },
          {
            title: 'C.R.C. In-Class Practice',
            description: 'During your next class, deliver at least one genuine CRC moment — connect with someone, recommend something specific, commend their effort. The only way to build this habit is to practise it in the real environment where it matters.',
            duration: '5 min',
            steps: [
              'Before class, choose one participant to deliver a CRC moment to',
              'During the class, find the right moment — during a track, not at the end',
              'Connect: use their name and make genuine eye contact',
              'Recommend: give one specific, actionable tip',
              'Commend: acknowledge their effort immediately and authentically',
            ],
          },
          {
            title: 'SMARTSTART Practice',
            description: 'Write and rehearse your class introduction using the SMARTSTART framework, then film it and review. A well-delivered SMARTSTART sets the tone for the whole class — it signals professionalism and reduces anxiety for new participants.',
            duration: '10 min',
            steps: [
              'Write out your SMARTSTART introduction (30–45 seconds)',
              'Include the SMARTSTART invitation: options for every level',
              'Film yourself delivering it — does it feel welcoming?',
              'Review: is it inclusive? Does it reduce anxiety for beginners?',
              'Refine until it feels natural, not scripted',
            ],
          },
          {
            title: 'Name Game',
            description: 'Before your next class, commit to learning three new participant names and using them during the workout. Using someone\'s name in the moment of effort is one of the most powerful connection tools available — it costs nothing and means everything.',
            duration: '5 min',
            steps: [
              'Arrive 5 minutes early and introduce yourself to participants you don\'t know',
              'Set a goal: learn 3 new names before class starts',
              'During the workout, use each name at least once with genuine praise',
              'After class, write down all 3 names to help them stick',
              'Aim to add 3 new names each class until you know everyone',
            ],
          },
        ],
      },
      {
        element: 'Performance',
        color: '#00a844',
        items: [
          {
            title: 'Program Essence Study',
            description: 'Watch 2–3 Masterclass videos and study how each presenter embodies the Program Essence. Understanding what authentic performance looks like — versus what feels performed — gives you a concrete target to aim for.',
            duration: '20 min',
            video: { label: 'Watch Masterclass', program: 'release' },
            steps: [
              'Choose 2–3 Masterclass videos from different releases of your program',
              'Watch each asking: what makes this presenter embody the Program Essence?',
              'Note specific moments — a look, a vocal choice, a movement',
              'Ask: what feels authentic versus performed? How do they use the music?',
              'Write 3 things you will bring into your own teaching',
            ],
          },
          {
            title: 'Energy Mapping',
            description: 'Listen to your release music and map the energy arc across the full class: peaks, troughs, builds, and plateaus. Planning where your vocal and physical energy should rise and fall ensures your performance serves the music — not fights it.',
            duration: '20 min',
            steps: [
              'Listen to your full release music without moving',
              'Map the energy arc: mark peaks, troughs, builds, and plateaus on paper',
              'Mark where your vocal energy should rise and fall',
              'Mark where your physical energy should match — and where it should contrast',
              'Teach the track using your map as a guide and note how close you got',
            ],
          },
          {
            title: '5 Voices Practice',
            description: 'Practice using all 5 Voices across a single track, then record yourself and listen back. Most instructors default to one or two Voices — deliberate practice across all five is what builds genuine variety and emotional range.',
            duration: '15 min',
            steps: [
              'Review the 5 Voices: Command, Motivate, Instruct, Encourage, Connect',
              'Pick one track and assign a Voice to each major section',
              'Practice the track using only those assigned Voices',
              'Record yourself — can you hear distinct Voice changes?',
              'Listen back and note which Voice felt least natural — that is your practice target',
            ],
          },
        ],
      },
    ],
  },
  2: {
    name: 'IT \u2192 Certification',
    subtitle: '30 days to cert submission',
    duration: '30 Days',
    color: '#333333',
    sessions: [
      /* \u2500\u2500 Session 1: Debrief & Plan Activated \u2500\u2500 */
      {
        id: '2-debrief-plan',
        title: 'Debrief & Plan Activated',
        subtitle: 'Days 1\u20137',
        coachRole: {
          summary: 'IMT is just the beginning \u2014 and the clock starts immediately. Certification video submission is due 30 days after Initial Module Training. Your role is to debrief within 48 hours, review Trainer feedback, identify 2\u20133 focus skills, and activate the 30-day plan.',
          context: 'Development in this stage is led by a Club Mentor following a clear TAP-designed plan \u2014 or, for clubs that want expert hands-on support, a TAP Coach can step in directly. The club and TAP team need to be in sync from day one of this window.',
          principle: 'The first 48 hours set the pace for the entire 30 days. Move fast, lead with energy.',
        },
        keyElementFocus: {
          title: 'All 5 Key Elements are now in play \u2014 identify which 2\u20133 to prioritise from Trainer feedback',
          elements: [
            { name: 'Choreography', description: '100% correct, in time with the music, automatic execution' },
            { name: 'Technique', description: 'Position and Execution Setups clean and safe' },
            { name: 'Coaching', description: 'All 3 coaching layers delivered with confidence' },
          ],
        },
        coachingSession: {
          what: 'Debrief the full IT experience within 48 hours, review the Development Form, identify 2\u20133 priority skills, and activate the 30-day certification plan.',
          why: 'The energy and confidence from IT is at its peak right now. Capturing that momentum with a clear plan is the single biggest factor in whether an instructor certifies on time. Every day without a plan is a day of drift.',
          how: [
            'Celebrate first \u2014 "You\'ve completed Initial Training. That\'s a massive achievement."',
            'Review the IT & Certification Development Form together \u2014 lead with strengths',
            'Identify 2\u20133 specific skills from Trainer feedback to target first',
            'Explore their CONNECTION and PERFORMANCE breakthroughs from IT \u2014 anchor what clicked',
            'Walk through the 30-day timeline: Days 1\u20137 (plan), Days 7\u201325 (practice & refine), Day 30 (submit)',
            'Set the practice schedule: teach to small group (friends/family) minimum 3 times',
            'Confirm whether a Club Mentor or TAP Coach will lead the hands-on development',
            'Lock in the weekly check-in rhythm \u2014 this is non-negotiable',
            'Set the certification video filming date and work backward',
          ],
          prompts: [
            {
              label: 'Celebration & IT Download',
              prompts: [
                'What moment are you most proud of from IT?',
                'What surprised you about what you could do?',
                'Which of the 5 Key Elements felt strongest during your Teaching Practices?',
              ],
            },
            {
              label: 'Development Form Review',
              prompts: [
                'What did the Trainer highlight as your strengths?',
                'Which 2\u20133 skills are we going to focus on first?',
                'How does it feel to have a clear picture of where you\'re heading?',
              ],
            },
            {
              label: '30-Day Plan',
              prompts: [
                'When can you teach your first small group session this week?',
                'Who in your network can you practise with?',
                'What day works for our weekly check-in?',
              ],
            },
          ],
          lmqAlignment: 'The Development Form maps directly to LMQ certification criteria across all 5 Key Elements. This session translates Trainer feedback into a focused action plan targeting the specific skills needed for a successful certification video.',
          goals: [
            'Debrief completed within 48 hours \u2014 instructor knows exactly what to work on',
            '2\u20133 specific skills identified from Trainer feedback as first priorities',
            '30-day plan activated with practice schedule, check-in rhythm, and filming date',
            'Club Mentor or TAP Coach role confirmed and aligned',
            'Instructor leaves energised and clear on the path to certification',
          ],
        },
        content: [
          {
            week: 'Celebrate & Review',
            tasks: [
              'Debrief within 48 hours \u2014 don\'t let the momentum fade',
              'Review the Development Form together \u2014 strengths first, then opportunities',
              'Identify 2\u20133 specific skills from Trainer feedback to target',
            ],
          },
          {
            week: 'Activate the Plan',
            tasks: [
              'Set the 30-day timeline: practice phase, filming date, submission deadline',
              'Confirm Club Mentor or TAP Coach for hands-on development',
              'Lock in weekly check-in schedule \u2014 this is the structure that drives certification',
              'Share resources: Post-work videos, Choreography Notes, Releases App tools',
            ],
          },
        ],
        proTip: 'Speed matters here. The instructors who certify on time are the ones whose Club Mentor or TAP Coach reached out within 48 hours. Don\'t wait for them to come to you.',
      },
      /* \u2500\u2500 Session 2: Practice & Refine \u2500\u2500 */
      {
        id: '2-practice-refine',
        title: 'Practice & Refine',
        subtitle: 'Days 7\u201325',
        coachRole: {
          summary: 'This is the development engine. The instructor is teaching to small groups, getting LMQ-aligned feedback after each session, and building toward certification-ready delivery. Your role is to observe, coach, and keep the momentum alive.',
          context: 'Whether it\'s a Club Mentor following the TAP plan or a TAP Coach on-site, weekly 10-minute check-ins during this window are the single most important action for getting instructors to Day 30 submission.',
          principle: 'Consistency beats intensity. Three good sessions per week will get them there.',
        },
        keyElementFocus: {
          title: 'Iterating across all 5 Key Elements with LMQ-aligned feedback each session',
          elements: [
            { name: 'Choreography', description: 'On the beat, correct order, automatic execution \u2014 no thinking required' },
            { name: 'Technique', description: 'Setups demonstrated cleanly every time \u2014 participants trust the form' },
            { name: 'Coaching', description: 'Layer 1\u20133 cues flowing naturally \u2014 scripted becomes conversational' },
          ],
        },
        coachingSession: {
          what: 'Observe practice sessions, deliver LMQ-aligned feedback, and keep the instructor progressing toward certification-ready delivery.',
          why: 'This is where the real growth happens. Teaching to small groups (6\u20138 people) in a low-pressure environment builds the muscle memory and confidence needed for a strong certification video. LMQ-aligned feedback after each session ensures they\'re improving the right things.',
          how: [
            'Observe their small group teaching sessions \u2014 aim to see at least one live',
            'Deliver feedback using the 5 Key Element framework after each session',
            'Focus on the 2\u20133 priority skills identified in the Debrief session',
            'Encourage self-filming every 2 weeks so they can see their own progress',
            'Review self-filmed sessions together \u2014 celebrate improvements, refine focus areas',
            'Keep the weekly check-in rhythm going \u2014 even a 10-minute call keeps momentum alive',
            'Watch for signs of stalling (see Danger Zone) and intervene early with encouragement',
            'As Day 25 approaches, start preparing them mentally for certification filming',
          ],
          prompts: [
            {
              label: 'After Each Practice Session',
              prompts: [
                'What felt strongest in that session?',
                'Where did you notice yourself growing compared to last time?',
                'Let\'s look at your [priority skill] \u2014 here\'s what I saw and here\'s what to try next time.',
              ],
            },
            {
              label: 'Self-Review Check-in',
              prompts: [
                'What did you notice when you watched yourself back?',
                'How does your delivery compare to two weeks ago?',
                'What are you most proud of in this video?',
              ],
            },
            {
              label: 'Momentum Check',
              prompts: [
                'How are you feeling about certification \u2014 on a scale of 1\u201310?',
                'What would make you feel more ready?',
                'Is there anything getting in the way of your practice schedule?',
              ],
            },
          ],
          lmqAlignment: 'Every practice session should be coached against LMQ criteria. Feedback should reference specific Key Element standards so the instructor understands exactly what "certification-ready" looks like.',
          goals: [
            'Minimum 3 small group teaching sessions completed',
            'Club Mentor or TAP Coach has observed at least one session live',
            'Self-filmed review completed at least once \u2014 instructor can see their own growth',
            'Priority skills showing clear improvement based on LMQ-aligned feedback',
            'Instructor feels confident and ready to film their certification video',
          ],
        },
        warning: {
          title: 'The Danger Zone: Days 7\u201320',
          description: 'The 30-day window is tight. Most instructors who miss the deadline don\'t stall at the end \u2014 they stall in the middle. The IMT excitement fades around day 7, the choreography still feels hard, and without someone actively checking in, instructors quietly disengage. Whether that person is a Club Mentor following the TAP plan or a TAP Coach on-site, a weekly 10-minute check-in during this window is the single most important action for getting instructors to day-30 submission.',
        },
        content: [
          {
            week: 'Small Group Practice',
            tasks: [
              'Teach to small groups (friends/family) minimum 3 times',
              'Get Club Mentor or TAP Coach to observe at least one practice session',
              'Deliver LMQ-aligned feedback after each session \u2014 focus on the 2\u20133 priority skills',
            ],
          },
          {
            week: 'Self-Review & Coaching',
            tasks: [
              'Film a practice session around Day 14 \u2014 review together',
              'Celebrate progress: "Look how far you\'ve come since IT"',
              'Refine focus areas based on what the video reveals',
              'Maintain weekly check-in rhythm \u2014 10 minutes minimum, no exceptions',
            ],
          },
        ],
        proTip: 'The instructors who certify aren\'t the most talented \u2014 they\'re the most consistent. Your weekly check-in is the accountability that keeps them practising. Don\'t skip it.',
      },
      /* \u2500\u2500 Session 3: Cert Video Submission \u2500\u2500 */
      {
        id: '2-cert-submission',
        title: 'Cert Video Submission',
        subtitle: 'Day 30 \u2014 Due',
        coachRole: {
          summary: 'This is the finish line. Help the instructor film a confident certification video, submit it on time, and celebrate the milestone. The video is reviewed by TAP against all 5 Key Elements and an LMQ level is awarded.',
          context: 'Certification video submission is due within 30 days of IMT \u2014 no extensions. The video is assessed against all 5 Key Elements. Feedback is shared with both the Club Mentor and instructor together.',
          principle: 'They\'ve done the work. Now help them show what they can do.',
        },
        keyElementFocus: {
          title: 'The certification video is assessed against all 5 Key Elements',
          elements: [
            { name: 'Choreography', description: 'Correct choreography, in time with the music, smooth transitions' },
            { name: 'Technique', description: 'Safe and effective demonstration with clear Setups' },
            { name: 'Coaching + Connection + Performance', description: 'Layered cues, authentic connection, energy that matches the music' },
          ],
        },
        coachingSession: {
          what: 'Support the instructor through filming their certification video and submitting it within the 30-day window.',
          why: 'This is the culmination of everything \u2014 pre-work, IT, and 30 days of practice. A well-prepared instructor should feel excited, not anxious. Your leadership in this moment is about confidence-building and celebrating the journey. The TAP review will assess against all 5 Key Elements and award an LMQ level.',
          how: [
            'Do a final readiness check: "How are you feeling? What are you most confident about?"',
            'Review their most recent self-filmed video together \u2014 confirm they\'re ready',
            'Help with filming logistics: location, camera setup, music, clothing',
            'Encourage a warm-up run before the real take \u2014 shake off nerves',
            'After filming: watch it together, celebrate what they see, submit with confidence',
            'Remind them: the video goes to TAP for review against all 5 Key Elements',
            'Set expectations: feedback will be shared with both mentor and instructor together',
            'Celebrate: "You did it. From Day 1 to right now \u2014 look at the instructor you\'ve become."',
          ],
          prompts: [
            {
              label: 'Readiness Check',
              prompts: [
                'How are you feeling about filming today?',
                'What are you most confident about in your delivery?',
                'Is there anything you want to run through one more time?',
              ],
            },
            {
              label: 'Post-Filming Celebration',
              prompts: [
                'How did that feel?',
                'What are you most proud of in that video?',
                'Think back to Day 1 of pre-work \u2014 look at how far you\'ve come.',
              ],
            },
          ],
          lmqAlignment: 'The certification video is formally assessed by TAP against all 5 Key Elements. An LMQ level is awarded based on the review. Feedback is shared with both the Club Mentor and instructor together to set the foundation for ongoing development.',
          goals: [
            'Certification video filmed with confidence and submitted within the 30-day window',
            'Instructor feels proud of what they\'ve achieved \u2014 not just relieved it\'s over',
            'Expectations set for TAP review process and feedback sharing',
            'The journey from pre-work to certification is celebrated as a team achievement',
          ],
        },
        content: [
          {
            week: 'Film Day Preparation',
            tasks: [
              'Final readiness check \u2014 review most recent self-filmed video',
              'Confirm filming logistics: location, camera, music, clothing',
              'Warm-up run to shake off nerves before the real take',
            ],
          },
          {
            week: 'Submit & Celebrate',
            tasks: [
              'Watch the video together \u2014 celebrate what they see',
              'Submit the certification video with confidence',
              'Set expectations: TAP reviews against all 5 KEs, LMQ level awarded, feedback shared with both mentor and instructor',
              'Celebrate the milestone \u2014 "From Day 1 to certified. You did it."',
            ],
          },
        ],
        proTip: 'The best certification videos come from instructors who feel supported, not pressured. If you\'ve done the work in the 30 days leading up to this, filming day should feel like a celebration, not an exam.',
      },
    ],
  },
  3: {
    name: 'Ready to Teach',
    subtitle: 'Post-cert to first slot',
    duration: 'Weeks 1-12',
    color: '#00CC4F',
    sessions: [
      {
        id: '3-celebrate',
        title: 'Cert Celebration',
        subtitle: 'Week 1',
        coachRole: {
          summary: 'Celebrate the achievement and transition the instructor from training mode into teaching mode.',
          context: 'The shift from "learner" to "teacher" is significant. Your role is to build their identity as a Les Mills instructor.',
          principle: 'Recognition fuels confidence.',
        },
        content: [
          {
            week: 'Week 1: Cert Celebration',
            tasks: ['Celebrate the achievement', 'Recognize effort and growth'],
          },
        ],
      },
      {
        id: '3-team-teach',
        title: 'Team Teach',
        subtitle: 'Weeks 2-4',
        content: [
          {
            week: 'Week 2-4: Team Teach',
            tasks: [
              'Co-teach 2-4 live classes with experienced mentor',
              'Learn club rhythm and participant patterns',
              'Build confidence in live environment',
            ],
          },
        ],
        proTip: 'Pair them with instructors who model great energy AND technique — they\'ll absorb both.',
      },
      {
        id: '3-solo',
        title: 'First Solo Classes',
        subtitle: 'Weeks 5-8',
        content: [
          {
            week: 'Week 5-8: First Solo Classes',
            tasks: [
              'Mentor present in studio for first solo teaches',
              'Feedback immediately after each class',
              'Gradual reduction of mentor presence',
            ],
          },
        ],
      },
      {
        id: '3-timetable',
        title: 'Timetable Slot',
        subtitle: 'Weeks 8-12',
        content: [
          {
            week: 'Week 8-12: Timetable Slot',
            tasks: [
              'Regular slot secured on class timetable',
              'Quarterly LMQ assessment scheduled',
              'Begins ongoing development journey',
            ],
          },
        ],
        proTip: 'The first timetable slot is a career milestone. Treat it like one — announce it, support it, protect it.',
      },
    ],
  },
  4: {
    name: 'On Timetable',
    subtitle: 'Nailing the basics',
    duration: 'Ongoing',
    color: '#00FF63',
    sessions: [
      {
        id: '4-choreo',
        title: 'Choreo Lock-In',
        subtitle: 'First 4 Weeks',
        coachRole: {
          summary: 'Ensure the instructor locks in choreography execution so it becomes automatic and reliable.',
          context: 'Choreography accuracy is the foundation everything else is built on. If it\'s shaky, technique and coaching will suffer.',
          principle: 'You can\'t coach what you can\'t execute.',
        },
        keyElementFocus: {
          title: 'Focus on embedding choreography so deeply it becomes second nature',
          elements: [
            { name: 'Choreography', description: 'Every track on beat, zero significant errors' },
            { name: 'Technique', description: 'Safe demonstration every class' },
            { name: 'Coaching', description: 'Layer 1 (form/safety) coaching fluent' },
          ],
        },
        content: [
          {
            week: 'First 4 Weeks: Choreo Lock-In',
            tasks: [
              'Every track on beat, zero significant errors',
              'Automatic execution across all choreography',
              'Consistent professional performance',
            ],
          },
        ],
      },
      {
        id: '4-technique',
        title: 'Technique Consistency',
        subtitle: 'Weeks 4-12',
        content: [
          {
            week: 'Weeks 4-12: Technique Consistency',
            tasks: [
              'Safe demonstration every class',
              'Layer 1 (form/safety) coaching fluent and automatic',
              'Participants know they can trust your technique',
            ],
          },
        ],
      },
      {
        id: '4-coaching',
        title: 'Coaching Layers',
        subtitle: 'Month 3+',
        content: [
          {
            week: 'Month 3+: Coaching Layers',
            tasks: [
              'Layer 2 coaching introduced and developed',
              'Balanced mix of safety, motivation, and inspiration',
              'More personalized feedback to participants',
            ],
          },
        ],
      },
      {
        id: '4-lmq',
        title: 'LMQ Assessment',
        subtitle: 'Quarterly',
        content: [
          {
            week: 'Quarterly: LMQ Assessment',
            tasks: [
              'Grade update against all 5 Key Elements',
              'Feedback on growth across programming',
              'Goals set for next quarter',
              'Identify Stage 5 readiness: KEs 1–3 at solid Grade 1, Layer 1 coaching automatic, upward LMQ trend',
            ],
          },
        ],
        proTip: 'When KEs 1–3 are consistently Grade 1 and coaching is automatic → Ready for Stage 5 — Advanced: Grade 2 push, Connection & Performance awakening, and growing impact.',
      },
    ],
  },
  5: {
    name: 'Advanced',
    subtitle: 'Advanced Training — Leadership, Essence & Experience',
    duration: '6–18+ months',
    color: '#5B3A8A',
    sessions: [
      {
        id: '5-welcome',
        title: 'Welcome to Advanced',
        subtitle: '30 min — 1:1 in-person or video call',
        coachRole: {
          summary: 'Supporter. Advanced Training changes the game — your job is to know what they learned and help them apply it.',
          context: 'This instructor has moved beyond technical basics. Advanced Training introduced them to a deeper layer of development: finding their Why, understanding their Values and Beliefs (Limiting vs Empowering), discovering their program\'s Essence, and learning to Enhance the Experience for participants. Your role is not to re-teach AT content — it\'s to reinforce it in the club context. If the instructor hasn\'t attended AT yet, this session is about preparing them for what\'s coming and ensuring they\'re ready.',
          principle: 'Advanced Training is where instructors stop teaching a workout and start leading an experience.',
        },
        coachingSession: {
          goals: [
            'Coach confirms the instructor has attended (or is scheduled for) Advanced Training',
            'Coach understands what AT covers — Leadership, Essence, Enhance the Experience',
            'Coach and instructor align on how AT learning connects to their club teaching',
          ],
          what: 'Advanced Training is a 2-day coaching-led program that shifts instructors from workout delivery to fitness leadership. It covers three pillars: Leadership (personal Why, Values, Empowering and Limiting Beliefs), Essence (the personality of their specific program — State of Mind, Show, What You Say, How You Say It), and Enhance the Experience (Connect, Motivate, Educate, Show Enjoyment). The instructor completes a Personal Journal, watches program-specific pre-work videos, and delivers 3 coached track presentations. Entry criteria: the instructor should have attended or be scheduled for Advanced Training in their primary program.',
          why: 'Before AT, the coach\'s focus was on KE grades and technical skills. After AT, the instructor has been introduced to identity-level development — who they are as a fitness leader, what they believe, how their program\'s Essence should feel. If the Club Coach doesn\'t know this has happened, they\'ll keep coaching at the surface level and miss what the instructor is now ready for. This session closes that gap.',
          how: [
            'Confirm the instructor has attended (or is booked for) Advanced Training — if not, discuss readiness and timing',
            'Ask the instructor: "What was your biggest takeaway from AT?" — listen for Leadership, Essence, or Experience themes',
            'Review their Personal Journal together if they\'re willing to share — look for their Why statement and identified Beliefs',
            'Understand which program they attended AT for — the Essence content is program-specific',
            'Set the frame: your coaching conversations from here will reference their AT learning, not just KE grades',
          ],
        },
        content: [],
      },
      {
        id: '5-leadership-beliefs',
        title: 'Leadership & Beliefs',
        subtitle: '45 min — observation + conversation',
        coachRole: {
          summary: 'Belief Spotter. Advanced Training introduced Leadership, Why, Values, and Beliefs. Your job is to see these playing out — or not — on the gym floor.',
          context: 'In AT, the instructor explored their personal Why (the reason they teach), their Values, and the difference between Limiting Beliefs (which hold them back) and Empowering Beliefs (which drive growth). They learned three ways people handle Limiting Beliefs: Dominate (it controls everything), Avoidance (deny it exists), or Embrace (let it have space without letting it push you around). Your role is to notice when beliefs show up in their teaching. An instructor who avoids eye contact may have a Limiting Belief about connection. An instructor who plays it safe with energy may not be expressing their Why. Use coaching conversations (GROW) to explore this — but remember: you are a coach, not a therapist. If emotions become intense, acknowledge and validate, but know the boundary.',
          principle: 'Limiting Beliefs show themselves through actions. Watch the teaching — the story is right there.',
        },
        keyElementFocus: {
          title: 'KEs 4 & 5: Where beliefs are most visible',
          elements: [
            { name: 'Connection', description: 'Does the instructor connect authentically? Are they using names beyond the front row? Is there Look, See & Respond happening? Or do they teach as if no one is there? Limiting Beliefs around connection often show up as avoidance — staying on the stage, avoiding eye contact, defaulting to generic cues.' },
            { name: 'Performance', description: 'Is the instructor\'s Why coming through in their energy? Are they showing genuine enjoyment of their program, or going through the motions? Empowering Beliefs fuel authentic performance. Limiting Beliefs create a version of teaching that feels held back.' },
          ],
        },
        coachingSession: {
          goals: [
            'Coach can identify when Limiting Beliefs are showing up in the instructor\'s teaching',
            'Instructor\'s Why is connected to their on-floor actions',
            'One Empowering Belief identified and reinforced',
          ],
          what: 'Observe a class specifically looking for Leadership signals — is the instructor\'s Why visible in how they show up? Do their Values come through in how they treat participants? Are there moments where a Limiting Belief seems to hold them back (avoiding challenge, playing it safe, disconnecting)? After the class, use a GROW conversation to explore what you saw. Start with their self-assessment: "How did that feel compared to what you explored in AT?"',
          why: 'Leadership is the foundation of the AT model — it sits at the center of the wheel. Everything else (Essence, Experience) is built on top of it. If the instructor\'s Why isn\'t anchored, Essence becomes performance rather than authenticity, and Enhancing the Experience becomes technique rather than genuine connection. The Club Coach who can spot belief patterns accelerates development far beyond grade targets.',
          how: [
            'Observe a full class — note 2–3 specific moments where you see Leadership (or its absence)',
            'In your coaching conversation, start with: "In AT you explored your Why and Beliefs — how are you seeing those show up in your teaching?"',
            'If you see a Limiting Belief pattern, name it gently: "I noticed you [specific behavior] — does that connect to anything you identified in your journal?"',
            'Identify one Empowering Belief to reinforce — something you saw working: "When you did [specific moment], that felt like your Why in action"',
            'Remember: coaching, not therapy. If emotions run high, acknowledge ("I can see this matters to you"), validate ("that takes courage to explore"), and redirect to actions within teaching',
          ],
          prompts: [
            {
              label: 'Opening',
              prompts: [
                'What stood out to you from your AT experience — what\'s stayed with you?',
                'How would you describe your Why to someone who\'s never done AT?',
              ],
            },
            {
              label: 'Exploring Beliefs',
              prompts: [
                'When you think about teaching, what\'s the voice in your head that holds you back?',
                'When are you at your absolute best in class? What belief is driving that?',
                'In AT you looked at Limiting vs Empowering Beliefs — which one showed up most in today\'s class?',
              ],
            },
            {
              label: 'Connecting to Action',
              prompts: [
                'If your Empowering Belief was fully in charge during class, what would be different?',
                'What\'s one thing you could do next class to let your Why come through more?',
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 — observation + conversation',
          blocks: [
            {
              duration: '5 min',
              title: 'Check in',
              steps: [
                'How have things been since AT?',
                'Any moments in recent classes where you felt your AT learning showing up?',
              ],
            },
            {
              duration: '20 min',
              title: 'Observation debrief — Leadership lens',
              steps: [
                'Share 1–2 specific moments where you saw their Why in action',
                'Ask: "Where did you feel most like yourself in that class?"',
                'If a Limiting Belief pattern was visible, name it gently and link it to the AT journal',
              ],
              tip: 'Don\'t evaluate — explore. "I noticed X" is more powerful than "you need to fix X" at this stage.',
            },
            {
              duration: '15 min',
              title: 'Empowering Belief reinforcement',
              steps: [
                'Identify one specific moment where an Empowering Belief was visible',
                'Build an if–then plan: "Next time I feel [Limiting Belief trigger], I will [Empowering Belief action]"',
              ],
            },
            {
              duration: '5 min',
              title: 'Set focus for next observation',
              steps: [
                'Agree on one Leadership signal to watch for next class',
                'Confirm next observation date',
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: '5-essence-experience',
        title: 'Essence & Enhance the Experience',
        subtitle: '45 min — observation + conversation',
        coachRole: {
          summary: 'Essence Activator. The instructor learned their program\'s personality in AT. Your job is to see whether the class FEELS like the program — not just follows the moves.',
          context: 'Every Les Mills program has its own Essence — a distinct personality that determines how the class should feel for participants. BODYCOMBAT is "Empowered and In Control." BODYPUMP is about bringing the passion and challenging people to believe in their strength. BODYBALANCE is "Long, Strong, Calm." RPM is about the emotional journey on the bike. In AT, the instructor learned their program\'s Essence through four lenses: State of Mind (how you feel), Show (what participants see), What You Say (the words), and How You Say It (the delivery — the program\'s Voices). They also learned to Enhance the Experience through Connect, Motivate, Educate, and Show Enjoyment. Your role: observe whether the Essence is coming through and whether the Experience goes beyond correct execution.',
          principle: 'A class with Essence feels like the program. A class without it just feels like exercise.',
        },
        keyElementFocus: {
          title: 'All 5 KEs through the Essence lens',
          elements: [
            { name: 'Essence', description: 'State of Mind — is the instructor in the right headspace for their program? Show — does their physicality match the program (power for BODYCOMBAT, precision for BODYPUMP, calm for BODYBALANCE)? What You Say — are the words program-authentic, not generic? How You Say It — are they using the right Voices for their program?' },
            { name: 'Enhance the Experience', description: 'Connect — are they building real relationship with participants? Motivate — are they driving effort and belief? Educate — are they teaching participants to understand what they\'re doing and why? Show Enjoyment — is their love for the program authentic and visible? Show Enjoyment is contagious — when the instructor loves it, participants feel it.' },
          ],
        },
        coachingSession: {
          goals: [
            'Coach can describe their instructor\'s program Essence (State of Mind, Show, What You Say, How You Say It)',
            'Instructor is applying Essence in class — not just executing choreography',
            'At least one Enhance the Experience element (Connect, Motivate, Educate, Show Enjoyment) is actively developing',
          ],
          what: 'Observe a class with Essence as the lens — not just KE grades. Ask: does this class FEEL like the program? Is the instructor\'s State of Mind right? Are they Showing the program\'s personality? Are the words and delivery authentic to the program? After class, use coaching to explore where Essence was strong and where it faded. Connect back to their AT learning and journal notes on Essence.',
          why: 'Essence is what separates a good class from a program-authentic class. It\'s why participants choose BODYCOMBAT over a generic boxing class, or BODYBALANCE over a generic yoga class. When Essence is strong, participant retention goes up, class numbers grow, and instructors feel more connected to their teaching. The Club Coach who can spot and develop Essence is coaching at the level that Advanced Training intended.',
          how: [
            'Before the observation, review the program\'s Essence description (available in program cards) — know what you\'re looking for',
            'Observe with four questions: State of Mind? Show? What did they Say? How did they Say It?',
            'Also note which Enhance the Experience elements are present: Connect, Motivate, Educate, Show Enjoyment',
            'In the coaching conversation: "AT introduced you to [program] Essence — the four parts. Which one felt strongest today? Which one do you want to develop?"',
            'Ask: "When did you feel most like yourself in that class? That\'s probably where your Essence is most natural."',
          ],
          prompts: [
            {
              label: 'Opening',
              prompts: [
                'If you had to describe what your program should FEEL like for participants, what would you say?',
                'In AT you explored Essence through State of Mind, Show, What You Say, and How You Say It — which one do you feel most confident with?',
              ],
            },
            {
              label: 'Essence Deep-Dive',
              prompts: [
                'I noticed a moment in a track where the energy shifted — what was happening for you?',
                'Your delivery felt really strong in that section — what were you thinking about?',
                'If a new instructor watched your class, would they know what program this is without seeing the moves? What would tell them?',
              ],
            },
            {
              label: 'Enhance the Experience',
              prompts: [
                'Where in the class did you feel most connected to participants? What made that moment work?',
                'Show Enjoyment is about being authentic, not performing — when in the class do you naturally love what you\'re doing?',
                'How are you Educating participants — helping them understand the why of what they\'re doing?',
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 — observation + conversation',
          blocks: [
            {
              duration: '5 min',
              title: 'Check in',
              steps: [
                'How are you feeling about the program at the moment?',
                'Anything you were consciously working on in today\'s class?',
              ],
            },
            {
              duration: '20 min',
              title: 'Essence debrief',
              steps: [
                'Share what you observed through each Essence lens: State of Mind, Show, What You Said, How You Said It',
                'Ask: "Where did the program feel most alive in that class?"',
                'Identify one Essence element to develop — make it specific to a track or moment',
              ],
              tip: 'Use program-specific language from the AT materials. Don\'t say "you seemed disconnected" — say "the State of Mind for BODYCOMBAT is Empowered and In Control — I saw that in tracks 3 and 7, but it faded in track 5."',
            },
            {
              duration: '15 min',
              title: 'Enhance the Experience focus',
              steps: [
                'Identify which of the four elements (Connect, Motivate, Educate, Show Enjoyment) is strongest — and which to develop next',
                'Build one specific intention: "In the next class, I will [specific Enhance action] in [specific track]"',
              ],
            },
            {
              duration: '5 min',
              title: 'Set focus for next observation',
              steps: [
                'Agree on one Essence or Experience element to watch for next class',
                'Confirm next observation date',
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: '5-coaching-conversations',
        title: 'Coaching Conversations & Ongoing Development',
        subtitle: '30 min — 1:1 conversation',
        coachRole: {
          summary: 'Development Partner. The instructor now has AT tools and language. Your role shifts — meet them where they are, not where they were.',
          context: 'In AT, the instructor experienced a coaching model: Rapport (Instant Connection + Frame), Explore (Invite to Explore + W+H+W questioning), and Advance (Summarize + Create a Plan). They also learned about C/C Glasses — assessing Confidence and Competence to decide when to coach vs when to direct or re-teach. They practiced Coaching Fundamentals: Trust, Curiosity, Silence & Listening, Positive Language & Praise, Storytelling & Metaphors. Your GROW conversations should now reflect this — the instructor has been coached at a deeper level and expects more than surface-level feedback. Shift from "here\'s what to fix" to "what did you notice, and what do you want to work on?"',
          principle: 'After AT, the best coaching conversations are the ones where the instructor coaches themselves.',
        },
        coachingSession: {
          goals: [
            'Coach understands the AT coaching model (Rapport → Explore → Advance) and how it connects to their own GROW conversations',
            'C/C Glasses concept is understood — when to coach vs when to direct',
            'Second program AT pathway discussed if first program is solid',
            'Ongoing observation rhythm set',
          ],
          what: 'This session is about evolving the ongoing coaching relationship. The instructor has new tools and language from AT. Your conversations should reference their AT learning: their Why, their Beliefs, their Essence. When you give feedback, connect it to these frameworks — not just KE grades. Discuss second program AT: if their first program is solid, is there bandwidth for AT in another program? Set the ongoing observation rhythm — bi-monthly minimum at this stage, with feedback focused on Essence and Experience, not just technical KE targets.',
          why: 'The biggest risk after AT is that the instructor returns to the club and nothing changes. The excitement fades, the journal goes in a drawer, and teaching reverts to autopilot. The Club Coach is the bridge between the AT experience and sustained transformation. Without intentional follow-through, AT becomes a nice weekend instead of a career-changing moment. Your ongoing coaching keeps the AT learning alive.',
          how: [
            'Ask: "Since AT, what\'s changed in how you approach your classes?"',
            'Reference their AT language in your coaching — use "Essence," "Beliefs," "Enhance the Experience" rather than just KE numbers',
            'Apply C/C Glasses thinking: this instructor likely has high competence now — if confidence matches, coach don\'t teach. If confidence is lower than competence, build it through recognition and evidence.',
            'Discuss second program AT: "Your first program is strong — is it time to explore AT for your next program?"',
            'Set bi-monthly observation rhythm — feedback shifts from "basics" to "1% improvements" and Essence development',
            'Track: is the instructor\'s self-assessment becoming more accurate over time? That\'s a sign of real growth.',
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 — conversation',
          blocks: [
            {
              duration: '10 min',
              title: 'AT integration check',
              steps: [
                'Ask: "Since AT, what\'s changed in how you approach your classes?"',
                'Listen for Leadership, Essence, or Experience language — are they using their AT vocabulary?',
                'If not: "What was the biggest thing you took away from AT? Is it showing up in your teaching?"',
              ],
              tip: 'If the journal has gone in a drawer, this is the moment to bring it out. Ask them to share one thing from their Why statement or Beliefs page.',
            },
            {
              duration: '10 min',
              title: 'C/C Glasses — coaching vs directing',
              steps: [
                'Assess current Confidence and Competence — are they aligned?',
                'If high competence, lower confidence: build through recognition ("I saw your Essence clearly in that class — here\'s the evidence")',
                'If confidence is matching competence: coach don\'t teach — open GROW with "what do you want to work on today?"',
              ],
            },
            {
              duration: '10 min',
              title: 'Next program & ongoing rhythm',
              steps: [
                'Second program AT discussion: is first program solid enough to explore AT for a second program?',
                'Set bi-monthly observation schedule — confirm next two dates',
                'Agree on the focus lens for next observation: Leadership, Essence, or Enhance the Experience',
              ],
            },
          ],
        },
        proTip: 'When Grade 2 is solid across KEs 1–3, Connection is emerging, and the instructor is starting to build influence → Ready for Stage 6 — World-Class: Mastery, Performance, influence, and legacy. The journey from good to extraordinary.',
        content: [],
      },
    ],
    keActivities: [
      {
        element: 'Personal Journal',
        color: '#5B3A8A',
        items: [
          {
            title: 'Review the AT Personal Journal Together',
            description: 'The instructor completed a Personal Journal during Advanced Training — it contains their Why statement, Values, identified Limiting and Empowering Beliefs, and Essence reflections. Reviewing it together connects the AT experience to your ongoing coaching conversations.',
            duration: '20 min',
            steps: [
              'Ask the instructor to bring their AT Personal Journal to your next session',
              'Ask them to share their Why statement — and reflect on whether it\'s showing up in their teaching',
              'Look at their Beliefs page together: which Limiting Belief do they want to work on? Which Empowering Belief do they want to amplify?',
              'Note 1–2 entries that you\'ll reference in your next observation debrief',
              'Keep the journal visible — suggest they put a sticky note from it somewhere they see before class',
            ],
          },
        ],
      },
      {
        element: 'Pre-Work Videos',
        color: '#5B3A8A',
        items: [
          {
            title: 'Program-Specific Pre-Work',
            description: 'Before attending Advanced Training, instructors watch a set of program-specific videos covering Technique, Coaching, Essence, and Scripting for their program. If the instructor is preparing for AT, reviewing these together helps them arrive ready. If they\'ve already attended, revisiting them reinforces the learning.',
            duration: '30 min',
            video: { label: 'Watch Pre-Work Videos', program: 'at-pre-work' },
            steps: [
              'Identify which program the instructor is attending AT for',
              'Locate the pre-work videos for that program (Technique, Coaching, Essence, Scripting)',
              'Watch the Essence pre-work video together — discuss: what does the program\'s personality mean in practice?',
              'Ask: "After watching that, what\'s one thing you want to be more intentional about in your next class?"',
            ],
          },
        ],
      },
      {
        element: 'Program Essence Reference',
        color: '#5B3A8A',
        items: [
          {
            title: 'Essence Quick Reference — State of Mind, Show, What You Say, How You Say It',
            description: 'Each Les Mills program has a defined Essence — a personality the instructor embodies. This reference helps the Club Coach know what to look for in each program observation, and gives both coach and instructor a shared vocabulary for Essence feedback.',
            duration: '10 min',
            steps: [
              'Identify the instructor\'s program and look up its Essence description',
              'Review the four Essence lenses: State of Mind, Show, What You Say, How You Say It',
              'Before your next observation, write one question for each lens that you\'ll reflect on while watching',
              'After the observation, use these four lenses to structure your feedback — be specific to moments in the class',
            ],
          },
        ],
      },
      {
        element: 'Coaching vs Therapy Guide',
        color: '#5B3A8A',
        items: [
          {
            title: 'When Coaching Conversations Get Emotional',
            description: 'Advanced Training explores identity-level content — Why, Values, Beliefs. This can surface genuine emotion in coaching conversations. The Club Coach needs to know the boundary between coaching and therapy, and have a clear process for managing distress.',
            duration: '15 min',
            steps: [
              'Understand the boundary: coaching explores what\'s possible; therapy explores what happened. You are a coach.',
              'If a conversation becomes emotionally intense: Observe (notice the shift), Pause (slow down), Acknowledge ("I can see this matters to you"), Validate ("that takes courage to explore"), Ask ("are you okay to keep going?"), Options ("we can stay here, or shift to something more practical")',
              'Use the Challenge Dial: turn intensity up when the instructor is ready, down when they need safety',
              'If a participant discloses something beyond your scope: refer to appropriate support, document it, and follow your club\'s duty of care process',
              'Debrief yourself after intense coaching conversations — your own wellbeing matters too',
            ],
          },
        ],
      },
      {
        element: 'Coaching Conversations Model',
        color: '#5B3A8A',
        items: [
          {
            title: 'The AT Coaching Framework — Rapport, Explore, Advance',
            description: 'Advanced Training teaches instructors a coaching model they can use with participants. As their Club Coach, understanding this model helps you align your own GROW conversations with the language and approach they\'ve learned. It also helps you coach them to use it.',
            duration: '15 min',
            steps: [
              'Rapport phase: Instant Connection (genuine interest, not small talk) + Frame (set the purpose of the conversation)',
              'Explore phase: Invite to Explore ("tell me about...") + W+H+W questioning (What happened? How did it feel? What would you do differently?)',
              'Advance phase: Summarize (reflect back what you heard) + Create a Plan (one specific action)',
              'C/C Glasses: assess Confidence and Competence separately. High competence + low confidence = build belief. Low competence = direct and teach.',
              'Coaching Fundamentals: Trust (be consistent), Curiosity (ask before telling), Silence & Listening (resist filling the gap), Positive Language (frame toward growth), Storytelling & Metaphors (make abstract concrete)',
            ],
          },
        ],
      },
      {
        element: 'Guided Feedback',
        color: '#00FF63',
        items: [
          {
            title: 'CRC & GROW Feedback Tools',
            description: 'The core feedback tools for Club Coaches — Connect/Recommend/Commend (CRC) for structured post-class feedback, and GROW (Goal, Reality, Options, Will) for coaching conversations. Both tools are built into the Guided Feedback section of this app.',
            duration: '30 min',
            steps: [
              'Open the Guided Feedback section from the main navigation',
              'Select the instructor and the program observed',
              'Use LMQ context to frame the feedback — what stage are they at, what are the active targets?',
              'Choose CRC for direct post-class feedback, or GROW for a development conversation',
              'Copy your feedback and share it with the instructor directly',
            ],
          },
        ],
      },
    ],
  },
  6: {
    name: 'World-Class',
    subtitle: 'Presenter Framework — 3 Dimensions & Levels 7–10',
    duration: 'Ongoing',
    color: '#FF623E',
    sessions: [
      {
        id: '6-presenter-intro',
        title: 'Welcome to World-Class',
        subtitle: '30 min — 1:1 conversation',
        coachRole: {
          summary: 'Elevation Partner. This instructor doesn\'t need fixing. Your role shifts from developing skills to elevating artistry.',
          context: 'This instructor has arrived. Choreography, Technique, and Coaching are solid. Advanced Training learning (Leadership, Essence, Enhance the Experience) is embedded. They\'re at or approaching Level 7 — the point where development stops being about what\'s missing and starts being about what\'s possible. The Presenter Framework introduces the 3 Dimensions: Connect, Motivate, Educate — not as separate skills but as a continuous blend that defines world-class instruction. Your coaching register changes here: thought-provoking questions, not direct instruction. The Big Picture is about elevation, not correction.',
          principle: 'The shift from great to world-class is not about doing more — it\'s about everything working as one.',
        },
        coachingSession: {
          goals: [
            'Coach understands the Presenter Framework and what Levels 7–10 represent',
            'Coach and instructor align on the shift from correction to elevation',
            'The 3 Dimensions (Connect, Motivate, Educate) are introduced as the operating framework',
          ],
          what: 'Introduce the instructor to the Presenter Framework. Explain what Levels 7–10 represent: Level 7 is TAP Presenter eligibility (the performance standard, not automatic status). Level 8 is LM Filming/Presenting standard. Levels 9–10 are elite, world-class — where HIGHER or LOWER levels may be awarded at Grade Review (the Level 6.5 protection rule no longer applies). Introduce the 3 Dimensions: Connect (authentic relationship with audience), Motivate (sustained genuine energy that drives effort), Educate (knowledge delivered naturally, enriching without interrupting). At presenter level these three blend continuously — they don\'t operate in sequence. The coach\'s role shifts: start from the assumption of mastery. Use the process of elimination to identify development focus. Feedback becomes coaching-led — thought-provoking questions that prompt self-directed growth.',
          why: 'Without this framing, the Club Coach will keep coaching at the same level as Stage 5 — looking for things to fix. At presenter level, the instructor knows the program deeply. They don\'t need to be told what to do. They need a thinking partner who can see what they can\'t: the single shift that elevates from great to world-class. If the coach doesn\'t understand the Presenter Framework, they\'ll either under-coach (assuming there\'s nothing left to develop) or over-coach (giving instruction that feels patronising to an elite instructor). This session calibrates the relationship.',
          how: [
            'Explain the Level 7–10 framework: what each level represents, what changes (higher or lower levels, no 6.5 protection)',
            'Introduce the 3 Dimensions — Connect, Motivate, Educate — as the lens for all future observations',
            'Name the coaching register shift: "From here, my feedback will be questions more than statements. You know this program — I\'m here to help you see what you can\'t see yourself."',
            'Ask: "What does world-class mean to you in [their program]? What would it look and feel like?"',
            'Discuss the assessor mindset they\'ll face at Grade Review: start from mastery, process of elimination',
          ],
        },
        content: [],
      },
      {
        id: '6-three-dimensions',
        title: 'The 3 Dimensions in Action',
        subtitle: '45 min — observation + conversation',
        coachRole: {
          summary: 'Dimension Spotter. Watch for the blend — when Connect, Motivate, and Educate flow as one continuous delivery, that\'s presenter level.',
          context: 'At standard Grade 3, an instructor might Connect well in one moment, then Motivate, then Educate — as distinct actions. At presenter level, these three dimensions operate simultaneously. The coaching cue that educates also motivates. The eye contact that connects also drives effort. The knowledge that educates is delivered with energy that motivates. Your job is to observe whether these dimensions are blending or still operating as separate skills. When they blend, you\'ll feel it — the class has a continuous synergy between the music, moves and movers. When they don\'t blend, you\'ll see transitions between modes — a shift from "connecting mode" to "coaching mode" to "performing mode."',
          principle: 'At presenter level, Connect, Motivate, and Educate are not three things. They\'re one thing expressed three ways.',
        },
        keyElementFocus: {
          title: 'KEs 4 & 5 through the 3 Dimensions lens',
          elements: [
            { name: 'Connection', description: 'At presenter level, connection is not one-to-one but room-wide. The atmosphere itself is a product of the presenter\'s presence. Every participant feels simultaneously seen and part of something larger. Look, See and Respond must work with a live audience AND (at Level 8+) direct-to-camera — the camera is treated as a participant. Creates an atmosphere of authentic care and community.' },
            { name: 'Performance', description: 'Claiming the stage is the Performance descriptor that most distinguishes a presenter from a great instructor. It is not confidence alone — it is ownership of the space that makes the audience feel secure and energised simultaneously. Enjoyment is not performed — it is genuine and visible in the body, not just the face. Voice contrast is used to energise, motivate and educate.' },
          ],
        },
        coachingSession: {
          goals: [
            'Coach can identify how Connect, Motivate, and Educate show up (or don\'t) during a class',
            'Coach can spot when the 3 Dimensions are blending vs operating separately',
            'One specific elevation opportunity identified',
          ],
          what: 'Observe a full class with the 3 Dimensions as your lens. For each track, note: where do you see Connect? Where Motivate? Where Educate? More importantly: where do they blend into one seamless delivery? And where do they feel like separate actions? After class, use coaching-led questions to explore what you observed. Start from what was strong — elevation, not correction.',
          why: 'The 3 Dimensions are the framework that distinguishes Levels 7–10 from everything below. A coach who can see these dimensions — and who can articulate when they\'re blending vs when they\'re separate — gives the instructor feedback no one else can give. Most people can tell a great class from a good one. A Club Coach at this level can explain WHY it was great and what would make it extraordinary.',
          how: [
            'Observe a full class — note specific moments where the 3 Dimensions blend (track number, what happened)',
            'Also note moments where dimensions felt separate (shifted from connecting to coaching to performing)',
            'In your conversation, start with: "There were moments in that class where everything was flowing as one — tell me about Track [X]"',
            'Ask: "When in the class do you feel most in flow — where connecting, motivating and educating all happen at once?"',
            'Identify one specific moment where a small shift would elevate the blend: "What if in Track [X], instead of pausing to educate, the education came through the motivation?"',
          ],
          prompts: [
            {
              label: 'Opening',
              prompts: [
                'If someone watched your class for the first time, what would they feel? Not learn — feel.',
                'Where in the class do you feel everything is flowing — where you\'re not thinking about separate skills?',
              ],
            },
            {
              label: '3 Dimensions',
              prompts: [
                'In Track [X] I saw you connect beautifully with a specific moment. At the same time, was there motivation happening? Education?',
                'When you\'re at your absolute best, do Connect, Motivate and Educate feel like three things or one thing?',
                'What would it look like if the education happened inside the motivation — not as a separate cue?',
              ],
            },
            {
              label: 'Elevation',
              prompts: [
                'If I told you this class was 90% of world-class, what do you think the last 10% is?',
                'What single shift would make the biggest difference to how this class FEELS for participants?',
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 — observation + conversation',
          blocks: [
            {
              duration: '5 min',
              title: 'Check in',
              steps: [
                'How are you feeling about your program at the moment?',
                'Anything you were consciously experimenting with in today\'s class?',
              ],
            },
            {
              duration: '20 min',
              title: '3 Dimensions debrief',
              steps: [
                'Share 1–2 moments where you saw Connect, Motivate, Educate blending simultaneously',
                'Ask: "When in the class did everything feel like one thing — not three separate skills?"',
                'If dimensions felt separate at any point, name the moment: "In Track [X] I noticed a shift — from connecting to coaching. What was happening for you there?"',
              ],
              tip: 'Start with what was working — at this level, elevation is built from strength, not gap-filling.',
            },
            {
              duration: '15 min',
              title: 'Single elevation focus',
              steps: [
                'Identify one specific moment where the 3 Dimensions blend could have been deeper',
                'Build one intention: "In Track [X], what if [specific shift]?"',
                'Ask the instructor to articulate the intention in their own words — ownership matters at this level',
              ],
            },
            {
              duration: '5 min',
              title: 'Set observation focus',
              steps: [
                'Agree on one 3 Dimensions question to carry into the next class',
                'Confirm next observation date',
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: '6-presenter-criteria',
        title: 'Presenter Criteria & Grade Review Readiness',
        subtitle: '45 min — observation + conversation',
        coachRole: {
          summary: 'Criteria Translator. The presenter criteria are specific and observable. Your job is to know what they look like in practice and help the instructor see the gap between Grade 3 and presenter-level Grade 3.',
          context: 'The Section 12 Presenter cards define specific criteria per Key Element that are additions to the standard grades. These are not gates — if the standard Grade 3 is met, Grade 3 is awarded. The presenter additions are what distinguishes this tier and provides the development pathway toward Levels 8, 9, 10. Each program has its own nuances (RPM\'s bike constraint, BODYCOMBAT\'s martial arts mastery, BODYPUMP\'s weight-as-story), but the framework is consistent. The coach needs to know these criteria so they can observe with precision and give feedback that is specific enough to drive elevation.',
          principle: 'Presenter criteria are not gates — they\'re what taking it to the next level looks like.',
        },
        keyElementFocus: {
          title: 'All 5 KEs at presenter level',
          elements: [
            { name: 'Choreography', description: 'At presenter level, Choreography G2 moves beyond automaticity to seamless flow. Transitions between exercises and tracks are effortless and visually polished, reflecting the presenting environment. Choreography is no longer a development target — it\'s the invisible foundation.' },
            { name: 'Technique', description: 'Physicality and role modelling is visually and emotionally compelling, evoking a powerful, motivating response that inspires engagement. Program-specific: BODYPUMP = weight selection as visual story; BODYCOMBAT = masterful speed, control, placement and intensity; RPM = effortless riding quality up to 140rpm under Climbing Resistance.' },
            { name: 'Coaching', description: 'Ability to seamlessly blend coaching so it feels natural and not box-ticking. Layer 1, 2, and 3 are not distinct steps — they flow as a single integrated delivery. The join between a Setup cue and a Layer 3 Educate cue is invisible. An assessor should not be able to identify where one layer ends and the next begins.' },
            { name: 'Connection', description: 'Creates atmosphere of authentic care and community. Look, See and Respond works with live audience AND direct-to-camera. Blends the 3 Dimensions creating continuous synergy between music, moves and movers.' },
            { name: 'Performance', description: 'Claims the stage — ownership of the space. Voice contrast to energise, motivate and educate. Enjoyment is palpable and contagious, projecting through body language, physical and emotional expression.' },
          ],
        },
        coachingSession: {
          goals: [
            'Coach understands the presenter-specific criteria for each KE (the additions to standard Grade 3)',
            'Coach can identify which presenter criteria are already present and which are developing',
            'Grade Review readiness assessed against Level 7/8 grade patterns',
          ],
          what: 'Observe a class with the presenter criteria in mind. For each KE, ask: is the standard Grade 3 met? Then: are the presenter additions visible? Note which presenter criteria are already present, which are emerging, and which are not yet evident. After class, walk through the criteria together — help the instructor understand what the assessor will be looking for at their next Grade Review. Assess readiness against the grade pattern for their target level (Level 7: Choreo G2 + min 1 KE G2 + 2 KEs G3; Level 8: Choreo G2 + 2 KEs G2 + 2 KEs G3).',
          why: 'Grade Review at Levels 7–10 is different. Higher or lower levels can be awarded. The assessor starts from mastery and uses process of elimination. If the instructor doesn\'t know what the presenter criteria are, they can\'t self-direct their development toward them. If the coach doesn\'t know them, they can\'t give feedback that prepares the instructor. This session makes the invisible visible — translating the presenter criteria from a form into observable, coachable moments.',
          how: [
            'Before the observation, review the presenter criteria for the instructor\'s program (from the Section 12 program card)',
            'Observe with the criteria in mind — for each KE, note: standard G3 met? Presenter additions visible?',
            'In the conversation, frame aspirationally: "The shift toward presenter level in [KE] looks like..."',
            'Walk through the grade pattern for their target level — which KEs are at G3, which are at G2, what\'s the path?',
            'Ask: "If an assessor watched that class starting from the assumption of mastery, what would they still be looking for?"',
            'Remember: presenter additions are observations, not gates. Frame as development opportunities, not failures.',
          ],
          prompts: [
            {
              label: 'Opening',
              prompts: [
                'At your next Grade Review, the assessor starts from the assumption that you\'ve mastered this. What do you think they\'ll be looking for beyond that?',
                'If you could choose one KE where you want to be at absolute presenter standard, which would it be?',
              ],
            },
            {
              label: 'Criteria exploration',
              prompts: [
                'Coaching at presenter level means the layers are invisible — the assessor can\'t tell where Setup ends and Educate begins. How close do you feel to that?',
                'Claiming the stage is different from being confident on stage. What does "owning the space" mean to you?',
                'At presenter level, connection is room-wide — every participant feels seen AND part of something larger. Where in the class did that happen today?',
              ],
            },
            {
              label: 'Grade Review readiness',
              prompts: [
                'For your target level, you need a specific grade pattern across your KEs. Looking at where you are today, what\'s the development focus?',
                'At Levels 7–10, higher or lower levels can be awarded. How does that change how you prepare?',
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 — observation + conversation',
          blocks: [
            {
              duration: '5 min',
              title: 'Check in',
              steps: [
                'Where are you in your Grade Review preparation?',
                'Any KE you\'ve been focusing on intentionally since last time?',
              ],
            },
            {
              duration: '20 min',
              title: 'Presenter criteria walkthrough',
              steps: [
                'For each KE: share whether standard Grade 3 is met, and whether presenter additions are visible',
                'Name one presenter criterion that was clearly present — be specific to a moment in the class',
                'Name one presenter criterion that is developing — frame aspirationally, not as a gap',
              ],
              tip: 'Use program-specific language. Don\'t say "your technique was good" — say "the weight selection in the squat track was telling a visual story for participants in the back row."',
            },
            {
              duration: '15 min',
              title: 'Grade Review readiness assessment',
              steps: [
                'Map current KE grades against the target level grade pattern',
                'Identify: which KEs need to move, and what does "moving" look like in practice?',
                'Ask: "If the Grade Review was next month, what would you want to have worked on between now and then?"',
              ],
            },
            {
              duration: '5 min',
              title: 'Development focus',
              steps: [
                'Agree on one presenter criterion to develop before next observation',
                'Confirm next observation date',
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: '6-elevation-legacy',
        title: 'Ongoing Elevation & Legacy',
        subtitle: '30 min — 1:1 conversation',
        coachRole: {
          summary: 'Thinking Partner. At this level, the best thing you can do is ask the question they haven\'t asked themselves.',
          context: 'The instructor at Stage 6 is self-aware, deeply competent, and likely coaching others informally already. Your role is no longer to develop them in the traditional sense — it\'s to be the person who sees what they can\'t see. A thinking partner who asks the question that unlocks the next 1%. The ongoing rhythm at this level is different: observations are less about checking progress and more about capturing moments of brilliance (and moments where brilliance could go further). Feedback is sparse and precise. You might watch an entire class and have one thing to say — but that one thing changes everything.',
          principle: 'At presenter level, one observation can change more than ten sessions of coaching ever did.',
        },
        coachingSession: {
          goals: [
            'Ongoing observation rhythm set for presenter-level development',
            'Second/third program presenter pathway discussed',
            'Mentoring and legacy role explored — how this instructor gives back',
          ],
          what: 'Set the ongoing development rhythm. At presenter level, observation frequency can reduce but observation quality must increase. Each observation is focused on the 3 Dimensions blend and specific presenter criteria for their developing KE. Discuss second or third program development: if their primary program is at Level 7+, is there appetite to bring another program to the same standard? Explore the legacy question: how is this instructor contributing to the club\'s instructor culture? Are they mentoring newer instructors? Are they visible role models? The instructor at this level has influence — help them use it intentionally.',
          why: 'The biggest risk at Stage 6 is stagnation through comfort. The instructor is excellent. Classes are full. Feedback is rare. Without intentional elevation, they plateau — still great, but no longer growing. The Club Coach prevents this by maintaining a relationship where growth is always on the table. The second risk is isolation: elite instructors can feel alone in their development. The coach keeps them connected to a development framework that still challenges them. The legacy conversation matters because world-class instructors shape the culture of the entire club team.',
          how: [
            'Set observation rhythm: quarterly minimum at this level, with each observation laser-focused on one elevation question',
            'After each observation, give one piece of precise feedback — not a list, one thing',
            'Ask: "What are you working on right now that no one else knows about?" — elite instructors often have private development goals',
            'Discuss second/third program: "Your primary program is at presenter level — what would it take to bring your next program there?"',
            'Explore legacy: "Who on the team looks up to you? What are you teaching them — intentionally or not?"',
            'Track: is the instructor\'s self-assessment becoming more precise? At this level, they should be able to articulate their own 3 Dimensions blend with accuracy',
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 — conversation',
          blocks: [
            {
              duration: '10 min',
              title: 'Elevation check-in',
              steps: [
                'Ask: "What are you working on right now that no one else knows about?"',
                'Listen for self-directed development goals — this is a sign of genuine presenter-level maturity',
                'Share one observation from the last class: one thing, precisely stated',
              ],
              tip: 'Resist the urge to give a list. One precise observation, delivered as a question, is worth more than five bullet points of feedback.',
            },
            {
              duration: '10 min',
              title: 'Second program & influence',
              steps: [
                'Second program discussion: is there appetite to bring another program to presenter standard?',
                'Legacy question: "Who on the team looks up to you? What are you teaching them intentionally?"',
                'Club culture question: "What would this club look like if every instructor was where you are now?"',
              ],
            },
            {
              duration: '10 min',
              title: 'Next quarter focus',
              steps: [
                'Set one elevation focus for the next quarter — connected to the 3 Dimensions or a specific presenter criterion',
                'Confirm next observation date',
                'Ask: "What do you want me to watch for specifically?"',
              ],
            },
          ],
        },
        proTip: 'The instructor at Stage 6 will teach you things too. Stay curious, stay humble, and let them lead more of the conversation over time.',
        content: [],
      },
    ],
    keActivities: [
      {
        element: 'Presenter Framework',
        color: '#FF623E',
        items: [
          {
            title: 'The 3 Dimensions — Connect, Motivate, Educate',
            description: 'The operating framework for Levels 7–10. At presenter level, the 3 Dimensions blend continuously — they don\'t operate as separate skills. This guide explains what each dimension looks like in practice, how to observe them, and what "blending" means for specific programs.',
            duration: '15 min',
            steps: [
              'Connect: authentic relationship with the audience — room-wide, not one-to-one. Every participant feels seen and part of something larger.',
              'Motivate: sustained genuine energy that drives effort. Not performance — authentic belief in what the program can do for participants.',
              'Educate: knowledge delivered naturally, enriching the experience without interrupting the flow. The instructor knows WHY, and it shows.',
              'Blending: observe whether dimensions flow simultaneously or switch sequentially. Sequential = developing. Simultaneous = presenter level.',
              'Use the 3 Dimensions Observation Sheet during classes to track where blending happens and where dimensions separate.',
            ],
          },
          {
            title: 'Level Definitions — Levels 7–10',
            description: 'What each level represents in the Les Mills assessment framework, and what changes at presenter level compared to Levels 1–6.',
            duration: '10 min',
            steps: [
              'Level 7 = LMUS TAP Presenter Level — the performance standard required for eligibility to be considered for the TAP team. Not automatic.',
              'Level 8 = LM Filming/Presenting Standard — the quality required to appear on Masterclass videos. Not automatic.',
              'Levels 9–10 = Elite/World-class — HIGHER OR LOWER levels may be awarded. The Level 6.5 protection rule does NOT apply.',
              'Assessor mindset at Levels 7–10: start from the assumption of mastery, use process of elimination to identify what\'s still developing.',
              'Coaching register: thought-provoking questions, not direct instruction. Big Picture KE = the single shift from great to world-class.',
            ],
          },
        ],
      },
      {
        element: 'Section 12 Presenter Criteria',
        color: '#FF623E',
        items: [
          {
            title: 'Presenter-Specific Criteria by KE',
            description: 'The additions to standard Grade 2/3 criteria that apply only at Levels 7–10. These appear in red in the Grade Review Development Form (Presenter 2026). Not gates — Grade 3 is awarded if standard criteria are met. The presenter additions define the development pathway toward Levels 8, 9, 10.',
            duration: '20 min',
            steps: [
              'Choreography: seamless flow and visual polish beyond automaticity. Transitions between tracks are invisible. Choreography is the foundation, not the focus.',
              'Technique: physicality is visually and emotionally compelling — inspires engagement, not just correct execution. Program-specific nuances apply (BODYPUMP weight story, BODYCOMBAT martial arts mastery, RPM effortless riding to 140rpm).',
              'Coaching: layers blend invisibly. The join between Setup and Layer 3 Educate is undetectable. An assessor cannot identify where one layer ends and the next begins.',
              'Connection: room-wide atmosphere of authentic care and community. Look, See and Respond works with live audience AND direct-to-camera. 3 Dimensions blend continuously.',
              'Performance: claims the stage — ownership of the space. Voice contrast is purposeful (energise, motivate, educate). Enjoyment is palpable through body language and emotional expression.',
            ],
          },
        ],
      },
      {
        element: 'Grade Pattern Reference',
        color: '#FF623E',
        items: [
          {
            title: 'Level 7–10 Grade Patterns',
            description: 'The KE grade patterns required at each presenter level. Use this to assess Grade Review readiness and identify the development focus.',
            duration: '10 min',
            steps: [
              'Level 7: Choreography G2 + minimum 1 other KE G2 + 2 KEs G3',
              'Level 8: Choreography G2 + 2 KEs G2 + 2 KEs G3',
              'Level 9: Choreography G2 + 1 KE G2 + 3 KEs G3',
              'Level 10: Choreography G2 + ALL other KEs G3',
              'Remember: at Levels 7–10, higher or lower levels can be awarded. Grade patterns are thresholds, not guarantees.',
            ],
          },
        ],
      },
      {
        element: '3 Dimensions Observation Sheet',
        color: '#FF623E',
        items: [
          {
            title: 'Observation Template — Connect, Motivate, Educate per Track',
            description: 'A structured observation approach for tracking the 3 Dimensions during a class. Note where dimensions blend and where they operate separately. One completed sheet per observation.',
            duration: '45 min (during class)',
            steps: [
              'Before the class: write the program name, track list, and target level at the top',
              'During each track: note which dimensions are present — C (Connect), M (Motivate), E (Educate)',
              'Mark blend moments (all three simultaneous) with a star — note the specific moment',
              'Mark separation moments with a flag — note where one dimension paused for another to operate',
              'After class: identify the track with the strongest blend and the track with the clearest separation — these are your two conversation anchors',
            ],
          },
        ],
      },
      {
        element: 'Coaching Register Guide',
        color: '#FF623E',
        items: [
          {
            title: 'How Feedback Changes at Levels 7–10',
            description: 'At presenter level, the coaching register shifts fundamentally. Direct instruction is replaced by thought-provoking questions. Correction is replaced by elevation. The Big Picture KE focuses on the single shift from great to world-class.',
            duration: '15 min',
            steps: [
              'Coaching-led questions: "What did you notice about [specific moment]?" rather than "You should have [done X]."',
              'Elevation, not correction: "There was a moment in Track 5 where everything came together — what were you thinking about?" rather than "Track 5 needed more energy."',
              'Big Picture KE: one question per observation — "What single shift would take this from excellent to world-class?"',
              'Silence is a tool: ask the question, then wait. Elite instructors have the answers — they need space to surface them.',
              'Example questions per KE: Choreography ("When did the choreography disappear and the experience took over?"), Technique ("What were participants seeing in your body that made them push harder?"), Coaching ("Where was the coaching so natural it stopped being coaching?"), Connection ("When did the whole room feel connected — not just the front row?"), Performance ("What moment felt most like YOU owning that space?")',
            ],
          },
        ],
      },
      {
        element: 'Guided Feedback',
        color: '#00FF63',
        items: [
          {
            title: 'CRC & GROW Feedback Tools',
            description: 'The core feedback tools for Club Coaches — Connect/Recommend/Commend (CRC) for structured post-class feedback, and GROW (Goal, Reality, Options, Will) for coaching conversations. At presenter level, GROW conversations shift toward instructor-led — the coach opens the Goal question and follows the instructor\'s agenda.',
            duration: '30 min',
            steps: [
              'Open the Guided Feedback section from the main navigation',
              'Select the instructor and the program observed',
              'Use LMQ context to frame the feedback — at Levels 7–10, note the presenter-level focus',
              'At presenter level: GROW conversations open with "What do you want to work on today?" — not the coach\'s agenda',
              'Copy your feedback and share it with the instructor directly',
            ],
          },
        ],
      },
    ],
  },
};
