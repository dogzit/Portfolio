import {
  Project,
  SkillCategory,
  Milestone,
  ResumeEntry,
  NavItem,
  ContactLink,
} from "@/types";

// ─── About Me ────────────────────────────────────────────────────────────────
export const BIO = {
  location: "Ulaanbaatar, Mongolia",
  /** Hero statement — one sentence, set large. */
  lead:
    "I build full-stack web products that real people end up using: a clearance portal that retired the paper forms for 109 school staff, a lost-and-found platform a university now runs itself, and a game that pays out XP for real life.",
  /** Two short paragraphs under the lead. Kept short on purpose. */
  intro: [
    "I'm 17 and I write code in Ulaanbaatar. I learned computers at my dad's office after kindergarten, got a PC of my own at seven, and after about five years of Valorant started wondering what was actually happening behind the game. That question is what led me to code.",
    "Since joining Pinecone Academy in 2025 I've shipped the projects below, led three small teams, founded my school's tech club, and interned at one of Mongolia's leading fintech companies.",
  ],
  story:
    "I learned computers at my dad's office after kindergarten, and got a PC of my own at seven. At ten I saved up and bought the next one myself; at fourteen I worked and paid for the one after that. About five years of Valorant later I started asking what was happening behind the game, and that question led me to code. In 2025 I joined Pinecone Academy, led the team on every group project, and since then I've shipped a stack of work, founded my school's tech club, and interned at one of Mongolia's leading fintech companies. Right now I'm building SIDEQUEST, a game that tries to make real life give out XP.",
  tagline: "Code, school, and too much Valorant.",
};

/** The short "what I'm on right now" strip, shown beside the hero portrait. */
export const CURRENTLY: { label: string; value: string; href?: string }[] = [
  { label: "Building", value: "SIDEQUEST — a social RPG for real life" },
  { label: "Leading", value: "3rd School Tech Club — founder and president" },
  { label: "Learning", value: "Real-time systems — Pusher, WebSockets, Web Push" },
];

