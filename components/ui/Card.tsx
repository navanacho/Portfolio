import type { ReactNode } from "react";

export const CARD_SURFACE_CLASSES =
  "group rounded-2xl border border-border bg-surface text-text shadow-[0_18px_45px_rgba(11,19,43,0.55)] backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_22px_55px_rgba(11,19,43,0.75)] motion-reduce:transform-none";

interface CardProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div
      data-card="true"
      className={`${CARD_SURFACE_CLASSES} p-6 ${className}`}
    >
      {children}
    </div>
  );
}
