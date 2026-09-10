export default function AnimeNotesCard({ notas }: { notas: string | null }) {
  if (!notas) return null;

  return (
    <div className="rounded-2xl bg-surface backdrop-blur-md border border-white/10 p-5">
      <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-text-secondary mb-3">
        Notas do Nandão
      </h3>
      <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
        {notas}
      </p>
    </div>
  );
}