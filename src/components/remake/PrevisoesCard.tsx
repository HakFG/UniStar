import { GRUPO_USERS } from "@/lib/constants";

interface Previsao {
  username: string;
  data: string;
}

export default function PrevisoesCard({
  previsoes,
}: {
  previsoes: Previsao[];
}) {
  return (
    <div className="rounded-3xl bg-surface backdrop-blur-md border border-white/10 px-6 py-8 shadow-lg shadow-black/30">
      <h3 className="font-heading font-bold text-base sm:text-lg uppercase tracking-wider text-text-primary mb-6 text-center">
        Previsão
      </h3>

      <ul className="flex flex-col gap-4">
        {GRUPO_USERS.map((u) => {
          const p = previsoes.find((x) => x.username === u.username);
          return (
            <li
              key={u.username}
              className="text-center font-heading font-bold text-sm sm:text-base leading-tight"
            >
              <span className="text-text-primary">{u.nome}: </span>
              <span className={p?.data ? "text-accent" : "text-text-secondary"}>
                {p?.data ?? "—"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}