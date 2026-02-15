"use client";

import { useCallback, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  compact?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  compact = false,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const q = value.trim();
    if (q) onSearch(q);
  }, [value, onSearch]);

  return (
    <div
      className={`flex items-center w-full bg-lure-surface border border-lure-accent rounded-full overflow-hidden transition-all focus-within:border-lure-accent focus-within:ring-1 focus-within:ring-lure-accent/40 ${
        compact ? "max-w-2xl h-11" : "max-w-2xl h-14"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder='Describe the bait you are looking for ... e.g. "white swim bait"'
        className={`flex-1 bg-transparent outline-none text-lure-text placeholder:text-lure-muted ${
          compact ? "px-5 text-sm" : "px-6 text-base"
        }`}
      />
      <button
        onClick={handleSubmit}
        aria-label="Search"
        className={`flex items-center justify-center bg-lure-accent hover:bg-lure-accent-dim transition-colors text-white ${
          compact ? "w-11 h-11" : "w-14 h-14"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
          <path d="M16 16 l5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
