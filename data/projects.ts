import type { ArchitectureNode, Project } from "@/types/content";

export type { ArchitectureNode, Project };

const architecture: readonly ArchitectureNode[] = Object.freeze(
  [
    {
      label: "Captura",
      detail: "Honeypots Cowrie y Dionaea desplegados con Docker para capturar ataques reales.",
    },
    {
      label: "Orquestación",
      detail: "n8n automatiza el análisis de los eventos capturados.",
    },
    {
      label: "Enriquecimiento",
      detail: "AbuseIPDB, Shodan, VirusTotal y WhoisFreaks mediante credenciales configuradas en n8n.",
    },
    {
      label: "Persistencia",
      detail: "PostgreSQL guarda los eventos y su enriquecimiento.",
    },
    {
      label: "Visualización",
      detail: "Grafana con cuatro paneles: SOC Overview, MITRE ATT&CK, geo-origen y Malware/IoC.",
    },
    {
      label: "Consola SOC",
      detail: "SPA en React con FastAPI y nginx, actualizaciones SSE e integración con tickets GLPI.",
    },
  ].map((node): ArchitectureNode => Object.freeze(node)),
);

const thesis: Project = Object.freeze({
  title: "Tesis de Grado — Orquestación de Honeypots Research con n8n",
  authors: Object.freeze(["Ignacio Navarria", "Germán Marino"]),
  repository: "https://github.com/germarino18/Automatizacion_con_Honeypots_Tesis.git",
  summary:
    "Arquitectura distribuida para capturar ataques reales, automatizar el análisis de eventos y enriquecer la inteligencia de amenazas con n8n, Cowrie, Dionaea, PostgreSQL y Grafana.",
  tags: Object.freeze(["Tesis de Grado", "Honeypots", "n8n"]),
  tech: Object.freeze([
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
  ]),
  architecture,
  objectives: Object.freeze([
    "Capturar ataques reales",
    "Automatizar el análisis de eventos",
    "Enriquecer la inteligencia de amenazas",
    "Reducir MTTD y MTTR",
    "Correlacionar con MITRE ATT&CK",
    "Generar inteligencia táctica",
  ]),
  evaluatedMetrics: Object.freeze([
    "MTTD",
    "MTTR",
    "Cobertura MITRE ATT&CK",
    "Tasa de falsos positivos",
    "Técnicas identificadas",
  ]),
  security: Object.freeze([
    "Segmentación de red efectiva verificada empíricamente",
    "Firewall-agente con tres capas",
    "Secretos no servidos por HTTP",
    "Diseño fail-open",
  ]),
  dashboards: Object.freeze(["SOC Overview", "MITRE ATT&CK", "geo-origen", "Malware/IoC"]),
});

export const projects: readonly Project[] = Object.freeze([thesis]);
