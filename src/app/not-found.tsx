import Link from "next/link";
import Header from "@/components/layout/Header";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="flex flex-col items-center justify-center py-24 sm:py-32 px-4 text-center">
        <p className="font-heading font-bold text-[100px] sm:text-[160px] leading-none text-accent/15 select-none">
          404
        </p>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl -mt-4 sm:-mt-8 mb-3">
          Página não encontrada
        </h1>
        <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
          Essa página não existe (ou foi removida). Talvez você tenha clicado
          num link antigo ou digitado o endereço errado.
        </p>
        <Link
          href="/"
          className="rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold px-6 py-3 text-sm transition-colors"
        >
          Voltar pra Home
        </Link>
      </div>
    </main>
  );
}