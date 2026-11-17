import { describe, expect, expectTypeOf, it } from "vitest";
import type { Project } from "@/types/content";

import { projects } from "@/data/projects";

const THESIS_TITLE = "Tesis de Grado — Orquestación de Honeypots Research con n8n";
const THESIS_REPOSITORY = "https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git";

describe("catálogo de proyectos", () => {
  it("publica únicamente la tesis confirmada y excluye Velco", () => {
    expect(projects).toHaveLength(1);
    expect(projects[0]?.title).toBe(THESIS_TITLE);
    expect(projects[0]?.repository).toBe(THESIS_REPOSITORY);
    expect(JSON.stringify(projects)).not.toMatch(/Velco/i);
  });
});

describe("créditos y componentes verificados", () => {
  it("acredita a ambos autores con los nombres literales del README", () => {
    expect(projects[0]?.authors).toEqual(["Ignacio Navarria", "Germán Marino"]);
    expect(JSON.stringify(projects)).toContain("Ignacio Navarria");
    expect(JSON.stringify(projects)).toContain("Germán Marino");
  });

  it("enumera los componentes confirmados sin inventar tecnología adicional", () => {
    const confirmed = [
      "Cowrie",
      "Dionaea",
      "n8n",
      "Docker",
      "PostgreSQL",
      "Grafana",
      "MITRE ATT&CK",
      "React",
      "FastAPI",
      "nginx",
      "SSE",
      "GLPI",
      "AbuseIPDB",
      "Shodan",
      "VirusTotal",
      "WhoisFreaks",
    ];
    const tech = projects[0]?.tech ?? [];

    for (const component of confirmed) {
      expect(tech).toContain(component);
    }
    expect(tech).toHaveLength(confirmed.length);
  });
});

describe("objetivos, resultados y seguridad sin cifras inventadas", () => {
  it("presenta MTTD y MTTR como objetivos y solo nombra las métricas evaluadas", () => {
    const project = projects[0];

    expect(project?.objectives).toEqual([
      "Capturar ataques reales",
      "Automatizar el análisis de eventos",
      "Enriquecer la inteligencia de amenazas",
      "Reducir MTTD y MTTR",
      "Correlacionar con MITRE ATT&CK",
      "Generar inteligencia táctica",
    ]);
    expect(project?.evaluatedMetrics).toEqual([
      "MTTD",
      "MTTR",
      "Cobertura MITRE ATT&CK",
      "Tasa de falsos positivos",
      "Técnicas identificadas",
    ]);

    const content = JSON.stringify(project);
    expect(content).not.toMatch(/[+-]?\d+(?:[.,]\d+)?\s*%/);
    expect(content).not.toMatch(/\b\d+(?:[.,]\d+)?\s*(?:ms|s|segundos?|minutos?|horas?|d[ií]as?|ataques?|eventos?)\b/i);
    expect(content).not.toMatch(/\b(?:19|20)\d{2}\b/);
    expect(content).not.toMatch(/\b(?:resultado|logro|mejora|reducci[oó]n)\s+(?:de\s+)?\d+/i);
  });

  it("registra las propiedades de seguridad verificadas y los paneles de Grafana confirmados", () => {
    expect(projects[0]?.security).toEqual([
      "Segmentación de red efectiva verificada empíricamente",
      "Firewall-agente con tres capas",
      "Secretos no servidos por HTTP",
      "Diseño fail-open",
    ]);
    expect(projects[0]?.dashboards).toEqual([
      "SOC Overview",
      "MITRE ATT&CK",
      "geo-origen",
      "Malware/IoC",
    ]);
  });
});

describe("catálogo inmutable", () => {
  it("congela la entrada y sus colecciones y expone un tipo solo-lectura", () => {
    expect(Object.isFrozen(projects)).toBe(true);
    expect(Object.isFrozen(projects[0])).toBe(true);
    expect(Object.isFrozen(projects[0]?.authors)).toBe(true);
    expect(Object.isFrozen(projects[0]?.architecture)).toBe(true);
    expect(Object.isFrozen(projects[0]?.evaluatedMetrics)).toBe(true);
    expectTypeOf(projects).toEqualTypeOf<readonly Project[]>();
  });
});
