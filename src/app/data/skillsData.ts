/**
 * Skills Data
 *
 * This file contains the data for the skills section in the About Me component.
 * Each skill has a title, description, and links to relevant resources.
 */

export interface SkillLink {
  name: string;
  url: string;
}

export interface Skill {
  title: string;
  description: string;
  links: SkillLink[];
}

export const skills: Skill[] = [
  {
    title: "ProgrammingLanguages",
    description:
      "Proficient in TypeScript, JavaScript (ES6+), CSS, HTML, and Python for modern web and application development.",
    links: [
      { name: "TypeScript", url: "https://www.typescriptlang.org/" },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      { name: "Python", url: "https://www.python.org/" },
    ],
  },
  {
    title: "Front-End Frameworks & Libraries",
    description:
      "Expert with Next.js, React, Angular, and Vue for building modern, interactive user interfaces and single-page applications.",
    links: [
      { name: "Next.js", url: "https://nextjs.org/" },
      { name: "React", url: "https://reactjs.org/" },
      { name: "Angular", url: "https://angular.io/" },
      { name: "Vue", url: "https://vuejs.org/" },
    ],
  },
  {
    title: "Styling/VFX",
    description:
      "Create visually stunning interfaces with Tailwind CSS, Styled Components, Material Design, Three.js, and Motion libraries.",
    links: [
      { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
      { name: "Styled Components", url: "https://styled-components.com/" },
      { name: "Material Design", url: "https://material.io/design" },
      { name: "Three.js", url: "https://threejs.org/" },
      { name: "Framer Motion", url: "https://www.framer.com/motion/" },
    ],
  },
  {
    title: "Mobile Development",
    description:
      "Build cross-platform mobile applications using React Native and Ionic Framework, delivering native experiences with web technologies.",
    links: [
      { name: "React Native", url: "https://reactnative.dev/" },
      { name: "Ionic Framework", url: "https://ionicframework.com/" },
    ],
  },
  {
    title: "Back-End Knowledge",
    description:
      "Develop robust server-side applications with Node.js, Express.js, Django, MongoDB, and Supabase for full-stack solutions.",
    links: [
      { name: "Node.js", url: "https://nodejs.org/" },
      { name: "Express.js", url: "https://expressjs.com/" },
      { name: "Django", url: "https://www.djangoproject.com/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
      { name: "Supabase", url: "https://supabase.com/" },
    ],
  },
  {
    title: "Analytics & Collaboration Tools",
    description:
      "Skilled with Mixpanel, Azure DevOps, Jira, and Figma for data-driven development and seamless team collaboration.",
    links: [
      { name: "Mixpanel", url: "https://mixpanel.com/" },
      {
        name: "Azure DevOps",
        url: "https://azure.microsoft.com/en-us/services/devops/",
      },
      { name: "Jira", url: "https://www.atlassian.com/software/jira" },
      { name: "Figma", url: "https://www.figma.com/" },
    ],
  },
  {
    title: "Generative AI Tools",
    description:
      "Leverage cutting-edge AI tools including Cursor, Claude, ChatGPT, OpenAI API, GitHub CoPilot, and NotebookLM for enhanced productivity.",
    links: [
      { name: "Cursor", url: "https://cursor.sh/" },
      { name: "Claude", url: "https://claude.ai/" },
      { name: "ChatGPT", url: "https://chat.openai.com/" },
      { name: "OpenAI API", url: "https://platform.openai.com/" },
      { name: "GitHub CoPilot", url: "https://github.com/features/copilot" },
      { name: "NotebookLM", url: "https://notebooklm.google.com/" },
    ],
  },
  {
    title: "Testing & QA",
    description:
      "Ensure code quality and reliability with Jest, Mocha, Jasmine, Karma, Playwright, and pytest for comprehensive testing.",
    links: [
      { name: "Jest", url: "https://jestjs.io/" },
      { name: "Mocha", url: "https://mochajs.org/" },
      { name: "Jasmine", url: "https://jasmine.github.io/" },
      { name: "Karma", url: "https://karma-runner.github.io/" },
      { name: "Playwright", url: "https://playwright.dev/" },
      { name: "pytest", url: "https://docs.pytest.org/" },
    ],
  },
  {
    title: "Methodologies",
    description:
      "Practice Agile, Scrum, Waterfall, and Kanban methodologies for efficient project management and software development.",
    links: [
      { name: "Agile", url: "https://agilemanifesto.org/" },
      { name: "Scrum", url: "https://www.scrum.org/" },
      {
        name: "Waterfall",
        url: "https://www.visual-paradigm.com/guide/sdlc/waterfall-model/",
      },
      { name: "Kanban", url: "https://www.atlassian.com/agile/kanban" },
    ],
  },
  {
    title: "Soft Skills",
    description:
      "Excel in cross-functional collaboration, adaptability, and effective communication to ensure project success and team harmony.",
    links: [
      { name: "Collaboration", url: "https://www.atlassian.com/blog/teamwork" },
      {
        name: "Communication",
        url: "https://www.mindtools.com/pages/article/newCS_85.htm",
      },
      {
        name: "Adaptability",
        url: "https://www.forbes.com/sites/forbescoachescouncil/2019/10/03/why-adaptability-is-the-most-important-skill-to-teach-your-children",
      },
    ],
  },
];
