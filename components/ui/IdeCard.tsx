import { Braces } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { CHROME_DOTS, IDE_FILE_NAME, IDE_LANGUAGE, IDE_STATUS } from "@/components/ui/ide-card-constants";
import { profile } from "@/data/profile";

export function IdeCard() {
  return (
    <div data-ide-card className="relative">
      <div aria-hidden="true" className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 to-secondary/20 opacity-60 blur-xl" />
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface/90 shadow-2xl backdrop-blur-xl transition-colors hover:border-primary/60">
        <div className="flex items-center justify-between border-b border-border bg-background/70 px-4 py-2">
          <ul aria-hidden="true" className="flex items-center gap-1.5">
            {CHROME_DOTS.map((color) => (
              <li key={color} data-ide-chrome-dot className={`h-3 w-3 rounded-full ${color}`} />
            ))}
          </ul>
          <span className="flex items-center gap-2 font-mono text-xs text-primary">
            <Braces aria-hidden="true" size={14} />
            {IDE_FILE_NAME}
          </span>
          <span className="font-mono text-xs text-text-muted">{IDE_LANGUAGE}</span>
        </div>

        <div data-ide-profile className="flex items-center gap-3 border-b border-border bg-secondary/20 px-4 py-3">
          <Avatar />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">
              {profile.identity.name}{" "}
              <span className="font-mono text-xs font-normal text-primary">(@{profile.identity.handle})</span>
            </p>
            <p className="truncate text-xs text-text-muted">{profile.identity.roles[1]}</p>
          </div>
        </div>

        <div data-ide-code className="break-words bg-background/50 p-4 font-mono text-xs leading-relaxed text-text">
          <p className="text-text-muted">{"// Especificación de interfaz y datos reales"}</p>
          <p>
            <span className="font-semibold text-primary">interface</span> <span className="text-secondary">DeveloperProfile</span> {"{"}
          </p>
          <p className="pl-4">
            <span className="text-text-muted">alias:</span>{" "}
            <span className="text-secondary">&quot;{profile.identity.handle}&quot;</span>;
          </p>
          <p className="pl-4">
            <span className="text-text-muted">role:</span>{" "}
            <span className="text-secondary">&quot;{profile.identity.roles[1]}&quot;</span>;
          </p>
          <p className="pl-4">
            <span className="text-text-muted">stack:</span> [
          </p>
          {profile.stack.slice(0, 4).map((technology) => (
            <p key={technology} className="pl-8 text-secondary">
              &quot;{technology}&quot;,
            </p>
          ))}
          <p className="pl-4">];</p>
          <p>{"}"}</p>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-background/70 px-4 py-2 font-mono text-xs text-text-muted">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            UTF-8 · LF
          </span>
          <span className="text-secondary">{IDE_STATUS}</span>
        </div>
      </div>
    </div>
  );
}