/** Small fact cards on the contact section. Edit freely — all plain facts. */
export const QUICK_FACTS: { icon: string; label: string; value: string }[] = [
  { icon: "briefcase", label: "Last role", value: "Frontend engineering intern, DEHUB" },
  { icon: "map", label: "Based in", value: "Ulaanbaatar, Mongolia" },
  { icon: "cap", label: "Studying", value: "Pinecone Academy — full-stack, since 2025" },
  { icon: "languages", label: "Languages", value: "Mongolian, English" },
  { icon: "handshake", label: "Open to", value: "Internships, freelance, team projects" },
];

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Activity", href: "#activity" },
  { label: "Contact", href: "#contact" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "sidequest",
    title: "SIDEQUEST",
    tagline: "A game to get you off your phone",
    description:
      "A mobile game where you and your friends complete real-life quests for XP and coins. Gym session, cooking dinner, cleaning your room: post photo proof, and the app checks EXIF data so nobody submits a Google image. There's peer voting on sketchy submissions, live maps for quests, and a pushup counter that does pose detection in the browser with TensorFlow.js. 20 Prisma models deep and still building.",
    focus: "Full-stack ownership, real-time systems, anti-cheat",
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma 7",
      "Neon DB",
      "Pusher",
      "TensorFlow.js",
      "PWA",
    ],
    year: "2026",
    status: "In Progress",
    gradient: "from-fuchsia-600/20 via-purple-600/10 to-transparent",
    accentColor: "#d946ef",
    highlights: [
      {
        icon: "🎮",
        label: "Mechanic",
        value: "Real-life quests for XP, coins and classes",
      },
      {
        icon: "🛡️",
        label: "Anti-cheat",
        value: "EXIF photo checks and friend veto votes",
      },
      {
        icon: "🤖",
        label: "In-browser ML",
        value: "TensorFlow.js pushup counter",
      },
    ],
    metrics: [
      { label: "Prisma models", value: "20", delta: "" },
      { label: "API routes", value: "23", delta: "" },
      { label: "Features shipped", value: "14", delta: "" },
    ],
    bullets: [
      "Real-life quests scored for XP, with EXIF checks and peer voting to catch faked photo proof",
      "In-browser pose detection with TensorFlow.js; 20 Prisma models, 23 API routes",
    ],
    links: {},
  },
  {
    id: "parlagmatic",
    title: "Parlagmatic",
    tagline: "Parliament, explained to people our age",
    description:
      "Built at the Open Parliament Hackathon run by the State Great Hural of Mongolia: a civic app that takes parliamentary activity and makes it legible to Gen-Z readers instead of leaving it in PDFs nobody opens. We placed in the top 10 of 32 teams. Six of us in the room were minors; the average competing age was 23 or older.",
    focus: "Civic tech, open government data, competing above our bracket",
    tags: ["Hackathon", "Civic Tech", "AI", "Open Data"],
    year: "2026",
    status: "Archived",
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    accentColor: "#b45309",
    highlights: [
      {
        icon: "🏛️",
        label: "Host",
        value: "State Great Hural of Mongolia",
      },
      {
        icon: "🏅",
        label: "Result",
        value: "Top 10 of 32 teams",
      },
      {
        icon: "📰",
        label: "Idea",
        value: "Parliamentary records, readable by teenagers",
      },
    ],
    metrics: [
      { label: "Placed", value: "Top 10", delta: "" },
      { label: "Teams", value: "32", delta: "" },
      { label: "Minors competing", value: "6", delta: "" },
    ],
    bullets: [
      "Civic app making parliamentary activity readable for Gen-Z, built in 24 hours",
      "Top 10 of 32 teams at the Open Parliament Hackathon, State Great Hural of Mongolia",
    ],
    links: {},
  },
  {
    id: "surguuli",
    title: "Surguuli",
    tagline: "The paper clearance folder, but a website",
    description:
      "At the end of every semester, each of the school's 109 staff walks a paper folder (тойрох хуудас) around the building collecting signatures from the librarian, the accountant, the doctor, the principal, and a few more. I turned the whole thing into a website: PIN login, three role types, live progress tracking, and Excel import/export for the class lists. It runs entirely on Next.js Server Actions. I never wrote a REST layer and never needed one.",
    focus: "Server Actions architecture, role-based workflows",
    tags: [
      "Next.js 14",
      "TypeScript",
      "Server Actions",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-cyan-600/20 via-teal-600/10 to-transparent",
    accentColor: "#06b6d4",
    highlights: [
      {
        icon: "✍️",
        label: "Problem",
        value: "Replaces the paper folder teachers carry around",
      },
      {
        icon: "🔐",
        label: "Auth",
        value: "PIN login with HMAC sessions, three roles",
      },
      {
        icon: "📊",
        label: "Ops",
        value: "Excel bulk import and live progress tracking",
      },
    ],
    metrics: [
      { label: "Staff served", value: "109", delta: "" },
      { label: "Sign-off roles", value: "7", delta: "" },
      { label: "REST endpoints", value: "0", delta: "" },
    ],
    bullets: [
      "Replaced the paper clearance folder carried between seven sign-off roles for 109 school staff",
      "Built entirely on Next.js Server Actions — no REST layer",
      "PIN login with HMAC sessions, three role types, Excel bulk import",
    ],
    image: "/images/projects/surguuli.jpg",
    links: {},
  },
  {
    id: "lost-found",
    title: "UFE Lost & Found",
    tagline: "Returning things without handing over a phone number",
    description:
      "A commissioned lost-and-found board for the University of Finance & Economics School of Education, replacing a paper logbook at the front office. Students post what they lost or found; every new post is compared against open posts of the other type on category, colour, place, brand, date and text similarity, and both sides get told about likely matches. Claiming an item means answering a verification question only the owner could answer — the finder accepts, and that opens a chat. Phone numbers and emails never appear publicly; sharing them is an explicit, confirmed button.",
    focus: "Matching, privacy engineering, moderation",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon DB",
      "Zod",
      "Client Work",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
    accentColor: "#4f46e5",
    highlights: [
      {
        icon: "🧲",
        label: "Matching",
        value: "Colour, place, brand, date and text similarity",
      },
      {
        icon: "🛡️",
        label: "Privacy by default",
        value: "GPS stripped from photos, student codes masked AB****17",
      },
      {
        icon: "⚖️",
        label: "Moderation",
        value: "Reports, bans, code-change approvals — admins never read chats",
      },
    ],
    metrics: [
      { label: "Posts expire after", value: "60d", delta: "" },
      { label: "Paper logbooks", value: "0", delta: "" },
      { label: "Languages", value: "MN / EN", delta: "" },
    ],
    bullets: [
      "Matches lost and found posts on colour, place, brand, date and text similarity, then notifies both sides",
      "Verifies ownership with a question only the owner can answer before opening a handover chat",
      "Strips GPS from uploads, masks student codes, keeps phone numbers and emails out of the UI by default",
    ],
    image: "/images/projects/lost-found.jpg",
    links: {},
  },
  {
    id: "surguuli-staff",
    title: "Surguuli · Staff",
    tagline: "The half of the school system teachers log into",
    description:
      "The staff side of my school's platform: admin panels, the signature flow, the late-arrival log and its report, and separate dashboards for teachers and the accountant. It's a second app rather than a second section — it ships on its own, behind a PIN gate and signed staff session cookies, while sharing one database with the public site. The Prisma schema lives in this repo as the single source of truth and is copied across unchanged so both clients stay in step.",
    focus: "Two apps on one database, role-separated access",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Shared schema",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-cyan-600/20 via-teal-600/10 to-transparent",
    accentColor: "#0e7490",
    highlights: [
      {
        icon: "⏰",
        label: "Tardiness",
        value: "The late-arrival log and the report built on it",
      },
      {
        icon: "🔗",
        label: "Architecture",
        value: "Separate deploy, one database, one schema source of truth",
      },
      {
        icon: "🔐",
        label: "Access",
        value: "PIN gate and signed staff sessions — not public",
      },
    ],
    bullets: [
      "Staff-side app: admin panels, signature flow, late-arrival log and its report",
      "Separate deploy sharing one database; this repo holds the Prisma schema as the source of truth",
    ],
    links: {},
  },
  {
    id: "naadam",
    title: "Наадам",
    tagline: "A classroom turned into a Naadam",
    description:
      "A live team quiz for a classroom. The teacher runs the lesson — slides, images, video and questions — on the projector while students join from their phones with a six-digit code and get split into teams named after the таван хошуу мал. Standings render as a race of running children, and the podium uses the Naadam titles Түрүү, Аман хүзүү and Айрагдсан. There's a lesson editor, picture answers, a shagai round and traditional-script slides. Every word of the interface is in Mongolian Cyrillic.",
    focus: "Realtime fan-out, teacher tooling, a theme that means something",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Ably",
      "Realtime",
      "PostgreSQL",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent",
    accentColor: "#a16207",
    highlights: [
      {
        icon: "📽️",
        label: "Two screens",
        value: "Projector and phones in sync over Ably",
      },
      {
        icon: "🐎",
        label: "Mongolian through and through",
        value: "Таван хошуу мал teams, Наадам podium titles",
      },
      {
        icon: "✏️",
        label: "For teachers",
        value: "Lesson editor, picture answers, shagai round",
      },
    ],
    bullets: [
      "Live team classroom quiz: projector and phones kept in sync over Ably",
      "Lesson editor, picture answers and a shagai round; interface entirely in Mongolian",
    ],
    image: "/images/projects/naadam.jpg",
    links: { live: "https://naadam-psi.vercel.app" },
  },
  {
    id: "ajilchin-zugii",
    title: "Ажилчин Зөгий",
    tagline: "An NGO site with rules about the truth",
    description:
      "The impact and methodology site for an NGO working on labour rights for working teenagers, in Mongolian by default with English one click away. The constraints are written into the repo and are not negotiable: every figure has to trace to evidence, small cells get suppressed so no individual can be identified, no minors' data, accessibility throughout. Payload CMS runs on Neon Postgres with media in Cloudflare R2, and the impact pipeline reads from a documented spreadsheet contract. The handover, deploy and restore guides are written in Mongolian for the people who will actually run it.",
    focus: "Data ethics as a build constraint, bilingual CMS, handover",
    tags: [
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "Neon DB",
      "Cloudflare R2",
      "i18n",
    ],
    year: "2026",
    status: "In Progress",
    gradient: "from-lime-600/20 via-emerald-600/10 to-transparent",
    accentColor: "#4d7c0f",
    highlights: [
      {
        icon: "🔍",
        label: "Non-negotiables",
        value: "Evidence for every figure, small-cell suppression, no minors' data",
      },
      {
        icon: "🌐",
        label: "Bilingual",
        value: "Mongolian default, English throughout",
      },
      {
        icon: "📦",
        label: "Handover",
        value: "Deploy and tested restore docs, written in Mongolian",
      },
    ],
    image: "/images/projects/ajilchin-zugii.jpg",
    links: {
      github: "https://github.com/dogzit/ajilchinzugii",
      live: "https://ajilchinzugii.vercel.app",
    },
  },
  {
    id: "vantage-club",
    title: "Vantage",
    tagline: "Recruiting for the club I founded",
    description:
      "The site for Vantage, the CS and study-abroad club I started at school. Applicants verify their email with a six-digit code, and the essay field notices text that was pasted in and says so to the student rather than silently failing them. Drafts save in the browser. On the admin side: automatic scoring and tagging, pasted passages highlighted in yellow, filters by interest, class and whether the student has a computer at home, interview scores and notes, second-round emails, CSV export, and a two-step confirmation before anything is deleted. The slide deck also builds to one offline HTML file with the fonts, logo and QR code embedded, for rooms with no internet.",
    focus: "Admissions tooling, honest anti-paste, offline fallback",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Email OTP",
      "Admin tooling",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    accentColor: "#6d28d9",
    highlights: [
      {
        icon: "📋",
        label: "Paste-aware essays",
        value: "Flags pasted text to the student, highlights it for the reviewer",
      },
      {
        icon: "🗂️",
        label: "Reviewer tools",
        value: "Auto-scoring, filters, interview notes, CSV export",
      },
      {
        icon: "📴",
        label: "Works offline",
        value: "Single-file slide deck with fonts, logo and QR embedded",
      },
    ],
    bullets: [
      "Club recruitment site: email-OTP applications, paste-aware essay field, auto-scored reviewer queue",
      "Slide deck also builds to one offline HTML file with fonts, logo and QR embedded",
    ],
    image: "/images/projects/vantage-club.jpg",
    links: { live: "https://mgl3-vantage.vercel.app" },
  },
  {
    id: "smart-canteen",
    title: "Smart Canteen",
    tagline: "Built in 24 hours, still online",
    description:
      "A 24-hour hackathon build: a full canteen system with ordering, a kitchen queue, and an admin panel, with real-time order sync so the kitchen sees orders the second they happen. We built it in one very long day and deployed it before the deadline. It's still online if you want to click around.",
    focus: "Real-time sync under a hard deadline",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
      "Hackathon",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-emerald-600/20 via-green-600/10 to-transparent",
    accentColor: "#10b981",
    highlights: [
      { icon: "⏱️", label: "Constraint", value: "Start to finish in 24 hours" },
      {
        icon: "🏆",
        label: "Event",
        value: "School hackathon, April 2026",
      },
      {
        icon: "🍽️",
        label: "Scope",
        value: "Ordering, kitchen queue, admin panel",
      },
    ],
    metrics: [
      { label: "Build time", value: "24h", delta: "" },
      { label: "Status", value: "Still online", delta: "" },
      { label: "Database", value: "Postgres", delta: "" },
    ],
    image: "/images/projects/smart-canteen.jpg",
    links: {
      github: "https://github.com/dogzit/Smart-Canteen---hackathon-26.04.20",
      live: "https://smart-canteen-hackathon-26-04-20.vercel.app",
    },
  },
  {
    id: "open-mic",
    title: "Open Mic",
    tagline: "One week, one dev, zero paper",
    description:
      "This took every sign-up for my school's open mic and nobody had to find a pen. Sign-ups used to live on paper sheets taped to a wall; I replaced them in a week with a registration site — the form, the backend, the deploy. Small scope, but it's the first thing I shipped fully alone that real people used.",
    focus: "Shipping solo, end to end",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
      "Vercel",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-violet-600/20 via-pink-600/10 to-transparent",
    accentColor: "#8b5cf6",
    highlights: [
      {
        icon: "🎤",
        label: "What it does",
        value: "Event registration, no paper sheets",
      },
      {
        icon: "⚡",
        label: "Timeline",
        value: "One week from idea to live",
      },
      {
        icon: "👥",
        label: "Used by",
        value: "The whole school, actually",
      },
    ],
    image: "/images/projects/open-mic.jpg",
    links: {
      github: "https://github.com/dogzit/openMic",
      live: "https://survaljlagch-openmic.vercel.app/",
    },
  },
  {
    id: "school-hub",
    title: "School Hub",
    tagline: "Canteen orders with AI bolted on",
    description:
      "Around 50 students and 150 orders a day run through this, which still feels surreal to me. It's a school management app for my class: canteen ordering, three permission levels, and GPT-powered suggestions added because it was 2025 and I couldn't help myself.",
    focus: "Permissions, AI integration, actual users",
    tags: ["Next.js", "Prisma", "PostgreSQL", "OpenAI", "TypeScript"],
    year: "2025",
    status: "Live",
    gradient: "from-blue-600/20 via-violet-600/10 to-transparent",
    accentColor: "#3b82f6",
    highlights: [
      {
        icon: "🤖",
        label: "AI bit",
        value: "GPT suggestions for orders, because 2025",
      },
      {
        icon: "⚡",
        label: "Speed",
        value: "Fast enough that nobody complained",
      },
      {
        icon: "🔐",
        label: "Access",
        value: "Three permission levels",
      },
    ],
    metrics: [
      { label: "Active users", value: "50+", delta: "" },
      { label: "Daily orders", value: "150+", delta: "" },
      { label: "Endpoints", value: "47", delta: "" },
    ],
    // 11d.vercel.app no longer resolves; a dead link is worse than none.
    links: {
      github: "https://github.com/dogzit/hWork",
    },
  },
];

