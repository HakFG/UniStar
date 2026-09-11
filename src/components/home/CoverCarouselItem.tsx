import Link from "next/link";

interface Props {
  title: string;
  coverUrl: string;
  href: string;
}

export default function CoverCarouselItem({ title, coverUrl, href }: Props) {
  return (
    <Link href={href} className="group block">
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-[1.02]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-[10px] sm:text-xs text-text-secondary truncate text-center group-hover:text-accent transition-colors">
        {title}
      </p>
    </Link>
  );
}