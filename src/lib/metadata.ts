import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://unistar.vercel.app";

interface BuildMetadataProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  image,
  path,
}: BuildMetadataProps): Metadata {
  const fullTitle = `${title} · UniStar`;
  const desc =
    description ?? "Animes, mangás e light novels — por Nandão, Heitor e Pedrão";
  const url = path ? `${BASE_URL}${path}` : BASE_URL;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: "UniStar",
      images: image ? [{ url: image }] : [],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: image ? [image] : [],
    },
  };
}