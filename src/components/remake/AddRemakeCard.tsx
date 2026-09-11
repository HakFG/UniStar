import Link from "next/link";

export default function AddRemakeCard() {
  return (
    <Link
      href="/continuacoes-remakes/novo"
      className="group flex items-center"
    >
      <div className="flex-1 rounded-full border-2 border-dashed border-white/15 hover:border-accent/60 bg-surface/40 backdrop-blur-sm h-12 sm:h-14 flex items-center justify-center gap-2 transition-colors px-4">
        <span className="text-lg text-text-secondary group-hover:text-accent transition-colors leading-none">
          +
        </span>
        <span className="font-heading font-semibold text-xs text-text-secondary group-hover:text-accent transition-colors">
          Adicionar
        </span>
      </div>
    </Link>
  );
}