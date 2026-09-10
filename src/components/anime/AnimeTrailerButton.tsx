export default function AnimeTrailerButton({ url }: { url: string | null }) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-full bg-accent hover:bg-accent/90 text-base font-heading font-semibold text-center px-6 py-3 text-sm transition-colors"
    >
      ▶ Assistir Trailer
    </a>
  );
}