/**
 * ============================================================================
 *  PROJECT DATA — this is the only file you need to edit to add/change a project
 * ============================================================================
 *
 *  To ADD a project: copy any object below, change the fields, done.
 *  The home-page card and the /projects/<slug> detail page both read from here.
 *
 *  FIELD GUIDE
 *  -----------
 *  slug        URL for the detail page: /projects/<slug>. Lowercase, dashes.
 *  title       Project name.
 *  tagline     One line, shown under the title on the detail page.
 *  summary     One line, shown on the card. Keep it short — the card is a teaser.
 *  tags        Small chips on the card (3–5 works best).
 *  features    EVERY feature, as a flat list. Paste your README's feature list here.
 *  techStack   Flat list of technologies. Rendered as chips on the detail page.
 *  sections    Free-form blocks for Overview / Architecture / Setup / Notes etc.
 *              Each takes { heading, body?, bullets? } — use either or both.
 *  githubUrl   OPTIONAL. If present, a "View on GitHub" button shows.
 *              If absent, NO GitHub button is rendered at all.
 *  liveUrl     OPTIONAL. If present, a "Visit Live Project" button shows.
 *  pypiUrl     OPTIONAL. If present, a "View on PyPI" button + "On PyPI" badge show.
 *  install     OPTIONAL. A "Get started" card: requirements plus copyable commands.
 *              Each step is { command, note? }. The only place commands render.
 *  screenshot  OPTIONAL. One image on the detail page. Put the file in
 *              public/projects/ and give its real pixel width/height.
 *              For an animated GIF, also give `still`: a static frame of the
 *              same size, shown instead when the visitor prefers reduced motion.
 *  period     OPTIONAL. Date range chip.
 *  role        OPTIONAL. Your role chip on the detail page.
 *  location    OPTIONAL. Where the work was based, e.g. "San Francisco · Remote".
 *  stats       OPTIONAL. Up to 3 headline numbers on the detail hero.
 *  featured    OPTIONAL. Featured projects are listed first in the grid.
 *  category    Short label on the card, e.g. "Marketplace · SaaS".
 *  status      "Live" | "In Progress" | "Research" | "Completed".
 *  filters     Which home-page filter tabs show it: "AI/ML", "Backend", "SaaS",
 *              "Automation", "Research". A project can be in several.
 *  problem     One or two sentences: what problem it addresses.
 *  solution    One or two sentences: how it solves it.
 *  needsReview OPTIONAL. Facts still to confirm (e.g. ["tech stack"]). Rendered
 *              as a dashed "Needs review" chip in development only, never in prod.
 * ============================================================================
 */

export interface ProjectSection {
  heading: string
  body?: string
  bullets?: string[]
}

export interface InstallStep {
  command: string
  note?: string
}

export interface ProjectInstall {
  requirements?: string[]
  steps: InstallStep[]
}

export interface ProjectScreenshot {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** Static frame (same size) shown instead of an animated `src` under reduced motion. */
  still?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  summary: string
  tags: string[]
  features: string[]
  techStack: string[]
  sections: ProjectSection[]
  githubUrl?: string
  liveUrl?: string
  pypiUrl?: string
  install?: ProjectInstall
  screenshot?: ProjectScreenshot
  period?: string
  role?: string
  location?: string
  stats?: { label: string; value: string }[]
  featured?: boolean
  /** Short display label shown on the card, e.g. "Marketplace · SaaS". */
  category: string
  status: ProjectStatus
  /** Which filter tabs on the home page this project appears under. */
  filters: ProjectFilter[]
  /** One or two sentences: the problem the project addresses. */
  problem: string
  /** One or two sentences: how the project solves it. */
  solution: string
  /** Details still to be confirmed. Shown as a dashed chip in development only. */
  needsReview?: string[]
}

export type ProjectStatus = "Live" | "In Progress" | "Research" | "Completed"
export type ProjectFilter = "AI/ML" | "Backend" | "SaaS" | "Automation" | "Research"
export const PROJECT_FILTERS: ProjectFilter[] = ["AI/ML", "Backend", "SaaS", "Automation", "Research"]

