"use client";

import { motion } from "motion/react";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Skills() {
  const thesis = projects[0];

  return (
    <section aria-labelledby="habilidades">
      <SectionHeading id="habilidades">Habilidades</SectionHeading>
      <div className="content-grid section-stack mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <h3 className="text-lg font-semibold">Tecnologías</h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
          >
            <ul aria-label="Tecnologías" className="mt-4 flex flex-wrap gap-2 font-mono">
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
          </motion.div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Herramientas</h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={listVariants}
          >
            <ul aria-label="Herramientas" className="mt-4 flex flex-wrap gap-2 font-mono">
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
        <Card>
          <h3 className="text-lg font-semibold">Stack verificado</h3>
          <ul aria-label="Stack verificado" className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
            {thesis?.tech.slice(0, 6).map((technology) => (
              <li key={technology} className="rounded-full border border-secondary bg-secondary/30 px-3 py-1">
                {technology}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">Dominio</h3>
          <ul aria-label="Dominio" className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-text-muted">
            {thesis?.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-warm-strong/40 bg-secondary/30 px-3 py-1 text-warm">
                {tag}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
