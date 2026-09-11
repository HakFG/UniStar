import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
          <p className="text-text-secondary text-xs">Carregando...</p>
        </div>
      </div>
    </main>
  );
}