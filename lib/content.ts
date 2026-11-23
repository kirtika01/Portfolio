/**
 * ============================================================================
 *  HOME-PAGE CONTENT — experience, skills, services, process, achievements.
 * ============================================================================
 *  Projects live in lib/projectsData.ts. Site-wide links live in lib/site.ts.
 *  Everything here is plain data: edit the text and the page updates.
 *
 *  Rule for this file: nothing goes in that isn't true. Experience entries are
 *  copied word for word from the previous portfolio, except PromptliAI, which
 *  comes from the owner's LinkedIn (role, dates, location) and her own commits
 *  in the promptli-mvp repo (the points).
 * ============================================================================
 */

/* ---------------------------------------------------------------- About -- */

export const ABOUT_PARAGRAPHS = [
  "I'm G. Kirtika, an AI & Backend Engineer passionate about building intelligent software systems that solve practical problems.",
  "My work combines software engineering, artificial intelligence, backend architecture, and modern application development. I enjoy taking ideas from early concepts to functional products, building reliable APIs, integrating AI capabilities, and automating complex workflows.",
  "I have worked across AI/ML research, backend engineering, frontend development, and product development. I focus on writing maintainable code, understanding real business requirements, and delivering practical solutions.",
  "I'm open to collaborating with international startups, founders, agencies, and businesses looking for an engineering partner.",
]

export const ABOUT_HIGHLIGHTS = [
  "AI & Backend Engineering",
  "SaaS and Product Development",
  "AI/ML and LLM Integration",
  "Workflow Automation",
  "API Development and Integration",
]

/* ----------------------------------------------------------- Experience -- */

export interface ExperienceEntry {
  company: string
  title: string
  dates: string
  location: string
  type: string
  /** What the role involved. Copied verbatim from the previous timeline. */
  points: string[]
  /** Only technologies named in the points above. */
  tech: string[]
  current?: boolean
  /** Gold-bordered card with a "Client project" badge. Use for headline client work. */
  highlight?: boolean
  /** Links the card to /projects/<slug>. */
  projectSlug?: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "PromptliAI",
    title: "Software Engineer",
    dates: "December 2025 – November 2026",
    location: "San Francisco, California, United States · Remote",
    type: "Freelance",
    highlight: true,
    projectSlug: "promptliai",
    points: [
      "Built core pieces of PromptliAI, an enterprise AI orchestration and governance platform that sends each prompt to a council of models on AWS Bedrock and grades the answers.",
      "Designed a 40-intent classification taxonomy for prompt routing, validated above 90% accuracy on a 120-case test set, and added model-specific prompt formatting for 9 model families to the model gateway.",
      "Provisioned AWS infrastructure with CDK: ElastiCache Redis for semantic memory and caching, KMS customer-managed keys, hardened S3 artifact storage, and a central CloudWatch observability stack with dashboards and alarms.",
      "Built the agents, agent-runs and integrations APIs on AWS Lambda, and wired real-time workflow recording from the Chrome extension into the app.",
      "Shipped the Cognito sign-up, verification and password-reset flows, with role-based access derived from Cognito groups.",
    ],
    tech: ["TypeScript", "AWS CDK", "AWS Lambda", "Amazon Bedrock", "DynamoDB", "Redis", "Cognito", "React"],
  },
  {
    company: "Aashita Technosoft Pvt Ltd",
    title: "Senior AI Backend Developer",
    dates: "December 2025 – Present",
    location: "Jaipur, Rajasthan, India",
    type: "Full-time",
    current: true,
    points: [
      "Engineered an AI ad-classification engine with Python, FastAPI, and Supabase, automating multilingual NLP category mapping through hierarchical LLM reasoning across large-scale ad datasets.",
    ],
    tech: ["Python", "FastAPI", "Supabase", "LLMs", "NLP"],
  },
  {
    company: "Clone Futura",
    title: "AI Agent Developer",
    dates: "January 2025 – December 2025",
    location: "Mumbai",
    type: "Full-time",
    points: [
      "Designing and deploying intelligent AI agents using LangChain, RAG, vector databases, and APIs.",
      "Building scalable chatbot systems with Firebase integrations and optimizing deployment across Vercel, Render, and Replit.",
      "Work focuses on creating automation workflows and LLM-powered solutions that improve efficiency and scalability.",
    ],
    tech: ["LangChain", "RAG", "Vector databases", "Firebase", "Vercel", "Render", "Replit"],
  },
  {
    company: "IIT Dharwad",
    title: "Research Intern",
    dates: "April 2024 – June 2024",
    location: "Dharwad",
    type: "Internship",
    points: [
      "Developed an advanced gold price prediction model employing Deep Learning and NLP methods; integrated historical market data with sentiment analysis from 500+ news articles, achieving a predictive accuracy rate of 97.12%.",
    ],
    tech: ["Deep Learning", "NLP", "Sentiment analysis"],
  },
  {
    company: "Zivaka LLP",
    title: "Junior Python and AI Developer",
    dates: "February 2024 – June 2024",
    location: "Kolkata",
    type: "Part-time",
    points: [
      "Engineered AI-driven customer support systems, improving response efficiency by 20%, empowering cross-functional teams to streamline client interactions.",
      "Designed and deployed automation workflows for predictive analytics, optimizing decision-making processes in business operations.",
    ],
    tech: ["Python", "AI", "Automation", "Predictive analytics"],
  },
  {
    company: "Ayodhaya Webosoft",
    title: "Junior Frontend Designer",
    dates: "August 2023 – September 2023",
    location: "Bhilai",
    type: "Internship",
    points: [
      "Crafted 15+ graphic layouts for web and mobile products, boosting visual communication efficiency by 30% and enhancing team collaboration on design projects.",
    ],
    tech: ["UI/UX design"],
  },
]

