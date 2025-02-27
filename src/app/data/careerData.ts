import { CareerEvent } from "../types/data.types";

export const careerTimeline: CareerEvent[] = [
  {
    company: "BloomTech Institute of Technology (formerly Lambda School)",
    role: "Software Engineering Student",
    duration: "Mar 2018 - Sep 2018",
    description:
      "Completed an intensive full-time coding bootcamp, focusing on JavaScript, React, and backend development. Entered the tech industry with no prior experience and no college degree.",
    tech: ["JavaScript", "React", "Node.js"],
    image: "/bloomtech.png",
  },
  {
    company: "Nexient",
    role: "Software Engineer",
    duration: "Jan 2019 - Jul 2022",
    description:
      "Hired as a software engineer at Nexient, working on enterprise applications and mobile development. Developed projects for major clients across various industries.",
    tech: ["React", "Node.js", "Express", "React Native"],
    image: "/nexient.jpeg",
  },
  {
    company: "NTT Data (formerly Nexient)",
    role: "Software Engineer",
    duration: "Jul 2022 - Jan 2024",
    description:
      "Following Nexient’s acquisition by NTT Data, continued working on modernization projects for large-scale enterprise clients.",
    tech: ["Angular", "React", "TypeScript"],
    image: "/ntt.jpg",
  },
  {
    company: "Launch by NTT Data",
    role: "Senior Software Engineer",
    duration: "Jan 2024 - Nov 2024",
    description:
      "Promoted to Senior Software Engineer at Launch by NTT Data, leading frontend development efforts for enterprise modernization projects. Laid off during company downsizing.",
    tech: ["React", "Next.js", "Framer Motion"],
    image: "/launch.png",
  },
];
