export default function AnimeNotesCard({ notas }: { notas: string | null }) {
  if (!notas) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 relative">
      {/* Fundo com gradiente editorial magenta */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(178,58,110,0.12) 0%, rgba(91,42,134,0.08) 60%, transparent 100%)",
        }}
      />
      <div className="relative bg-surface/80 backdrop-blur-md p-5">
        {/* Titulo com acento magenta */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-aurora-magenta to-aurora-purple shrink-0" />
          <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-text-secondary">
            Notas do Nandao
          </h3>
        </div>

        {/* Aspas decorativas */}
        <div
          className="text-4xl font-heading leading-none mb-1 select-none"
          style={{ color: "rgba(178,58,110,0.35)" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
          {notas}
        </p>

        {/* Fechamento das aspas */}
        <div
          className="text-4xl font-heading leading-none mt-1 text-right select-none"
          style={{ color: "rgba(178,58,110,0.35)" }}
          aria-hidden="true"
        >
          &rdquo;
        </div>
      </div>
    </div>
  );
}
