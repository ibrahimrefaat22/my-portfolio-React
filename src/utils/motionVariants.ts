import type { Variants } from 'framer-motion';

// ✅ Tuple types — هذا هو الإصلاح الأساسي لكل الأخطاء
export const easeCustom: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const easeReveal: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const easeSpring: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeCustom,
    },
  },
};

export const fadeUpStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeCustom,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeCustom,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeCustom,
    },
  },
};