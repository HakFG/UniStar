"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  coverUrl: string;
  href: string;
  index?: number;
}

export default function CoverCarouselItem({ title, coverUrl, href, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <Link href={href} className="group block">
        {/* Card wrapper — card-shine-wrapper habilita o reflexo diagonal no hover */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Border shimmer colorida no hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(95,212,208,0.55) 0%, rgba(178,58,110,0.55) 50%, rgba(91,42,134,0.55) 100%)",
              padding: "1.5px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Imagem container com shine + hover effects — sem zoom, lift suave */}
          <div className="card-shine-wrapper relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-surface border border-white/5 shadow-lg shadow-black/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgba(91,42,134,0.55),0_0_0_1px_rgba(95,212,208,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-[filter] duration-500 group-hover:brightness-110 group-hover:saturate-110"
            />
            {/* Overlay gradiente roxo na base no hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-aurora-purple/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        <p className="mt-2 text-[10px] sm:text-xs text-text-secondary truncate text-center group-hover:text-accent transition-colors duration-300">
          {title}
        </p>
      </Link>
    </motion.div>
  );
}
