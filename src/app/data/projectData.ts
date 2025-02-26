export interface ProfessionalProject {
  title: string;
  // company: string;
  // impact: string;
  tech: string[];
  image: string; // 🔹 New property for background image
}

export const professionalProjects: ProfessionalProject[] = [
  {
    title: "Public Sector App Modernization",
    // company: "Florida Department of Corrections",
    // impact:
    //   "Led front-end team in building a modern Angular app, reducing onboarding time by 85% and delivering the project 100% on time.",
    tech: ["Angular", "TypeScript", "Material UI"],
    image: "/fdoc.png", // ✅ Corrected path
  },
  {
    title: "Enterprise Software Modernization",
    // company: "The Home Depot",
    // impact:
    //   "Optimized workflows for 10,000+ users, improving load times by 30% and user engagement by 25%.",
    tech: ["React", "Angular", "TypeScript", "Ionic"],
    image: "/thd.jpg", // ✅ Corrected path
  },
  {
    title: "iPad App Development",
    // company: "Southern California Edison",
    // impact:
    //   "Designed React Native iPad app with offline functionality, reducing report submission delays by 40%.",
    tech: ["React Native", "Node.js", "FeathersJS"],
    image: "/sce.svg", // ✅ Corrected path
  },
];

export interface SideProject {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

export const sideProjects: SideProject[] = [
  {
    title: "This Website",
    description: "The codebase for my personal portfolio site.",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    link: "https://github.com/AKolumbic/akolumbic",
    image: "/ak.png",
  },
  {
    title: "Angular/Python Stock App",
    description:
      "A full-stack stock app built with Angular for the front end and Python for the back end.",
    tech: ["Angular", "Python", "MongoDB"],
    link: "https://github.com/AKolumbic/asmp",
    image: "/angular.png",
  },
  {
    title: "Vue Calculator",
    description: "A calculator built with Vue.js.",
    tech: ["Vue.js", "JavaScript"],
    link: "https://github.com/AKolumbic/vue-calc",
    image: "/vue.svg",
  },
  {
    title: "BATMAN: Streets of Gotham",
    description:
      "A 2D Batman Platformer using Phaser 3, TypeScript, and Rollup.",
    tech: ["Phaser 3", "TypeScript", "Rollup"],
    link: "https://github.com/AKolumbic/BATMAN-Streets-of-Gotham",
    image: "/batman.jpg",
  },
  {
    title: "Twitchbot",
    description: "A bot for my Twitch channel.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/twitchbot",
    image: "/twitch.png",
  },
  // {
  //   title: "D&D Stuff",
  //   description: "D&D-themed React practice.",
  //   tech: ["React", "TypeScript"],
  //   link: "https://github.com/AKolumbic/dndStuff",
  //   image: "/d&d.png",
  // },
  {
    title: "Warcraft Stuff",
    description: "Warcraft-themed coding experiments.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/warcraft",
    image: "/wow.png",
  },
];
