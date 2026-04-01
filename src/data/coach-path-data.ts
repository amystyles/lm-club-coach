import type { StageDetail } from './stage-sessions';

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
        title: 'The Frameworks Behind Club Coach',
        subtitle: 'Understanding the system you are about to use',
        coachRole: {
          summary: "Guide. You're not teaching theory — you're showing a new Club Coach the tools they're about to use and why they exist.",
          context: "This session gives new Club Coaches the philosophical foundation before they start using the system. Understanding why Club Coach works the way it does makes every subsequent session more coherent. Don't lecture — use the tools in the reference panel as you walk through each framework.",
          principle: "When you understand the why behind a tool, you use it better.",
        },
        coachingSession: {
          goals: [
            "Coach understands that LMQ is the standard everything in Club Coach is built around",
            "Coach can name each model and explain in one sentence why Club Coach uses it",
            "Coach sees how the models connect as a system, not as separate frameworks",
          ],
          what: "Understand the research behind Club Coach — the five frameworks that explain why the system works the way it does. This is not theory for its own sake: each model maps directly to something you'll use every time you coach an instructor.",
          why: "The world's most effective development systems — medical residencies, elite sports, military training — share a common insight: growth is non-linear and must be coached differently at every stage. Club Coach is built on that insight. Understanding the why behind each tool means you'll use it with intention, not just habit.",
          how: [
            "Open LMQ Reference and establish it as the north star — the standard Club Coach is built to drive alignment with",
            "Open the Dreyfus Model tool: walk through the five stages of skill acquisition, each requiring qualitatively different coaching",
            "Open the ETAs tool: walk through graduated trust levels that replace pass/fail with a real picture of what an instructor can do unsupervised",
            "Open the SSDL tool: walk through the four coaching roles that adapt to where the instructor sits on the self-direction spectrum",
            "Connect the models as a system: Dreyfus tells you where they are, SSDL tells you how to coach them, ETAs tell you when to trust them, E-P-E is the conversation, Implementation Intentions make change stick",
          ],
          prompts: [
            {
              label: 'Dreyfus',
              prompts: [
                "Think of an instructor you know well. Where do you think they sit for Choreography vs Connection — are they at the same stage for both?",
                "If someone is a Novice in one Key Element and Proficient in another — how should your coaching change between those two conversations?",
              ],
            },
            {
              label: 'ETAs',
              prompts: [
                "For that same instructor — what would you need to see before you'd trust them to deliver a class completely unsupervised?",
                "Where on the Trust Map do you think most instructors in your club sit right now for 'Deliver a complete class independently'?",
              ],
            },
            {
              label: 'SSDL',
              prompts: [
                "How do you currently adjust the way you talk to instructors at different experience levels? What changes — and what stays the same?",
                "Think of a time when you gave an experienced instructor detailed step-by-step instructions. How did that land?",
              ],
            },
            {
              label: 'Implementation Intentions',
              prompts: [
                "Think of a piece of feedback you've given an instructor that didn't stick. What if-then plan would have made it more likely to land?",
                "What is the difference between 'work on your connection' and 'If I start the squat track, I will scan all four quadrants before the first rep'?",
              ],
            },
            {
              label: 'E-P-E',
              prompts: [
                "What is your instinct when you see an instructor do something wrong — to tell them, or to ask them what they noticed first?",
                "Why does asking first change what happens next?",
              ],
            },
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Check-In',
              steps: [
                "Brief recap from Session 1 — any questions about Club Coach or the pathway",
                "Frame the session: today is about understanding why Club Coach works the way it does before you start using it",
              ],
            },
            {
              duration: '5 min',
              title: 'LMQ as the North Star',
              steps: [
                "Open LMQ Reference together",
                "Establish: LMQ is the standard. Everything in Club Coach traces back to it. Your job as a Club Coach is to drive alignment between each instructor and that standard.",
                "Ask: which of the 5 Key Elements do you feel least confident assessing right now?",
              ],
              tip: "Don't go deep into LMQ here — that's Session 3. Just establish it as the foundation everything else is built on.",
            },
            {
              duration: '25 min',
              title: 'The Five Frameworks',
              steps: [
                "Dreyfus (5 min): Open the Dreyfus Model tool. Walk through the five stages. Ask: 'Think of an instructor you know — where are they for Choreography vs Connection? Same stage?'",
                "ETAs (5 min): Open the ETAs tool. Walk through the trust levels and the 8 activities. Ask: 'What would you need to see before you'd trust someone to teach completely unsupervised?'",
                "SSDL (5 min): Open the SSDL tool. Walk through the four coaching roles. Ask: 'Have you ever coached someone with the wrong approach for their stage? What happened?'",
                "Implementation Intentions (5 min): Explain the if-then format. Open the Intention Builder. Ask: 'What's the difference between \"work on your connection\" and a specific if-then plan?'",
                "E-P-E (5 min): Explain Elicit–Provide–Elicit. Open Conversation Templates. Ask: 'What happens when you lead with your observation instead of asking first?'",
              ],
              tip: "Keep each to 5 minutes. The depth comes in later sessions — this session is about the map, not the territory.",
            },
            {
              duration: '5 min',
              title: 'How They Connect',
              steps: [
                "Dreyfus tells you where the instructor is. SSDL tells you how to coach them. ETAs tell you when to trust them.",
                "E-P-E is how you have the conversation. Implementation Intentions make the change stick.",
                "LMQ is the standard all of this is in service of.",
              ],
            },
            {
              duration: '5 min',
              title: 'Close & Commit',
              steps: [
                "Ask: which model stands out as most immediately useful to you — and why?",
                "Form one implementation intention together: 'If [specific coaching moment this week], then I will [apply one model specifically].'",
                "Confirm the next session time.",
              ],
            },
          ],
        },
        content: [
          {
            week: `Dreyfus Model — Where Is the Instructor?`,
            tasks: [
              `WHAT: The Dreyfus model maps how instructors develop any skill — from following rules to intuitive mastery. Five stages: Novice → Advanced Beginner → Competent → Proficient → Expert. The key insight: an instructor can be at different stages for different Key Elements at the same time. Someone Proficient in Choreography might be a Novice in Connection.`,
              `THE FIVE STAGES: Novice — follows rules and checklists, needs explicit instruction. Advanced Beginner — recognises patterns, needs guided practice with explanation. Competent — plans and prioritises, ask questions and let them problem-solve. Proficient — strong intuition, sees the whole picture, prompt reflection. Expert — fully self-directed, challenge them with open-ended questions.`,
              `HOW YOU USE IT: Every instructor profile shows their Dreyfus stage per Key Element. The italicised label next to each stage is your coaching approach: Tell (Novice), Guide (Advanced Beginner), Facilitate (Competent), Consult (Proficient), Challenge (Expert). Your approach must shift per Key Element — don't coach Choreography the same way you coach Connection if they're at different stages.`,
              `EXAMPLE: An instructor is Competent in Technique but Novice in Coaching. For Technique, you ask "What did you notice about your squat depth cues?" (facilitate). For Coaching, you say "In the next track, I want you to deliver one Layer 2 cue per song — here's what that sounds like" (tell). Same instructor, same session, two different approaches.`,
              `COMMON MISTAKE: Coaching someone at one stage globally. "She's a great instructor" is not a Dreyfus assessment. "She's Proficient in Choreography, Competent in Technique, and Advanced Beginner in Connection" is. The difference changes everything about how you coach her.`
            ]
          },
          {
            week: `SSDL — How Should You Coach Them?`,
            tasks: [
              `WHAT: Gerald Grow's Staged Self-Directed Learning model describes four coaching roles that shift based on how self-directed the instructor is. Dreyfus describes what an instructor can do. SSDL describes what they need from you.`,
              `THE FOUR ROLES: Authority — the instructor is dependent, needs explicit direction and structure. You direct. Motivator — the instructor is interested, responds to inspiration and reasoning. You explain the "why" behind feedback. Facilitator — the instructor is involved, capable of designing solutions. You ask questions and support. Consultant — the instructor is self-directed, sets own goals. You stretch and challenge, not monitor.`,
              `HOW YOU USE IT: When you see an instructor's Dreyfus stage, SSDL tells you which role to play. A Novice needs an Authority. A Proficient performer needs a Consultant. The mismatch is the most common coaching failure — directing a self-directed instructor feels patronising. Going hands-off with a dependent learner feels abandoning.`,
              `EXAMPLE: You're coaching a Novice in Connection. SSDL says: Authority role. So you don't ask "What do you think you could do to connect better?" — they don't know yet. You say: "In the next track, I want you to make eye contact with three people in the back row. That's your only focus." Direct instruction, clear structure.`,
              `THE MISMATCH PROBLEM: Think of a time you gave an experienced instructor detailed step-by-step instructions. They probably pushed back or disengaged — that's Authority mode on a Consultant-stage learner. Now think of a time you asked a new instructor "What do you think?" and got a blank stare — that's Consultant mode on a Dependent-stage learner. SSDL prevents both.`
            ]
          },
          {
            week: `ETAs & Supervision Levels — When to Trust Them`,
            tasks: [
              `WHAT: Supervision levels — Direct, Indirect, and Unsupervised — tell you how much oversight an instructor needs for a specific task. The ETA (Entrustable Trust Activities) framework defines the real teaching activities you assess trust against. This replaces pass/fail with a graduated picture of what an instructor can do independently.`,
              `THE THREE LEVELS: Direct — you are present, observing, correcting, guiding in real time. For new instructors, new programs, new tasks. Indirect — you check in regularly but aren't in the room. Periodic observations, scheduled conversations. For competent instructors who benefit from structured check-ins. Unsupervised — you trust their judgement. Your role shifts to stretching and challenging. For experienced instructors who are self-directed for this specific task.`,
              `HOW YOU USE IT: The Trust Map on each instructor profile shows supervision levels per competency area. Supervision is task-specific, not person-specific. An experienced instructor teaching a brand new program goes back to Direct for that program — even if they're Unsupervised for everything else.`,
              `EXAMPLE: An instructor has been teaching BODYPUMP for two years (Unsupervised). They just trained in BODYCOMBAT (Direct). You don't treat them like a beginner across the board — you trust their class delivery in BODYPUMP while providing hands-on support for BODYCOMBAT. Same person, different trust levels per task.`,
              `KEY PRINCIPLE: Most coaches default to one mode — either hovering over everyone or leaving everyone alone. Without supervision levels, you either over-supervise (creating dependency in experienced instructors) or under-supervise (leaving developing instructors without support). The Trust Map removes the guesswork.`
            ]
          },
          {
            week: `E-P-E — How to Have the Conversation`,
            tasks: [
              `WHAT: E-P-E is Elicit–Provide–Elicit, a three-step conversational method from Motivational Interviewing (Miller & Rollnick). Elicit: ask what the instructor noticed. Provide: share your specific observation. Elicit: ask what they want to try next. Supported by 200+ meta-analyses across health, sport, and education.`,
              `WHY IT WORKS: Asking first activates the instructor's own insight, making change far more likely than if you'd just told them what to fix. Leading with your observation triggers the "righting reflex" — the instinct to defend rather than reflect. When you ask first, they own the insight. When you tell first, they resist it.`,
              `HOW YOU USE IT: After every class observation, every feedback conversation, every check-in. "What did you feel? Here's what I saw. What do you want to work on?" It works in 90 seconds or 30 minutes — the structure scales.`,
              `EXAMPLE: You observed an instructor whose Layer 2 cues dropped off in the peak tracks. DON'T say: "Your cueing dropped off in tracks 5–7." DO say: "How did the peak section feel to you?" (Elicit). They say "I think I lost focus." You say: "I noticed your Layer 2 cues were strong in tracks 1–4 but went quiet in 5–7" (Provide). Then: "What would you want to experiment with next class?" (Elicit).`,
              `THE RULE: Ask first — always. Even when you know exactly what the problem is. Even when it's obvious. Especially when it's obvious. The coach who asks first gets further than the coach who tells first.`
            ]
          },
          {
            week: `Implementation Intentions — Making Change Stick`,
            tasks: [
              `WHAT: An implementation intention is a specific if–then plan: "If [specific class moment], then I will [specific behaviour]." A meta-analysis of 94 studies found an effect size of d = 0.65 — goals with if–then plans are completed approximately 3× more often than goals without them.`,
              `WHY IT WORKS: Vague intentions don't change behaviour. "I'll work on my cueing" doesn't change anything. "If I start the squat track, then I will use the 3-2-1 countdown while making eye contact with the back row" does. The "if" creates a mental link to a specific trigger in class, making the behaviour semi-automatic.`,
              `HOW YOU USE IT: End every feedback conversation — whether CRC or GROW — with one implementation intention. Coach the instructor to build it themselves: "What moment in class will you use as your trigger?" Follow up next session: "How did your if–then plan go?"`,
              `EXAMPLE: After an E-P-E conversation about Connection, the instructor wants to work on acknowledging participants. DON'T leave it at: "Work on your connection." DO build: "If I finish the warm-up track, then I will call three people by name before the next track starts." One trigger, one action, one specific moment.`,
              `THIS IS THE SINGLE HIGHEST-IMPACT COACHING HABIT YOU CAN BUILD. E-P-E is the conversation. Implementation Intentions make the change stick between sessions. Without them, feedback evaporates by the next class.`
            ]
          },
          {
            week: `How the Frameworks Connect — The System`,
            tasks: [
              `These five frameworks are not separate tools you pick from a menu. They form a connected system that guides every coaching interaction:`,
              `DREYFUS tells you WHERE the instructor is — per Key Element, not globally. It answers: what stage of development are they at for this specific skill?`,
              `SSDL tells you HOW to coach them — which role to play for their level of self-direction. It answers: what does this person need from me right now?`,
              `ETAs tell you WHEN to trust them — how much oversight to provide for each task. It answers: can I step back, or do I need to be present?`,
              `E-P-E is how you HAVE THE CONVERSATION — elicit first, provide your observation, elicit what they want to try. It answers: how do I give feedback that lands?`,
              `IMPLEMENTATION INTENTIONS make the CHANGE STICK — every conversation ends with one specific if–then plan. It answers: how do I make sure this feedback actually changes behaviour?`,
              `IN PRACTICE: You check the instructor's profile (Dreyfus stage per KE, Supervision level), choose your coaching role (SSDL), observe the class (Observation Framework), have the conversation (E-P-E within CRC or GROW), and close with one if–then plan (Implementation Intention). LMQ is the standard at every step — every Grade progression, every Level achieved, is the result of this system working.`
            ]
          }
        ],
      },
      {
        id: 'S1-3',
        title: 'Understanding LMQ',
        subtitle: 'Learning the language of instructor development',
        coachRole: {
          summary: "Student of the framework. Study it before you use it.",
          context: "LMQ is the shared language you'll use with every instructor you coach. You need to understand it deeply — not just the labels, but what each Key Element actually looks like in a live class, at each grade level.",
          principle: "LMQ isn't a scorecard — it's a language for describing growth.",
        },
        coachingSession: {
          goals: [
            "Coach can articulate what each Key Element is",
            "Coach understands that LMQ levels are per-program",
            "Coach can distinguish Grade 1 from Grade 2 from Grade 3 in at least one program",
          ],
          what: "Learn LMQ framework — what it measures, how levels work, what the 5 Key Elements actually look like in a live class. Each program has unique skills and criteria per element. A Grade 2 in Choreography looks different in BODYPUMP vs BODYCOMBAT.",
          why: "You cannot coach what you cannot see, and you cannot see what you haven't defined. LMQ gives you a shared vocabulary to have precise conversations about instructor growth. Without it, feedback stays vague and progress stays accidental.",
          how: [
            "Study LMQ Reference — all 5 Key Elements and their grade descriptors",
            "Pick one program you know well and read its criteria for each element at each grade",
            "Ask your TAP Coach to describe a real example of Grade 1 vs Grade 3 Choreography in that program",
            "Identify which Key Element you find hardest to distinguish by grade — this is where to focus",
            "Summarise LMQ in your own words: what does it measure, and why does it matter?",
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
                "Walk through the 5 Key Elements together with LMQ Reference open",
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
                "You try to place each one on LMQ using what you've just learned",
                "TAP Coach gives feedback on your reasoning",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S1-4',
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
        sessionPlan: {
          totalDuration: '60 min',
          format: 'In-class observation (solo)',
          blocks: [
            {
              duration: '10 min',
              title: 'Pre-Class Prep',
              steps: [
                "Download and print the Observation Framework before arriving",
                "Choose your position: somewhere you can see both the instructor and participants",
                "Set your intention: facts only — no feedback, no judgement",
              ],
            },
            {
              duration: '45 min',
              title: 'Observation',
              steps: [
                "Track each class segment — movements, cues, timing, instructor positioning",
                "For each Key Element, write what you see happening — not what you think about it",
                "Note any moments that stand out: what exactly happened, when, and what the room did in response",
              ],
              tip: "If you find yourself writing 'good' or 'needs work' — stop. Replace it with a factual description of what you observed. 'Good connection' is an opinion. 'Made eye contact with three participants in the back row during track 4' is a fact.",
            },
            {
              duration: '5 min',
              title: 'Post-Class Sort',
              steps: [
                "Review your notes immediately after the class",
                "Mark each note: F (fact) or I (interpretation)",
                "Rewrite any interpretations as factual observations before your debrief session",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S1-5',
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '10 min',
              title: 'Walk Through Your Notes',
              steps: [
                "Share your observation notes — talk through what you wrote, section by section",
                "TAP Coach listens for moments of precise observation vs interpretation",
                "No grading the instructor yet — this session is about your seeing",
              ],
            },
            {
              duration: '15 min',
              title: 'Observation vs Interpretation',
              steps: [
                "TAP Coach highlights two or three things you observed accurately and precisely — name what made them good observations",
                "TAP Coach identifies one or two places where you interpreted rather than observed",
                "For each interpretation: practise restating it as a factual observation together",
                "Discuss: which Key Elements are hardest for you to observe without opinion creeping in, and why?",
              ],
              tip: "The most common interpretation masquerading as observation is energy: 'The class had good energy.' That tells us nothing. What did you see that makes you say that?",
            },
            {
              duration: '5 min',
              title: 'Sharpen One Skill',
              steps: [
                "Name the one observation skill you want to develop before your next class",
                "Agree on what 'improved' looks like — what would you write differently?",
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Open Questions Check-in',
              steps: [
                "TAP Coach asks: how did it feel to ask more and tell less this week?",
                "What resistance — from the instructor, or from yourself — did you notice?",
              ],
            },
            {
              duration: '15 min',
              title: 'The Righting Reflex',
              steps: [
                "TAP Coach introduces the concept: what is the righting reflex, and why does it feel like caring?",
                "Roleplay exercise: TAP Coach plays an instructor making an obvious mistake — coach practises sitting with the urge to fix before responding",
                "Debrief the roleplay: what did it feel like to pause? What question emerged instead?",
                "Key paradox: the more you push, the more they resist — discuss a real example from your experience",
              ],
              tip: "The righting reflex isn't a flaw. It comes from genuinely wanting to help. The goal isn't to suppress it — it's to use it as a cue to ask a question instead.",
            },
            {
              duration: '10 min',
              title: 'Build the Habit',
              steps: [
                "Agree on a trigger phrase you'll use internally when you feel the reflex: e.g., 'Ask first'",
                "Plan: spend the next week noticing — but not acting on — righting reflex moments",
                "What will you look for? Name two specific situations where you expect it to show up",
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Righting Reflex Debrief',
              steps: [
                "What did you notice this week? When did the urge to fix show up?",
                "Did you manage to pause and ask instead — what happened?",
              ],
            },
            {
              duration: '15 min',
              title: 'Question Types',
              steps: [
                "TAP Coach walks through the three question types: closed, leading, genuinely open",
                "Work through examples of each — classify them together",
                "Practise converting a closed or leading question into a genuinely open version",
                "Try scaling questions live: TAP Coach plays the instructor, coach asks 'On a scale of 1–10…' and follows up",
                "Try exception-finding: 'When does this challenge not happen — what's different about those classes?'",
              ],
              tip: "A genuinely open question surprises you too. If you already know the answer you're hoping for, the question is probably leading.",
            },
            {
              duration: '10 min',
              title: 'Build Your Go-To List',
              steps: [
                "Write your 5 go-to questions — ones you can use in any post-class conversation",
                "Test each one: is it open? Does it hand control to the instructor?",
                "Agree to use at least two of these in your next coaching conversation and report back",
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
        title: 'SSDL — Matching Your Coaching Role',
        subtitle: "Four roles, four situations",
        coachRole: {
          summary: "Adapter-in-training. Start identifying which role you default to.",
          context: "Most coaches have one mode — usually either telling or facilitating. This session is about expanding your range so you can deliberately choose your role based on who's in front of you.",
          principle: "The best coaches don't have one style — they have four, and they know when to use each one.",
        },
        coachingSession: {
          goals: [
            "Coach can identify which SSDL stage an instructor is at",
            "Coach understands the 4 roles: Authority → Motivator → Facilitator → Consultant",
            "Coach recognises the 'mismatch problem' and its consequences",
          ],
          what: "Learn Gerald Grow's Staged Self-Directed Learning model. Every instructor sits at a different stage of self-direction, and the coach's role must match. Telling an experienced instructor what to do is as harmful as leaving a new instructor to figure it out alone.",
          why: "Mismatched coaching style is the most common cause of instructor frustration. Too much direction for a competent instructor creates resentment. Too much autonomy for a new instructor creates anxiety. SSDL gives you a diagnostic tool to read where an instructor is and choose your role accordingly.",
          how: [
            "Read the SSDL overview and the 4 coaching roles",
            "Map each instructor on your team to a SSDL stage — use their LMQ profile and your observation notes",
            "For your most experienced instructor: what role do they need from you vs what role do you naturally give them?",
            "For your newest instructor: same question",
            "Identify your default coaching role — and where it serves you well and where it doesn't",
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Stage 2 Reflection',
              steps: [
                "What did you take from Stage 2 — E-P-E, questioning, practice conversation?",
                "Which coaching habit has already changed how you show up after class?",
              ],
            },
            {
              duration: '10 min',
              title: 'SSDL',
              steps: [
                "TAP Coach walks through the 4 coaching roles: Authority → Motivator → Facilitator → Consultant",
                "For each role, discuss: when does this serve an instructor well, and when does it frustrate them?",
                "Name your default role — the one you reach for instinctively",
              ],
              tip: "The mismatch problem is subtle. Coaches who love facilitating can leave new instructors completely lost. Coaches who love directing create resentment in experienced ones.",
            },
            {
              duration: '10 min',
              title: 'Map Your Team',
              steps: [
                "Pick two instructors: your most experienced and your newest",
                "For each, identify their SSDL stage using their LMQ profile and your observation notes",
                "Name the role each one needs from you — and compare it to the role you've been giving",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Identify the one mismatch on your team you'll address first",
                "Agree how you'll deliberately shift your role before next session",
              ],
            },
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
          what: "The Dreyfus model maps skill acquisition from Novice through to Expert. Novices need rules, competent performers need frameworks, experts need space. The key insight: an instructor can be at different stages for different Key Elements simultaneously. The Dreyfus stages connect directly to three practical tools in the app: the Coaching Approach label (how to coach this skill), the Supervision Level (how much oversight this instructor needs for this task), and the Feedback Builder guidance (what register to write feedback in). When you understand Dreyfus, you unlock all three.",
          why: "Coaching based on a global assessment misses the nuance. An instructor who is Grade 3 in Choreography but Grade 1 in Connection needs very different coaching approaches for each element in the same session. Dreyfus gives you the per-skill lens to do this accurately.",
          how: [
            "Review the Dreyfus stage descriptors for each stage: Novice, Advanced Beginner, Competent, Proficient, Expert",
            "For one instructor, assign a Dreyfus stage to each of the 5 Key Elements based on your observations",
            "Describe what coaching approach each stage calls for: rules and checklists (Novice) → frameworks (Competent) → space and reflection (Expert)",
            "Plan your next coaching conversation with that instructor using per-element Dreyfus guidance",
            "Share your analysis with your TAP Coach and discuss where your read might be off",
            "Connect the Dreyfus stages to the Coaching Approach labels you see in the Instructor Profile: Novice = Tell, Advanced Beginner = Guide, Competent = Facilitate, Proficient = Consult, Expert = Challenge",
            "When you open an instructor's profile, the Dreyfus card shows you exactly how to coach each KE — use it before every observation and feedback conversation",
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'SSDL Check-in',
              steps: [
                "What did you notice when you tried shifting your coaching role?",
                "Did any instructor respond differently than you expected?",
              ],
            },
            {
              duration: '10 min',
              title: 'Dreyfus Framework',
              steps: [
                "TAP Coach walks through the 5 stages: Novice → Advanced Beginner → Competent → Proficient → Expert",
                "For each stage: what does this instructor look like in a live class? What do they need from a coach?",
                "Connect to the Coaching Approach labels in the app: Tell / Guide / Facilitate / Consult / Challenge",
              ],
              tip: "The critical insight is per-skill, not per-person. An instructor can be Proficient in Choreography and Novice in Connection simultaneously.",
            },
            {
              duration: '10 min',
              title: 'Per-Skill Mapping',
              steps: [
                "Pick one instructor you've observed recently",
                "Together, assign a Dreyfus stage to each of their 5 Key Elements",
                "For each element: what does your stage assignment mean for how you coach it — specifically?",
                "Open their profile in the app and compare your assessment to the Dreyfus card shown",
              ],
            },
            {
              duration: '5 min',
              title: 'Plan Your Next Observation',
              steps: [
                "Name the instructor you'll observe next",
                "Agree: you'll use the per-element Dreyfus lens and bring your notes to the next session",
              ],
            },
          ],
        },
        content: [],
      },
      {
        id: 'S3-2b',
        title: 'Supervision & Entrustment',
        subtitle: 'Knowing when to step in, step back, or step away',
        coachRole: {
          summary: "Trust Calibrator. Learn to match your oversight to their readiness — not your comfort.",
          context: "Most coaches default to one mode: either hovering over everyone or leaving everyone alone. Supervision levels give you a per-instructor, per-task framework for deciding how much oversight is right.",
          principle: "Supervision is about the task, not the person. The same instructor might need Direct supervision for mentoring and be Unsupervised for class delivery.",
        },
        coachingSession: {
          goals: [
            "Coach understands the three supervision levels and what each means for their behaviour",
            "Coach can identify the correct supervision level for at least two instructors on their team across different tasks",
          ],
          what: "Supervision levels — Direct, Indirect, and Unsupervised — tell you how much oversight an instructor needs for a specific task. Direct means you're present: observing, correcting, guiding in real time. Indirect means you're checking in regularly but not in the room — periodic observations, scheduled feedback conversations. Unsupervised means the instructor is self-directed: you trust their judgment and your role shifts to stretching and challenging rather than monitoring. The levels are derived from the instructor's Dreyfus stage and demonstrated reliability. They appear in the Trust Map on each instructor's profile. The key insight: supervision is task-specific. An instructor who is Unsupervised for teaching their primary program might need Direct supervision for mentoring a new instructor or coaching a program they're less experienced in.",
          why: "Without a supervision framework, coaches either over-supervise (creating dependency and resentment in experienced instructors) or under-supervise (leaving developing instructors without the support they need). Both erode trust. The supervision levels remove guesswork: when you open an instructor's profile, the Trust Map tells you exactly how much oversight to provide for each area. This is especially important as your team grows — you can't be everywhere, so you need to know where your presence matters most.",
          how: [
            "Open the Trust Map for two instructors on your team — compare their supervision levels across different competencies",
            "Identify one instructor where you might be over-supervising (your presence isn't adding value) and one where you might be under-supervising (they need more support than they're getting)",
            "For the over-supervised instructor: plan one concrete way to step back this week (e.g., skip an observation you'd normally attend, let them self-assess first)",
            "For the under-supervised instructor: plan one concrete way to step in (e.g., schedule an observation, ask to review their class plan together)",
            "Discuss with your TAP Coach: where is your default — do you tend to hover or tend to leave alone? What drives that?",
          ],
        },
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Dreyfus Debrief',
              steps: [
                "What did you notice when you used per-skill Dreyfus lens in your last observation?",
                "Was any element harder to place than the others — why?",
              ],
            },
            {
              duration: '10 min',
              title: 'Supervision Levels',
              steps: [
                "TAP Coach explains Direct, Indirect, and Unsupervised — what each looks like in practice",
                "Key point: supervision is task-specific, not person-specific",
                "Open one instructor's Trust Map in the app together — discuss what each level means for your behaviour",
              ],
              tip: "The most common mistake is thinking 'this instructor is experienced so I don't need to supervise them.' An experienced instructor teaching a new program is back to Direct supervision for that task.",
            },
            {
              duration: '10 min',
              title: 'Calibration Exercise',
              steps: [
                "Open Trust Maps for two instructors side by side",
                "For each, identify one area where you might be over-supervising and one where you might be under-supervising",
                "For each mismatch: what would the right level of oversight look like this week?",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name one concrete step to step back with an over-supervised instructor",
                "Name one concrete step to step in with an under-supervised instructor",
                "Agree you'll report back on both at next session",
              ],
            },
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Supervision Check-in',
              steps: [
                "Did you step back or step in as planned last week?",
                "What happened — how did the instructor respond?",
              ],
            },
            {
              duration: '10 min',
              title: 'Understanding Liminal Space',
              steps: [
                "TAP Coach introduces threshold concepts — ideas that permanently change how an instructor sees their practice",
                "Discuss examples from group fitness: 'the class is about them, not me' / 'connection before choreography'",
                "Talk through what an instructor in liminal space looks like: working harder, feeling stuck, temporarily less fluent",
              ],
              tip: "Share a personal example from your own development — a moment when you felt worse before you felt better. It makes this concept real.",
            },
            {
              duration: '10 min',
              title: 'Identify and Plan',
              steps: [
                "Think of one instructor on your team who seems to be working harder without getting better",
                "Together, identify the threshold concept they might be crossing",
                "Plan how to introduce it as a reframe, not a correction: 'This confusion you're feeling — that's the hard bit. It means you're close to something.'",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Practise the normalising phrase out loud — make it yours, not a script",
                "Agree: you'll hold the space rather than rescue this instructor before next session",
              ],
            },
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Threshold Debrief',
              steps: [
                "Did you spot any liminal space moments with your instructors this week?",
                "Were you able to hold the space rather than rescue?",
              ],
            },
            {
              duration: '10 min',
              title: 'The If–Then Structure',
              steps: [
                "TAP Coach introduces the evidence base: implementation intentions are ~3× more effective than general goals",
                "Walk through the anatomy: 'If [specific class moment], then I will [specific behaviour]'",
                "Test two examples together — one vague goal vs one implementation intention — and feel the difference",
              ],
              tip: "The test for a good if-then plan: can you picture exactly where you are, what just happened, and what you do next? If not, it's not specific enough.",
            },
            {
              duration: '10 min',
              title: 'Roleplay',
              steps: [
                "TAP Coach plays an instructor at the end of a coaching conversation",
                "You close the conversation by building an if-then plan together",
                "TAP Coach gives feedback: was the 'if' specific enough? Was the 'then' concrete enough?",
                "Repeat with a different scenario — practise until it feels natural",
              ],
            },
            {
              duration: '5 min',
              title: 'Stage 3 Close',
              steps: [
                "Commit: every coaching conversation this week ends with one if-then plan",
                "TAP Coach acknowledges your completion of Stage 3 — learn to adapt",
                "Agree on timing for Stage 4",
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Stage 3 Reflection',
              steps: [
                "What's the biggest shift in how you coach since Stage 3?",
                "Which of the tools — SSDL, Dreyfus, supervision levels, if-then plans — has had the most impact?",
              ],
            },
            {
              duration: '10 min',
              title: 'Marginal Gains Strategy',
              steps: [
                "TAP Coach introduces the 1% principle: focus compounds, scatter doesn't",
                "Open Key Element profiles for 2-3 instructors on your team",
                "For each, discuss: which element is both underdeveloped and highest leverage? Where would a small improvement unlock the most progress?",
              ],
              tip: "The highest-leverage element is often not the lowest-scoring one. Look for the element that gates everything else — for many instructors, Connection unlocks Coaching and Performance simultaneously.",
            },
            {
              duration: '10 min',
              title: 'Build the Plan',
              steps: [
                "Choose one instructor for your first 1% conversation",
                "Agree the element: 'This week, we focus only on [element]. Everything else stays the same.'",
                "Build the coaching plan: what will you observe, what will you ask, what if-then plan will you co-create?",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name the instructor, the element, and the date of the 1% conversation",
                "Confirm you'll bring the outcome to the next session",
              ],
            },
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: '1% Conversation Debrief',
              steps: [
                "How did your first 1% conversation go?",
                "How did the instructor respond to focused constraint — relief, frustration, or engagement?",
              ],
            },
            {
              duration: '10 min',
              title: 'SDT Framework',
              steps: [
                "TAP Coach introduces the three needs: Autonomy (choice), Competence (visible progress), Relatedness (connection to peers)",
                "For each need: what does it look like when it's supported, and what does it look like when it's frustrated?",
                "Discuss the core risk: coaches who direct too much create compliance, not commitment",
              ],
              tip: "SDT is not about giving instructors total freedom. Autonomy means they feel genuine choice within structure — not absence of direction.",
            },
            {
              duration: '10 min',
              title: 'Audit Your Coaching',
              steps: [
                "Review your last three coaching conversations against the triad",
                "Identify one instructor whose motivation feels low — which need is most frustrated for them?",
                "For that instructor, plan one concrete change: a genuine choice, a progress reflection, or a peer connection",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name the instructor, the need you'll address, and the action you'll take this week",
                "Agree to report back on what shifted",
              ],
            },
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'SDT Check-in',
              steps: [
                "What did you try to address the frustrated need you identified last session?",
                "Did you notice any shift in the instructor's engagement?",
              ],
            },
            {
              duration: '10 min',
              title: 'Identity vs Behaviour',
              steps: [
                "TAP Coach explains the levels of change: environment → behaviour → habit → identity",
                "Key point: identity change is self-sustaining; behaviour change requires constant willpower",
                "Listen for examples of limiting identity language: 'I'm not a performer,' 'I'm not really a connection coach'",
                "Discuss how identity language in your instructors shows up — and what it closes down",
              ],
              tip: "The shift from 'I'm trying to connect more' to 'I'm someone who connects' is not cosmetic — it changes how the instructor relates to every class they teach.",
            },
            {
              duration: '10 min',
              title: 'Practice',
              steps: [
                "TAP Coach plays an instructor who uses limiting identity language",
                "You introduce a gentle reframe and ask one identity-anchoring question",
                "Debrief: did the question open up the conversation or close it down?",
                "Practise until the question feels natural, not scripted",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "One identity-anchoring question in every coaching conversation this week",
                "Note any language shifts you hear — bring examples to the next session",
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Identity Work Debrief',
              steps: [
                "Did you hear any limiting identity language this week?",
                "How did the identity-anchoring question land when you used it?",
              ],
            },
            {
              duration: '10 min',
              title: 'The Between-Session Gap',
              steps: [
                "TAP Coach introduces the research: frequency of feedback matters more than format or depth",
                "Map the current rhythm for your team: how often are you actually in contact with each instructor between formal conversations?",
                "Identify the instructors with the longest gap — these are the ones losing momentum",
              ],
              tip: "A 60-second voice message asking 'How did the connection track go today?' counts as feedback. You're not aiming for depth — you're aiming for continuity.",
            },
            {
              duration: '10 min',
              title: 'Design the Nudge Rhythm',
              steps: [
                "Choose one instructor for your first nudge rhythm experiment",
                "Together, design it: one pre-class message and one post-class question per week",
                "Keep it minimal — draft the messages now so you're not creating them on the fly",
                "Sustainability check: is this realistic given your schedule and theirs?",
              ],
            },
            {
              duration: '5 min',
              title: 'Stage 4 Close',
              steps: [
                "Start the nudge rhythm this week — even one message counts",
                "TAP Coach acknowledges your completion of Stage 4 — learn to develop",
                "Agree on timing for Stage 5",
              ],
            },
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
          what: "The shift from coaching instructors to coaching coaches. Use everything you've learned — E-P-E, SDT, SSDL — but now applied to emerging coaches in your club. Your job is to make yourself replaceable.",
          why: "The ceiling of a single coach's impact is the number of instructors they can personally coach. A coach who develops other coaches multiplies their impact exponentially. This is how club cultures shift — not through one great coach, but through many coaches who share a common language and approach.",
          how: [
            "Review your instructor team: who shows natural curiosity about others, who gives unsolicited but constructive feedback?",
            "Identify one candidate for peer coaching development — they don't need to be the best instructor",
            "Have a conversation about coaching: 'Have you ever thought about developing other instructors?'",
            "Begin using the Club Coach framework with them — the same sessions you've been working through",
            "Share your selection and plan with your TAP Coach for feedback",
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '10 min',
              title: 'Stage 4 Reflection',
              steps: [
                "TAP Coach asks: what's the biggest thing that's changed in how you coach since Stage 1?",
                "Which of your instructors has grown most noticeably — what did you do that made the difference?",
                "What does the coaching culture in your club feel like right now?",
              ],
            },
            {
              duration: '15 min',
              title: 'The Multiplier Shift',
              steps: [
                "TAP Coach introduces the Stage 5 shift: from coaching instructors to developing coaches",
                "Discuss the ceiling problem: one coach can only personally reach so many instructors",
                "Review your team together: who shows natural coaching instincts — curiosity about others, unsolicited but constructive feedback, genuine interest in people's development?",
                "Identify one candidate — they don't need to be the best instructor, just the right one",
              ],
              tip: "The best coaching candidate is often not the highest-graded instructor. Look for whoever is most curious about other people's growth.",
            },
            {
              duration: '15 min',
              title: 'Build the Development Plan',
              steps: [
                "For your candidate: what Club Coach stages are most relevant to where they are now?",
                "Map out a lightweight version of the Club Coach journey for them",
                "Plan the first conversation: 'Have you ever thought about developing other instructors?'",
                "Agree how you'll use the same frameworks — E-P-E, Dreyfus, if-then plans — in your coaching of them",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name the candidate and the date of the first conversation",
                "Share your plan with your TAP Coach and invite their honest feedback",
              ],
            },
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
            "Review the 8 ETAs from LMQ Reference",
            "For each instructor, assign an entrustment level (1–5) for each ETA based on your observations",
            "Identify the most significant trust gap on your team — who is most ready to move forward?",
            "Make one entrustment decision and communicate it: 'You're ready to teach this class unsupervised'",
            "Debrief the decision with your TAP Coach — what was your evidence, what was your hesitation?",
          ],
        },
        sessionPlan: {
          totalDuration: '45 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '10 min',
              title: 'Candidate Conversation Debrief',
              steps: [
                "How did the conversation with your coaching candidate go?",
                "What surprised you about their response?",
                "What do you now know about their readiness that you didn't before?",
              ],
            },
            {
              duration: '15 min',
              title: 'Trust Map Review',
              steps: [
                "Open the Trust Map for each instructor on your team",
                "For each instructor, work through the ETAs together — where is your assessment confident, and where are you less certain?",
                "Identify the most significant trust gap on the team: who is most ready to move forward but hasn't been formally entrusted yet?",
              ],
              tip: "Hesitation is information. If you're reluctant to make an entrustment decision, ask yourself: is this about their readiness, or about your comfort with letting go?",
            },
            {
              duration: '15 min',
              title: 'Make the Decision',
              steps: [
                "Choose one entrustment decision you will communicate this week",
                "Name your evidence: what have you observed that supports this?",
                "Plan how you'll communicate it — a clear, affirming statement: 'You're ready to teach this unsupervised'",
                "TAP Coach challenges any hesitation: what's the worst case, and what would you do?",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name the instructor, the ETA, and the date you'll communicate the decision",
                "Agree to debrief the outcome at the next session",
              ],
            },
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
        sessionPlan: {
          totalDuration: '30 min',
          format: '1:1 with TAP Coach',
          blocks: [
            {
              duration: '5 min',
              title: 'Entrustment Debrief',
              steps: [
                "Did you communicate the entrustment decision?",
                "How did the instructor respond — what did their reaction tell you about how they see themselves?",
              ],
            },
            {
              duration: '10 min',
              title: 'The Reflection Loop',
              steps: [
                "TAP Coach walks through Kolb's cycle: Experience → Reflect → Conceptualise → Experiment",
                "Key distinction: Schön's reflection-in-action (adjusting in the moment) vs reflection-on-action (reviewing afterward)",
                "Discuss honestly: do you currently have a reflection practice, or does development happen by accident?",
              ],
              tip: "Coaches who don't reflect stop improving — and their instructors notice. The habit you build here models the exact behaviour you're trying to develop in them.",
            },
            {
              duration: '10 min',
              title: 'Design Your Ritual',
              steps: [
                "Choose a fixed time each week: when, where, how long (10 minutes is enough)",
                "Agree on three standing questions: What went well? What would I do differently? What pattern am I seeing?",
                "Pick one more advanced instructor you'll introduce the same reflection habit to",
                "TAP Coach shares their own reflection practice — what it looks like, what it's unlocked",
              ],
            },
            {
              duration: '5 min',
              title: 'Commit',
              steps: [
                "Name your reflection time slot — protect it in your calendar now",
                "Agree to share your first written reflection with your TAP Coach before Session 5-4",
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
