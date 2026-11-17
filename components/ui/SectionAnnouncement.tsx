interface SectionAnnouncementProps {
  readonly label: string;
}

export function SectionAnnouncement({ label }: SectionAnnouncementProps) {
  return (
    <span role="status" aria-label="Sección activa" aria-live="polite" className="sr-only">
      Sección activa: {label}
    </span>
  );
}
