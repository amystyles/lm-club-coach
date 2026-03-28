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

export interface StageDetail {
  name: string;
  subtitle: string;
  duration: string;
  color: string;
  sessions: Session[];
}

export const stageDetails: Record<number, StageDetail> = {
  1: {
    name: 'Onboarding',
    subtitle: 'Pre-Training',
    duration: '21 Days Before IT',
    color: '#0A0A0A',
    sessions: [
      /* ── Session 1: Kickoff & Orientation ── */
      {
        id: '1-kickoff',
        title: 'Kickoff & Orientation',
        subtitle: 'Week 1',
        coachRole: {
          summary: 'Welcome the instructor, set expectations for the pre-work journey, and establish the coaching relationship.',
          context: 'Pre-work is the self-directed phase where the instructor lays groundwork before attending Initial Training. Your role is to support, guide, and check in — not to deliver the training.',
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
          what: 'Welcome the instructor, set expectations for the pre-work journey, and establish the coaching relationship.',
          why: 'Instructors who feel supported from day one are more confident and better prepared. LMQ alignment — setting the foundation for all 5 Key Elements.',
          how: [
            'Introduce yourself as their Club Coach and explain your role (mentor, not assessor)',
            'Walk through the 4-stage journey overview: Pre-work \u2192 IT \u2192 Post-work \u2192 Certification',
            'Review the Pre-work Checklist together',
            'Set a timeline with milestones',
            'Share your contact info for questions',
          ],
          prompts: [
            {
              label: 'Opening Questions',
              prompts: [
                'What are you most excited about?',
                'What feels challenging right now?',
              ],
            },
          ],
          lmqAlignment: 'Sets the foundation for all 5 Key Elements by framing the entire development journey and establishing a growth mindset from day one.',
          goals: [
            'Instructor understands the full pre-work \u2192 IT \u2192 certification journey',
            'Coaching relationship established with clear communication rhythm',
            'Pre-work checklist reviewed with timeline and milestones set',
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
              'Walk through the 4-stage journey overview: Pre-work \u2192 IT \u2192 Post-work \u2192 Certification',
              'Review the Pre-work Checklist together (see checklist below)',
              'Set a timeline with milestones',
              'Share your contact info for questions',
              'Ask: "What are you most excited about? What feels challenging?"',
            ],
          },
        ],
        proTip: 'First impressions matter. A warm, personal welcome sets the tone for the entire coaching relationship. Be a mentor, not an assessor.',
      },
      /* ── Session 2: Key Elements Check-in ── */
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
        proTip: 'Treat this session like a rehearsal for how coaching works at Les Mills. You\'re modelling the feedback process they\'ll experience throughout their career.',
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
