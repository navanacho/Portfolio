export interface Identity {
  readonly name: string;
  readonly handle: string;
  readonly roles: readonly string[];
}

export interface ContactInfo {
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
  readonly cv: string;
}

export interface ExperienceEntry {
  readonly period: string;
  readonly role: string;
}

export interface EducationEntry {
  readonly period: string;
  readonly title: string;
  readonly status?: string;
}

export interface ArchitectureNode {
  readonly label: string;
  readonly detail: string;
}

export interface Project {
  readonly title: string;
  readonly authors: readonly string[];
  readonly repository: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly tech: readonly string[];
  readonly architecture: readonly ArchitectureNode[];
  readonly objectives: readonly string[];
  readonly evaluatedMetrics: readonly string[];
  readonly security: readonly string[];
  readonly dashboards: readonly string[];
}

export interface Profile {
  readonly identity: Identity;
  readonly bio: string;
  readonly contact: ContactInfo;
  readonly experience: readonly ExperienceEntry[];
  readonly education: readonly EducationEntry[];
  readonly stack: readonly string[];
  readonly tools: readonly string[];
}
