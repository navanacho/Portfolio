import type { ReactNode } from "react";

interface IconBadgeProps {
  readonly label: string;
  readonly children: ReactNode;
}

export function IconBadge({ label, children }: IconBadgeProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center justify-center rounded-lg border border-warm-strong/40 bg-secondary/30 p-2 text-primary transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none">
      {children}
    </span>
  );
}
