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
 *  period      OPTIONAL. Date range chip.
 *  role        OPTIONAL. Your role chip on the detail page.
 *  stats       OPTIONAL. Up to 3 headline numbers on the detail hero.
 *  featured    OPTIONAL. Renders the card as the large hero card in the grid.
 *  span        OPTIONAL. Tailwind grid span for the card, out of 6 columns.
 *              e.g. "md:col-span-6" (full), "md:col-span-3" (half), "md:col-span-2" (third).
 * ============================================================================
 */

export interface ProjectSection {
  heading: string
  body?: string
  bullets?: string[]
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
  period?: string
  role?: string
  stats?: { label: string; value: string }[]
  featured?: boolean
  span?: string
}

export const projects: Project[] = [
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
    span: "md:col-span-6",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
    span: "md:col-span-3",
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
