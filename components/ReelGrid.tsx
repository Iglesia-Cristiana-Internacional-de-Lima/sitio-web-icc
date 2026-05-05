"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReelEmbed from "./ReelEmbed";

type Reel = {
  platform: "instagram" | "tiktok";
  url: string;
  caption?: string;
};

type ReelGridProps = {
  reels: Reel[];
  layout?: "carousel" | "grid-3" | "marquee";
  variant?: "default" | "evolution";
  maxActive?: number; // Max iframes loaded at once
};

export default function ReelGrid({
  reels,
  layout = "carousel",
  variant = "default",
  maxActive = 3,
}: ReelGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set([0, 1, 2]));

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  // Track which reels are visible for performance optimization
  useEffect(() => {
    if (layout !== "carousel" || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveIndices((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(index);
                // Limit active iframes
                if (next.size > maxActive) {
                  const arr = Array.from(next);
                  next.delete(arr[0]);
                }
              }
              return next;
            });
          }
        });
      },
      { root: scrollRef.current, threshold: 0.5 }
    );

    const items = scrollRef.current.querySelectorAll("[data-index]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [layout, maxActive]);

  if (layout === "carousel") {
    return (
      <div className="relative group">
        {/* Scroll buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/80 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        )}

        {/* Carousel container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reels.map((reel, i) => (
            <motion.div
              key={i}
              data-index={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              {activeIndices.has(i) ? (
                <ReelEmbed
                  platform={reel.platform}
                  url={reel.url}
                  caption={reel.caption}
                  variant={variant}
                />
              ) : (
                <div
                  className="bg-[#191919] rounded-lg border border-white/10"
                  style={{ aspectRatio: "9/16" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const itemWidth = 320 + 16; // width + gap
                  scrollRef.current.scrollTo({
                    left: i * itemWidth,
                    behavior: "smooth",
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndices.has(i) ? "bg-white" : "bg-white/30"
              }`}
              aria-label={`Ir a reel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "grid-3") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reels.slice(0, 6).map((reel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ReelEmbed
              platform={reel.platform}
              url={reel.url}
              caption={reel.caption}
              variant={variant}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  if (layout === "marquee") {
    return (
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-scroll-x">
          {[...reels, ...reels].map((reel, i) => (
            <div key={i} className="shrink-0 w-[280px]">
              <ReelEmbed
                platform={reel.platform}
                url={reel.url}
                caption={reel.caption}
                variant={variant}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
