"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Instagram } from "lucide-react";

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

type Reel = {
  platform: "instagram" | "tiktok";
  url: string;
  caption?: string;
};

type ReelGridProps = {
  reels: Reel[];
  layout?: "carousel" | "grid-3" | "marquee";
  variant?: "default" | "evolution";
};

function ReelCard({ reel, index, variant = "default" }: { reel: Reel; index: number; variant?: "default" | "evolution" }) {
  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-lg block cursor-pointer w-full ${
        variant === "evolution" ? "border border-[#e2a633]/20" : ""
      }`}
      style={{ aspectRatio: "3/5" }}
    >
      <div className="absolute inset-0 bg-[#1a1a1a]" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Platform badge */}
      <div className={`absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${
        variant === "evolution" ? "bg-[#e2a633]/20" : "bg-white/10"
      }`}>
        {reel.platform === "instagram" ? (
          <Instagram size={12} strokeWidth={1.5} className="text-white/80" />
        ) : (
          <TikTokIcon size={12} />
        )}
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/80">
          {reel.platform}
        </span>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${
          variant === "evolution" ? "bg-[#e2a633]/90 text-[#093b18]" : "bg-white/15 text-white/80 group-hover:bg-white/25"
        }`}>
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </div>
      </div>

      {/* Caption */}
      {reel.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
            {reel.caption}
          </p>
        </div>
      )}
    </motion.a>
  );
}

export default function ReelGrid({
  reels,
  layout = "carousel",
  variant = "default",
}: ReelGridProps) {
  const cardsPerPage = 3;
  const totalPages = Math.ceil(reels.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const pages: Reel[][] = [];
  for (let i = 0; i < reels.length; i += cardsPerPage) {
    pages.push(reels.slice(i, i + cardsPerPage));
  }

  if (layout === "carousel") {
    return (
      <div className="relative max-w-[900px] mx-auto">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            className="absolute -left-3 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="absolute -right-3 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        )}

        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pages.map((page, pageIdx) => (
              <div key={pageIdx} className="grid grid-cols-3 gap-1 min-w-full shrink-0">
                {page.map((reel, i) => (
                  <ReelCard key={i} reel={reel} index={pageIdx * cardsPerPage + i} variant={variant} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === i ? "bg-[var(--fg)]" : "bg-[var(--fg-30)]"
              }`}
              aria-label={`Ir a página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "grid-3") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {reels.slice(0, 6).map((reel, i) => (
          <div key={i} className="w-full">
            <ReelCard reel={reel} index={i} variant={variant} />
          </div>
        ))}
      </div>
    );
  }

  if (layout === "marquee") {
    return (
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-scroll-x">
          {[...reels, ...reels].map((reel, i) => (
            <div key={i} className="shrink-0 w-[140px] md:w-[180px]">
              <ReelCard reel={reel} index={i} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
