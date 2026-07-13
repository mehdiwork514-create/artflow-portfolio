export interface Skill {
  id: string;
  level: number;
  color: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  level: number;
  color: string;
  icon: string;
  items?: Skill[];
}

export interface Project {
  id: string;
  technologies?: string[];
  hideTechnologies?: boolean;
  github?: string;
  live: string;
  gradient: string;
  accent: string;
  image?: string;
}

export interface Experience {
  id: string;
  period: string;
  type: "work" | "education";
}

export interface Stat {
  id: string;
  value: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "telegram";
}

export type Locale = "fa" | "en";
