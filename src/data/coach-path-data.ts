import type { Session, StageDetail } from './stage-sessions';

export const COACH_STAGE_META = [
  { stage: 1, name: 'Learn to See',      color: '#2563EB' },
  { stage: 2, name: 'Learn to Ask',      color: '#7C3AED' },
  { stage: 3, name: 'Learn to Adapt',    color: '#D97706' },
  { stage: 4, name: 'Learn to Develop',  color: '#059669' },
  { stage: 5, name: 'Learn to Multiply', color: '#DC2626' },
];

export const coachPathStages: Record<number, StageDetail> = {
  1: {
    name: 'Learn to See',
    subtitle: 'The new Club Coach — learning to observe and understand',
    duration: '4 sessions',
    color: '#2563EB',
    sessions: [
      {
        id: 'S1-1',
        title: 'Welcome to Club Coach',
        subtitle: 'Establishing the coaching relationship',
        coachRole: {
          summary: "Learner. You're here to absorb, not fix.",
          context: "This session is about connection before content. Your TAP Coach wants to understand who you are, where you're coming from, and what you want from this journey. Show up curious, not expert.",
          principle: "Before you can coach anyone, you need to understand what you're looking at.",
        },
        coachingSession: {
          goals: [
            "Coach understands what Club Coach is and isn't",
            "Expectations set for the development journey",
            "Communication rhythm agreed",
          ],
          what: "Establish the coaching relationship with your TAP Coach. Understand the structure of Club Coach — what it is, what it isn't, and what your development journey will look like. This is connection before content.",
          why: "The coaching relationship is the container for all development. Without trust and clear expectations, growth stalls before it begins. Starting with connection means your TAP Coach understands your context and can tailor the journey to you.",
          how: [
            "Introduce yourself and share your background — GFM, experienced instructor, or new to Les Mills",
            "Ask your TAP Coach to explain Club Coach: the stages, the timeline, what's expected",
            "Share your honest motivation for stepping into the coaching role",
            "Agree on meeting frequency and format — weekly, fortnightly, video or in-person",
            "Leave with one clear expectation you'll hold yourself to over the next month",
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Connection',
              steps: [
                "TAP Coach asks: tell me about your journey into fitness and coaching",
                "No agenda yet — just listen and respond honestly",
              ],
              tip: "Don't rush past this. Your TAP Coach is building a mental model of who you are.",
            },
            {
              duration: '10 min',
              title: 'What is Club Coach?',
              steps: [
                "TAP Coach walks you through the 5 stages of the Club Coach pathway",
                "Ask any questions that come up — there are no wrong ones here",
                "Clarify the difference between Club Coach and your TAP Coach's role vs your role as a developing coach",
              ],
            },
            {
              duration: '10 min',
              title: 'Setting Expectations',
              steps: [
                "Agree on how often you'll meet and in what format",
                "Discuss what good progress looks like in this stage",
                "Share one thing you're hoping to get better at",
              ],
            },
            {
              duration: '5 min',
              title: 'Close & Commit',
              steps: [
                "Name one thing you'll bring to the next session",
                "Confirm your next meeting time",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S1-2',
        title: 'Understanding the LMQ',
        subtitle: 'Learning the language of instructor development',
        coachRole: {
          summary: "Student of the framework. Study it before you use it.",
          context: "The LMQ is the shared language you'll use with every instructor you coach. You need to understand it deeply — not just the labels, but what each Key Element actually looks like in a live class, at each grade level.",
          principle: "The LMQ isn't a scorecard — it's a language for describing growth.",
        },
        coachingSession: {
          goals: [
            "Coach can articulate what each Key Element is",
            "Coach understands that LMQ levels are per-program",
            "Coach can distinguish Grade 1 from Grade 2 from Grade 3 in at least one program",
          ],
          what: "Learn the LMQ framework — what it measures, how levels work, what the 5 Key Elements actually look like in a live class. Each program has unique skills and criteria per element. A Grade 2 in Choreography looks different in BODYPUMP vs BODYCOMBAT.",
          why: "You cannot coach what you cannot see, and you cannot see what you haven't defined. The LMQ gives you a shared vocabulary to have precise conversations about instructor growth. Without it, feedback stays vague and progress stays accidental.",
          how: [
            "Study the LMQ Reference — all 5 Key Elements and their grade descriptors",
            "Pick one program you know well and read its criteria for each element at each grade",
            "Ask your TAP Coach to describe a real example of Grade 1 vs Grade 3 Choreography in that program",
            "Identify which Key Element you find hardest to distinguish by grade — this is where to focus",
            "Summarise the LMQ in your own words: what does it measure, and why does it matter?",
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Review',
              steps: [
                "Brief recap of last session — what landed, what questions came up",
              ],
            },
            {
              duration: '15 min',
              title: 'LMQ Deep Dive',
              steps: [
                "Walk through the 5 Key Elements together with the LMQ Reference open",
                "For each element, ask: what does Grade 1 look like in a class you know?",
                "Identify one element where the grade differences feel genuinely clear to you",
              ],
              tip: "Focus on one program you already teach. Abstract understanding is harder than seeing it in something familiar.",
            },
            {
              duration: '10 min',
              title: 'Apply It',
              steps: [
                "TAP Coach describes two real instructors they've worked with — different levels",
                "You try to place each one on the LMQ using what you've just learned",
                "TAP Coach gives feedback on your reasoning",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S1-3',
        title: 'Your First Observation',
        subtitle: 'Seeing without judging',
        coachRole: {
          summary: "Observer only. Not a fixer, not an evaluator — a witness.",
          context: "Your job in this session is to see as much as possible without interpreting. Facts only: what happened in each track, what you noticed across each Key Element. Leave your opinions at the door.",
          principle: "Separate what you see from what you think about what you see.",
        },
        coachingSession: {
          goals: [
            "Coach completes a full observation using the Observation Framework",
            "Coach captures specific, factual observations (not judgments)",
            "Coach identifies which Key Element stands out as strongest and which needs work",
          ],
          what: "Observe a live class using the structured Observation Framework. Focus only on SEEING — no feedback yet. Capture facts: what happened in each track, what you noticed across each Key Element.",
          why: "Observation is a skill, not a given. Most new coaches confuse what they see with what they think about what they see. Training your observation muscle before you give feedback means your feedback will be grounded in evidence, not impressions.",
          how: [
            "Download and print the Observation Framework before attending",
            "Take a position in the room where you can see both the instructor and participants",
            "For each track, write down facts only — movements, cues, timing, instructor positioning",
            "After the class, review your notes and sort them: what's a fact, what's an interpretation?",
            "Identify one strength and one growth area for each of the 5 Key Elements",
          ],
        },
        content: [],
      },
      {
        id: 'S1-4',
        title: 'Observation Debrief',
        subtitle: 'What you saw, what you missed, what it means',
        coachRole: {
          summary: "Reflective learner. Examine your own seeing, not just theirs.",
          context: "This session is about your observation skills, not the instructor's performance. Review your notes with your TAP Coach and discover where your observation was sharp and where it was coloured by interpretation.",
          principle: "The coach who can see clearly is the coach who can help precisely.",
        },
        coachingSession: {
          goals: [
            "Coach understands the observation–interpretation distinction",
            "Coach can identify gaps in their own observation skills",
          ],
          what: "Review your observation notes with your TAP Coach. What did you capture well? What did you miss? Learn the difference between observation (facts) and interpretation (judgment). This session is about improving your seeing, not assessing the instructor.",
          why: "Observation bias is invisible until someone holds a mirror to it. Every coach has blind spots — movements they instinctively overlook, elements they interpret rather than observe. Making these visible early prevents them from becoming habitual.",
          how: [
            "Share your observation notes with your TAP Coach — talk through what you wrote",
            "TAP Coach highlights two or three things you observed accurately and precisely",
            "TAP Coach identifies one or two places where you interpreted rather than observed",
            "For each interpretation, practise restating it as a factual observation",
            "Identify one observation skill you want to sharpen before your next class",
          ],
          prompts: [
            {
              label: 'Self-reflection questions',
              prompts: [
                "Where in my notes am I describing facts vs forming opinions?",
                "Which Key Element was hardest for me to observe accurately — why?",
                "What would I notice differently if I observed this class again tomorrow?",
              ],
            },
            {
              label: 'Discussion with TAP Coach',
              prompts: [
                "What did I miss that was visible from where you were standing?",
                "Where does my experience as an instructor create observation bias?",
                "What's the most useful thing a coach can see that an instructor can't see about themselves?",
              ],
            },
          ],
        },
        content: [],
      },
    ],
  },

  2: {
    name: 'Learn to Ask',
    subtitle: 'Developing the coaching conversation',
    duration: '4 sessions',
    color: '#7C3AED',
    sessions: [
      {
        id: 'S2-1',
        title: 'The E-P-E Method',
        subtitle: 'Elicit–Provide–Elicit: the backbone of every coaching conversation',
        coachRole: {
          summary: "Practitioner. Learn it, then use it — even imperfectly.",
          context: "E-P-E is not a framework to understand in theory — it's a conversational habit to build through repetition. Start using it immediately, even in short two-minute conversations after class.",
          principle: "The coach who asks first gets further than the coach who tells first.",
        },
        coachingSession: {
          goals: [
            "Coach can run a 2-minute E-P-E conversation",
            "Coach understands why asking first matters more than telling first",
          ],
          what: "Learn Elicit–Provide–Elicit from Motivational Interviewing — the backbone of every coaching conversation. Elicit: ask what the instructor noticed. Provide: share your specific observation. Elicit: ask what they want to try next.",
          why: "E-P-E comes from Motivational Interviewing (Miller & Rollnick), supported by 200+ meta-analyses across health, sport, and education. The critical insight: it works in 30-second conversations — coaches don't need an hour. Asking first activates the instructor's own insight, making change far more likely than if you'd just told them what to fix.",
          how: [
            "Read the E-P-E overview in the Coaching Conversation Templates tool",
            "Practise the structure out loud with your TAP Coach using a scripted scenario",
            "Run a real E-P-E with an instructor immediately after their next class — even a 90-second version counts",
            "Debrief with your TAP Coach: where did you instinctively skip the first Elicit?",
            "Commit to using E-P-E in every post-class conversation this week",
          ],
          prompts: [
            {
              label: 'Elicit (open it)',
              prompts: [
                "How did that class feel for you?",
                "What did you notice about [specific element] today?",
                "Which moment felt strongest to you — and why?",
              ],
            },
            {
              label: 'Provide (share one thing)',
              prompts: [
                "I noticed that in the [track name] track, [specific behaviour].",
                "Something I saw that stood out to me was [observation].",
                "From where I was standing, I could see [specific, factual observation].",
              ],
            },
            {
              label: 'Elicit (close it)',
              prompts: [
                "Given what you noticed and what I shared — what would you want to try next time?",
                "What's one thing you'd do differently in that track?",
                "What would that look like specifically?",
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Quick Review',
              steps: ["What E-P-E conversations have you had since last session?"],
            },
            {
              duration: '10 min',
              title: 'E-P-E Theory',
              steps: [
                "TAP Coach explains the Motivational Interviewing roots — why asking outperforms telling",
                "Walk through the three stages: Elicit → Provide → Elicit",
                "Discuss the most common failure mode: skipping the first Elicit",
              ],
              tip: "The first Elicit is everything. Most coaches who 'use E-P-E' skip it and jump straight to Provide.",
            },
            {
              duration: '10 min',
              title: 'Live Practice',
              steps: [
                "Roleplay: TAP Coach plays an instructor who just taught a class",
                "You run a full E-P-E conversation",
                "Debrief: what felt natural, what felt forced?",
              ],
            },
            {
              duration: '5 min',
              title: 'Commitment',
              steps: [
                "Name one class you'll use E-P-E after this week",
                "Agree what you'll report back at the next session",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S2-2',
        title: 'The Righting Reflex',
        subtitle: "Understanding the coaching instinct that holds you back",
        coachRole: {
          summary: "Investigator. Examine your own instincts — especially the ones that feel helpful.",
          context: "The righting reflex feels like good coaching. It isn't. Your goal this session is to catch yourself wanting to fix something, and practise sitting with that urge instead of acting on it.",
          principle: "When you feel the urge to fix, that's your cue to ask a question instead.",
        },
        coachingSession: {
          goals: [
            "Coach can identify their own righting reflex in the moment",
            "Coach understands the paradox: the more you push, the more they resist",
          ],
          what: "Understand the righting reflex — the instinct to immediately tell someone what to fix. Learn why it creates resistance, not change. Practise recognising it in yourself and redirecting it into a question.",
          why: "The righting reflex is the single most common reason coaching fails. It's not malicious — it comes from caring. But when you tell an instructor what to do before they've had a chance to reflect, you take ownership of their development away from them. Resistance follows. The paradox is hard to believe until you experience it: backing off accelerates change.",
          how: [
            "Review a recent coaching interaction — when did you feel the urge to fix something immediately?",
            "With your TAP Coach, practise catching the righting reflex in a roleplay scenario",
            "For each urge-to-fix moment, practise converting it into one open question",
            "Spend one full week noticing — but not acting on — righting reflex moments with your instructors",
            "Report back to your TAP Coach on what you noticed",
          ],
          prompts: [
            {
              label: "When you feel the reflex",
              prompts: [
                "What did you notice about that moment?",
                "What are you hoping will be different next time?",
                "What do you think is getting in the way?",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S2-3',
        title: 'Asking Powerful Questions',
        subtitle: 'Not all questions are equal',
        coachRole: {
          summary: "Craftsperson. Build your question toolkit one technique at a time.",
          context: "This session is about precision. A question that creates genuine insight is rare — and learnable. You're building a repertoire of go-to questions you can use without thinking in any coaching moment.",
          principle: "The quality of your questions determines the quality of the insight.",
        },
        coachingSession: {
          goals: [
            "Coach has 5 go-to questions they can use in any coaching conversation",
          ],
          what: "Learn the difference between closed questions (yes/no), leading questions (that push your agenda), and genuinely open questions (that create insight). Practise scaling questions, exception-finding questions, and future-focused questions.",
          why: "Most coaching questions are accidentally closed or leading. They sound open but push the instructor toward the answer the coach already has. Truly open questions create surprise — both for the instructor and for you. The best coaching questions make the instructor think of something they've never thought of before.",
          how: [
            "Study the three question types: closed, leading, and genuinely open",
            "Take five questions you currently use in coaching and classify each one",
            "Rewrite any closed or leading questions into genuinely open versions",
            "Practise scaling questions with your TAP Coach: 'On a scale of 1–10, where are you on [skill]? What would move you one number higher?'",
            "Build your personal list of 5 go-to questions — ones you can use in any post-class conversation",
          ],
          prompts: [
            {
              label: 'Opening questions',
              prompts: [
                "What stood out to you from that class?",
                "What felt different today compared to last time?",
                "Which moment felt closest to what you were aiming for?",
              ],
            },
            {
              label: 'Scaling questions',
              prompts: [
                "On a scale of 1–10, how satisfied are you with your connection in that class?",
                "What would move you one number higher?",
                "When have you been at that higher number — what was different?",
              ],
            },
            {
              label: 'Exception-finding',
              prompts: [
                "When does [the challenge] not happen — what's different about those classes?",
                "Tell me about a time when that Key Element was really clicking for you.",
                "What were you doing differently in your best class this month?",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S2-4',
        title: 'Practice Conversation',
        subtitle: 'Coaching the coach',
        coachRole: {
          summary: "Performer. Put your skills on the floor, then receive what they reveal.",
          context: "This is a live coaching session with a real instructor, observed by your TAP Coach. Afterward, your TAP Coach will debrief you using the same E-P-E method you've been learning — coaching the coach.",
          principle: "The most powerful development happens when the coach is also coached.",
        },
        coachingSession: {
          goals: [
            "Coach delivers a complete E-P-E conversation with a real instructor",
            "Coach receives feedback on their own coaching using the E-P-E method",
          ],
          what: "Run a real E-P-E coaching conversation with a volunteer instructor. Your TAP Coach observes and debriefs you afterward — using the same methods you've been learning. You experience what it feels like to be on the receiving end.",
          why: "You cannot fully understand a coaching method until you've been coached through it. When your TAP Coach uses E-P-E on you, you'll understand viscerally what asking first feels like from the other side — and you'll coach your own instructors differently because of it.",
          how: [
            "Choose an instructor you've already observed — someone you have real observations on",
            "Run a 5–10 minute E-P-E conversation while your TAP Coach observes silently",
            "After the instructor leaves, your TAP Coach coaches you through an E-P-E debrief",
            "Identify the moment in your conversation where you felt most confident",
            "Name one thing you'd change about how you structured the conversation",
          ],
          prompts: [
            {
              label: 'Post-session self-reflection',
              prompts: [
                "Where did I naturally use E-P-E and where did I drift from it?",
                "What did the instructor reveal that I wouldn't have found if I'd just told them?",
                "What was the hardest moment in that conversation — why?",
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: 'Observed practice + TAP Coach debrief',
          blocks: [
            {
              duration: '5 min',
              title: 'Pre-conversation prep',
              steps: [
                "Review your observation notes on the instructor you'll be coaching",
                "Identify the one thing you want to share in the Provide step",
                "Agree the format with your TAP Coach — they'll observe silently, then debrief you",
              ],
            },
            {
              duration: '10 min',
              title: 'Live E-P-E conversation',
              steps: [
                "Run the full conversation — Elicit, Provide, Elicit",
                "Don't break to ask your TAP Coach anything — stay in the moment",
                "End with an implementation intention: if [moment], then I will [behaviour]",
              ],
            },
            {
              duration: '20 min',
              title: 'TAP Coach debrief (E-P-E on you)',
              steps: [
                "TAP Coach: 'How did that feel?'",
                "TAP Coach shares one specific observation from watching you",
                "TAP Coach asks: what would you do differently?",
                "Together identify your clearest strength and your sharpest growth edge",
              ],
              tip: "The debrief is the most important part. Don't rush it.",
            },
            {
              duration: '10 min',
              title: 'Reflection & next steps',
              steps: [
                "What question will you use more often going forward?",
                "Confirm your plan for Stage 3",
              ],
            },
          ],
        },
        content: [],
      },
    ],
  },

  3: {
    name: 'Learn to Adapt',
    subtitle: 'Matching your coaching to the instructor in front of you',
    duration: '4 sessions',
    color: '#D97706',
    sessions: [
      {
        id: 'S3-1',
        title: 'The Grow Model — Coaching Roles',
        subtitle: "Four roles, four situations",
        coachRole: {
          summary: "Adapter-in-training. Start identifying which role you default to.",
          context: "Most coaches have one mode — usually either telling or facilitating. This session is about expanding your range so you can deliberately choose your role based on who's in front of you.",
          principle: "The best coaches don't have one style — they have four, and they know when to use each one.",
        },
        coachingSession: {
          goals: [
            "Coach can identify which Grow stage an instructor is at",
            "Coach understands the 4 roles: Authority → Motivator → Facilitator → Consultant",
            "Coach recognises the 'mismatch problem' and its consequences",
          ],
          what: "Learn Gerald Grow's Staged Self-Directed Learning model. Every instructor sits at a different stage of self-direction, and the coach's role must match. Telling an experienced instructor what to do is as harmful as leaving a new instructor to figure it out alone.",
          why: "Mismatched coaching style is the most common cause of instructor frustration. Too much direction for a competent instructor creates resentment. Too much autonomy for a new instructor creates anxiety. The Grow model gives you a diagnostic tool to read where an instructor is and choose your role accordingly.",
          how: [
            "Read the Grow model overview and the 4 coaching roles",
            "Map each instructor on your team to a Grow stage — use their LMQ profile and your observation notes",
            "For your most experienced instructor: what role do they need from you vs what role do you naturally give them?",
            "For your newest instructor: same question",
            "Identify your default coaching role — and where it serves you well and where it doesn't",
          ],
        },
        content: [],
      },
      {
        id: 'S3-2',
        title: 'Reading the Room — Dreyfus in Practice',
        subtitle: 'Per-skill diagnosis, not global labels',
        coachRole: {
          summary: "Diagnostician. Learn to see skill level precisely, not globally.",
          context: "The most common coaching error is treating an instructor as one thing — novice or expert — when they're actually at different stages in different domains. Dreyfus gives you per-skill resolution.",
          principle: "An expert in choreography can be a novice in connection. Coach each domain separately.",
        },
        coachingSession: {
          goals: [
            "Coach can identify Dreyfus stage signals in a live observation",
            "Coach adjusts their approach per skill domain for at least one instructor on their team",
          ],
          what: "The Dreyfus model maps skill acquisition from Novice through to Expert. Novices need rules, competent performers need frameworks, experts need space. The key insight: an instructor can be at different stages for different Key Elements simultaneously.",
          why: "Coaching based on a global assessment misses the nuance. An instructor who is Grade 3 in Choreography but Grade 1 in Connection needs very different coaching approaches for each element in the same session. Dreyfus gives you the per-skill lens to do this accurately.",
          how: [
            "Review the Dreyfus stage descriptors for each stage: Novice, Advanced Beginner, Competent, Proficient, Expert",
            "For one instructor, assign a Dreyfus stage to each of the 5 Key Elements based on your observations",
            "Describe what coaching approach each stage calls for: rules and checklists (Novice) → frameworks (Competent) → space and reflection (Expert)",
            "Plan your next coaching conversation with that instructor using per-element Dreyfus guidance",
            "Share your analysis with your TAP Coach and discuss where your read might be off",
          ],
        },
        content: [],
      },
      {
        id: 'S3-3',
        title: 'Threshold Moments',
        subtitle: "When confusion is progress",
        coachRole: {
          summary: "Steady presence. Your job is to hold the space, not rescue the instructor.",
          context: "When an instructor seems to be getting worse or feeling more confused, most coaches intervene too quickly. This session teaches you to read liminal space — and to trust the process rather than rescue the person.",
          principle: "If your instructor feels stuck, they might be on the verge of a breakthrough. Don't pull them back to safety.",
        },
        coachingSession: {
          goals: [
            "Coach can recognise when an instructor is in liminal space",
            "Coach understands their job is to normalise the discomfort, not rescue them from it",
          ],
          what: "Some growth moments aren't incremental — they're transformational. Threshold concepts are ideas that, once understood, permanently change how an instructor sees their practice. Common thresholds in group fitness: 'the class is about them, not me' / 'energy flows both ways' / 'connection matters more than choreography.'",
          why: "Threshold learning is disorienting. Instructors in the middle of a breakthrough often feel worse before they feel better — more self-conscious, temporarily less fluid. If the coach rescues them from that discomfort, the breakthrough never completes. Understanding this prevents well-meaning interference from becoming the obstacle.",
          how: [
            "Think of an instructor on your team who seems to be working harder but not improving — could they be in liminal space?",
            "Identify one threshold concept that would be transformational for that instructor if they grasped it",
            "Plan how to introduce the concept — not as a correction, but as a reframe",
            "Practise normalising language: 'This is the hard bit — and it means you're close to something'",
            "Agree with your TAP Coach on how you'll manage your own discomfort when an instructor is struggling",
          ],
        },
        content: [],
      },
      {
        id: 'S3-4',
        title: 'Building Implementation Intentions',
        subtitle: 'If–then plans that actually stick',
        coachRole: {
          summary: "Precision engineer. Specificity is the whole point.",
          context: "Vague intentions don't change behaviour. This session is about making every coaching conversation end with one concrete if-then plan — and experiencing why specificity is the mechanism, not the style.",
          principle: "The if–then plan bridges the gap between knowing and doing.",
        },
        coachingSession: {
          goals: [
            "Coach can build an implementation intention with an instructor in under 2 minutes",
            "Coach understands why specificity matters over general goals",
          ],
          what: "The highest-impact coaching habit — ending every conversation with one specific if-then plan. 'If [specific class moment], then I will [specific behaviour].' This single technique bridges the knowing-doing gap and turns good intentions into automatic behaviour.",
          why: "Implementation intentions deliver d = 0.65 across 94 studies. Goals with if-then plans are completed ~3× more often than goals without them. The mechanism is specificity: the 'if' creates a mental link to a trigger, making the behaviour semi-automatic. 'I'll work on cueing' doesn't change anything. 'If I start the squat track, then I will use the 3-2-1 countdown while making eye contact with the back row' does.",
          how: [
            "Read the Implementation Intention Builder template",
            "Practise building one for yourself: pick a coaching behaviour you want to change",
            "With your TAP Coach, roleplay ending a coaching conversation with an if-then plan",
            "Test the specificity: can you picture exactly where, when, and how the plan would be executed?",
            "Commit to ending every coaching conversation with one implementation intention this week",
          ],
          prompts: [
            {
              label: 'Building the if–then plan',
              prompts: [
                "When in your class would be the best moment to try that?",
                "What specifically will you do differently in that moment?",
                "Let's make that concrete — 'If [moment], then I will [behaviour]'",
                "How will you know if it worked?",
              ],
            },
          ],
        },
        content: [],
      },
    ],
  },

  4: {
    name: 'Learn to Develop',
    subtitle: 'Building sustained development systems for your team',
    duration: '4 sessions',
    color: '#059669',
    sessions: [
      {
        id: 'S4-1',
        title: 'The 1% Conversation',
        subtitle: 'Marginal gains, maximum leverage',
        coachRole: {
          summary: "Strategist. Find the one thing that moves everything else.",
          context: "At this stage, you have enough observation data to be strategic. Don't try to improve everything simultaneously. The 1% conversation targets the single micro-domain with the highest leverage for each instructor.",
          principle: "Don't try to improve everything. Find the one thing that moves everything else.",
        },
        coachingSession: {
          goals: [
            "Coach can identify the highest-leverage focus area for each instructor using their data",
            "Coach runs a coaching conversation targeted at a single area",
          ],
          what: "Marginal gains applied to coaching — every conversation targets the one micro-domain with the highest leverage. Use the Key Element profile to identify where a 1% improvement would create the biggest ripple. Not everything needs work. Focus creates progress.",
          why: "Trying to improve everything simultaneously produces incremental progress in nothing. The coaches who develop instructors fastest are relentlessly focused — one element, one session, one if-then plan. The magic of marginal gains is compounding: a 1% improvement in the right domain unlocks cascading improvements across others.",
          how: [
            "Review the Key Element profiles for each instructor on your team",
            "For each instructor, identify the one element where a small improvement would have the largest knock-on effect",
            "Build a coaching plan for that element for the next observation cycle",
            "Have a 1% conversation with one instructor: 'This week, let's focus only on [element]. Everything else stays the same.'",
            "Debrief with your TAP Coach: how did the instructor respond to focused constraint?",
          ],
        },
        content: [],
      },
      {
        id: 'S4-2',
        title: 'Autonomy, Competence, Relatedness',
        subtitle: 'The three needs that drive intrinsic motivation',
        coachRole: {
          summary: "Motivational diagnostician. Audit your coaching for SDT alignment.",
          context: "Self-Determination Theory is the most robust theory of motivation in the research literature. This session asks you to examine your coaching practice against its three pillars — and identify where you may be inadvertently undermining instructor motivation.",
          principle: "If you want them to own their development, they need to feel choice, progress, and belonging.",
        },
        coachingSession: {
          goals: [
            "Coach audits their own coaching practice for SDT alignment",
            "Coach identifies one change to increase instructor autonomy this week",
          ],
          what: "Self-Determination Theory — the three psychological needs that drive intrinsic motivation. Autonomy: instructors choose their focus. Competence: they see self-referenced progress. Relatedness: they're connected to peers working on similar goals. When any of these is frustrated, motivation collapses.",
          why: "Instructors who feel controlled by their coach become compliant rather than committed. Compliance produces performance in the short term but attrition in the long term. SDT-aligned coaching builds intrinsic motivation — instructors who want to develop, not just those who feel they should.",
          how: [
            "Map your last three coaching conversations to the SDT triad: where did you support autonomy, build competence, and foster relatedness?",
            "Identify one instructor whose motivation feels low — which need is most frustrated?",
            "For autonomy: give one instructor a genuine choice this week — let them select their own focus area",
            "For competence: show one instructor their own progress using before/after data",
            "For relatedness: connect two instructors working on similar goals — even briefly",
          ],
        },
        content: [],
      },
      {
        id: 'S4-3',
        title: 'Coaching Identity, Not Just Behaviour',
        subtitle: 'The deepest level of change',
        coachRole: {
          summary: "Identity architect. Help instructors see who they're becoming, not just what they're doing.",
          context: "At this level, the most impactful coaching shift is from behaviour ('do this') to identity ('be this kind of instructor'). This session equips you to ask identity-level questions and track the language shift in your instructors over time.",
          principle: "When identity and behaviour conflict, identity always wins.",
        },
        coachingSession: {
          goals: [
            "Coach can ask one identity-anchoring question per conversation",
            "Coach understands why identity work is more durable than behaviour correction",
          ],
          what: "The deepest level of change is identity. Learn to ask identity-level questions: 'What kind of instructor are you becoming?' Track the language shift from 'I'm trying to…' to 'I am someone who…' When instructors claim an identity, they behave to protect it.",
          why: "Behaviour change at the habit level is fragile — it requires ongoing willpower. Identity change is self-sustaining — once an instructor sees themselves as 'someone who always connects with the back row,' that behaviour becomes part of who they are. The research on identity-based habit formation (James Clear, Peter Fonagy) consistently shows this is the most durable change mechanism.",
          how: [
            "Listen for identity language in your next three coaching conversations: 'I'm not a performer,' 'I'm not really a technique coach'",
            "When you hear limiting identity language, introduce a gentle reframe: 'What would a coach who prioritises connection do in that moment?'",
            "Ask one identity-forward question per session: 'What kind of instructor do you want to be known for?'",
            "Track the language shift over time — celebrate when 'trying to' becomes 'I do'",
            "Share an example of identity shift from one of your own instructors with your TAP Coach",
          ],
          prompts: [
            {
              label: 'Identity-anchoring questions',
              prompts: [
                "What kind of instructor do you want to be known for?",
                "If you were at your best — what would you be doing differently?",
                "What do your participants experience when you're at your most yourself in class?",
                "What story do you want to tell about your teaching in five years?",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S4-4',
        title: 'Between-Session Momentum',
        subtitle: 'Where development dies or thrives',
        coachRole: {
          summary: "Systems thinker. Build the infrastructure for development between conversations.",
          context: "The coaching conversation is the seed. Everything between sessions is the soil. Your job is to design a lightweight system that keeps momentum alive without requiring your constant presence.",
          principle: "Frequency matters more than format. Two brief touchpoints outperform one long session.",
        },
        coachingSession: {
          goals: [
            "Coach sets up a nudge rhythm for at least one instructor",
            "Coach understands that frequency matters more than format",
          ],
          what: "The gap between coaching conversations is where development dies or thrives. Learn to use pre-class reminders, post-class micro-reflections, and weekly check-ins to maintain momentum without being present.",
          why: "Daily and weekly feedback is associated with large effect sizes (d > 0.6 in 81% of studies). Digital vs face-to-face makes no difference. Only frequency matters. A quick text after class — 'How did the connection track go?' — does more for development than a monthly in-depth review. The mechanism is spaced practice and retrieval: frequent small touches keep the learning active.",
          how: [
            "Map the current gap between coaching conversations for each instructor — how long is it?",
            "For one instructor, design a simple nudge rhythm: one pre-class reminder + one post-class message per week",
            "Keep it minimal: a single question message, not a full conversation",
            "Review the nudge rhythm with your TAP Coach — is it sustainable for you and the instructor?",
            "After two weeks, debrief: has the frequency changed anything about the quality of your in-depth sessions?",
          ],
        },
        content: [],
      },
    ],
  },

  5: {
    name: 'Learn to Multiply',
    subtitle: 'From coaching instructors to building coaching culture',
    duration: '4 sessions',
    color: '#DC2626',
    sessions: [
      {
        id: 'S5-1',
        title: 'Developing Other Coaches',
        subtitle: 'Making yourself replaceable',
        coachRole: {
          summary: "Multiplier. Your legacy is the coaches you create, not the instructors you coach directly.",
          context: "At Stage 5, the shift is from coaching individuals to building capacity. Your job is no longer to be the best coach in the room — it's to create the conditions for others to become coaches.",
          principle: "The best measure of a coach is not their own skill — it's the coaches they've created.",
        },
        coachingSession: {
          goals: [
            "Coach identifies one instructor who could become a peer coach",
            "Coach creates a development plan for that person using Club Coach principles",
          ],
          what: "The shift from coaching instructors to coaching coaches. Use everything you've learned — E-P-E, SDT, Grow's model — but now applied to emerging coaches in your club. Your job is to make yourself replaceable.",
          why: "The ceiling of a single coach's impact is the number of instructors they can personally coach. A coach who develops other coaches multiplies their impact exponentially. This is how club cultures shift — not through one great coach, but through many coaches who share a common language and approach.",
          how: [
            "Review your instructor team: who shows natural curiosity about others, who gives unsolicited but constructive feedback?",
            "Identify one candidate for peer coaching development — they don't need to be the best instructor",
            "Have a conversation about coaching: 'Have you ever thought about developing other instructors?'",
            "Begin using the Club Coach framework with them — the same sessions you've been working through",
            "Share your selection and plan with your TAP Coach for feedback",
          ],
        },
        content: [],
      },
      {
        id: 'S5-2',
        title: 'Entrustment in Practice',
        subtitle: 'Trust-based assessment for your whole team',
        coachRole: {
          summary: "Trust architect. Make real decisions about who is ready for what.",
          context: "Entrustment is not about ticking boxes — it's about making deliberate, observable decisions about readiness. This session requires you to complete a trust map for your full team and act on it.",
          principle: "Trust-based assessment replaces tick-box evaluation with real coaching decisions.",
        },
        coachingSession: {
          goals: [
            "Coach completes a trust map for their full team",
            "Coach makes one entrustment decision this week",
          ],
          what: "Apply the Entrustable Teaching Activities framework to your team. Map each instructor's trust levels across the ETAs. Make real decisions: who can teach unsupervised? Who needs you present? Who is ready to mentor others?",
          why: "The ETA framework turns observation into action. Most coaches observe but don't decide — they wait for someone else to make the call about readiness. At Stage 5, you make those calls. You're responsible for the development and safety of the instructors in your club. Entrustment decisions make that responsibility explicit.",
          how: [
            "Review the 8 ETAs from the LMQ Reference",
            "For each instructor, assign an entrustment level (1–5) for each ETA based on your observations",
            "Identify the most significant trust gap on your team — who is most ready to move forward?",
            "Make one entrustment decision and communicate it: 'You're ready to teach this class unsupervised'",
            "Debrief the decision with your TAP Coach — what was your evidence, what was your hesitation?",
          ],
        },
        content: [],
      },
      {
        id: 'S5-3',
        title: 'Reflective Practice as a Habit',
        subtitle: "Building the loop that keeps you growing",
        coachRole: {
          summary: "Reflective practitioner. Model the behaviour you want your instructors to develop.",
          context: "Reflective practice is the meta-skill. Coaches who don't reflect on their own coaching stop growing — and their instructors follow. This session is about building a sustainable weekly reflection ritual.",
          principle: "You cannot develop coaches without developing yourself.",
        },
        coachingSession: {
          goals: [
            "Coach commits to a weekly 10-minute reflection ritual",
            "Coach uses Kolb's cycle: Experience → Reflect → Conceptualise → Experiment",
          ],
          what: "Schön's reflection-in-action (adjusting in the moment) and reflection-on-action (reviewing afterward). Build a weekly reflective practice: What coaching conversations went well? What would I do differently? What pattern am I seeing across my team?",
          why: "Deliberate reflective practice is what separates coaches who improve from coaches who plateau. Without reflection, experience doesn't automatically produce learning — it just produces more of the same. Kolb's cycle shows that experience alone isn't enough: the reflection and conceptualisation steps are where learning actually happens.",
          how: [
            "Choose a fixed time each week for a 10-minute coaching reflection — protect it",
            "Use three questions every week: What went well? What would I do differently? What pattern am I seeing?",
            "After each coaching conversation, practise 60-second reflection-in-action: what just happened and why?",
            "Share your weekly reflection notes with your TAP Coach once per month",
            "Teach one of your more advanced instructors the same weekly reflection habit",
          ],
          prompts: [
            {
              label: 'Weekly reflection questions',
              prompts: [
                "Which coaching conversation this week felt most alive — what was different about it?",
                "Where did I default to the righting reflex when I should have asked first?",
                "What pattern am I seeing across my team that I haven't named yet?",
                "What's one thing I'll try differently next week based on what I noticed?",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S5-4',
        title: 'Your Coaching Philosophy',
        subtitle: "Who you are as a coach",
        coachRole: {
          summary: "Author. Synthesise everything into your own voice.",
          context: "You've learned to see, ask, adapt, develop, and multiply. This session is about naming what you stand for — not what you do, but what you believe. Your coaching philosophy is the north star that every decision will eventually point back to.",
          principle: "You've learned to see, ask, adapt, develop, and multiply. Now name what you stand for.",
        },
        coachingSession: {
          goals: [
            "Coach writes a 1-paragraph coaching philosophy",
            "Coach shares it with their TAP Coach for feedback",
          ],
          what: "Synthesise everything into a personal coaching philosophy statement. Who are you as a coach? What do you believe about instructor development? What's your signature approach? This is identity work for the coach.",
          why: "A coaching philosophy is not a branding exercise — it's a decision filter. When you face a hard call (give more feedback or back off? intervene now or wait?), your philosophy answers it before you have to think. Coaches who can articulate their philosophy make more consistent, deliberate decisions — and model the kind of reflective practice they're trying to build in their instructors.",
          how: [
            "Review your notes and reflections from all five stages of Club Coach",
            "Write three sentences: what you believe about how people grow, how you coach, and what success looks like",
            "Refine into one strong paragraph — your coaching philosophy",
            "Share it with your TAP Coach and ask: does this sound like who I've been as a coach over the last year?",
            "Post it somewhere visible — your phone, your coaching notebook, your locker",
          ],
          prompts: [
            {
              label: 'Philosophy prompts',
              prompts: [
                "What do I believe about how instructors grow — is growth earned, sparked, or supported?",
                "What's the most important thing I do as a coach that an instructor couldn't get anywhere else?",
                "When I think about my best coaching moment, what made it possible?",
                "What do I want instructors to remember about being coached by me?",
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '10 min',
              title: 'Reflection on the journey',
              steps: [
                "TAP Coach walks you through each stage: what did you take from Learn to See? Learn to Ask?",
                "You identify one moment from each stage that changed how you coach",
              ],
            },
            {
              duration: '20 min',
              title: 'Writing the philosophy',
              steps: [
                "Free-write for 5 minutes: what do I believe about coaching?",
                "Refine into three clear sentences",
                "Combine into one paragraph — read it aloud",
              ],
              tip: "Read it aloud. If it sounds like someone else wrote it, keep refining.",
            },
            {
              duration: '15 min',
              title: 'TAP Coach feedback & celebration',
              steps: [
                "TAP Coach reflects the philosophy back: does it match who you've been as a coach?",
                "Identify one moment from your journey that proves this philosophy is true",
                "TAP Coach formally acknowledges your completion of Club Coach Stage 5",
              ],
            },
          ],
        },
        content: [],
      },
    ],
  },
};
