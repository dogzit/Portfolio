import {
  Project,
  SkillCategory,
  TimelineEvent,
  NavItem,
  ContactLink,
} from "@/types";

// ─── About Me ────────────────────────────────────────────────────────────────
export const BIO = {
  headline: "From Competitive Gaming to High-Performance Development.",
  story:
    "I grew up in front of a screen—mastering tactical maneuvers in CS 1.6 on my dad’s office PC long before I understood the underlying code. By age 6, I had my own rig, sparking a lifelong obsession with the intersection of hardware and software. As I climbed the competitive ranks in Valorant, I realized that the same 'meta-analysis' and rapid problem-solving required to win matches were the keys to building great products. At 13, a single YouTube tutorial transformed me from a consumer to a creator. Today, I bridge the gap between high-level logic and intuitive user experience, leading development teams and contributing to FinTech innovation with a gamer’s grit and an engineer’s precision.",
  tagline: "Strategy → Logic → Scalable Code.",
  roles: ["Full-Stack Developer", "Team Lead", "Product Enthusiast"],
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "sidequest",
    title: "SIDEQUEST",
    tagline: "Real-Life Social RPG",
    description:
      "A mobile-first social RPG where friends form lobbies and complete real-world side quests for XP and coins. Combines RPG mechanics—character classes, leaderboards, cosmetics—with EXIF-verified photo proof, peer veto voting, live location maps, and an in-browser ML pushup counter. Built to reduce screen time by turning everyday actions into a shared game.",
    focus: "Full-Stack Ownership, Real-Time Systems & Anti-Cheat Architecture",
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
        value: "Real-world quests with XP, coins & classes",
      },
      {
        icon: "🛡️",
        label: "Anti-Cheat",
        value: "EXIF photo gate + peer veto voting",
      },
      {
        icon: "🤖",
        label: "In-Browser ML",
        value: "TensorFlow.js pose-detection pushup counter",
      },
    ],
    metrics: [
      { label: "Prisma Models", value: "20", delta: "" },
      { label: "App / API Routes", value: "23+ / 23+", delta: "" },
      { label: "Core Features", value: "14", delta: "" },
    ],
    links: {},
  },
  {
    id: "surguuli",
    title: "Surguuli",
    tagline: "Digital Sign-Off for Teacher Clearance",
    description:
      "A web app digitizing the traditional end-of-semester 'тойрох хуудас'—the paper checklist Mongolian teachers carry between librarians, accountants, doctors, social workers, principals, and others to collect signatures. Role-based access for three user types, PIN-code auth with HMAC sessions, progress tracking, and Excel bulk import/export. Built almost entirely on Next.js Server Actions—no REST.",
    focus: "Server Actions Architecture & Role-Based Workflow Design",
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
        label: "Domain",
        value: "Replaces paper signature workflow end-to-end",
      },
      {
        icon: "🔐",
        label: "Auth",
        value: "Custom PIN + HMAC-signed sessions, 3 role types",
      },
      {
        icon: "📊",
        label: "Ops",
        value: "Bulk Excel import/export & live progress tracking",
      },
    ],
    metrics: [
      { label: "Approver Roles", value: "7", delta: "" },
      { label: "Architecture", value: "Server Actions", delta: "" },
      { label: "Target Users", value: "MN K-12 Schools", delta: "" },
    ],
    links: {},
  },
  {
    id: "smart-canteen",
    title: "Smart Canteen",
    tagline: "Rapid-Build School Ecosystem",
    description:
      "A high-pressure build delivered in 24 hours for a school hackathon. Engineered a complete digital ecosystem for canteen management—bridging the gap between manual ordering and digital efficiency. Developed real-time order synchronization and a streamlined admin interface under strict competition constraints.",
    focus: "Agile Development & Real-Time Data Handling",
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
      { icon: "⏱️", label: "Sprints", value: "Zero to production in 24 hours" },
      {
        icon: "🏆",
        label: "Recognition",
        value: "Hackathon Entry, April 2026",
      },
      {
        icon: "🍽️",
        label: "Efficiency",
        value: "Full-cycle order management system",
      },
    ],
    metrics: [
      { label: "Lead Time", value: "24h", delta: "" },
      { label: "Type Safety", value: "100%", delta: "" },
      { label: "Architecture", value: "Monolith", delta: "" },
    ],
    links: {
      github: "https://github.com/dogzit/Smart-Canteen---hackathon-26.04.20",
      live: "https://smart-canteen-hackathon-26-04-20.vercel.app",
    },
  },
  {
    id: "rentlymn",
    title: "RentlyMN",
    tagline: "Centralized Real Estate Solutions",
    description:
      "Spearheaded the development of a structured rental marketplace to solve the fragmentation of social media listings. As Team Lead, I architected the database schema and implemented advanced filtering systems, providing a seamless search experience for thousands of potential renters.",
    focus: "Marketplace Logic & Leadership",
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
        label: "Market Need",
        value: "Consolidating fragmented data",
      },
      {
        icon: "🔧",
        label: "Feature set",
        value: "Role-based Auth & Dynamic Filters",
      },
      {
        icon: "👥",
        label: "Leadership",
        value: "Full-stack architectural oversight",
      },
    ],
    links: { live: "http://rentlymn.vercel.app/" },
  },
  {
    id: "fitbet",
    title: "FitBet",
    tagline: "Gamified Fitness & Accountability",
    description:
      "Addressing the lack of accountability in personal fitness, I led the development of FitBet. The platform leverages social dynamics and goal-tracking to keep users engaged. Architected a robust session management system and integrated Neon PostgreSQL for high-availability data storage.",
    focus: "Full-Stack Architecture & Social Engineering",
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
        label: "Objective",
        value: "Bridging the fitness accountability gap",
      },
      {
        icon: "🔧",
        label: "Logic",
        value: "Real-time challenge & progress tracking",
      },
      { icon: "👥", label: "Role", value: "Team Leader & Lead Architect" },
    ],
    links: { live: "https://fitbet.vercel.app/" },
  },
  {
    id: "open-mic",
    title: "Open Mic",
    tagline: "Event Logistics Solution",
    description:
      "Modernized school event management by replacing manual sign-up sheets with a high-performance web application. Developed and deployed solo within a single week, managing the entire lifecycle from UI design to backend schema and Vercel deployment.",
    focus: "Rapid Solo Deployment & UX Optimization",
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
        label: "Impact",
        value: "Digitalized 100% of event registration",
      },
      {
        icon: "⚡",
        label: "Velocity",
        value: "From concept to production in <7 days",
      },
      {
        icon: "👥",
        label: "Target",
        value: "Real-world school community usage",
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
    tagline: "AI-Enhanced Institutional Management",
    description:
      "A comprehensive management platform featuring AI-driven ordering flows and multi-tenant access control. Engineered sub-100ms processing for school canteen orders and integrated GPT-based suggestions to optimize student and admin decision-making.",
    focus: "AI Integration & Granular RBAC (Role-Based Access Control)",
    tags: ["Next.js", "Prisma", "PostgreSQL", "OpenAI", "TypeScript"],
    year: "2025",
    status: "Live",
    gradient: "from-blue-600/20 via-violet-600/10 to-transparent",
    accentColor: "#3b82f6",
    highlights: [
      {
        icon: "🤖",
        label: "Intelligence",
        value: "GPT-powered smart logistics",
      },
      {
        icon: "⚡",
        label: "Efficiency",
        value: "Sub-100ms real-time processing",
      },
      {
        icon: "🔐",
        label: "Security",
        value: "3-tier permission architecture",
      },
    ],
    metrics: [
      { label: "Active Users", value: "50+", delta: "+40%" },
      { label: "Throughput", value: "150+ daily orders", delta: "" },
      { label: "Endpoints", value: "47 RESTful", delta: "" },
    ],
    links: {
      github: "https://github.com/dogzit/hWork",
      live: "https://11d.vercel.app",
    },
  },
  {
    id: "ig-clone",
    title: "IG Clone",
    tagline: "Decoupled Systems Exploration",
    description:
      "A deep dive into decoupled software architecture. Developed a standalone Node.js REST API and a separate TypeScript frontend to master cross-origin communication, JWT-based authentication, and the complexities of managing independent repositories.",
    focus: "System Separation & REST API Design",
    tags: ["TypeScript", "Node.js", "JavaScript", "REST API", "Auth"],
    year: "2025",
    status: "In Progress",
    gradient: "from-rose-600/20 via-fuchsia-600/10 to-transparent",
    accentColor: "#f43f5e",
    highlights: [
      {
        icon: "🔀",
        label: "Architecture",
        value: "Decoupled Frontend/Backend",
      },
      {
        icon: "🔐",
        label: "Security",
        value: "JWT & Stateless Session Management",
      },
      {
        icon: "📡",
        label: "Interoperability",
        value: "20+ structured REST endpoints",
      },
    ],
    links: {
      github: "https://github.com/dogzit/IG-frontend",
      live: "https://zolooproject.vercel.app/login",
    },
  },
  {
    id: "pinetour",
    title: "Pinetour 2025",
    tagline: "First Steps into Scalable UI",
    description:
      "My inaugural project at Pinecone Academy. Built a travel discovery portal focused on clean UI and semantic structure. This project marked my transition from tutorial-based learning to engineering production-ready interfaces.",
    focus: "Semantic HTML & Responsive Design",
    tags: ["HTML", "CSS", "Vercel"],
    year: "2025",
    status: "Live",
    gradient: "from-teal-600/20 via-cyan-600/10 to-transparent",
    accentColor: "#14b8a6",
    highlights: [
      { icon: "🌲", label: "Milestone", value: "First Pinecone Academy build" },
      { icon: "✈️", label: "Domain", value: "Travel & Hospitality UI" },
      { icon: "⚡", label: "Stack", value: "Pure CSS Layout Mastery" },
    ],
    links: {
      github: "https://github.com/dogzit/Pinetour-2025",
      live: "https://pinetour-2025.vercel.app",
    },
  },
  {
    id: "erhes-tenger",
    title: "Erhes Tenger",
    tagline: "Design Systems & Collaboration",
    description:
      "Spearheaded the frontend engineering for a multi-contributor team project. Established a comprehensive design system with over 50 reusable components, ensuring visual consistency and code modularity across the entire platform.",
    focus: "Design System Architecture & Team Workflows",
    tags: ["HTML", "CSS", "Team Lead", "Design Systems"],
    year: "2025",
    status: "Live",
    gradient: "from-orange-600/20 via-amber-600/10 to-transparent",
    accentColor: "#f59e0b",
    highlights: [
      {
        icon: "🎨",
        label: "Scalability",
        value: "50+ custom reusable components",
      },
      { icon: "👥", label: "Ops", value: "Led 4-developer Git workflow" },
      { icon: "🏆", label: "Design", value: "End-to-end brand identity build" },
    ],
    links: {
      github: "https://github.com/dogzit/ErhestengerWeb",
      live: "https://erhestenger-web.vercel.app",
    },
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend Engineering",
    icon: "◈",
    skills: [
      { name: "Next.js", level: 92, color: "#f0f0f8" },
      { name: "React / TS", level: 90, color: "#61dafb" },
      { name: "Tailwind CSS", level: 94, color: "#06b6d4" },
      { name: "Framer Motion", level: 80, color: "#a78bfa" },
    ],
  },
  {
    name: "Backend & Server Actions",
    icon: "⬡",
    skills: [
      { name: "Node.js", level: 85, color: "#6dbf67" },
      { name: "Prisma / Neon", level: 88, color: "#5a67d8" },
      { name: "PostgreSQL", level: 82, color: "#336791" },
      { name: "Server Actions", level: 86, color: "#94a3b8" },
    ],
  },
  {
    name: "Realtime & AI",
    icon: "◉",
    skills: [
      { name: "Pusher", level: 78, color: "#7c3aed" },
      { name: "Web Push", level: 74, color: "#f97316" },
      { name: "TensorFlow.js", level: 70, color: "#ff6f00" },
      { name: "Google GenAI", level: 76, color: "#34a853" },
    ],
  },
  {
    name: "Tools & Ecosystem",
    icon: "⬢",
    skills: [
      { name: "Git / GitHub", level: 90, color: "#f0f0f8" },
      { name: "Figma", level: 82, color: "#a259ff" },
      { name: "Vercel", level: 88, color: "#f0f0f8" },
      { name: "VS Code / Cursor", level: 95, color: "#007acc" },
    ],
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineEvent[] = [
  {
    period: "Early Years",
    title: "Digital Genesis",
    subtitle: "Hardware & Intuition",
    description:
      "My journey didn't start with code, but with hardware and logic. Navigating complex game environments at age 6 built a foundation for spatial awareness and pattern recognition that I now apply to complex UI/UX structures.",
    tags: ["Early Adopter", "First PC at 6", "Logic Building"],
    side: "left",
  },
  {
    period: "2020 – 2025",
    title: "The Competitive Era",
    subtitle: "Strategy Under Pressure",
    description:
      "Spent half a decade mastering Valorant, reaching Diamond rank. This period was my unofficial training in high-stakes communication, split-second decision making, and team synchronization—traits that define my current leadership style.",
    tags: ["Valorant", "Diamond Rank", "Peak Performance", "Team Dynamics"],
    side: "right",
  },
  {
    period: "2023",
    title: "The Catalyst",
    subtitle: "First Script Shipped",
    description:
      "While gaming, one YouTube tutorial unlocked a new level of curiosity. I built a simple burger game by dissecting the code—it was the moment I transitioned from just playing games to understanding how to build the engines behind them.",
    tags: ["First Tutorial", "13 Years Old", "Creative Spark"],
    side: "left",
  },
  {
    period: "June 2025",
    title: "Academy Induction",
    subtitle: "Pinecone — Full-Stack Activation",
    description:
      "Traded competitive lobbies for a structured engineering curriculum. Immersed myself in professional workflows, mastering the T3 stack and learning to ship production-ready applications under the guidance of senior mentors.",
    tags: ["Pinecone Academy", "Full-Stack Transition", "Mentorship"],
    side: "right",
  },
  {
    period: "April 2026",
    title: "Professional Integration",
    subtitle: "FinTech & Rapid Innovation",
    description:
      "Immersed myself in a professional FinTech environment, refining my frontend skills with production-grade components. Simultaneously proved my ability to deliver end-to-end solutions in 24 hours during the Smart Canteen build.",
    tags: [
      "FinTech",
      "Professional Internship",
      "Production Grade",
      "Hackathon",
    ],
    side: "right",
  },
  {
    period: "May 2026",
    title: "Independent Execution",
    subtitle: "Open Mic Launch",
    description:
      "Designed and deployed a full-scale registration portal for my school's live event. Proved my ability to manage the complete SDLC solo—from initial UI/UX blueprints to final production deployment.",
    tags: ["Solo Launch", "Next.js", "Real-World Impact"],
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
