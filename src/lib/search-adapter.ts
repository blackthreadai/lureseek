import { SearchProvider } from "./types";
import { BraveSearchProvider } from "./brave-search";
import { GoogleSearchProvider } from "./google-search";
import { DuckDuckGoSearchProvider } from "./serper-search";
import { MOCK_LURES } from "./mock-data";
import { LureResult } from "./types";

class MockSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return MOCK_LURES;
    return MOCK_LURES.filter((lure) => {
      const haystack = `${lure.name} ${lure.tags.join(" ")}`.toLowerCase();
      return terms.some((t) => haystack.includes(t));
    });
  }
}

/** Pick the best available provider — DDG as default (no keys needed) */
function pickProvider(): [SearchProvider, string] {
  if (process.env.GOOGLE_API_KEY && process.env.GOOGLE_CX) {
    return [new GoogleSearchProvider(), "google"];
  }
  if (process.env.BRAVE_API_KEY) {
    return [new BraveSearchProvider(), "brave"];
  }
  // DuckDuckGo — no API key needed
  return [new DuckDuckGoSearchProvider(), "duckduckgo"];
}

const [provider, name] = pickProvider();
export const searchProvider: SearchProvider = provider;
export const providerName: string = name;
