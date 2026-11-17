import type { ReactNode } from "react";

interface IconBadgeProps {
  readonly label: string;
  readonly children: ReactNode;
}

export function IconBadge({ label, children }: IconBadgeProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center justify-center rounded-lg bg-secondary/15 p-2 text-primary">
      {children}
    </span>
  );
}
