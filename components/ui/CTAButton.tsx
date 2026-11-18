import type { ReactNode } from "react";

type CTAVariant = "primary" | "warm";

const CTA_VARIANTS: Record<CTAVariant, string> = {
  primary: "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
  warm: "border-warm-strong/50 bg-warm/10 text-warm hover:bg-warm/20",
};

interface CTAButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly ariaLabel: string;
  readonly external?: boolean;
  readonly variant?: CTAVariant;
  readonly className?: string;
}

export function CTAButton({
  href,
  children,
  ariaLabel,
  external = false,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-[transform,background-color,border-color] duration-200 hover:scale-105 motion-reduce:transform-none ${CTA_VARIANTS[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
