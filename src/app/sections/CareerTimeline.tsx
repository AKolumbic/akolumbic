import React from "react";
import { careerTimeline } from "../data/careerData";
import {
  TimelineContainer,
  TimelineWrapper,
  TimelineLine,
  CareerCard,
  Logo,
  TechStack,
  TechBadge,
} from "../styles/CareerTimeline.styles";

// ✅ Framer Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function CareerTimeline() {
  return (
    <TimelineContainer>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center",
          textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
        }}
      >
        Career Timeline
      </h2>

      <TimelineWrapper>
        <TimelineLine />
        {careerTimeline.map((event, i) => (
          <CareerCard
            key={event.company}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            {event.image && <Logo src={event.image} alt={event.company} />}
            <h3 style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>
              {event.role}
            </h3>
            <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#ddd" }}>
              {event.company}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#bbb" }}>
              {event.duration}
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                marginTop: "0.5rem",
                color: "#ccc",
                textAlign: "center",
              }}
            >
              {event.description}
            </p>
            {event.tech && (
              <TechStack>
                {event.tech.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </TechStack>
            )}
          </CareerCard>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
}
