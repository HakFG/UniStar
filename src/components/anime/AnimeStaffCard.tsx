import type { Anime } from "@prisma/client";

const FIELDS: { key: keyof Anime; label: string }[] = [
  { key: "estudio", label: "Estúdio" },
  { key: "diretor", label: "Diretor" },
  { key: "characterDesign", label: "Character Design" },
  { key: "compositor", label: "Compositor" },
  { key: "adaptador", label: "Adaptador" },
];

export default function AnimeStaffCard({ anime }: { anime: Anime }) {
  const hasAny = FIELDS.some((f) => anime[f.key]);
  if (!hasAny) return null;

  return (
    <div className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-5">
      <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-text-secondary mb-3">
        Staff
      </h3>
      <ul className="flex flex-col gap-1.5 text-sm">
        {FIELDS.map((f) => {
          const value = anime[f.key];
          if (!value) return null;
          return (
            <li key={String(f.key)} className="flex gap-2">
              <span className="text-text-secondary shrink-0">{f.label}:</span>
              <span className="text-text-primary">{String(value)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}