/* --------------------------------------------------------------- Skills -- */

export interface SkillGroup {
  title: string
  skills: string[]
}

/**
 * Primary stack — rendered first and slightly brighter. Keep it short.
 */
export const PRIMARY_STACK = ["Python", "FastAPI", "LLM Integration", "Supabase", "PostgreSQL", "LangChain"]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C", "C++"],
  },
  {
    title: "Backend & API Development",
    skills: ["FastAPI", "Node.js", "Express", "REST APIs", "Pydantic", "Third-party API integrations", "Celery", "APScheduler"],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "LLM Integration",
      "RAG",
      "LangChain",
      "LangGraph",
      "Google ADK",
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "Scikit-learn",
    ],
  },
  {
    title: "Frontend & Application Development",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Flutter", "Dart", "Streamlit", "UI/UX Design"],
  },
  {
    title: "Databases & Infrastructure",
    skills: ["PostgreSQL", "MySQL", "Supabase", "Firebase", "AWS", "Cloudflare", "VPS Management (PM2, systemd)", "Vercel", "Render"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Google Colab", "Anaconda", "pytest", "Figma", "Power BI"],
  },
]

/* ------------------------------------------------------------- Services -- */

export type ServiceIcon = "brain" | "server" | "workflow" | "layers"

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
  capabilities: string[]
  /** Must match an entry in SERVICE_OPTIONS (lib/site.ts) — it preselects the form. */
  formOption: string
}

export const SERVICES: Service[] = [
  {
    icon: "brain",
    title: "AI Product Development",
    description:
      "Turn your ideas into intelligent software products. I help build AI-powered applications, LLM integrations, intelligent features, and production-ready MVPs.",
    capabilities: ["AI-powered applications", "LLM integrations", "AI-enabled SaaS products", "MVP development"],
    formOption: "AI Product Development",
  },
  {
    icon: "server",
    title: "Backend Engineering & API Development",
    description:
      "Build reliable backend systems that power your applications. I develop scalable APIs, backend architectures, database integrations, and secure application services.",
    capabilities: [
      "Python and FastAPI",
      "REST API development",
      "Database integration",
      "Backend architecture",
      "Third-party API integrations",
    ],
    formOption: "Backend & API Development",
  },
  {
    icon: "workflow",
    title: "AI Agents & Workflow Automation",
    description:
      "Automate repetitive business processes and build intelligent workflows that save time and reduce manual work.",
    capabilities: [
      "AI agents",
      "Business workflow automation",
      "LLM-powered automation",
      "Intelligent document processing",
      "API-based integrations",
    ],
    formOption: "AI Agents & Automation",
  },
  {
    icon: "layers",
    title: "SaaS & Full-Stack Development",
    description:
      "Build and improve modern web products, from MVPs to complete applications, with reliable backend systems and intuitive interfaces.",
    capabilities: [
      "SaaS MVP development",
      "Web application development",
      "Frontend/backend integration",
      "Database architecture",
      "Product improvements",
    ],
    formOption: "SaaS / Full-Stack Development",
  },
]