/** Hero fact strip. The project count is derived so it can't go stale. */
export const FACTS: { value: string; label: string }[] = [
  { value: String(PROJECTS.length), label: "projects built" },
  { value: "3", label: "teams led" },
  { value: "2023", label: "coding since" },
  { value: "17", label: "years old" },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "◈",
    note: "Where I'm strongest. Most of my projects start here.",
    skills: [
      { name: "Next.js", evidence: "Every project since 2025" },
      { name: "React / TypeScript", evidence: "DEHUB production components" },
      { name: "Tailwind CSS", evidence: "Every interface in this list" },
      { name: "Framer Motion", evidence: "This site" },
    ],
  },
  {
    name: "Backend",
    icon: "⬡",
    note: "Schema first. I usually own the data model on team projects.",
    skills: [
      { name: "Node.js", evidence: "IG Clone's standalone REST API" },
      { name: "Prisma / Neon", evidence: "SideQuest's 20-model schema" },
      { name: "PostgreSQL", evidence: "Behind every deployed app here" },
      { name: "Server Actions", evidence: "Surguuli — zero REST endpoints" },
    ],
  },
  {
    name: "Realtime & AI",
    icon: "◉",
    note: "Picked up mid-project, mostly the hard way.",
    skills: [
      { name: "Pusher", evidence: "Live kitchen queue, Smart Canteen" },
      { name: "Web Push", evidence: "SideQuest quest reminders" },
      { name: "TensorFlow.js", evidence: "In-browser pushup counter" },
      { name: "OpenAI API", evidence: "School Hub order suggestions" },
      { name: "Google GenAI", evidence: "SideQuest daily quest generation" },
    ],
  },
  {
    name: "Tools",
    icon: "⬢",
    note: "Day-to-day. Git discipline came from merge conflicts.",
    skills: [
      { name: "Git / GitHub", evidence: "Two apps, one shared Prisma schema" },
      { name: "Vercel", evidence: "Every deploy on this page" },
      { name: "VS Code / Cursor", evidence: "Daily driver" },
    ],
  },
];

