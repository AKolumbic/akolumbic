// src/app/data/projectsData.ts

export interface ProfessionalProject {
  title: string;
  company: string;
  impact: string;
  tech: string[];
}

export const professionalProjects: ProfessionalProject[] = [
  {
    title: "Enterprise Software Modernization",
    company: "The Home Depot",
    impact:
      "Optimized workflows for 10,000+ users, improving load times by 30% and user engagement by 25%.",
    tech: ["React", "Angular", "TypeScript", "Ionic"],
  },
  {
    title: "Public Sector App Modernization",
    company: "Florida Department of Corrections",
    impact:
      "Led front-end team in building a modern Angular app, reducing onboarding time by 85% and delivering the project 100% on time.",
    tech: ["Angular", "TypeScript", "Material UI"],
  },
  {
    title: "iPad App Development",
    company: "Southern California Edison",
    impact:
      "Designed React Native iPad app with offline functionality, reducing report submission delays by 40%.",
    tech: ["React Native", "Node.js", "FeathersJS"],
  },
];

export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export const sideProjects: SideProject[] = [
  {
    title: "Literally This Website",
    description: "The codebase for my personal portfolio site.",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    link: "https://github.com/AKolumbic/akolumbic",
  },
  {
    title: "BATMAN: Streets of Gotham",
    description:
      "A 2D Batman Platformer using Phaser 3, TypeScript, and Rollup.",
    tech: ["Phaser 3", "TypeScript", "Rollup"],
    link: "https://github.com/AKolumbic/BATMAN-Streets-of-Gotham",
  },
  {
    title: "Twitchbot",
    description: "A bot for my Twitch channel.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/twitchbot",
  },
  {
    title: "D&D Stuff",
    description: "D&D-themed React practice.",
    tech: ["React", "TypeScript"],
    link: "https://github.com/AKolumbic/dndStuff",
  },
  {
    title: "Warcraft Stuff",
    description: "Warcraft-themed coding experiments.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/warcraft",
  },
  {
    title: "Vue Calculator",
    description: "A calculator built with Vue.js.",
    tech: ["Vue.js", "JavaScript"],
    link: "https://github.com/AKolumbic/vue-calc",
  },
];
