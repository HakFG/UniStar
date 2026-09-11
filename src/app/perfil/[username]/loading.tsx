import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 sm:py-7">
        {/* Row 1 */}
        <Skeleton className="h-64 rounded-3xl mb-5" />

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] gap-5">
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl md:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </main>
  );
}