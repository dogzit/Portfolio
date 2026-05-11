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
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  color: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  side: "left" | "right";
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
