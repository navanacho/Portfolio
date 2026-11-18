import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

export const STALE_DOCUMENT_TOKENS = [
  "#0A0F1C",
  "#00F5D4",
  "#8B5CF6",
  "#1A1F2B",
  "#264653",
  "#2A9D8F",
  "#E9C46A",
  "#F4A261",
] as const;

export const APPROVED_PALETTE_HEX = [
  "#0B132B",
  "#1C2541",
  "#3A506B",
  "#5BC0DE",
  "#F4D6B0",
  "#D97706",
] as const;

const stalePattern = new RegExp(STALE_DOCUMENT_TOKENS.join("|"), "i");

function read(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), "utf8");
}

function markdownFiles(directory: string): string[] {
  const absolute = resolve(ROOT, directory);
  return readdirSync(absolute).flatMap((entry) => {
    const relative = `${directory}/${entry}`;
    return statSync(join(absolute, entry)).isDirectory() ? markdownFiles(relative) : [relative];
  });
}

describe("paleta activa en documentación OpenSpec", () => {
  it("config.yaml y la spec visual usan la paleta aprobada y Plus Jakarta Sans", () => {
    const documents = [read("openspec/config.yaml"), read("openspec/specs/visual-design-system/spec.md")];

    for (const document of documents) {
      expect(document).not.toMatch(stalePattern);
      for (const hex of APPROVED_PALETTE_HEX) {
        expect(document, hex).toContain(hex);
      }
      expect(document).toContain("Plus Jakarta Sans");
    }
  });

  it("ninguna spec activa reintroduce tokens del prototipo", () => {
    const files = markdownFiles("openspec/specs").filter((file) => file.endsWith(".md"));
    expect(files.length).toBeGreaterThan(5);

    for (const file of files) {
      expect(read(file), file).not.toMatch(stalePattern);
    }
  });
});
