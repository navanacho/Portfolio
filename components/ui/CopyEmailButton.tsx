"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";

export function CopyEmailButton() {
  const [feedback, setFeedback] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setFeedback("Correo copiado al portapapeles");
    } catch {
      setFeedback("No se pudo copiar el correo");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar correo ${profile.contact.email}`}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/10 px-4 py-2 text-sm text-text transition-colors hover:text-primary"
      >
        <Copy aria-hidden="true" size={16} />
        <span>Copiar correo</span>
      </button>
      <span role="status" aria-live="polite" className="text-sm text-text-muted">
        {feedback}
      </span>
    </>
  );
}