// ─── Resume ──────────────────────────────────────────────────────────────────
/** Shown only in the PDF. Secondary-school dates are left off deliberately —
 *  add them here once confirmed rather than guessing a graduation year. */
export const EDUCATION: ResumeEntry[] = [
  {
    title: "3rd Secondary School",
    period: "",
    bullets: [
      "Founder and president of the school tech club; the person teachers call for any IT problem.",
    ],
  },
  {
    title: "Pinecone Academy — Full-Stack Development",
    period: "2025 · 10 months",
    bullets: [
      "Led the team on every group project across the programme.",
    ],
  },
];

export const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Frontend Engineering Intern",
    org: "One of Mongolia's leading fintech companies",
    period: "April 2026 · 15 days",
    bullets: [
      "Built 12 responsive React and TypeScript UI components for a B2B payment dashboard.",
      "Integrated fintech APIs into production code under engineering review.",
    ],
  },
  {
    title: "Freelance Developer",
    period: "2026 — present",
    bullets: [
      "Deliver web projects for clients in my own time; covers my own costs.",
      "Commissioned by the University of Finance & Economics to build and hand over their lost-and-found platform.",
    ],
  },
];

export const AWARDS: ResumeEntry[] = [
  {
    title: "Open Parliament Hackathon — top 10 of 32 teams",
    org: "State Great Hural of Mongolia",
    period: "2026",
    bullets: [
      "Built and pitched Parlagmatic in 24 hours. Six competitors were minors; the average age was 23 or older.",
    ],
  },
  {
    title: "Founder & President, School Tech Club",
    org: "3rd Secondary School",
    period: "2026",
    bullets: [
      "10+ members. Runs workshops and internal hackathons, mentors younger students in coding and study-abroad applications.",
    ],
  },
  {
    title: "District AI Coding Hackathon",
    org: "Competitor",
    period: "2026",
    bullets: [],
  },
  {
    title: "NASA Space Apps Challenge",
    org: "Registered — results pending",
    period: "2026",
    bullets: [],
  },
];

