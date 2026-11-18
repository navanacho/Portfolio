"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";

const SUCCESS_MESSAGE = "Correo copiado al portapapeles";
const ERROR_MESSAGE = "No se pudo copiar el correo";

async function writeWithClipboardApi(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function writeWithLegacyCopy(value: string): boolean {
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  } catch {
    return false;
  }
}

async function copyToClipboard(value: string): Promise<boolean> {
  if (await writeWithClipboardApi(value)) {
    return true;
  }
  return writeWithLegacyCopy(value);
}

export function CopyEmailButton() {
  const [feedback, setFeedback] = useState("");

  const handleCopy = async () => {
    const copied = await copyToClipboard(profile.contact.email);
    setFeedback(copied ? SUCCESS_MESSAGE : ERROR_MESSAGE);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar correo ${profile.contact.email}`}
        className="inline-flex items-center gap-2 rounded-full border border-warm-strong/50 bg-warm/10 px-4 py-2 text-sm text-warm transition-colors hover:bg-warm/20"
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
