import type { Anime } from "@prisma/client";

const FIELDS: { key: keyof Anime; label: string; icon: string }[] = [
  { key: "estudio",        label: "Estudio",          icon: "🏢" },
  { key: "diretor",        label: "Direcao",          icon: "🎬" },
  { key: "characterDesign",label: "Character Design", icon: "✏️" },
  { key: "compositor",     label: "Composicao",       icon: "🎵" },
  { key: "adaptador",      label: "Adaptacao",        icon: "📖" },
];

export default function AnimeStaffCard({ anime }: { anime: Anime }) {
  const hasAny = FIELDS.some((f) => anime[f.key]);
  if (!hasAny) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 relative">
      {/* Gradiente de fundo no topo do card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,42,134,0.18) 0%, rgba(27,75,90,0.10) 50%, transparent 100%)",
        }}
      />
      <div className="relative bg-surface/80 backdrop-blur-md p-5">
        {/* Titulo com linha decorativa */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-accent to-aurora-magenta shrink-0" />
          <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-text-secondary">
            Staff
          </h3>
        </div>

        <ul className="flex flex-col gap-3">
          {FIELDS.map((f) => {
            const value = anime[f.key];
            if (!value) return null;
            return (
              <li key={String(f.key)} className="flex items-start gap-2.5 group/item">
                {/* Icone */}
                <span className="text-sm mt-0.5 shrink-0 opacity-70">{f.icon}</span>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-wider text-text-secondary font-heading font-semibold mb-0.5">
                    {f.label}
                  </p>
                  <p className="text-sm text-text-primary leading-snug">
                    {String(value)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
