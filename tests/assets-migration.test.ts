import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { profile } from "@/data/profile";

function at(...parts: string[]): string {
  return resolve(process.cwd(), ...parts);
}

function sourceFiles(directory: string): string[] {
  const base = at(directory);
  if (!existsSync(base)) {
    return [];
  }
  return readdirSync(base, { withFileTypes: true }).flatMap((entry) => {
    const path = join(base, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
}

describe("migración de assets", () => {
  it("publica el avatar y el CV en rutas canónicas servibles por Next.js", () => {
    const canonicalAvatar = at("assets/images/avatar.png");
    const canonicalCv = at("assets/CV/CV-Ignacio-Navarria.pdf");
    const servedAvatar = at("public/assets/images/avatar.png");
    const servedCv = at("public/assets/CV/CV-Ignacio-Navarria.pdf");

    for (const file of [canonicalAvatar, canonicalCv, servedAvatar, servedCv]) {
      expect(existsSync(file), `falta ${file}`).toBe(true);
    }

    expect(statSync(canonicalCv).size).toBe(175437);
    expect(statSync(servedCv).size).toBe(175437);
    expect(readFileSync(canonicalAvatar).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(readFileSync(canonicalCv).subarray(0, 5).toString()).toBe("%PDF-");
    expect(readFileSync(canonicalAvatar)).toEqual(readFileSync(servedAvatar));
    expect(readFileSync(canonicalCv)).toEqual(readFileSync(servedCv));
  });

  it("resuelve el CV enlazado contra el árbol público que sirve Next.js", () => {
    const published = profile.contact.cv.replace(/^\/+/, "");
    expect(published).toBe("assets/CV/CV-Ignacio-Navarria.pdf");
    expect(existsSync(at("public", published))).toBe(true);

    const html = renderToStaticMarkup(createElement(Home));
    expect(html).toContain(`href="${profile.contact.cv}"`);
  });

  it("no publica rutas legadas, avatar en mayúsculas ni un CV inalcanzable", () => {
    const files = ["app", "components", "data", "types"].flatMap(sourceFiles);
    for (const legacy of ["index.html", "style.css", "main.js"]) {
      if (existsSync(at(legacy))) {
        files.push(at(legacy));
      }
    }
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const content = readFileSync(file, "utf8");
      expect(content, `ruta assest/ en ${file}`).not.toMatch(/assest\//);
      expect(content, `AVATAR.png en ${file}`).not.toMatch(/AVATAR\.png/);
      expect(content, `CV2.0.pdf en ${file}`).not.toMatch(/CV2\.0\.pdf/);
    }

    const html = renderToStaticMarkup(createElement(Home));
    expect(html).not.toMatch(/assest\/|AVATAR\.png|CV2\.0\.pdf/);
    expect(html).toContain('href="assets/CV/CV-Ignacio-Navarria.pdf"');
  });
});
