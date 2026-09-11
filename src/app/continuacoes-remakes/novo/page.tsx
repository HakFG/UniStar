import Header from "@/components/layout/Header";
import RemakeForm from "@/components/remake/RemakeForm";
import { createRemake } from "../actions";

export default function NovoRemakePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-6">
          Novo Remake / Continuação
        </h1>
        <RemakeForm mode="create" onSubmit={createRemake} />
      </div>
    </main>
  );
}