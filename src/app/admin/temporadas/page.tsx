import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import { getCurrentUser } from "@/lib/session";
import { getTodasTemporadas } from "@/lib/temporadas";
import TemporadasAdminList from "@/components/admin/TemporadasAdminList";

export default async function AdminTemporadasPage() {
  const user = await getCurrentUser();
  if (user.username !== "nandao") {
    redirect("/");
  }

  const temporadas = await getTodasTemporadas();

  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-none">
            Temporadas
          </h1>
          <p className="text-text-secondary text-xs sm:text-sm mt-1">
            Gerencie qual é a temporada atual e adicione novas
          </p>
        </div>

        <TemporadasAdminList temporadas={temporadas} />
      </div>
    </main>
  );
}