// ─── Story ───────────────────────────────────────────────────────────────────
/** The long-form "about me", in order. Plain paragraphs — no claims beyond
 *  what actually happened. */
export const STORY: string[] = [
  "My relationship with computers started before I could really read. After kindergarten I'd sit at the machines in my dad's office, learning from the people who worked there. When I was seven or eight my uncle gave me my first PC — a dual-core running Windows 7. I turned it on every day and taught myself how to use it, mostly by playing music on YouTube.",
  "At ten I saved my own money and went with my dad to buy the next one: an i3 3rd-gen with a GTX 750 Ti, for ₮600,000. That's where I found games. Around fourteen I worked and paid for an i5 12th-gen with an RTX 2060 myself. After about five years of Valorant I started asking a different question — what's actually happening behind this? That question led me to code.",
  "In 2025 I joined a coding academy and studied for ten months. On every team project I ended up leading the team. When our teacher told us to create a GitHub account, I found I already had one: I'd opened it two or three years earlier out of curiosity and forgotten about it.",
  "After graduating I did a fifteen-day internship at one of Mongolia's leading fintech companies, where I learned how software works in the real world, beyond the classroom.",
  "At school I became the person teachers call whenever something goes wrong with a computer. I wanted to fix real problems there, so I built and deployed a digital clearance form system and a tardiness tracking system — both are in use now. I also remembered being a younger student who said \u201cI want to be a software engineer\u201d without knowing what that meant, or who wanted to study abroad without knowing where to start. So I founded a Tech Club to mentor students who are where I was.",
  "I used to get nervous presenting even in front of parents. Step by step that changed: a district hackathon, a pitch to my school principal, then the Parliament Hackathon, where my team placed in the top 10 of 32. We built a system in 24 hours and pitched it at the State Great Khural. Most recently I registered for the NASA Space Apps Challenge and I'm waiting on results.",
  "These days I don't rely on my parents for pocket money either — I earn it with freelance projects in my free time, using the skills all of this built.",
];

