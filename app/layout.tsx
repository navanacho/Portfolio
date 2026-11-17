import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";
import { inter, jetBrainsMono } from "./fonts";

const title = "Ignacio Navarria | Software Developer & Data Analyst";
const description =
  "Portafolio de Ignacio Navarria, Software Developer & Data Analyst: experiencia, habilidades y proyectos.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_ES",
    images: [{ url: "/assets/images/avatar.png", alt: "Retrato de Ignacio Navarria" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-text">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
