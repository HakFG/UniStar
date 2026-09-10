import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import AuroraBackground from "@/components/home/AuroraBackground";
import { EditorModeProvider } from "@/components/editor/EditorModeContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UniStar",
  description: "Animes, mangás e light novels — por Nandão, Heitor e Pedrão",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-base text-text-primary font-body min-h-screen overflow-x-hidden">
        <AuroraBackground />
        <EditorModeProvider>
          <div className="relative z-10">{children}</div>
        </EditorModeProvider>
      </body>
    </html>
  );
}