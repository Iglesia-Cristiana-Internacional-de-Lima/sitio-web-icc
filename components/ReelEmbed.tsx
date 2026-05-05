"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Instagram } from "lucide-react";

// TikTok icon component
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

type ReelEmbedProps = {
  platform: "instagram" | "tiktok";
  url: string;
  caption?: string;
  aspect?: "9/16" | "1/1";
  autoplay?: boolean;
  className?: string;
  variant?: "default" | "evolution"; // For Evolution Lima green/gold theme
};

export default function ReelEmbed({
  platform,
  url,
  caption,
  aspect = "9/16",
  autoplay = false,
  className = "",
  variant = "default",
}: ReelEmbedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract embed ID from URL
  const getEmbedUrl = () => {
    if (platform === "instagram") {
      // Handle both /reel/ and /p/ URLs
      const match = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/);
      if (match) {
        return `https://www.instagram.com/${match[1]}/${match[2]}/embed/captioned/`;
      }
    } else if (platform === "tiktok") {
      // Extract video ID from TikTok URL
      const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
      if (match) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
    }
    return null;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const embedUrl = getEmbedUrl();
  const borderColor = variant === "evolution"
    ? "border-[#e2a633]/30"
    : "border-white/10";
  const hoverBorderColor = variant === "evolution"
    ? "hover:border-[#e2a633]/50"
    : "hover:border-white/20";

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg border ${borderColor} ${hoverBorderColor} transition-colors ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Platform label */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
        {platform === "instagram" ? (
          <Instagram size={12} strokeWidth={1.5} className="text-white/80" />
        ) : (
          <TikTokIcon size={12} />
        )}
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/80">
          {platform}
        </span>
      </div>

      {!isVisible ? (
        // Skeleton while not in viewport
        <div className="absolute inset-0 bg-[#191919] animate-pulse" />
      ) : !hasConsented ? (
        // Consent screen
        <div className="absolute inset-0 bg-[#191919] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            {platform === "instagram" ? (
              <Instagram size={28} strokeWidth={1.5} className="text-white/60" />
            ) : (
              <TikTokIcon size={28} />
            )}
          </div>
          <p className="text-white/60 text-xs mb-4 max-w-[200px]">
            Al cargar este contenido aceptas las cookies de {platform === "instagram" ? "Instagram (Meta)" : "TikTok"}
          </p>
          <button
            onClick={() => setHasConsented(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-all"
          >
            <Play size={12} strokeWidth={2} />
            Cargar reel
          </button>
        </div>
      ) : (
        // Embed iframe
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#191919] flex items-center justify-center">
              <div className="flex items-end gap-[2px] h-8 text-white/40">
                {[0.4, 0.7, 1, 0.7, 0.4].map((h, i) => (
                  <span
                    key={i}
                    className="sound-bar"
                    style={{
                      height: `${h * 100}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <iframe
            src={embedUrl || ""}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            allow={autoplay ? "autoplay" : ""}
            onLoad={() => setIsLoaded(true)}
            title={`${platform} reel: ${caption || "Video"}`}
          />
        </>
      )}

      {/* Caption */}
      {caption && isLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent"
        >
          <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
            {caption}
          </p>
        </motion.div>
      )}
    </div>
  );
}
