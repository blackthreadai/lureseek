"use client";

import { useState, useCallback } from "react";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import MasonryGrid from "@/components/MasonryGrid";
import { LureResult, SearchResponse } from "@/lib/types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LureResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (q: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: SearchResponse = await res.json();
      setResults(data.results);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Landing state: centered logo + search
  if (!searched) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
        <Logo size="lg" />
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />
      </main>
    );
  }

  // Results state: top bar + grid
  return (
    <main className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-lure-bg/80 backdrop-blur-md border-b border-lure-border">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">
          <button onClick={() => { setSearched(false); setResults(null); setQuery(""); }}>
            <Logo size="sm" />
          </button>
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
              compact
            />
          </div>
        </div>
      </header>

      {/* Results grid */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
        <MasonryGrid results={results ?? []} loading={loading} />
      </div>
    </main>
  );
}
