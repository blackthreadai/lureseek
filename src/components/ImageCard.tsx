"use client";

import { useState } from "react";
import { LureResult } from "@/lib/types";

interface ImageCardProps {
  lure: LureResult;
}

export default function ImageCard({ lure }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <a
      href={lure.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="masonry-item block rounded-xl overflow-hidden group relative"
    >
      {/* Aspect-ratio placeholder */}
      <div
        style={{ paddingBottom: `${(1 / lure.aspectRatio) * 100}%` }}
        className="relative w-full"
      >
        {!loaded && (
          <div className="absolute inset-0 skeleton rounded-xl" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lure.imageUrl}
          alt={lure.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Subtle hover overlay with name */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-xs font-medium drop-shadow-lg">
            {lure.name}
          </span>
        </div>
      </div>
    </a>
  );
}
