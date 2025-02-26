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
    title: "TypeScript, JavaScript (ES6+), Python",
    description:
      "Modern programming languages for web and application development. TypeScript adds static typing to JavaScript, while Python offers versatility for various applications.",
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
    title: "React, Angular, Vue, Next.js",
    description:
      "Popular front-end frameworks for building interactive user interfaces and single-page applications with component-based architecture.",
    links: [
      { name: "React", url: "https://reactjs.org/" },
      { name: "Angular", url: "https://angular.io/" },
      { name: "Vue", url: "https://vuejs.org/" },
      { name: "Next.js", url: "https://nextjs.org/" },
    ],
  },
  {
    title: "Node.js, Express.js, FastAPI, MongoDB",
    description:
      "Backend technologies for creating scalable web services. Node.js runs JavaScript server-side, FastAPI is a modern Python framework, and MongoDB is a NoSQL database.",
    links: [
      { name: "Node.js", url: "https://nodejs.org/" },
      { name: "Express.js", url: "https://expressjs.com/" },
      { name: "FastAPI", url: "https://fastapi.tiangolo.com/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
    ],
  },
  {
    title: "React Native, Ionic Framework",
    description:
      "Cross-platform mobile app development frameworks allowing you to build native mobile applications using web technologies.",
    links: [
      { name: "React Native", url: "https://reactnative.dev/" },
      { name: "Ionic Framework", url: "https://ionicframework.com/" },
    ],
  },
  {
    title: "Jest, Mocha, Karma, Playwright",
    description:
      "Testing frameworks and tools for automated testing of applications, ensuring code quality and preventing regressions.",
    links: [
      { name: "Jest", url: "https://jestjs.io/" },
      { name: "Mocha", url: "https://mochajs.org/" },
      { name: "Karma", url: "https://karma-runner.github.io/" },
      { name: "Playwright", url: "https://playwright.dev/" },
    ],
  },
  {
    title: "Agile, Scrum, Kanban, DevOps, CI/CD",
    description:
      "Modern software development methodologies and practices for efficient team collaboration, continuous delivery, and quality assurance.",
    links: [
      { name: "Agile", url: "https://agilemanifesto.org/" },
      { name: "Scrum", url: "https://www.scrum.org/" },
      { name: "Kanban", url: "https://www.atlassian.com/agile/kanban" },
      {
        name: "DevOps",
        url: "https://aws.amazon.com/devops/what-is-devops/",
      },
    ],
  },
  {
    title: "ChatGPT, Cursor, Claude, Copilot",
    description:
      "AI-powered development tools that enhance productivity by providing code assistance, generation, and problem-solving capabilities.",
    links: [
      { name: "ChatGPT", url: "https://chat.openai.com/" },
      { name: "Cursor", url: "https://cursor.sh/" },
      { name: "Claude", url: "https://claude.ai/" },
      { name: "Copilot", url: "https://github.com/features/copilot" },
    ],
  },
];
