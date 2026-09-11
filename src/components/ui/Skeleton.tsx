export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.04] ${className}`}
      aria-hidden="true"
    />
  );
}