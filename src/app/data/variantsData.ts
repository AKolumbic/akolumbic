import { Variants } from "framer-motion";

/**
 * Slide in from left for AboutMe section.
 *
 * @type {Variants}
 */
export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

/**
 * Slide in from right for CareerTimeline section.
 *
 * @type {Variants}
 */
export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50, rotate: 3 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Animation variants for smooth slide-up effect
 * Used for sections that animate in as they come into view
 */
export const smoothSlideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

/**
 * Staggered fade-in for list items.
 * The visible variant is a function that accepts an index to calculate delay.
 *
 * @type {Variants}
 */
export const staggeredFadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" },
  }),
};

/**
 * Scale in for a subtle appearance.
 *
 * @type {Variants}
 */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/**
 * Elastic bounce in for buttons or special elements.
 *
 * @type {Variants}
 */
export const elasticSlideInVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 8 },
  },
};

/**
 * Blur in effect for a soft appearance.
 *
 * @type {Variants}
 */
export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Pulse (breathing) effect for hover states.
 *
 * @type {Variants}
 */
export const pulseVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.5, yoyo: Infinity },
  },
};

/**
 * Bounce in effect.
 *
 * @type {Variants}
 */
export const bounceInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    transition: { duration: 1, ease: "easeOut" },
  },
};

/**
 * Fade upwards with spring physics.
 *
 * @type {Variants}
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

/**
 * fadeInUp variants for elements to fade in and move upward.
 * The visible variant is a function that accepts an optional delay parameter.
 *
 * @param {number} [delay=0] - The delay before the animation starts.
 * @returns {object} The visible variant configuration.
 * @type {Variants}
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  }),
};

/**
 * Animation variants for container elements in various sections
 * Handles staggered children animations
 *
 * @type {Variants}
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * Animation variants for Portfolio cards and similar components
 * Handles entrance animation and hover effects
 *
 * @type {Variants}
 */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  hover: {
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Animation variants for section titles
 *
 * @type {Variants}
 */
export const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Animation variants for AboutMe container elements
 * Similar to containerVariants but with different timing
 *
 * @type {Variants}
 */
export const aboutContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.7,
    },
  },
};

/**
 * Animation variants for AboutMe item elements
 * Used for individual content items in the AboutMe section
 *
 * @type {Variants}
 */
export const aboutItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};
