"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { Pause, Play } from "lucide-react"
import { prefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Hero side visual: a slider of three workflow diagrams, each with its own
 * composition so they don't read as one template:
 *   1. system architecture: a layered stack (frontend / backend / services)
 *   2. AI agent workflow:   an execution trace with tool calls and a loop
 *   3. RAG pipeline:        two left-to-right lanes (index, ask) feeding an answer
 *
 * The track is a native horizontal scroll-snap container, so it also scrolls by
 * swipe / trackpad. It auto-advances every INTERVAL ms for everyone, including
 * under prefers-reduced-motion (there the slide change jumps instead of
 * smooth-scrolling, and the connector "flow" animation is off, see .flow-dash
 * in globals.css). Autoplay stops only for the pause button and while keyboard
 * focus is inside the slider; mouse hover does not stop it.
 *
 * The SVGs are decorative (the hero copy says the same thing); each slide has
 * an sr-only title, and the dots / pause button are real buttons.
 */

const INTERVAL = 4500

/* ---------- shared drawing primitives ---------- */

const C = {
  accent: "#cba982",
  accentDeep: "#b98a5e",
  cream: "#f0e2d0",
  text: "#f5f5f4",
  muted: "#a8a29e",
  faint: "#78716c",
  card: "rgba(20,15,11,0.92)",
  cardWarm: "rgba(185,138,94,0.12)",
  line: "rgba(255,255,255,0.14)",
  base: "rgba(255,255,255,0.12)",
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace"

/** Dot grid, primary-stroke gradient and an arrowhead, namespaced per slide. */
function Defs({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`hv-dots-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)" />
        </pattern>
        <linearGradient id={`hv-primary-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecdcc6" />
          <stop offset="100%" stopColor={C.accentDeep} />
        </linearGradient>
        <marker id={`hv-arrow-${id}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill={C.accent} />
        </marker>
      </defs>
      <rect x="0" y="0" width="440" height="400" fill={`url(#hv-dots-${id})`} />
    </>
  )
}

/** A connector: a faint base line with a moving dash on top. */
function Edge({ d, id, i = 0, arrow = true, dim = false }: { d: string; id: string; i?: number; arrow?: boolean; dim?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={C.base} strokeWidth="1.5" markerEnd={arrow ? `url(#hv-arrow-${id})` : undefined} />
      <path
        d={d}
        fill="none"
        stroke={C.accent}
        strokeWidth="1.75"
        strokeLinecap="round"
        className="flow-dash"
        style={{ animationDelay: `${i * -0.35}s`, opacity: dim ? 0.45 : 0.85 }}
      />
    </g>
  )
}

function Box({ x, y, w, h, primary, id, rx = 12 }: { x: number; y: number; w: number; h: number; primary?: boolean; id: string; rx?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={primary ? C.cardWarm : C.card}
      stroke={primary ? `url(#hv-primary-${id})` : C.line}
      strokeWidth={primary ? 1.5 : 1}
    />
  )
}

/** Small uppercase mono label (layer names, lane names, row tags). */
function Tag({ x, y, children, anchor = "start", color = C.faint }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; color?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={MONO} fontSize="9.5" letterSpacing="1.4" fill={color}>
      {children}
    </text>
  )
}

function StatusLight({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="3.5" fill={C.accent} />
      <circle cx={cx} cy={cy} r="7" fill="none" stroke={C.accent} strokeOpacity="0.35" />
    </>
  )
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 440 400" className="h-auto w-full" aria-hidden="true" focusable="false">
      {children}
    </svg>
  )
}

/* ---------- 1. System architecture: a layered stack ---------- */

function ArchitectureDiagram() {
  const id = "arch"
  const services = [
    { x: 32, label: "AI layer", sub: "LLMs · RAG" },
    { x: 162, label: "Automation", sub: "Agents · workers" },
    { x: 292, label: "Data", sub: "PostgreSQL" },
  ]
  return (
    <Svg>
      <Defs id={id} />

      {/* Layer 1: frontend */}
      <Box id={id} x={20} y={20} w={400} h={84} />
      <Tag x={36} y={40}>FRONTEND</Tag>
      <text x={36} y={66} fontSize="15" fontWeight="600" fill={C.text}>Web & mobile apps</text>
      <text x={36} y={86} fontSize="10.5" fill={C.muted}>React · Next.js · Flutter</text>
      {/* Device chips: browser window + phone */}
      <g fill="none" stroke={C.line}>
        <rect x={318} y={42} width={58} height={40} rx="5" />
        <line x1={318} y1={51} x2={376} y2={51} />
        <rect x={386} y={38} width={22} height={44} rx="5" />
      </g>
      <circle cx={324} cy={46.5} r="1.6" fill={C.faint} />
      <circle cx={329.5} cy={46.5} r="1.6" fill={C.faint} />
      <line x1={393} y1={77} x2={401} y2={77} stroke={C.faint} strokeLinecap="round" />

      {/* Request down, response up */}
      <Edge id={id} i={0} d="M196 106 L196 136" />
      <Edge id={id} i={1} d="M244 136 L244 106" />
      <Tag x={186} y={124} anchor="end">REQUEST</Tag>
      <Tag x={254} y={124}>RESPONSE</Tag>

      {/* Layer 2: backend (primary) */}
      <Box id={id} x={20} y={140} w={400} h={72} primary />
      <Tag x={36} y={160} color={C.accent}>BACKEND</Tag>
      <text x={36} y={184} fontSize="16" fontWeight="600" fill={C.cream}>API layer</text>
      <text x={36} y={201} fontSize="10.5" fill={C.muted}>Python · FastAPI</text>
      <StatusLight cx={402} cy={158} />

      {/* Backend fans down into each service */}
      {services.map((s, i) => (
        <Edge key={s.label} id={id} i={i + 2} d={`M${s.x + 58} 214 L${s.x + 58} 278`} />
      ))}

      {/* Layer 3: services */}
      <rect x={20} y={240} width={400} height={128} rx="12" fill="rgba(255,255,255,0.02)" stroke={C.line} strokeDasharray="3 5" />
      <Tag x={108} y={258}>SERVICES</Tag>
      {services.map((s) => (
        <g key={s.label}>
          <Box id={id} x={s.x} y={280} w={116} h={64} />
          <text x={s.x + 58} y={307} textAnchor="middle" fontSize="13" fontWeight="600" fill={C.text}>{s.label}</text>
          <text x={s.x + 58} y={325} textAnchor="middle" fontSize="10.5" fill={C.muted}>{s.sub}</text>
        </g>
      ))}
      {/* Services talk to each other */}
      <Edge id={id} i={5} d="M150 312 L160 312" arrow={false} dim />
      <Edge id={id} i={6} d="M280 312 L290 312" arrow={false} dim />
      <Tag x={220} y={360} anchor="middle">CONTEXT · RETRIEVAL</Tag>
    </Svg>
  )
}

/* ---------- 2. AI agent workflow: an execution trace with tool calls ---------- */

function AgentDiagram() {
  const id = "agent"
  const tools = ["search", "crm", "apis"]
  return (
    <Svg>
      <Defs id={id} />

      {/* Spine */}
      <Edge id={id} i={0} d="M40 44 L40 362" arrow={false} dim />

      {/* Trigger */}
      <circle cx={40} cy={44} r="6" fill={C.card} stroke={C.accent} strokeWidth="1.5" />
      <Box id={id} x={60} y={22} w={360} h={44} />
      <text x={76} y={41} fontSize="13" fontWeight="600" fill={C.text}>Trigger</text>
      <text x={76} y={57} fontSize="10.5" fill={C.muted}>Email · Webhook · Form</text>
      <Tag x={404} y={48} anchor="end">START</Tag>

      {/* Agent (primary) */}
      <circle cx={40} cy={112} r="7" fill={C.accent} />
      <circle cx={40} cy={112} r="12" fill="none" stroke={C.accent} strokeOpacity="0.35" />
      <Box id={id} x={60} y={82} w={360} h={60} primary />
      <text x={76} y={108} fontSize="16" fontWeight="600" fill={C.cream}>AI agent</text>
      <text x={76} y={127} fontSize="10.5" fill={C.muted}>LLM · plan & decide</text>
      <StatusLight cx={402} cy={98} />

      {/* Tool calls, indented under the agent like a trace */}
      <Tag x={84} y={162}>TOOLS</Tag>
      {tools.map((t, i) => {
        const y = 172 + i * 32
        return (
          <g key={t}>
            <path d={`M40 ${y + 12} H80`} fill="none" stroke={C.line} />
            <circle cx={40} cy={y + 12} r="3" fill={C.card} stroke={C.faint} />
            <rect x={84} y={y} width={220} height={24} rx="6" fill="rgba(255,255,255,0.03)" stroke={C.line} />
            <text x={96} y={y + 16} fontFamily={MONO} fontSize="10.5" fill={C.accent}>call</text>
            <text x={130} y={y + 16} fontFamily={MONO} fontSize="10.5" fill={C.text}>{t}()</text>
            <text x={292} y={y + 16} textAnchor="end" fontFamily={MONO} fontSize="10" fill={C.faint}>→ result</text>
          </g>
        )
      })}

      {/* Loop: results feed back into the agent */}
      <Edge id={id} i={2} d="M306 248 H352 Q364 248 364 236 V146" dim />
      <text
        x={384}
        y={196}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9.5"
        letterSpacing="1.4"
        fill={C.faint}
        transform="rotate(90 384 196)"
      >
        FEEDBACK · MEMORY
      </text>

      {/* Human review: a gate */}
      <rect x={34} y={298} width={12} height={12} rx="2" transform="rotate(45 40 304)" fill={C.card} stroke={C.accent} strokeWidth="1.5" />
      <Box id={id} x={60} y={282} w={360} h={44} />
      <text x={76} y={301} fontSize="13" fontWeight="600" fill={C.text}>Human review</text>
      <text x={76} y={317} fontSize="10.5" fill={C.muted}>Approve · edit</text>
      <Tag x={404} y={308} anchor="end">GATE</Tag>

      {/* Action */}
      <circle cx={40} cy={362} r="7" fill={C.card} stroke={C.accent} strokeWidth="1.5" />
      <path d="M36.5 362 L39 364.5 L43.5 359.5" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Box id={id} x={60} y={340} w={360} h={44} />
      <text x={76} y={359} fontSize="13" fontWeight="600" fill={C.text}>Action</text>
      <text x={76} y={375} fontSize="10.5" fill={C.muted}>Send · update</text>
      <Tag x={404} y={366} anchor="end">DONE</Tag>
    </Svg>
  )
}

/* ---------- 3. RAG pipeline: index lane + ask lane → answer ---------- */

function RagDiagram() {
  const id = "rag"
  return (
    <Svg>
      <Defs id={id} />

      {/* Lane 1: index */}
      <Tag x={20} y={30}>01 · INDEX</Tag>
      <Box id={id} x={20} y={40} w={112} h={68} />
      {/* Document stack icon */}
      <g fill={C.card} stroke={C.faint}>
        <rect x={40} y={52} width={14} height={17} rx="2" />
        <rect x={36} y={55} width={14} height={17} rx="2" />
      </g>
      <text x={34} y={88} fontSize="11.5" fontWeight="600" fill={C.text}>Your documents</text>
      <text x={36} y={101} fontSize="10" fill={C.muted}>PDF · Docs · Web</text>

      <Edge id={id} i={0} d="M134 74 L160 74" />

      <Box id={id} x={164} y={40} w={112} h={68} />
      {/* Chunk icon */}
      <g fill="none" stroke={C.faint}>
        <rect x={180} y={53} width={8} height={8} rx="1.5" />
        <rect x={191} y={53} width={8} height={8} rx="1.5" />
        <rect x={202} y={53} width={8} height={8} rx="1.5" />
      </g>
      <text x={180} y={88} fontSize="12" fontWeight="600" fill={C.text}>Embed & index</text>
      <text x={180} y={101} fontSize="10" fill={C.muted}>Chunking</text>

      <Edge id={id} i={1} d="M278 74 L304 74" />

      {/* Vector DB as a cylinder */}
      <path
        d="M310 50 A54 9 0 0 1 418 50 V98 A54 9 0 0 1 310 98 Z"
        fill={C.card}
        stroke={C.line}
      />
      <ellipse cx={364} cy={50} rx={54} ry={9} fill="rgba(185,138,94,0.10)" stroke={C.line} />
      <text x={364} y={80} textAnchor="middle" fontSize="12" fontWeight="600" fill={C.text}>Vector DB</text>
      <text x={364} y={94} textAnchor="middle" fontSize="10" fill={C.muted}>Embeddings</text>

      {/* Index feeds retrieval */}
      <Edge id={id} i={2} d="M364 110 C364 138 220 130 220 158" dim />

      {/* Lane 2: ask */}
      <Tag x={20} y={150}>02 · ASK</Tag>
      <Box id={id} x={20} y={162} w={112} h={64} />
      <text x={36} y={189} fontSize="12" fontWeight="600" fill={C.text}>Question</text>
      <text x={36} y={205} fontSize="10" fill={C.muted}>From a user</text>

      <Edge id={id} i={3} d="M134 194 L160 194" />

      <Box id={id} x={164} y={162} w={112} h={64} />
      <text x={180} y={189} fontSize="12" fontWeight="600" fill={C.text}>Retriever</text>
      <text x={180} y={205} fontSize="10" fill={C.muted}>Semantic search</text>

      <Edge id={id} i={4} d="M278 194 L304 194" />

      <Box id={id} x={308} y={162} w={112} h={64} primary />
      <text x={324} y={189} fontSize="13" fontWeight="600" fill={C.cream}>LLM</text>
      <text x={324} y={205} fontSize="10" fill={C.muted}>Grounded answer</text>
      <StatusLight cx={404} cy={177} />

      {/* LLM → answer, answer → follow-up question */}
      <Edge id={id} i={5} d="M364 228 L364 262" />
      <Edge id={id} i={6} d="M76 262 L76 230" dim />
      <Tag x={88} y={250}>FOLLOW-UP QUESTIONS</Tag>

      {/* Answer card with a text skeleton and source chips */}
      <Box id={id} x={20} y={266} w={400} h={100} />
      <text x={36} y={290} fontSize="13" fontWeight="600" fill={C.text}>Answer</text>
      <text x={404} y={290} textAnchor="end" fontSize="10" fill={C.muted}>With sources</text>
      <rect x={36} y={304} width={300} height={6} rx="3" fill="rgba(255,255,255,0.10)" />
      <rect x={36} y={318} width={252} height={6} rx="3" fill="rgba(255,255,255,0.10)" />
      {["source 1", "source 2", "source 3"].map((s, i) => (
        <g key={s}>
          <rect x={36 + i * 76} y={336} width={68} height={18} rx="9" fill="rgba(185,138,94,0.10)" stroke="rgba(203,169,130,0.35)" />
          <text x={70 + i * 76} y={348.5} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill={C.accent}>{s}</text>
        </g>
      ))}
    </Svg>
  )
}

/* ---------- slider ---------- */

interface Slide {
  id: string
  /** Shown in the window chrome, like a file name. */
  file: string
  /** Read by screen readers. */
  title: string
  Diagram: () => JSX.Element
}

const SLIDES: Slide[] = [
  {
    id: "arch",
    file: "system-architecture",
    title: "System architecture: web and mobile apps on top of an API layer, which serves AI, automation and data services",
    Diagram: ArchitectureDiagram,
  },
  {
    id: "agent",
    file: "ai-agent-workflow",
    title: "AI agent workflow: a trigger starts an agent that calls tools in a loop, asks for human review, then acts",
    Diagram: AgentDiagram,
  },
  {
    id: "rag",
    file: "rag-pipeline",
    title: "RAG pipeline: documents are embedded into a vector database; a question is matched against it and an LLM writes an answer with sources",
    Diagram: RagDiagram,
  },
]

export default function HeroVisual() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false) // pause button
  const [focusHeld, setFocusHeld] = useState(false) // keyboard focus inside

  const frame = useRef(0)
  const fadeTimer = useRef(0)

  // Stop any running transition (a new one starting, or unmount).
  const cancelTransition = useCallback(() => {
    cancelAnimationFrame(frame.current)
    window.clearTimeout(fadeTimer.current)
    const track = trackRef.current
    if (track) {
      track.style.scrollSnapType = ""
      track.style.opacity = ""
    }
  }, [])

  useEffect(() => cancelTransition, [cancelTransition])

  /**
   * Smooth slide change. Normal motion: an eased horizontal slide driven by
   * rAF (native smooth scrollTo on a snap-mandatory track is uneven across
   * browsers, Safari especially). Reduced motion: a short crossfade, so the
   * change is still soft but nothing travels across the screen.
   */
  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      if (!track) return
      cancelTransition()
      const target = i * track.clientWidth

      if (prefersReducedMotion()) {
        // Inline !important: globals.css zeroes every transition under reduced
        // motion with !important, which would turn the fade back into a jump.
        track.style.setProperty("transition", "opacity 300ms ease", "important")
        track.style.opacity = "0"
        fadeTimer.current = window.setTimeout(() => {
          track.scrollLeft = target
          track.style.opacity = "1"
        }, 300)
        return
      }

      const start = track.scrollLeft
      const distance = target - start
      if (!distance) return
      const duration = 800
      const t0 = performance.now()
      track.style.scrollSnapType = "none" // snapping would fight the animation
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2 // easeInOutCubic
        track.scrollLeft = start + distance * eased
        if (p < 1) frame.current = requestAnimationFrame(step)
        else track.style.scrollSnapType = ""
      }
      frame.current = requestAnimationFrame(step)
    },
    [cancelTransition],
  )

  // Keep the active dot in sync with the scroll position (covers swipes too).
  const onScroll = () => {
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  // One timer per slide: any slide change (autoplay, dot, swipe) restarts it.
  useEffect(() => {
    if (paused || focusHeld) return
    const t = window.setTimeout(() => goTo((active + 1) % SLIDES.length), INTERVAL)
    return () => window.clearTimeout(t)
  }, [active, paused, focusHeld, goTo])

  const autoplay = !paused && !focusHeld

  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(185,138,94,0.22),transparent_65%)] blur-2xl"
      />

      <section
        aria-roledescription="carousel"
        aria-label="Example workflows I build"
        onFocus={(e) => {
          // Only keyboard focus holds the slider; a mouse click on a dot doesn't.
          let keyboard = true
          try {
            keyboard = (e.target as HTMLElement).matches(":focus-visible")
          } catch {}
          if (keyboard) setFocusHeld(true)
        }}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setFocusHeld(false)}
        className="surface relative overflow-hidden p-5 shadow-[0_30px_80px_-40px_rgba(185,138,94,0.55)]"
      >
        {/* Window chrome */}
        <div className="mb-4 flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b98a5e]/70" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-stone-400">{SLIDES[active]?.file}</span>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          aria-live={autoplay ? "off" : "polite"}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              className="w-full flex-shrink-0 snap-center"
            >
              <p className="sr-only">{slide.title}</p>
              <slide.Diagram />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${slide.file.replace(/-/g, " ")}`}
                aria-current={i === active ? "true" : undefined}
                className="flex h-6 items-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-[#cba982]" : "w-1.5 bg-white/25 hover:bg-white/45",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="flex h-6 w-6 items-center justify-center rounded-full text-stone-400 ring-1 ring-white/10 transition-colors hover:text-white"
          >
            {paused ? <Play aria-hidden="true" className="h-3 w-3" /> : <Pause aria-hidden="true" className="h-3 w-3" />}
          </button>
        </div>
      </section>
    </div>
  )
}
