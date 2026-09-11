import type { User } from "@prisma/client";

export default function LiderCard({ lider }: { lider: User }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* PNG do personagem/avatar do líder */}
      <div className="relative w-full max-w-[270px] aspect-[4/5] flex items-end justify-center">
        {lider.avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={lider.avatarUrl}
            alt={lider.nome}
            className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none"
          />
        ) : (
          /* Placeholder quando não tem avatar — silhueta */
          <div className="w-full h-full flex items-end justify-center">
            <div
              className="w-[70%] aspect-[3/4] rounded-t-full"
              style={{
                background:
                  "linear-gradient(180deg, #5B2A86 0%, #1B4B5A 100%)",
                opacity: 0.5,
              }}
            />
          </div>
        )}
      </div>

      {/* Card de info do líder */}
      <div className="w-full rounded-2xl bg-surface backdrop-blur-md border border-white/10 px-5 py-4 text-center shadow-xl shadow-black/40">
        <p className="font-heading font-bold text-[10px] uppercase tracking-wider text-accent mb-0.5">
          Líder em pontuação
        </p>
        <p className="font-heading font-bold text-base sm:text-lg mb-3 truncate">
          {lider.nome}
        </p>

        <p className="font-heading text-[9px] uppercase tracking-wider text-text-secondary mb-0.5">
          Pontos atuais
        </p>
        <p className="font-heading font-bold text-2xl sm:text-3xl leading-none text-accent">
          {lider.pontuacao}
        </p>
      </div>
    </div>
  );
}