export interface ResumeEntry {
  title: string;
  org?: string;
  period: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  focus: string;
  tags: string[];
  year: string;
  status: "Live" | "In Progress" | "Archived";
  gradient: string;
  accentColor: string;
  highlights: CaseStudyHighlight[];
  metrics?: Metric[];
  /** Condensed lines for the resume PDF. Prose reads well on the page but a
   *  reviewer scanning a CV needs these instead. */
  bullets?: string[];
  links: ProjectLinks;
}

export interface CaseStudyHighlight {
  icon: string;
  label: string;
  value: string;
}

export interface Metric {
  label: string;
  value: string;
  delta?: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  /** One-line context shown under the category name. */
  note?: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  /** What backs the claim — a count, a project, a schema size. Shown verbatim. */
  evidence: string;
  icon?: string;
  color?: string;
}

export interface Milestone {
  /** Time marker: an age, a year, or a stage. Deliberately not always a date —
   *  several of these are remembered by what was happening, not when. */
  period: string;
  title: string;
  detail: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BentoItem {
  id: string;
  colSpan: number;
  rowSpan: number;
  content: React.ReactNode;
  className?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  username: string;
}
