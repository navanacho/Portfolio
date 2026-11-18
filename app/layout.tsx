import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/motion/MotionProvider";

import "./globals.css";
import { jetBrainsMono, plusJakartaSans } from "./fonts";

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
    <html lang="es" className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-text">
        <MotionProvider>
          <Navbar />
          <main className="app-container mx-auto w-full max-w-[1200px] px-5 pb-24 pt-28 sm:px-8 lg:px-8">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
