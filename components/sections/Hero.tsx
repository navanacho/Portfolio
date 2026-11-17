"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";

import { profile } from "@/data/profile";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const networkAnimation = { opacity: [0.35, 0.8, 0.35], scale: [1, 1.05, 1] };

const networkTransition = { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

const networkNodes = [
  "bg-primary/80",
  "bg-warm",
  "bg-primary/60",
  "bg-secondary",
  "bg-warm-strong",
  "bg-primary/80",
  "bg-secondary",
  "bg-warm",
  "bg-primary/60",
] as const;

export function Hero() {
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion) {
      return;
    }
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        id="inicio"
        aria-labelledby="inicio-titulo"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onMouseMove={handleMouseMove}
        className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface px-6 py-20 sm:px-12"
      >
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-16 -z-10 hidden h-36 w-36 grid-cols-3 place-items-center gap-4 sm:grid"
          animate={reducedMotion ? undefined : networkAnimation}
          transition={reducedMotion ? undefined : networkTransition}
        >
          {networkNodes.map((color, index) => (
            <span key={index} className={`h-2 w-2 rounded-full ${color}`} />
          ))}
        </motion.div>
        <Avatar className="mb-6" />
        <motion.h1 id="inicio-titulo" variants={itemVariants} className="text-4xl font-semibold tracking-tight text-text sm:text-6xl">
          {profile.identity.name}
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg text-text-muted">
          {profile.identity.roles[0]}
        </motion.p>
        <Reveal className="mt-2 font-mono text-sm text-primary">
          <p>{profile.identity.roles[1]}</p>
        </Reveal>
      </motion.section>
    </MotionConfig>
  );
}
