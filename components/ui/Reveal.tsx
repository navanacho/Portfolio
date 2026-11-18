"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function Reveal({ className = "", children }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
    >
      {children}
    </motion.div>
  );
}
