import type { ReactNode } from "react";

interface CardProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`rounded-2xl border border-border bg-surface p-6 text-text backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}
