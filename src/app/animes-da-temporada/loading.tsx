import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 sm:py-7">
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-36 sm:h-44 md:h-52 rounded-2xl mb-6 sm:mb-8" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/4] w-full rounded-xl" />
              <Skeleton className="h-3 w-3/4 mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}