export const projects: Project[] = [
  // ==========================================================================
  //  PROMPTLIAI — freelance client work. No public repo and no public live
  //  URL (promptliai.com did not respond on 2026-11-23), so no buttons.
  //  The client OK'd this page and the product-tour GIF on 2026-11-23.
  //  Facts come from the owner's LinkedIn and her own commits in promptli-mvp.
  // ==========================================================================
  {
    slug: "promptliai",
    title: "PromptliAI — Enterprise AI Orchestration & Governance",
    tagline:
      "Route each prompt to the right models, compare their answers, grade them, and keep an audit trail a compliance team can trust.",
    summary:
      "Client work for a US startup: an AI platform that runs a council of Bedrock models, grades the answers and records a tamper-evident audit trail.",
    tags: ["AWS Bedrock", "TypeScript", "AWS CDK", "LLM routing", "Governance"],
    period: "Dec 2025 – Nov 2026",
    role: "Software Engineer · Freelance",
    location: "San Francisco, California, United States · Remote",
    // Product tour GIF from promptli-mvp; the client approved its use (2026-11-23).
    screenshot: {
      src: "/projects/promptliai-product-tour.gif",
      still: "/projects/promptliai-dashboard.jpg",
      alt: "PromptliAI product tour: starting an AI code-collaboration session, approving an agent's proposed workflow, the data-boundaries settings, the agent audit log, and the governance dashboard with sessions, trust score, cost and compliance.",
      width: 1901,
      height: 918,
      caption: "Product tour: code collaboration, agent approval, data boundaries, audit log and the governance dashboard.",
    },
    featured: true,
    category: "Enterprise AI · Client work",
    status: "Completed",
    filters: ["AI/ML", "Backend", "SaaS"],
    stats: [
      { value: "40", label: "intent classes" },
      { value: "9", label: "model families formatted" },
      { value: "46+", label: "Bedrock models in the gateway" },
    ],
    problem:
      "Enterprises in regulated industries want to use several frontier AI models, but they need to know which model to use, whether an answer can be trusted, what it cost, and proof of who asked what.",
    solution:
      "A serverless AWS platform that classifies each prompt's intent, runs a council of Bedrock models in parallel, grades the answers with an LLM judge, enforces budgets and governance rules, and writes every step to a tamper-evident audit ledger.",
    features: [
      "Intent classification that routes each prompt to suitable models with cost in mind",
      "A council of models run in parallel, with an LLM-as-judge grading every answer",
      "One model gateway in front of 46+ Amazon Bedrock models",
      "Governance checks before a request is allowed to run",
      "A tamper-evident, hash-chained audit ledger with regular integrity checks",
      "Per-user budgets and token-level cost tracking",
      "Retrieval-augmented generation over ingested company documents",
      "Governed agents that replay a recorded workflow with scoped credentials",
      "A Chrome extension that records workflows and suggests agents to build from them",
      "Cognito sign-in with role-based access control",
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "AWS CDK",
      "AWS Lambda",
      "API Gateway",
      "Amazon Bedrock",
      "Step Functions",
      "DynamoDB",
      "ElastiCache Redis",
      "S3",
      "KMS",
      "CloudWatch",
      "Cognito",
      "React",
      "Vite",
      "Tailwind CSS",
      "Chrome Extension (MV3)",
      "GitLab CI/CD",
    ],
    sections: [
      {
        heading: "Overview",
        body: "PromptliAI is an enterprise AI orchestration and governance platform built for a San Francisco startup. It sits between an organisation and frontier AI models: it works out what a prompt is asking for, sends it to a council of models on Amazon Bedrock, grades the answers, and records everything for compliance. I worked on it remotely as a freelance software engineer for a year, alongside the PromptliAI team.",
      },
      {
        heading: "What I built",
        bullets: [
          "Intent routing: extended the classifier to a 40-intent taxonomy with a 120-case test set, validated above 90% accuracy at under 0.1 ms per classification.",
          "Model gateway: model-specific prompt formatting for 9 model families, a prompt-variant generator, and request-size validation.",
          "Infrastructure as code (AWS CDK): ElastiCache Redis for semantic memory and caching, KMS customer-managed keys, hardened S3 artifact storage, and a central CloudWatch observability stack split into cache, cost, API and grading dashboards with alarms.",
          "Agents: the agents, agent-runs, integrations and agent-audit APIs on Lambda, plus real-time workflow recording from the Chrome extension.",
          "Auth: Cognito sign-up, email verification, resend-code and forgot-password flows, with roles derived from Cognito groups.",
          "Delivery: fixed and hardened the GitLab CI/CD pipeline with SAST and secret detection.",
        ],
      },
      {
        heading: "Architecture / how it works",
        bullets: [
          "A React console and the Chrome extension call a REST API on API Gateway, authorised by Cognito.",
          "A gateway Lambda applies governance and budget checks before any model is called.",
          "Step Functions fan a prompt out to several Bedrock models through the model gateway, and a grader Lambda scores the answers.",
          "Sessions are stored in DynamoDB and streamed to an S3 audit lake and a hash-chained ledger that is checked for tampering.",
        ],
      },
    ],
  },

  // ==========================================================================
  //  LISTURAD — live deployment, no public repo (so: no GitHub button)
  // ==========================================================================
  {
    slug: "listurad",
    title: "Listurad — Classified Ads & Social Marketplace",
    tagline:
      "Post an ad, discover it in a feed, chat with the seller, pay to publish — across web and mobile, on one backend.",
    summary:
      "A production classified-ads marketplace serving a Next.js web app and a Flutter mobile app from one FastAPI backend.",
    tags: ["FastAPI", "Next.js", "Flutter", "Supabase", "OpenAI"],
    period: "2026 – Present",
    role: "Senior AI Backend Developer",
    featured: true,
    category: "Marketplace · SaaS",
    status: "Live",
    filters: ["SaaS", "Backend", "AI/ML"],
    problem:
      "Sellers need a quick way to list an item and reach buyers on web and mobile, while payments, roles and business rules stay consistent across every client.",
    solution:
      "One FastAPI backend on Supabase Postgres serves a Next.js web app, a Flutter app and an admin surface, with AI-drafted listings, automated moderation and translation, realtime chat, and server-authoritative payments.",
    liveUrl: "https://dev.listurad.com",
    features: [
      "AI ad posting — a user describes what they're selling and OpenAI drafts the structured listing: title, category, and description",
      "Automated content moderation, so listings are checked before they go live",
      "Automatic translation, making listings readable across languages",
      "An AI support assistant that answers user questions in-product",
      "Realtime buyer–seller chat over Supabase Realtime",
      "A social discovery feed for browsing listings",
      "Phone-OTP authentication via Firebase, with roles resolved server-side on every request",
      "Razorpay payments for India and PayPal for the rest of the world",
      "A coins wallet for publishing credits",
      "Scheduled ad lifecycle transitions owned by a single leader-gated scheduler",
    ],
    techStack: [
      "FastAPI",
      "Python",
      "Pydantic",
      "APScheduler",
      "Celery",
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "OpenAI",
      "Firebase Auth",
      "Razorpay",
      "PayPal",
      "PM2",
      "systemd",
    ],
    sections: [
      {
        heading: "Overview",
        body: "Listurad is a full-stack marketplace where people list what they want to sell, discover listings in a social feed, message each other in realtime, and pay to publish. Three clients — a Next.js web app, a Flutter mobile app, and an admin surface — are served by one FastAPI backend on a Supabase Postgres database, so business rules live in exactly one place.",
      },
      {
        heading: "Architecture / how it works",
        bullets: [
          "Browser requests go to same-origin Next.js API routes that act as a backend-for-frontend, forwarding to FastAPI with an httpOnly JWT — no token ever touches client JavaScript.",
          "The Flutter app talks to the same FastAPI endpoints directly, sharing every validation and pricing rule with the web client.",
          "The backend is a modular monolith: 14 independently-scoped service routers in one process sharing a common core, giving service boundaries without the operational cost of real microservices.",
          "A leader-gated APScheduler owns every ad lifecycle transition, so only one instance can move an ad between states no matter how many run.",
        ],
      },
      {
        heading: "Engineering details",
        bullets: [
          "Money is server-authoritative: prices are re-derived on the backend and reconciled against the amount the gateway actually captured, so a tampered client cannot change what is charged.",
          "Personally identifiable fields are AES-256-GCM encrypted at rest, with decryption confined to a single helper.",
          "Revenue is stored per-currency instead of being flattened into one number at write time.",
          "Roughly 160 versioned SQL migrations keep the schema reproducible across environments.",
        ],
      },
    ],
  },

  // ==========================================================================
  //  VAANI — published on PyPI. Deliberately NO githubUrl: the portfolio links
  //  to the PyPI page only, never the source repo.
  // ==========================================================================
  {
    slug: "vaani",
    title: "Vaani — Talk to Your Coding Agent",
    tagline:
      "Speak to Claude Code and hear it answer — local speech in and out, in English and Hindi, on macOS and Windows. No API key, nothing leaves your machine.",
    summary:
      "A voice layer for Claude Code: speak your request in English, Hindi or Hinglish and hear the reply as it's written. Published on PyPI as vaani-voice.",
    tags: ["Python", "Speech AI", "Claude Code", "Hindi / Hinglish", "PyPI"],
    period: "2026",
    role: "Creator & maintainer",
    featured: true,
    category: "Developer Tools · Voice AI",
    status: "Live",
    filters: ["AI/ML", "Automation"],
    problem:
      "Working with a coding agent means typing every request and reading every reply. That is slow, and it doesn't suit people who think and speak in Hindi or Hinglish.",
    solution:
      "A local voice layer for Claude Code: on-device speech in and out, replies spoken sentence by sentence about 2 seconds after the question, with no API key and no audio leaving the machine.",
    pypiUrl: "https://pypi.org/project/vaani-voice/",
    stats: [
      { label: "First spoken word after a question", value: "~2.2s" },
      { label: "Automated tests", value: "923" },
      { label: "Languages, mixed freely", value: "EN + HI" },
    ],
    install: {
      requirements: [
        "macOS or Windows",
        "Python 3.11 or newer",
        "Claude Code installed and logged in — Vaani uses your existing subscription, never an API key",
      ],
      steps: [
        { command: "pip install vaani-voice", note: "Install the package from PyPI." },
        {
          command: "vaani stt setup",
          note: "One-time setup. macOS asks for microphone and speech permission; Windows downloads a speech model (~0.5 GB).",
        },
        { command: "vaani voice", note: "Run it from any project folder and start talking to Claude Code." },
        { command: "vaani doctor", note: "Something not working? A one-command self-test of mic, speech and Claude Code." },
      ],
    },
    screenshot: {
      src: "/projects/vaani-pypi.jpg",
      alt: "The vaani-voice 0.1.7 package page on PyPI, showing the pip install command and an example Hinglish conversation",
      width: 1600,
      height: 980,
      caption: "vaani-voice on PyPI",
    },
    features: [
      "Speaks the reply sentence by sentence as the agent writes it — about 2 seconds from the end of your question to the first word, instead of waiting for the whole answer",
      "Talk over a reply to interrupt it: speech stops and Vaani listens, using Apple's echo canceller so no headphones are needed on a Mac",
      "Hinglish is understood as spoken and replies come back in Hinglish; any Devanagari is routed to a Hindi voice automatically",
      "Voice commands work in both languages — \"list targets\" / \"targets batao\", \"switch to listurad\" / \"listurad pe jao\", \"stop listening\" / \"band karo\"",
      "Says what it is doing while it works — \"Ek second…\", \"Main files dekh raha hoon\" — then a short spoken summary of what changed, so a long task never sounds like a hang",
      "Hands-free mode: no keypress between turns; it detects when you've finished speaking by learning the room's noise level",
      "Optional wake phrase (\"hey buddy\") so it stays idle until addressed — then keeps listening for the rest of the conversation",
      "Follow-ups share one conversation, so \"test bhi chala do\" knows which bug was just fixed",
      "Named targets: switch the project a turn goes to by voice, mid-session",
      "Permission requests are asked out loud in hands-free mode — answer \"yes\"/\"haan\" or \"no\"/\"nahi\"; it never bypasses Claude Code's approval rules",
      "Two ways to use it: a terminal loop, or a one-button editor panel for VS Code, Cursor, Windsurf and Antigravity with live captions",
      "On-device recognition and system voices — audio is never written to disk and transcripts stay out of the log",
    ],
    techStack: [
      "Python 3.11",
      "Apple Speech framework",
      "AVFoundation",
      "macOS say",
      "faster-whisper",
      "sounddevice",
      "NumPy",
      "Claude Code CLI",
      "PyYAML",
      "Rich",
      "TypeScript (editor extension)",
      "pytest",
      "mypy --strict",
      "Ruff",
      "PyPI",
    ],
    sections: [
      {
        heading: "Overview",
        body: "वाणी (vaani) means speech, voice. Vaani lets you talk to your coding agent instead of typing to it: you say what you want built, in English, Hindi or a mix of both, and you hear what was done. It runs Claude Code on your own machine with your own login — speech recognition and the spoken voice are local, so there is no API key, no speech service and no audio leaving the computer.",
      },
      {
        heading: "What a session sounds like",
        bullets: [
          "You: \"login page pe bug hai — galat password dalne par koi error nahi dikhta, fix karo\"",
          "Vaani: \"Ek second, dekh raha hoon. Main login handler file dekh raha hoon.\"",
          "Claude: \"Bug mil gaya: catch block mein error state set nahi ho raha tha. Maine LoginForm.tsx mein fix kiya aur ek regression test add kiya.\" — 2.2s to the first spoken word",
          "You: \"test bhi chala do\" → \"Chala diya — 12 passed, 0 failed.\" No keypress, no re-explaining the bug.",
        ],
      },
      {
        heading: "Ways to use it",
        bullets: [
          "Push-to-talk in the terminal: run vaani voice, press space to start and stop speaking, esc to cancel, q to quit.",
          "Hands-free: vaani voice --continuous takes turns without a keypress — just speak when it says listening. Say \"stop listening\" to end.",
          "Wake phrase: vaani voice --continuous --wake stays idle until you say \"Hey buddy, …\" with your request in the same sentence.",
          "In your editor: install the Vaani extension from the VS Code Marketplace (works in VS Code, Cursor, Windsurf and Antigravity). It installs vaani-voice for you on first run — one button starts and ends the conversation.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "One Claude Code process per project stays running in streaming mode, so a turn doesn't pay Claude Code's start-up cost — that, plus speaking each sentence as it arrives, took a two-word question from 12.8s end to end down to about 2s to the first word.",
          "On macOS, speech recognition runs inside a small helper app that Vaani builds itself, because macOS only grants speech access to a properly declared app bundle.",
          "Barge-in uses Apple's voice processing — the echo canceller FaceTime uses — to subtract Vaani's own voice, so it can hear you talk over it on laptop speakers.",
          "Measured, not guessed: an Indian English voice reading romanised Hinglish was understood better than a Hindi voice reading Devanagari, so replies are asked for in Hinglish.",
        ],
      },
      {
        heading: "Privacy",
        bullets: [
          "Audio is streamed straight into the recogniser and never written to disk.",
          "Transcripts, prompts and replies are kept out of the log file — only timings and counts are recorded.",
          "Credentials never pass through Vaani; it reuses the Claude Code login already on the machine.",
          "Both defaults are pinned by tests.",
        ],
      },
    ],
  },

  // ==========================================================================
  //  CHECK-IN / CHECK-OUT AGENT — live deployment. Moved here from the old
  //  "Live AI Projects" block. Tech stack, dates and role are not recorded
  //  anywhere yet, so they are left empty and flagged for review.
  // ==========================================================================
  {
    slug: "checkin-agent",
    title: "Check-In / Check-Out Agent",
    tagline: "An automated attendance system that records entries and exits.",
    summary:
      "An automated attendance system that records entries and exits, reduces manual effort, and keeps activity tracking accurate.",
    tags: ["AI Agent", "Automation"],
    category: "Workflow Automation",
    status: "Live",
    filters: ["Automation"],
    problem:
      "Recording entries and exits by hand takes effort and produces inaccurate attendance records.",
    solution:
      "An AI-powered automation agent that records check-ins and check-outs automatically, for accurate, efficient activity tracking.",
    needsReview: ["tech stack", "dates", "role", "feature list"],
    liveUrl: "https://checkin.oll.co",
    features: [
      "Records entries and exits automatically",
      "Reduces the manual effort of attendance tracking",
      "Keeps activity records accurate",
    ],
    techStack: [],
    sections: [
      {
        heading: "Overview",
        body: "An automated attendance system that records entries and exits, reduces manual effort, and ensures accurate, efficient activity tracking. One of the AI-powered automation agents designed and deployed for organisations.",
      },
    ],
  },

  // ==========================================================================
  //  BRIEFCASE — public repo, no hosted deployment (so: GitHub button only)
  // ==========================================================================
  {
    slug: "briefcase",
    title: "Briefcase",
    tagline:
      "Send a take-home assignment to every candidate at once — one personalised email each, with a searchable record of who got what.",
    summary:
      "Sends a take-home assignment to every candidate individually — personalised, never a shared BCC, and fully searchable afterwards.",
    tags: ["Node.js", "Express", "Nodemailer", "AI"],
    category: "Hiring Automation",
    status: "Completed",
    filters: ["Automation", "Backend"],
    problem:
      "Sending a take-home assignment to dozens of candidates by hand is error-prone, a bulk BCC exposes the shortlist, and nobody has a reliable record of who received what.",
    solution:
      "A Node.js and Express tool that reads candidate lists in any format, drafts the email with AI, sends each person a personalised copy with the brief attached, and keeps a searchable send history.",
    githubUrl: "https://github.com/kirtika01/Briefcase",
    features: [
      "Paste addresses separated by commas, spaces or new lines",
      "Paste Name <email> pairs",
      "Paste rows straight out of Excel or Google Sheets",
      "Import a CSV",
      "Duplicates are removed automatically",
      "Names are pulled out of the pasted list automatically",
      "Anything it can't read is shown back to you rather than silently dropped, so a typo becomes something you fix",
      "Describe the assignment in a sentence and let AI draft the subject and body",
      "Edit the AI draft however you like — or skip it and write the email yourself",
      "Each candidate's copy is personalised with their name in the greeting, the deadline and the role",
      "One email per person, sent individually — never a shared BCC, so no candidate can see who else is on the list",
      "The PDF brief is attached to every email",
      "Sending is paced so mail providers don't throttle you",
      "Failures are retried automatically",
      "Anything that still won't deliver is reported with the actual reason — a wrong address, a full mailbox — rather than a silent gap",
      "A live progress panel ticks through the list, marking each address delivered or failed",
      "Stop a run partway through",
      "A per-recipient report when the run finishes",
      "Every email ever sent is searchable by candidate, subject, hiring domain, status and date",
      "Tag each batch with the hiring domain it's for, and the history breaks down by domain — people, sent and failed",
      "Click any domain row to filter everything to it",
      "A second breakdown groups by email provider, so a provider-specific deliverability problem is visible rather than mistaken for candidates ignoring you",
      "Download any view as CSV",
    ],
    techStack: [
      "Node.js 20+",
      "Express 5",
      "Nodemailer",
      "Multer",
      "Anthropic Claude API",
      "OpenAI API",
      "dotenv",
      "Render",
    ],
    sections: [
      {
        heading: "Overview",
        body: "Briefcase takes a list of candidates however you happen to have it, writes the assignment email with you, and sends each person their own copy with the brief attached — then keeps a searchable record of every send. It exists for the moment a week later when someone asks \"did we actually send it to Priya?\"",
      },
      {
        heading: "The problem",
        body: "You're hiring for a Flutter role. You have a PDF brief, forty shortlisted candidates, and a deadline. Doing this by hand means forty copy-pasted emails, forty chances to attach the wrong file or address someone by the wrong name, and no reliable answer a week later when someone asks whether it actually went out. Mailing everyone at once with a bulk BCC solves the tedium and creates a worse problem: every candidate can see who else you're considering.",
      },
      {
        heading: "History and reporting",
        bullets: [
          "Tracking by hiring domain — each batch is tagged with the role it's for, and the history breaks down into people, sent and failed per domain.",
          "Clicking a domain row filters everything to it, so \"how many people did we send the Python assignment to, and did they all get it?\" is one click rather than an archaeology expedition through a Sent folder.",
          "A second breakdown groups by email provider instead. If Gmail shows 4/6 while every other provider is clean, that's a deliverability problem on your side — not four candidates who ignored you.",
        ],
      },
    ],
  },

  // ==========================================================================
  //  RESEARCH ASSISTANT — public repo, no hosted deployment
  // ==========================================================================
  {
    slug: "research-assistant",
    title: "Research Assistant",
    tagline:
      "A multi-agent system that performs automated research and generates comprehensive responses using LangGraph and Gemini models.",
    summary:
      "A LangGraph multi-agent workflow that researches a topic with Tavily and drafts a cited answer with Gemini.",
    tags: ["LangGraph", "Gemini", "Python", "Multi-Agent"],
    category: "AI Agents",
    status: "Completed",
    filters: ["AI/ML", "Automation"],
    problem:
      "Researching a topic means searching many sources, then turning the findings into a clear, cited answer by hand.",
    solution:
      "A LangGraph workflow coordinates a research agent (Tavily search, Gemini analysis) and an answer-drafting agent that writes a cited response, with Pydantic-validated state and async execution.",
    githubUrl: "https://github.com/kirtika01/Research_assistant_project",
    features: [
      "Research agent that gathers information using the Tavily search API",
      "Search results analyzed with the Gemini model, returning structured research findings",
      "Answer drafter agent that takes the research findings and synthesizes them into clear responses",
      "Citations to sources included in every drafted response",
      "Responses can be refined based on feedback",
      "LangGraph workflow orchestration coordinating the research and drafting agents",
      "Workflow state transitions maintained across the graph",
      "The graph is compiled and executed asynchronously",
      "Pydantic models validate the workflow state",
      "WorkflowState tracks the topic, research results, draft results and next state",
      "CLI interface — enter a research topic when prompted",
    ],
    techStack: [
      "Python",
      "LangGraph",
      "Google Gemini 1.5 Flash",
      "Tavily Search API",
      "Pydantic",
      "asyncio",
    ],
    sections: [
      {
        heading: "Overview",
        body: "A multi-agent system that performs automated research and generates comprehensive responses. A research agent searches and analyzes sources, an answer drafter turns those findings into a cited response, and a LangGraph workflow coordinates the two.",
      },
      {
        heading: "Architecture",
        bullets: [
          "Research Agent — uses the Tavily search API to gather information, analyzes the search results using the Gemini model, and returns structured research findings.",
          "Answer Drafter Agent — takes the research findings as input, synthesizes them into clear responses, includes citations to sources, and can refine responses based on feedback.",
          "Workflow Orchestration — uses LangGraph for state management, coordinates the research and drafting agents, maintains workflow state transitions, and compiles and executes the graph asynchronously.",
        ],
      },
      {
        heading: "Implementation details",
        bullets: [
          "State management — Pydantic models validate state; WorkflowState tracks the topic, research results, draft results and next state.",
          "Graph flow — the entry point is the \"research\" node, where the research agent performs search and analysis; results pass to the \"draft\" node, where the answer drafter generates the final response, and the graph completes with the final state.",
          "Async execution — uses LangGraph's ainvoke pattern with a proper async/await flow throughout, with state transitions handled by graph compilation.",
        ],
      },
      {
        heading: "Key files",
        bullets: [
          "main.py — entry point and CLI interface",
          "graph/workflow.py — LangGraph workflow implementation",
          "agents/research_agent.py — research agent implementation",
          "agents/answer_drafter.py — answer drafting agent implementation",
          "utils/tavily_tool.py — search API integration",
        ],
      },
      {
        heading: "Configuration",
        bullets: [
          "GOOGLE_API_KEY — for Gemini model access",
          "TAVILY_API_KEY — for search functionality",
        ],
      },
      {
        heading: "Setup & usage",
        bullets: [
          "Install dependencies: pip install -r requirements.txt",
          "Set up the environment variables in a .env file.",
          "Run the assistant: python main.py",
          "Enter your research topic when prompted.",
          "The system performs research using Tavily, analyzes the findings with Gemini, generates a comprehensive response, and provides source citations.",
        ],
      },
      {
        heading: "Model configuration",
        body: "Uses the Gemini 1.5 Flash model for research analysis, response drafting, and content refinement.",
      },
    ],
  },

  // ==========================================================================
  //  HSN CODE ASSISTANT — public repo, no hosted deployment
  // ==========================================================================
  {
    slug: "hsn-code-assistant",
    title: "HSN Code Assistant",
    tagline:
      "An intelligent assistant built with Google's Agent Development Kit (ADK) for querying and understanding Harmonized System Nomenclature (HSN) codes.",
    summary:
      "A Google ADK agent that answers natural-language questions about HSN codes and their classifications.",
    tags: ["Google ADK", "Gemini", "Python", "Pandas"],
    category: "AI Agents",
    status: "Completed",
    filters: ["AI/ML", "Automation"],
    problem:
      "Finding the right HSN classification code means searching long code tables by exact number or exact wording.",
    solution:
      "A Google ADK agent with a custom lookup tool that answers natural-language questions, matching codes by prefix and descriptions by multi-term search, and returning the top matches with category context.",
    githubUrl: "https://github.com/kirtika01/Google_ADK",
    features: [
      "Find and understand HSN codes through natural language queries",
      "Exact HSN code matching",
      "Prefix matching for category exploration",
      "Hierarchical code understanding",
      "Description search with multi-term matching",
      "Partial word matching",
      "Category-based search",
      "Relevance-based ordering of results",
      "Duplicate removal in results",
      "Results limited to the top 5 matches for readability",
      "Responses include HSN codes with descriptions",
      "Category hierarchies included when relevant",
      "Suggestions for refined searches",
      "Error messages with helpful alternatives",
      "Input validation for empty queries and invalid code formats",
      "Missing data handling",
      "HSN data loaded from CSV once at startup, with column name normalization and type conversion",
      "Session management for user isolation via ADK's InMemorySessionService",
    ],
    techStack: [
      "Python",
      "Google ADK",
      "Gemini 2.0 Flash",
      "google-generativeai",
      "pandas",
      "python-dotenv",
    ],
    sections: [
      {
        heading: "Overview",
        body: "The HSN Code Assistant is designed to help users find and understand HSN codes through natural language queries. It leverages ADK's agent architecture and tool system to provide intelligent responses about HSN codes and their classifications.",
      },
      {
        heading: "ADK components used",
        bullets: [
          "Agent — uses ADK's Agent class for the main interaction logic, configured with a Gemini model for natural language understanding and custom instructions for HSN code interpretation and response formatting.",
          "FunctionTool — implements HSN lookup as an ADK tool, handling both code-based and description-based searches, and returning structured responses with matches and metadata.",
          "Runner & session management — uses ADK's Runner for agent execution and InMemorySessionService for session handling, with proper event processing for responses.",
          "Message handling — uses ADK's content types for structured messaging, with role-based interactions and event-based response processing.",
        ],
      },
      {
        heading: "Data handling strategy",
        bullets: [
          "Data loading — HSN data is loaded from a CSV file once at startup, with column name normalization and type conversion for HSN codes.",
          "Search implementation — numeric queries use direct HSN code prefix matching, text queries use multi-term search across descriptions, and results are limited to the top 5 matches for readability.",
          "Validation logic — input validation for empty queries, type checking for HSN codes, error handling with helpful suggestions, and duplicate prevention in results.",
        ],
      },
      {
        heading: "Implementation steps",
        bullets: [
          "Project setup — pip install -r requirements.txt, then set up .env with GOOGLE_API_KEY.",
          "ADK configuration — configure genai with the API key and create the agent with custom instructions: Agent(name=\"hsn_assistant\", model=\"gemini-2.0-flash\", instruction=..., tools=[hsn_tool]).",
          "Tool implementation — wrap the search in an ADK tool: hsn_tool = FunctionTool(func=lookup_hsn), where lookup_hsn(query: str) returns the HSN code search results.",
          "Session management — set up InMemorySessionService, create a session, and configure Runner(agent=hsn_agent, app_name=\"hsn_assistant\", session_service=session_service).",
        ],
      },
      {
        heading: "Usage examples",
        bullets: [
          "\"What is HSN code 0101?\" — returns that HSN code 0101 refers to live horses, asses, mules, and hinnies.",
          "\"Tell me about HSN codes for live animals\" — returns that HSN code 01 covers all live animals.",
          "\"Find HSN codes for fish\" — returns the relevant fish-related HSN codes and descriptions.",
        ],
      },
      {
        heading: "Environment setup",
        bullets: [
          "Required environment variable: GOOGLE_API_KEY",
          "Dependencies: google-adk, python-dotenv, pandas, google-generativeai",
        ],
      },
      {
        heading: "Security notes & best practices",
        bullets: [
          "The API key is stored in a .env file, kept out of version control.",
          "Session management keeps users isolated from one another.",
          "Input validation guards against injection.",
          "Code organization — modular tool implementation, clear separation of concerns, and consistent error handling.",
          "ADK usage — proper event handling, type-safe message passing, and session state management.",
          "Data management — efficient data loading, memory-conscious search, and result limiting for performance.",
        ],
      },
      {
        heading: "Future improvements",
        bullets: [
          "Enhanced search — fuzzy matching, synonym support, and multi-language support.",
          "Performance — data indexing, cache implementation, and batch processing.",
          "Features — history tracking, export functionality, and custom categorizations.",
        ],
      },
    ],
  },

  // ==========================================================================
  //  YOUTUBE VIDEO ANALYZER
  // ==========================================================================
  {
    slug: "youtube-video-analyzer",
    title: "Multiple YouTube Video Analyzer",
    tagline:
      "A comprehensive analysis tool for comparing and evaluating YouTube videos using data-driven metrics and AI-powered content analysis.",
    summary:
      "Compare 2–10 educational YouTube videos on content quality, engagement, and comment sentiment.",
    tags: ["AI", "Python", "NLP", "Data Analysis"],
    period: "January 2025 – February 2025",
    category: "AI Analytics",
    status: "Completed",
    filters: ["AI/ML"],
    problem:
      "Choosing between several educational videos on the same topic is hard without a consistent way to compare their content, engagement and audience response.",
    solution:
      "A Streamlit app that pulls YouTube Data API metrics, uses Gemini to assess subject, difficulty and key concepts, scores comment sentiment, and recommends one of 2–10 videos.",
    githubUrl: "https://github.com/kirtika01/multiple",
    features: [
      "Multiple video comparison (2–10 videos)",
      "Content analysis: subject and subtopic identification",
      "Content analysis: difficulty level assessment",
      "Content analysis: target audience identification",
      "Content analysis: prerequisites detection",
      "Content analysis: key concepts extraction",
      "Performance metrics: views, likes, and comments statistics",
      "Performance metrics: engagement metrics",
      "Performance metrics: comment sentiment analysis",
      "Domain compatibility checking",
      "Video recommendations based on multiple factors",
    ],
    techStack: [
      "Python 3.11",
      "Streamlit",
      "YouTube Data API",
      "Google Gemini AI",
      "NLP",
      "Sentiment Analysis",
    ],
    sections: [
      {
        heading: "Overview",
        body: "The YouTube Video Analyzer is a powerful tool designed to help educators, content creators, and learners analyze and compare educational videos on YouTube. It provides in-depth insights into video performance, content quality, and audience engagement through various metrics and AI-powered analysis.",
      },
      {
        heading: "Features in detail",
        bullets: [
          "Content Analysis — identifies the main subject and subtopic of each video, assesses difficulty level and target audience, and lists prerequisites and key concepts covered.",
          "Performance Metrics — total views, likes, and comments for each video, comparative analysis across videos, and engagement metrics calculation.",
          "Sentiment Analysis — analyzes video comments for sentiment, provides positive/negative sentiment distribution, and calculates an overall sentiment score.",
          "Domain Compatibility — ensures videos being compared are from related educational domains, preventing misleading comparisons across unrelated subjects.",
          "Video Recommendations — data-driven recommendations considering content quality, engagement metrics, audience response, and sentiment analysis.",
        ],
      },
      {
        heading: "Architecture / project structure",
        bullets: [
          "youtube_analyzer.py — main application file with the Streamlit interface",
          "api_client.py — handles API interactions with YouTube and Google AI",
          "content_analyzer.py — processes video content analysis using AI",
          "video_analyzer.py — core video analysis functionality",
          "requirements.txt — project dependencies",
          ".env — API configuration (needs to be created)",
        ],
      },
      {
        heading: "Prerequisites",
        bullets: ["Python 3.11", "YouTube Data API key", "Google API key (for Gemini AI)"],
      },
      {
        heading: "Setup",
        bullets: [
          "Clone the repository and change into the project directory.",
          "Install required packages: pip install -r requirements.txt",
          "Create a .env file in the project root with YOUTUBE_API_KEY and GOOGLE_API_KEY.",
        ],
      },
      {
        heading: "Usage",
        bullets: [
          "Start the application: streamlit run youtube_analyzer.py",
          "Select the number of videos to analyze (2–10) and enter the YouTube video URLs.",
          "Click \"Analyze Videos\" to start the analysis.",
          "Review the results: content analysis, metrics summary, sentiment analysis, and the recommended video.",
        ],
      },
      {
        heading: "Notes",
        bullets: [
          "The application requires valid API keys to function.",
          "Analysis quality depends on video metadata and comment availability.",
          "For educational videos only; not designed for entertainment content.",
          "Rate limits apply based on your API quota.",
        ],
      },
      {
        heading: "Error handling",
        body: "The application includes comprehensive error handling for invalid YouTube URLs, API failures, domain mismatches, and missing or incorrect API keys.",
      },
    ],
  },

  // ==========================================================================
  //  VIDEO MIRROR DETECTION
  // ==========================================================================
  {
    slug: "video-mirror-detection",
    title: "Video Mirror Detection Using Motion Cues",
    tagline: "Finding reflective surfaces in video with motion cues and modern detectors.",
    summary:
      "Detects and segments mirrors and reflective surfaces in video using YOLO v8 and v11.",
    tags: ["Computer Vision", "Deep Learning", "YOLO", "Object Detection"],
    period: "Present",
    category: "Computer Vision",
    status: "In Progress",
    filters: ["AI/ML", "Research"],
    problem:
      "Mirrors and reflective surfaces confuse vision systems, which mistake reflections for real objects.",
    solution:
      "Detection and segmentation of reflective surfaces in video with YOLO v8 and v11, using motion cues across frames to separate real objects from their reflections.",
    needsReview: ["repository or demo link", "results / outcome"],
    features: [
      "Detection and segmentation of reflective surfaces in video",
      "Built on YOLO v8 and YOLO v11 detection models",
      "Motion cues across frames used to separate real objects from their reflections",
    ],
    techStack: ["Python", "YOLO v8", "YOLO v11", "Computer Vision", "Deep Learning"],
    sections: [
      {
        heading: "Overview",
        body: "Implemented mirror detection using advanced deep learning models, YOLO v8 and v11, to accurately identify and segment reflective surfaces in videos.",
      },
    ],
  },

  // ==========================================================================
  //  ROAD CONNECTIVITY ANALYSIS
  // ==========================================================================
  {
    slug: "road-connectivity-analysis",
    title: "Road Connectivity in Rural, Hilly Terrains",
    tagline: "DEM data analysis for road planning in Durg, Chhattisgarh.",
    summary:
      "Uses Digital Elevation Model data to find where rural hill roads need building or upgrading.",
    tags: ["Machine Learning", "Geospatial Analysis", "Data Science"],
    period: "August 2024 – September 2024",
    category: "Geospatial Research",
    status: "Completed",
    filters: ["Research"],
    problem:
      "Rural, hilly parts of Durg, Chhattisgarh need better road connectivity, and planners need to know where new roads or upgrades would help most.",
    solution:
      "Digital Elevation Model data from Google Earth Engine, clipped to the district and visualised in Python, to identify regions where roads should be built or upgraded.",
    githubUrl: "https://github.com/kirtika01/Hack_a_sol_",
    features: [
      "Download and analyze DEM data for the Durg district using Google Earth Engine",
      "Visualize elevation data using Python and matplotlib",
      "Identify regions where new roads are necessary or existing roads require upgrading",
      "Process and clip DEM data for a defined geographic bounding box",
    ],
    techStack: ["Python", "Google Earth Engine", "geemap", "rasterio", "matplotlib"],
    sections: [
      {
        heading: "Overview",
        body: "This project focuses on analyzing road connectivity challenges in rural, hilly terrains of India, particularly in the Durg district, Chhattisgarh. The goal is to identify regions where new roads need to be constructed or existing roads require upgrades. By using Digital Elevation Model (DEM) data, the project evaluates geographic and terrain conditions, providing insights for optimizing road construction and planning in a cost-effective manner.",
      },
      {
        heading: "How it works",
        body: "The system utilizes Google Earth Engine (GEE) to download and analyze DEM data for the Durg district, combining geographic information with terrain data to assist in better road planning.",
      },
      {
        heading: "Technologies used",
        bullets: [
          "Python — core programming language",
          "Google Earth Engine — platform to access and process satellite data",
          "geemap — Python package to interface with Google Earth Engine",
          "rasterio — library to work with geospatial raster data",
          "matplotlib — visualization library for graphical representation of elevation data",
        ],
      },
    ],
  },

  // ==========================================================================
  //  GOLD PRICE PREDICTION
  // ==========================================================================
  {
    slug: "gold-price-forecasting",
    title: "Gold Price Prediction Using Machine Learning Models & NLP",
    tagline: "Historical price models combined with news sentiment for sharper forecasts.",
    summary:
      "Predicts gold prices by pairing multiple ML models with NLP sentiment from news articles.",
    tags: ["Deep Learning", "NLP", "Time Series", "LSTM", "GRU"],
    period: "April 2024 – June 2024",
    category: "Published Research",
    status: "Research",
    filters: ["AI/ML", "Research"],
    problem:
      "Gold prices react to market news as well as historical trends, so a model trained only on price history misses part of the signal.",
    solution:
      "Several ML and deep learning models (Linear Regression, LSTM, Bi-LSTM, RNN, CNN, GRU) combined with NLP sentiment from news articles. The work is published at an IEEE conference.",
    githubUrl: "https://github.com/kirtika01/Gold_price",
    features: [
      "Historical price analysis using ML models: Linear Regression, Bi-LSTM, LSTM, RNN, CNN, GRU",
      "Sentiment analysis with NLP to capture market sentiment from news articles",
      "Multi-model approach to compare the performance of various models",
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "NLTK",
      "SpaCy",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebooks",
    ],
    sections: [
      {
        heading: "Overview",
        body: "This project predicts gold prices using machine learning models and integrates news sentiment analysis through NLP. By combining historical price data and news sentiment, the model provides more accurate predictions.",
      },
      {
        heading: "Publication",
        body: "Published as 'Deep Learning and Natural Language Processing Integrated Gold Price Forecasting' — IATMSI, IEEE IIIT Gwalior 3rd International Conference, 2025.",
      },
    ],
  },

  // ==========================================================================
  //  RICE DISEASE IDENTIFICATION
  // ==========================================================================
  {
    slug: "rice-disease-identification",
    title: "Rice Disease Identification",
    tagline: "TensorFlow and CNNs that spot rice crop disease from a photo of the plant.",
    summary:
      "A CNN image classifier that diagnoses rice crop diseases so farmers can act early.",
    tags: ["CNN", "Image Classification", "Agriculture Tech", "Deep Learning"],
    period: "June 2023 – October 2023",
    category: "Academic Project",
    status: "Completed",
    filters: ["AI/ML", "Research"],
    problem:
      "Rice crop diseases need to be caught early, and diagnosing them by eye is slow and inconsistent.",
    solution:
      "A TensorFlow CNN that classifies photos of rice plants into disease categories, behind an interface for uploading an image and getting a diagnosis.",
    githubUrl: "https://github.com/kirtika01/rice-disease-identification",
    features: [
      "Deep Learning Model — utilizes Convolutional Neural Networks (CNN) implemented in TensorFlow to analyze images and classify rice plants into different disease categories",
      "Accurate Diagnosis — provides accurate diagnosis of various diseases affecting rice crops, enabling farmers to identify and address issues promptly",
      "User-Friendly Interface — includes an interface for uploading images of rice plants and receiving instant disease diagnosis results",
      "Scalability — designed to handle large volumes of images efficiently, making it suitable for both small-scale and large-scale rice farming operations",
    ],
    techStack: ["Python", "TensorFlow", "CNN", "Deep Learning", "Image Classification"],
    sections: [
      {
        heading: "Overview",
        body: "Rice Disease Identification is a project aimed at leveraging TensorFlow and Convolutional Neural Networks (CNN) algorithm to accurately identify diseases affecting rice crops. This project utilizes cutting-edge deep learning techniques to analyze images of rice plants and classify them into various disease categories, enabling farmers to take timely preventive measures and ensure optimal crop health.",
      },
      {
        heading: "Getting started",
        bullets: [
          "Install dependencies — ensure you have TensorFlow and other required dependencies installed.",
          "Prepare dataset — collect and prepare a dataset of images containing examples of healthy rice plants as well as those affected by various diseases.",
          "Train the model — use the provided CNN algorithm implemented in TensorFlow to train the model on the prepared dataset.",
          "Evaluation — evaluate the trained model's performance using validation data to ensure accuracy and reliability.",
          "Deployment — deploy the trained model into a user-friendly interface, allowing users to upload images for disease diagnosis.",
        ],
      },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
