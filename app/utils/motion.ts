// /app/utils/motion.ts
import { Variants } from 'framer-motion';

const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren || 0.1,
      delayChildren: delayChildren || 0,
    },
  },
});

const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right',
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type as any,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const textVariant = (delay: number): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down',
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type: type as any,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
});

export { staggerContainer, fadeIn, textVariant, zoomIn, slideIn };