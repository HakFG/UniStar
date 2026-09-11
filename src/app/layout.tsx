import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import AuroraBackground from "@/components/home/AuroraBackground";
import { EditorModeProvider } from "@/components/editor/EditorModeContext";
import AuthProvider from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://unistar.vercel.app"
  ),
  title: {
    default: "UniStar",
    template: "%s",
  },
  description: "Animes, mangás e light novels — por Nandão, Heitor e Pedrão",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-base text-text-primary font-body min-h-screen overflow-x-hidden">
        <AuroraBackground />
        <ToastProvider>
          <AuthProvider>
            <EditorModeProvider>
              <div className="relative z-10">{children}</div>
            </EditorModeProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}