/* ----------------------------------------------------- Why work with me -- */

export const WHY_POINTS = [
  {
    title: "End-to-End Engineering",
    body: "From understanding requirements to building and integrating the actual solution.",
  },
  {
    title: "AI + Backend Expertise",
    body: "Combining AI capabilities with reliable backend engineering.",
  },
  {
    title: "Practical Problem Solving",
    body: "Focusing on useful software rather than unnecessary complexity.",
  },
  {
    title: "Clear Communication",
    body: "Transparent updates, clear technical explanations, and structured collaboration.",
  },
  {
    title: "Scalable Foundations",
    body: "Writing maintainable systems that can evolve as product requirements grow.",
  },
]

/* -------------------------------------------------------------- Process -- */

export const PROCESS_STEPS = [
  { title: "Discovery", body: "Understand your business problem, goals, and requirements." },
  { title: "Planning", body: "Define the technical approach, scope, and milestones." },
  { title: "Development", body: "Build, test, and refine the solution." },
  { title: "Delivery", body: "Deploy or hand over the completed work with relevant documentation." },
]

/* --------------------------------------------------------- Achievements -- */

export type AchievementKind = "certification" | "award" | "conference"

export interface Achievement {
  title: string
  issuer: string
  year: string
  kind: AchievementKind
}

/** Same nine entries as before; only `kind` was added, to group them visually. */
export const ACHIEVEMENTS: Achievement[] = [
  { title: "GECR Avesh '23 HACKATHON-4 Winner", issuer: "GECR", year: "2023", kind: "award" },
  { title: "Winner, Technorollix Hackathon", issuer: "Technorollix", year: "2024", kind: "award" },
  { title: "Winner, Inter-Zone Chess Tournament", issuer: "Inter-Zone Chess", year: "2024", kind: "award" },
  { title: "Google Jams", issuer: "Google Cloud", year: "2023", kind: "certification" },
  { title: "Database Management Systems (DBMS)", issuer: "NPTEL", year: "2024", kind: "certification" },
  { title: "Management Information System (MIS)", issuer: "NPTEL", year: "2024", kind: "certification" },
  { title: "Algorithmic Game Theory (AGT)", issuer: "NPTEL", year: "2024", kind: "certification" },
  { title: "IEEE WIE ILS, Raipur", issuer: "IEEE", year: "2023", kind: "conference" },
  { title: "IEEE ICECCT", issuer: "IEEE", year: "2024", kind: "conference" },
]

export const PUBLICATION = {
  title: "Deep Learning and Natural Language Processing Integrated Gold Price Forecasting",
  authors: "G Kirtika, Rahul Pandya, Sridher Iyer",
  venue: "IATMSI IEEE IIIT Gwalior 3rd International Conference 2025",
  year: "2025",
  abstract: "Predicted gold prices using advanced deep learning and natural language processing techniques.",
  url: "https://ieeexplore.ieee.org/document/10985530",
  relatedProjectSlug: "gold-price-forecasting",
}

/**
 * Workshops — moved here from the old Services section.
 *
 * The three session recordings used to link to Google Drive, but those files
 * returned 404 when checked on 2026-11-23 (removed or no longer shared). Add a
 * `recordingUrl` back to an entry once the file is shared again; the link only
 * renders when the field is set.
 *   1A8re9M89Oi5NTKe1OuEi-94XFpeXYNIJ · 1ADs7119Nggv11O5zJhdb0pLqM8OHB1Vs ·
 *   1VKwigYXF96WIW7O1N_JxgPrMyeyBDCZD
 */
export const TRAINING = {
  summary: "Trained 300+ teachers through structured AI training sessions.",
  sessions: [
    {
      title: "Building AI Agents with No-Code Tools",
      body: "Live, interactive training with Q&A.",
      recordingUrl: undefined as string | undefined,
    },
    {
      title: "AI Tools for Automating Teachers' Daily Workflows",
      body: "Grading, scheduling, content preparation, and more.",
      recordingUrl: undefined as string | undefined,
    },
    {
      title: "Agentic AI vs. Normal AI",
      body: "The difference between traditional AI and agentic AI.",
      recordingUrl: undefined as string | undefined,
    },
  ],
}
