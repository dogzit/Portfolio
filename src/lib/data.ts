import {
  Project,
  SkillCategory,
  TimelineEvent,
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
    "I'm 17 and I write code in Ulaanbaatar. I got my first computer at six — my dad's old office PC, mostly used for CS 1.6. At 13 I followed a YouTube tutorial, built a tiny burger game, and got more interested in making things than playing them.",
    "Since joining Pinecone Academy in 2025 I've built around a dozen projects, led three small teams, founded my school's tech club, and interned as a frontend developer at DEHUB, a Mongolian payments company.",
  ],
  story:
    "I got my first computer at six, my dad's old office PC, and used it mostly for CS 1.6. At 13 I followed a YouTube tutorial, built a tiny burger game, and got hooked on making things instead of just playing them. In 2025 I joined Pinecone Academy, and since then I've shipped about a dozen projects, led a few small teams, founded my school's tech club, and interned at DEHUB. Right now I'm building SIDEQUEST, a game that tries to make real life give out XP. Still playing too much Valorant, but at least now I can explain what I do all day.",
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
  { label: "Stack", href: "#stack" },
  { label: "Activity", href: "#activity" },
  { label: "Journey", href: "#journey" },
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
    links: {},
  },
  {
    id: "lost-found",
    title: "Lost & Found",
    tagline: "A real client, a real handover",
    description:
      "A commissioned project for the University of Finance & Economics. Lost property was tracked in a paper logbook at the front office, which meant a student had to walk over and ask whether anything had turned up. I built a platform where items get posted, searched and claimed online, and handed it over to the university to run. My first build for a client outside my own school.",
    focus: "Client work, search and claim flows, handover",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Client Work"],
    year: "2026",
    status: "Live",
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
    accentColor: "#4f46e5",
    highlights: [
      {
        icon: "🏫",
        label: "Client",
        value: "University of Finance & Economics",
      },
      {
        icon: "📒",
        label: "Replaced",
        value: "The front-office paper logbook",
      },
      {
        icon: "🔎",
        label: "Flow",
        value: "Post an item, search it, claim it",
      },
    ],
    metrics: [
      { label: "Campus size", value: "1,000+", delta: "" },
      { label: "Paper logs", value: "0", delta: "" },
      { label: "Commissioned", value: "Yes", delta: "" },
    ],
    links: {},
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
    links: {
      github: "https://github.com/dogzit/Smart-Canteen---hackathon-26.04.20",
      live: "https://smart-canteen-hackathon-26-04-20.vercel.app",
    },
  },
  {
    id: "rentlymn",
    title: "RentlyMN",
    tagline: "Rental listings without the Facebook groups",
    description:
      "Rental listings in Mongolia mostly live in Facebook groups, which is a rough way to find an apartment. I led a small team building a proper marketplace with one database, filters that actually work, and separate accounts for landlords and renters. My job was mostly the schema and making sure four people didn't build the same feature four different ways.",
    focus: "Marketplace logic, leading a small team",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon DB",
      "Auth.js",
      "Team Lead",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-sky-600/20 via-blue-600/10 to-transparent",
    accentColor: "#0ea5e9",
    highlights: [
      {
        icon: "🧩",
        label: "Problem",
        value: "Listings scattered across social media",
      },
      {
        icon: "🔧",
        label: "Features",
        value: "Real filters, role-based accounts",
      },
      {
        icon: "👥",
        label: "My role",
        value: "Led the team, owned the schema",
      },
    ],
    links: { live: "http://rentlymn.vercel.app/" },
  },
  {
    id: "fitbet",
    title: "FitBet",
    tagline: "Fitness goals, with something on the line",
    description:
      "Fitness apps lose to the couch because quitting costs nothing. FitBet adds a price: you put something on the line, your friends can see whether you hit your goals, and the app tracks challenges and progress. I led the build and handled session management and the Neon Postgres setup.",
    focus: "Session management and the challenge system",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon DB",
      "Auth.js",
      "Team Lead",
    ],
    year: "2026",
    status: "Live",
    gradient: "from-lime-600/20 via-green-600/10 to-transparent",
    accentColor: "#84cc16",
    highlights: [
      {
        icon: "🎯",
        label: "The bet",
        value: "Stake something on your fitness goals",
      },
      {
        icon: "🔧",
        label: "System",
        value: "Challenges, sessions, progress tracking",
      },
      { icon: "👥", label: "My role", value: "Team lead, architecture" },
    ],
    links: { live: "https://fitbet.vercel.app/" },
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
    links: {
      github: "https://github.com/dogzit/hWork",
      live: "https://11d.vercel.app",
    },
  },
  {
    id: "erhes-tenger",
    title: "Erhes Tenger",
    tagline: "One design system, four developers",
    description:
      "A group project where I owned the frontend and ended up writing the design system: 50-plus reusable components so four developers could build pages that didn't all look different. Learned Git discipline mostly through merge conflicts.",
    focus: "Design systems, team Git workflow",
    tags: ["HTML", "CSS", "Team Lead", "Design Systems"],
    year: "2025",
    status: "Live",
    gradient: "from-orange-600/20 via-amber-600/10 to-transparent",
    accentColor: "#f59e0b",
    highlights: [
      {
        icon: "🎨",
        label: "Design system",
        value: "50+ reusable components",
      },
      { icon: "👥", label: "Team", value: "4 developers on one Git workflow" },
      { icon: "🏆", label: "Branding", value: "Built the identity end to end" },
    ],
    links: {
      github: "https://github.com/dogzit/ErhestengerWeb",
      live: "https://erhestenger-web.vercel.app",
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
      { name: "Tailwind CSS", evidence: "A 50-component design system" },
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
      { name: "Git / GitHub", evidence: "Four devs, one branch strategy" },
      { name: "Figma", evidence: "Erhes Tenger brand and UI" },
      { name: "Vercel", evidence: "Every deploy on this page" },
      { name: "VS Code / Cursor", evidence: "Daily driver" },
    ],
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineEvent[] = [
  {
    period: "2015-ish",
    title: "First computer",
    subtitle: "It was my dad's office PC",
    description:
      "No code yet, just CS 1.6 and a kid who learned to reinstall Windows out of necessity. Looking back, breaking and fixing that thing taught me more about computers than anything before Pinecone did.",
    tags: ["CS 1.6", "First PC", "Full of viruses"],
    side: "left",
  },
  {
    period: "2020 – 2025",
    title: "Competitive Valorant",
    subtitle: "Diamond, mostly",
    description:
      "Five years of ranked. It sounds unrelated to code, but it's where I learned to stay calm when everything is going wrong, communicate fast, and take criticism after a loss. Turns out that's also useful in code reviews.",
    tags: ["Valorant", "Diamond", "Way too many hours"],
    side: "right",
  },
  {
    period: "2023",
    title: "First lines of code",
    subtitle: "Age 13, one YouTube tutorial",
    description:
      "Followed a tutorial for a burger-flipping game, then spent weeks modifying it instead of starting something of my own. That's when I stopped asking what game to play next and started asking how this stuff works.",
    tags: ["YouTube tutorial", "Burger game", "Hooked"],
    side: "left",
  },
  {
    period: "June 2025",
    title: "Joined Pinecone Academy",
    subtitle: "First real curriculum",
    description:
      "Started the full-stack program and met actual senior developers for the first time. Learned the T3 stack, proper Git workflow, and that shipping something small beats planning something big.",
    tags: ["Pinecone Academy", "T3 stack", "First mentors"],
    side: "right",
  },
  {
    period: "April 2026",
    title: "Internship at DEHUB",
    subtitle: "Plus a 24-hour hackathon",
    description:
      "Joined DEHUB, a Mongolian payments company, as a frontend engineering intern and shipped React and TypeScript components into a B2B payment dashboard. First time my code lived in a codebase I didn't own, next to other people's deadlines and legacy decisions. Same month, built Smart Canteen in 24 hours at a school hackathon.",
    tags: ["DEHUB", "Production code", "Fintech APIs"],
    side: "right",
  },
  {
    period: "May 2026",
    title: "Shipped Open Mic solo",
    subtitle: "First all-mine launch",
    description:
      "Designed, built, and deployed a registration site for my school's open mic event in about a week. Small project, but every decision was mine and the whole school used it. Best feeling so far.",
    tags: ["Solo project", "One week", "Real users"],
    side: "left",
  },
  {
    period: "2026",
    title: "Open Parliament Hackathon",
    subtitle: "Top 10 of 32 teams",
    description:
      "Competed at a hackathon run by the State Great Hural of Mongolia and built Parlagmatic, a civic app that makes parliamentary activity readable for people our age. We finished in the top 10 of 32 teams. Most of the room was 23 or older; six of us were minors. It was the first time I'd been judged against working adults instead of classmates.",
    tags: ["State Great Hural", "Top 10/32", "Civic tech"],
    side: "right",
  },
  {
    period: "2026",
    title: "Founded the Tech Club",
    subtitle: "3rd Secondary School, 10+ members",
    description:
      "Started my school's first tech club and now run it as president: workshops, internal hackathons, and mentoring members — including younger students — through AI-assisted coding and their own study-abroad applications. Teaching something is how I found out which parts I only half understood.",
    tags: ["Founder", "President", "Mentoring"],
    side: "left",
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
