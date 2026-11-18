"use client";

import { ArrowUpRight, Maximize2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import type { MouseEvent } from "react";

import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
import { CARD_SURFACE_CLASSES } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  readonly project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reducedMotion) {
      return;
    }
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
  };

  return (
    <>
      <motion.article
        data-card="true"
        onMouseMove={handleMouseMove}
        whileHover={reducedMotion ? undefined : { y: -6 }}
        transition={{ duration: 0.2 }}
        className={`project-spotlight ${CARD_SURFACE_CLASSES} relative isolate overflow-hidden p-6`}
      >
        <div
          data-project-preview
          className="relative mb-5 h-36 overflow-hidden rounded-xl border border-border bg-background/70 p-4"
        >
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-warm-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.architecture.slice(0, 3).map((node) => (
              <span
                key={node.label}
                className="truncate rounded-lg border border-primary/30 bg-primary/10 px-2 py-1 text-center font-mono text-[10px] text-primary"
              >
                {node.label}
              </span>
            ))}
          </div>
          <span
            data-project-status
            className="absolute right-3 top-3 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 font-mono text-[10px] text-primary"
          >
            {project.tags[0]}
          </span>
        </div>
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-text-muted">
          {project.authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
        </div>
        <p data-project-summary className="mt-4 line-clamp-3 text-text-muted">
          {project.summary}
        </p>
        <ul aria-label="Categorías de la tesis" className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <motion.span
                whileHover={reducedMotion ? undefined : { scale: 1.06, y: -2 }}
                transition={{ duration: 0.15 }}
                className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
              >
                {tag}
              </motion.span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm text-primary"
          >
            <Maximize2
              aria-hidden="true"
              size={16}
              className="transition-transform group-hover:scale-110 motion-reduce:transform-none"
            />
            Ver arquitectura
          </button>
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver repositorio"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text"
          >
            Ver repositorio
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </motion.article>

      <Modal open={isOpen} onClose={closeModal} title="Arquitectura de la tesis">
        <ArchitectureFlow nodes={project.architecture} />
        <a
          href={project.repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver repositorio"
          className="mt-6 inline-flex items-center gap-2 text-primary"
        >
          Ver repositorio
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </Modal>
    </>
  );
}
