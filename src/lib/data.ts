import {
  Project,
  SkillCategory,
  TimelineEvent,
  NavItem,
  ContactLink,
} from "@/types";

// ─── About Me ────────────────────────────────────────────────────────────────
export const BIO = {
  headline: "Gamer turned developer. Video editor on the side.",
  story:
    "I grew up in front of a screen—mastering CS 1.6 on my dad’s office PC before I could even read properly. By age 6, I had my own rig. As the tactical shooter genre evolved, I spent years grinding the competitive ranks of Valorant from its launch.But beyond the screen, I’ve always been obsessed with the 'how' and 'why' of technology. I’m a deep diver into tech content and product ecosystems, from hardware specs to the latest in consumer electronics. At 13, that curiosity led me to a YouTube coding tutorial, and the switch flipped. I realized I didn't just want to use great products—I wanted to build them. Today, I’m leading dev teams and interning at a FinTech startup, applying a gamer’s grit and a product enthusiast’s eye to Fullstack Development. Same focus, different game.",
  tagline: "Computer → Games → Code.",
  roles: ["Full-Stack Developer", "Ex-Valorant Player", "Video Editor"],
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
  // ── 1. Smart Canteen — April 2026 · FEATURED ────────────────────────────
  {
    id: "smart-canteen",
    title: "Smart Canteen",
    tagline: "Hackathon — 24h School Canteen System",
    description:
      "24 hours. Zero budget. Real judges. I built a fully functional school canteen management system from scratch at a school hackathon — digital menu browsing, live order tracking, and an admin dashboard. Every line of code written under competition pressure, shipped end-to-end in pure TypeScript.",
    focus: "Rapid Execution & Full-Stack Under Pressure",
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
      {
        icon: "⏱️",
        label: "Time Limit",
        value: "Zero to production in 24 hours",
      },
      {
        icon: "🏆",
        label: "Competition",
        value: "School hackathon, April 2026",
      },
      {
        icon: "🍽️",
        label: "System",
        value: "Full canteen — menu, orders, admin",
      },
    ],
    metrics: [
      { label: "Build Time", value: "24h", delta: "" },
      { label: "TypeScript", value: "100%", delta: "" },
      { label: "Full CRUD", value: "✓", delta: "" },
    ],
    links: {
      github: "https://github.com/dogzit/Smart-Canteen---hackathon-26.04.20",
      live: "https://smart-canteen-hackathon-26-04-20.vercel.app",
    },
  },

  // ── 2. RentlyMN — March 2026 · Team Lead ────────────────────────────────
  {
    id: "rentlymn",
    title: "RentlyMN",
    tagline: "Mongolia's Rental Marketplace",
    description:
      "Mongolia's rental market was fragmented — listings buried in Facebook groups with no search, no filters, no structure. As team leader and fullstack developer, I owned the architecture and shipped RentlyMN: a structured rental marketplace with property listings, search filters, and Auth.js role-based access. Built with Next.js, Prisma, and Neon PostgreSQL.",
    focus: "Marketplace Architecture & Team Leadership",
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
        value: "Rental listings scattered on social media",
      },
      {
        icon: "🔧",
        label: "Solution",
        value: "Structured marketplace with auth & filters",
      },
      { icon: "👥", label: "Role", value: "Team leader + fullstack architect" },
    ],
    links: { live: "http://rentlymn.vercel.app/" },
  },

  // ── 3. FitBet — January 2026 · Team Lead ────────────────────────────────
  {
    id: "fitbet",
    title: "FitBet",
    tagline: "Fitness Challenge Platform",
    description:
      "Fitness goals without accountability fade in days. As team leader, I identified this gap and led the build of FitBet — a platform where users set goals, join challenges, and track progress together. Architected with Next.js, Auth.js for session management, Prisma + Neon PostgreSQL for data, and deployed on Vercel.",
    focus: "Team Leadership & Full-Stack Architecture",
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
        label: "Problem",
        value: "No accountability for fitness goals",
      },
      {
        icon: "🔧",
        label: "Solution",
        value: "Real-time challenge & progress tracking",
      },
      { icon: "👥", label: "Role", value: "Team leader + fullstack architect" },
    ],
    links: { live: "https://fitbet.vercel.app/" },
  },

  // ── 4. Open Mic — May 2026 · Solo ───────────────────────────────────────
  {
    id: "open-mic",
    title: "Open Mic",
    tagline: "School Event Registration — Solo, Shipped in Days",
    description:
      "School events ran on paper sign-up sheets and chaotic group chats. I replaced that with a clean digital flow: designed, built, and deployed Open Mic solo with Next.js + Prisma. Used by real students for my school's live performance event — from idea to production in under a week.",
    focus: "Solo Execution & Real-World Deployment",
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
        label: "Problem",
        value: "Paper sign-ups → clean digital flow",
      },
      {
        icon: "⚡",
        label: "Timeline",
        value: "Designed, built & deployed solo",
      },
      { icon: "👥", label: "Users", value: "Live event — real students" },
    ],
    links: {
      github: "https://github.com/dogzit/openMic",
      live: "https://survaljlagch-openmic.vercel.app/",
    },
  },

  // ── 5. School Hub — 2025 ────────────────────────────────────────────────
  {
    id: "school-hub",
    title: "School Hub",
    tagline: "AI-Powered School Management System",
    description:
      "A full-stack school management platform with AI-integrated ordering flows, real-time dashboards, and role-based access for students, teachers, and admins. GPT-powered smart suggestions cut decision time; sub-100ms order processing; 3 permission layers protecting each user type.",
    focus: "AI Integration & Role-Based Architecture",
    tags: ["Next.js", "Prisma", "PostgreSQL", "OpenAI", "TypeScript"],
    year: "2025",
    status: "Live",
    gradient: "from-blue-600/20 via-violet-600/10 to-transparent",
    accentColor: "#3b82f6",
    highlights: [
      {
        icon: "🤖",
        label: "AI Integration",
        value: "GPT-powered smart suggestions",
      },
      { icon: "⚡", label: "Performance", value: "Sub-100ms order processing" },
      {
        icon: "🔐",
        label: "Access Control",
        value: "3 distinct permission layers",
      },
    ],
    metrics: [
      { label: "Active Users", value: "50+", delta: "+40%" },
      { label: "Daily Orders", value: "150+", delta: "+60%" },
      { label: "API Endpoints", value: "47", delta: "" },
    ],
    links: {
      github: "https://github.com/dogzit/hWork",
      live: "https://11d.vercel.app",
    },
  },

  // ── 6. IG Clone — 2025 ──────────────────────────────────────────────────
  {
    id: "ig-clone",
    title: "IG Clone",
    tagline: "Decoupled Full-Stack Social Platform",
    description:
      "An Instagram-inspired social platform built with a deliberately decoupled architecture — TypeScript frontend and a standalone Node.js backend with a REST API. Explores auth patterns, image feeds, and the real engineering tradeoffs of separating frontend from backend into two independent repositories.",
    focus: "Decoupled Architecture & Full-Stack Separation",
    tags: ["TypeScript", "Node.js", "JavaScript", "REST API", "Auth"],
    year: "2025",
    status: "In Progress",
    gradient: "from-rose-600/20 via-fuchsia-600/10 to-transparent",
    accentColor: "#f43f5e",
    highlights: [
      {
        icon: "🔀",
        label: "Architecture",
        value: "Fully decoupled frontend + backend",
      },
      { icon: "🔐", label: "Auth", value: "JWT + session management" },
      { icon: "📡", label: "API", value: "20+ REST endpoints" },
    ],
    metrics: [
      { label: "Repos", value: "2", delta: "" },
      { label: "Endpoints", value: "20+", delta: "" },
      { label: "Pattern", value: "Decoupled", delta: "" },
    ],
    links: {
      github: "https://github.com/dogzit/IG-frontend",
      live: "https://zolooproject.vercel.app/login",
    },
  },

  // ── 7. Pinetour — June 2025 · Academy ───────────────────────────────────
  {
    id: "pinetour",
    title: "Pinetour 2025",
    tagline: "Travel Platform — Academy Project",
    description:
      "Built during Pinecone coding academy — a travel discovery platform with destination listings and browsing UI. The first real project after joining the academy in June 2025, marking the transition from tutorials to real-world development.",
    focus: "First Real Project — Academy Sprint",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    year: "2025",
    status: "Live",
    gradient: "from-teal-600/20 via-cyan-600/10 to-transparent",
    accentColor: "#14b8a6",
    highlights: [
      { icon: "🌲", label: "Context", value: "First Pinecone Academy project" },
      { icon: "✈️", label: "Domain", value: "Travel discovery platform" },
      { icon: "⚡", label: "Stack", value: "Next.js + TypeScript + Tailwind" },
    ],
    links: {
      github: "https://github.com/dogzit/Pinetour-2025",
      live: "https://pinetour-2025.vercel.app",
    },
  },

  // ── 8. Erhes Tenger — 2025 ──────────────────────────────────────────────
  {
    id: "erhes-tenger",
    title: "Erhes Tenger",
    tagline: "Brand Identity & Component Library",
    description:
      "Led frontend engineering and brand design for a collaborative team platform. Built a cohesive design system from scratch — 50+ reusable components, a complete visual language, and clean multi-contributor Git workflows across a 4-person team.",
    focus: "Design Systems & Team Leadership",
    tags: ["Next.js", "Figma", "TypeScript", "Design System", "Team Lead"],
    year: "2025",
    status: "Live",
    gradient: "from-orange-600/20 via-amber-600/10 to-transparent",
    accentColor: "#f59e0b",
    highlights: [
      { icon: "🎨", label: "Design System", value: "50+ reusable components" },
      { icon: "👥", label: "Team Size", value: "Led a team of 4 devs" },
      {
        icon: "🏆",
        label: "Brand Identity",
        value: "Full visual language built",
      },
    ],
    metrics: [
      { label: "Components", value: "50+", delta: "" },
      { label: "Team Size", value: "4", delta: "" },
      { label: "Sprints", value: "8", delta: "" },
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
    name: "Frontend",
    icon: "◈",
    skills: [
      { name: "Next.js", level: 92, color: "#f0f0f8" },
      { name: "React", level: 90, color: "#61dafb" },
      { name: "TypeScript", level: 88, color: "#3b82f6" },
      { name: "Tailwind CSS", level: 94, color: "#06b6d4" },
      { name: "Framer Motion", level: 80, color: "#a78bfa" },
    ],
  },
  {
    name: "Backend",
    icon: "⬡",
    skills: [
      { name: "Node.js", level: 85, color: "#6dbf67" },
      { name: "Prisma ORM", level: 88, color: "#5a67d8" },
      { name: "PostgreSQL", level: 82, color: "#336791" },
      { name: "REST APIs", level: 90, color: "#f59e0b" },
      { name: "Auth.js", level: 78, color: "#ec4899" },
    ],
  },
  {
    name: "Tools & Workflow",
    icon: "⬢",
    skills: [
      { name: "Git / GitHub", level: 90, color: "#f0f0f8" },
      { name: "Figma", level: 82, color: "#a259ff" },
      { name: "Vercel", level: 88, color: "#f0f0f8" },
      { name: "VS Code", level: 95, color: "#007acc" },
      { name: "Neon DB", level: 80, color: "#00e5bf" },
    ],
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const TIMELINE: TimelineEvent[] = [
  {
    period: "Kindergarten",
    title: "Born on a Computer",
    subtitle: "Dad's Office → y8 → CS 1.6",
    description:
      "It started at my dad's workplace — a computer in the corner that became my whole world. y8.com, Counter-Strike 1.6, and games I didn't understand but couldn't stop playing. Got my own PC at 6 years old. That machine lasted until I was 13.",
    tags: ["CS 1.6", "y8", "First PC at 6", "Childhood"],
    side: "left",
  },
  {
    period: "2020 – 2025",
    title: "Five Years of Valorant",
    subtitle: "Ranked. Serious. Obsessed.",
    description:
      "Spent 5 years in Valorant — peaked at Diamond, studied agents like patch notes were homework. Gaming taught me focus, pattern recognition, and how to stay calm under pressure. Skills I still use every day.",
    tags: ["Valorant", "Diamond", "5 Years", "Side: Video Editing"],
    side: "right",
  },
  {
    period: "2023",
    title: "One Tutorial Changed It",
    subtitle: "13 Years Old — First Line of Code",
    description:
      "Still gaming, but one YouTube tutorial cracked it open. Built a burger game by copying code I barely understood — and felt more alive doing it than I had in months. The switch was flipping.",
    tags: ["YouTube", "First Tutorial", "13 Years Old", "Burger Game"],
    side: "left",
  },
  {
    period: "June 2025",
    title: "Quit Valorant. Joined Academy.",
    subtitle: "Pinecone — Dev Mode Activated",
    description:
      "Traded ranked Valorant for Pinecone coding academy. Structured curriculum, real projects, and mentorship from senior developers. Two years of curiosity finally had a direction. Went from zero to full-stack in months.",
    tags: ["Academy", "Next.js", "TypeScript", "Mentorship"],
    side: "right",
  },
  {
    period: "Sept 2025",
    title: "First Real Projects",
    subtitle: "Erhes Tenger & IG Clone",
    description:
      "Applied everything from the academy to real, shipped products — led Erhes Tenger (design system + 4-person team) and built IG Clone (decoupled social platform with a standalone REST API backend).",
    tags: ["React", "Next.js", "Node.js", "Team Lead", "Design System"],
    side: "left",
  },
  {
    period: "Jan – Mar 2026",
    title: "Team Lead × 2",
    subtitle: "FitBet & RentlyMN",
    description:
      "Led two consecutive product teams as fullstack developer and team leader. FitBet in January, RentlyMN in March — both architected from scratch, both shipped to production on time.",
    tags: ["Team Lead", "Prisma", "Auth.js", "Neon DB", "Production"],
    side: "left",
  },
  {
    period: "April 2026",
    title: "FinTech Internship + Hackathon ",
    subtitle: "Payment Startup & Smart Canteen",
    description:
      "Completed a 2-week frontend internship at a Mongolian FinTech payment startup — contributed to production-grade payment UI components under senior developer mentorship. Same month: built and shipped Smart Canteen at a school hackathon in 24 hours flat.",
    tags: ["FinTech", "Internship", "Production UI", "Hackathon", "24h"],
    side: "right",
  },
  {
    period: "May 2026",
    title: "Open Mic — Shipped Solo",
    subtitle: "Real Problem. Real Users.",
    description:
      "Designed, built, and deployed Open Mic — a registration webapp for my school's live performance event. Solo, start to production in days. Used by real students the same week it launched.",
    tags: ["Solo", "Next.js", "TypeScript", "Prisma", "Live Users"],
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
    href: "https://www.youtube.com/@HANGVV",
    icon: "youtube",
    username: "@HANGVV",
  },
];