// ─── Milestones ──────────────────────────────────────────────────────────────
/** The same arc as STORY, compressed to something scannable. */
export const MILESTONES: Milestone[] = [
  {
    period: "Before school",
    title: "My dad's office",
    detail:
      "Afternoons at the office computers, learning from the people who worked there.",
  },
  {
    period: "Age 7–8",
    title: "A PC of my own",
    detail:
      "A dual-core running Windows 7, from my uncle. Self-taught, daily, mostly YouTube music.",
  },
  {
    period: "Age 10",
    title: "The first one I paid for",
    detail:
      "Saved up and bought an i3 3rd-gen with a GTX 750 Ti for ₮600,000. That's where I found games.",
  },
  {
    period: "Age ~14",
    title: "Worked for the next one",
    detail: "An i5 12th-gen with an RTX 2060, paid for myself.",
  },
  {
    period: "~5 years",
    title: "Valorant, then a question",
    detail:
      "What's actually happening behind this? That's the question that led me to code.",
  },
  {
    period: "2025",
    title: "Coding academy",
    detail:
      "Ten months. Led the team on every group project — and discovered I already had a GitHub account, opened years earlier out of curiosity.",
  },
  {
    period: "After graduating",
    title: "First internship",
    detail:
      "Fifteen days at one of Mongolia's leading fintech companies, seeing how software works outside a classroom.",
  },
  {
    period: "At school",
    title: "Two systems, deployed",
    detail:
      "A digital clearance form system and a tardiness tracker, both in use at my school.",
  },
  {
    period: "At school",
    title: "Founded the Tech Club",
    detail:
      "Mentoring younger students who want to be engineers or study abroad but don't know where to start.",
  },
  {
    period: "2026",
    title: "From nervous to the Parliament floor",
    detail:
      "A district hackathon, then a pitch to my school principal, then the Parliament Hackathon — top 10 of 32, a system built in 24 hours, pitched at the State Great Khural.",
  },
  {
    period: "Now",
    title: "Waiting on NASA, paying my own way",
    detail:
      "Registered for the NASA Space Apps Challenge. Freelance projects cover my own costs.",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/dogzit",
    icon: "github",
    username: "@dogzit",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kenomu_/",
    icon: "instagram",
    username: "@zoloo.dev",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582917695124",
    icon: "facebook",
    username: "@Zoloo Dev",
  },
  {
    label: "Email",
    href: "mailto:bolorzoloko@gmail.com",
    icon: "mail",
    username: "bolorzoloko@gmail.com",
  },
  {
    label: "Phone",
    href: "tel:+97688782206",
    icon: "phone",
    username: "+976 88782206",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Zolodev",
    icon: "youtube",
    username: "@Zolodev",
  },
];
