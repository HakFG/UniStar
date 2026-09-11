import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import AuroraBackground from "@/components/home/AuroraBackground";
import { EditorModeProvider } from "@/components/editor/EditorModeContext";
import AuthProvider from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import StarField from "@/components/home/StarField";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
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
    <html lang="pt-BR" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="bg-base text-text-primary font-body min-h-screen overflow-x-hidden">
        <AuroraBackground />
        <StarField />                    {/* ← AQUI — a linha que faltava */}
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