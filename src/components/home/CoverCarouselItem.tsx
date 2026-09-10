interface Props {
  title: string;
  coverUrl: string;
}

export default function CoverCarouselItem({ title, coverUrl }: Props) {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-1.5 text-[11px] sm:text-xs text-text-secondary truncate text-center">
        {title}
      </p>
    </div>
  );
}