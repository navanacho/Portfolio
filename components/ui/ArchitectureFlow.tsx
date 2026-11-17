import type { ArchitectureNode } from "@/types/content";

interface ArchitectureFlowProps {
  readonly nodes: readonly ArchitectureNode[];
}

export function ArchitectureFlow({ nodes }: ArchitectureFlowProps) {
  return (
    <ol aria-label="Flujo de arquitectura" className="mt-4 space-y-4">
      {nodes.map((node, index) => (
        <li key={node.label} className="flex gap-3">
          <span aria-hidden="true" className="font-mono text-secondary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-mono text-primary">{node.label}</h3>
            <p className="text-text-muted">{node.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
