"use client";

import { useEffect, useState } from "react";
import CoverCarouselItem from "./CoverCarouselItem";

const CURRENT_SEASON = "Inverno 2026";

const MOCK_ANIMES = [
  { id: "1", title: "Frieren",         coverUrl: "https://placehold.co/300x420/1B4B5A/F1F0F5?text=Frieren" },
  { id: "2", title: "Solo Leveling",   coverUrl: "https://placehold.co/300x420/5B2A86/F1F0F5?text=Solo+Leveling" },
  { id: "3", title: "Jujutsu Kaisen",  coverUrl: "https://placehold.co/300x420/B23A6E/F1F0F5?text=JJK" },
  { id: "4", title: "Chainsaw Man",    coverUrl: "https://placehold.co/300x420/1B4B5A/F1F0F5?text=Chainsaw+Man" },
  { id: "5", title: "Mashle",          coverUrl: "https://placehold.co/300x420/5B2A86/F1F0F5?text=Mashle" },
  { id: "6", title: "Blue Lock",       coverUrl: "https://placehold.co/300x420/B23A6E/F1F0F5?text=Blue+Lock" },
];

const GROUP_SIZE = 3;
const ROTATE_MS = 6000;

export default function SeasonHighlight() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => {
      setStartIndex((i) => (i + GROUP_SIZE) % MOCK_ANIMES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: GROUP_SIZE }, (_, k) => {
    return MOCK_ANIMES[(startIndex + k) % MOCK_ANIMES.length];
  });

  return (
    <section>
      <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl mb-0.5 text-text-primary leading-none">
        {CURRENT_SEASON}
      </h2>
      <p className="text-text-secondary text-[11px] sm:text-xs mb-3">
        Destaques da temporada atual
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {visible.map((a) => (
          <CoverCarouselItem key={a.id} title={a.title} coverUrl={a.coverUrl} />
        ))}
      </div>
    </section>
  );
}