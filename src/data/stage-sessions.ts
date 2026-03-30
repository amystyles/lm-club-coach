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
            ],
          },
        ],
        proTip: 'Use LMQ assessments as development conversations, not performance reviews. The goal is growth, not grading.',
      },
    ],
  },
  5: {
    name: 'World-Class',
    subtitle: 'Mastery & influence',
    duration: 'Ongoing',
    color: '#FF623E',
    sessions: [
      {
        id: '5-connection',
        title: 'Connection Mastery',
        subtitle: 'KE 4',
        coachRole: {
          summary: 'Guide the instructor into the advanced Key Elements — Connection and Performance — where great instructors become world-class.',
          context: 'By this stage, Choreography, Technique, and Coaching should be solid. Now it\'s about creating experiences that keep participants coming back.',
          principle: 'World-class is a choice, not a talent.',
        },
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
        ],
      },
      {
        id: '5-performance',
        title: 'Performance Mastery',
        subtitle: 'KE 5',
        content: [
          {
            week: 'KE 5 Performance Mastery',
            tasks: [
              'Master the 5 Voices (Mentor, Warrior, Wise, Dreamer, Leader)',
              'Dramatic contrast between sections',
              'Empowering Beliefs communicated consistently',
            ],
          },
        ],
      },
      {
        id: '5-grade3',
        title: 'Grade 3 Emerging',
        subtitle: 'LMQ 7+',
        content: [
          {
            week: 'LMQ 7+ Grade 3 Emerging',
            tasks: [
              'Grade 3 Technique: Inspirational execution',
              'Grade 3 Coaching: Powerful imagery and targeted correction',
              'Grade 3 Connection or Performance: Masterful level',
            ],
          },
        ],
      },
      {
        id: '5-influence',
        title: 'Expanding Influence',
        subtitle: 'Beyond',
        content: [
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
        proTip: 'This is where you help them see what\'s possible beyond their own class. Plant the seed for mentoring, presenting, and leadership.',
      },
    ],
  },
};
