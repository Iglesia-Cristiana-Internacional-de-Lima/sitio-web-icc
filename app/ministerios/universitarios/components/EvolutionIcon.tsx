"use client";

import Image from "next/image";

type EvolutionIconProps = {
  size?: number;
  className?: string;
};

export default function EvolutionIcon({
  size = 40,
  className = "",
}: EvolutionIconProps) {
  return (
    <Image
      src="/images/evolution-lima.jpg"
      alt="Evolution Lima"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
