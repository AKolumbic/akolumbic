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
 * Smooth slide up for Portfolio section.
 *
 * @type {Variants}
 */
export const smoothSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }, // Custom ease-in-out
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
