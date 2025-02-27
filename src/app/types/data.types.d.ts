export interface CareerEvent {
  company: string;
  role: string;
  duration: string;
  description: string;
  tech?: string[];
  image?: string;
}

export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export interface ProfessionalProject {
  title: string;
  // company: string;
  // impact: string;
  tech: string[];
  image: string; // 🔹 New property for background image
}

export interface SkillLink {
  name: string;
  url: string;
}

export interface Skill {
  title: string;
  description: string;
  links: SkillLink[];
}
