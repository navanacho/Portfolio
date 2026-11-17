"use client";

import { motion } from "motion/react";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Skills() {
  return (
    <section aria-labelledby="habilidades">
      <SectionHeading id="habilidades">Habilidades</SectionHeading>
      <Card>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={listVariants}
        >
          <ul aria-label="Tecnologías" className="flex flex-wrap gap-2 font-mono">
            {profile.stack.map((technology) => (
              <li key={technology}>
                <motion.span
                  variants={badgeVariants}
                  className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-text"
                >
                  {technology}
                </motion.span>
              </li>
            ))}
          </ul>
          <ul aria-label="Herramientas" className="mt-3 flex flex-wrap gap-2 font-mono">
            {profile.tools.map((tool) => (
              <li key={tool}>
                <motion.span
                  variants={badgeVariants}
                  className="inline-block rounded-full border border-warm-strong/50 bg-secondary/30 px-3 py-1 text-xs text-warm"
                >
                  {tool}
                </motion.span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Card>
    </section>
  );
}
