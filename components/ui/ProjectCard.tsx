"use client";

import { ArrowUpRight, Maximize2 } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import type { MouseEvent } from "react";

import { ArchitectureFlow } from "@/components/ui/ArchitectureFlow";
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
    <MotionConfig reducedMotion="user">
      <motion.article
        onMouseMove={handleMouseMove}
        whileHover={reducedMotion ? undefined : { y: -6 }}
        transition={{ duration: 0.2 }}
        className="project-spotlight relative isolate overflow-hidden rounded-2xl border border-border bg-surface p-6 text-text backdrop-blur-md"
      >
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-text-muted">
          {project.authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
        </div>
        <p className="mt-4 text-text-muted">{project.summary}</p>
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
            <Maximize2 aria-hidden="true" size={16} />
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
    </MotionConfig>
  );
}
