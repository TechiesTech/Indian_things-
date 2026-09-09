import { type ReactNode } from "react";
import { motion } from "framer-motion";

export interface FlipTextProps {
  children: ReactNode;
  delay?: number;
}

export default function FlipText({ children, delay = 0 }: FlipTextProps) {
  return (
    <motion.span
      className="flip-text"
      initial={{
        rotateX: 90,
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        rotateX: 0,
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.7,
      }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
