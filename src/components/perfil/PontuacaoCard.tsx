interface Props {
  pontuacao: number;
}

export default function PontuacaoCard({ pontuacao }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full rounded-full bg-surface backdrop-blur-md border border-white/10 px-4 py-2.5 text-center">
        <h2 className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-wider text-text-primary">
          Pontuação
        </h2>
      </div>

      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-surface border border-white/10 shadow-lg shadow-black/40 flex flex-col items-center justify-center">
        <span className="font-heading font-bold text-2xl sm:text-3xl leading-none text-accent">
          {pontuacao}
        </span>
        <span className="font-heading font-bold text-[9px] sm:text-[10px] uppercase tracking-wider text-text-secondary mt-1">
          Pontos
        </span>
      </div>
    </div>
  );
}