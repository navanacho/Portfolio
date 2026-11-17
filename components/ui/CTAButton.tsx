import type { ReactNode } from "react";

interface CTAButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly ariaLabel: string;
  readonly external?: boolean;
  readonly className?: string;
}

export function CTAButton({ href, children, ariaLabel, external = false, className = "" }: CTAButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20 ${className}`}
    >
      {children}
    </a>
  );
}
