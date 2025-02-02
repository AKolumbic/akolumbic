// Slide in from left for AboutMe section
export const slideInFromLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

// Slide in from right for CareerTimeline section
export const slideInFromRightVariants = {
  hidden: { opacity: 0, x: 50, rotate: 3 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Smooth Slide Up for Portfolio section
export const smoothSlideUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }, // Custom ease-in-out
  },
};

// Staggered Fade-In (For List Items)
export const staggeredFadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
};

// Scale-In for a Subtle Appearance
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Elastic Bounce In (For Buttons or Special Elements)
export const elasticSlideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 8 },
  },
};

// Blur-In Effect (For Soft Appearance)
export const blurInVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Pulse / Breathing Effect (For Hover States)
export const pulseVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.5, yoyo: Infinity },
  },
};

// Bounce In Effect
export const bounceInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Fade Upwards with Spring Physics
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};
