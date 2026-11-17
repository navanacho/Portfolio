import type { ReactNode } from "react";

interface SectionHeadingProps {
  readonly id: string;
  readonly children: ReactNode;
}

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return <h2 id={id}>{children}</h2>;
}
