"use client";

import { LureResult } from "@/lib/types";
import ImageCard from "./ImageCard";

interface MasonryGridProps {
  results: LureResult[];
  loading: boolean;
}

function SkeletonGrid() {
  // Generate varied skeleton heights
  const heights = [280, 350, 240, 400, 300, 320, 380, 260, 340, 290, 360, 310];

  return (
    <div className="masonry">
      {heights.map((h, i) => (
        <div
          key={i}
          className="masonry-item skeleton rounded-xl"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default function MasonryGrid({ results, loading }: MasonryGridProps) {
  if (loading) return <SkeletonGrid />;

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-lure-muted">
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 opacity-40" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 16 l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm">No lures found. Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="masonry">
      {results.map((lure) => (
        <ImageCard key={lure.id} lure={lure} />
      ))}
    </div>
  );
}
