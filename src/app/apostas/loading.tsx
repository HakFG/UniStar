import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10 items-start">
          <Skeleton className="h-72 rounded-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-9 rounded-full" />
                <div className="grid grid-cols-3 gap-2 max-w-[70%] mx-auto w-full">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="aspect-[3/4] rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}