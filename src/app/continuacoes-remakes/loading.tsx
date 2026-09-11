import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-10">
        <Skeleton className="h-10 w-80 mb-3" />
        <Skeleton className="h-5 w-64 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <Skeleton className="w-24 h-32 rounded-lg shrink-0 z-10" />
              <Skeleton className="-ml-6 flex-1 h-12 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}