import { SearchProvider } from "./types";
import { BraveSearchProvider } from "./brave-search";
import { MOCK_LURES } from "./mock-data";
import { LureResult } from "./types";

/**
 * Mock search provider — fallback when no API key is configured.
 */
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

/** The active search provider — uses Brave if API key exists, otherwise mock */
export const searchProvider: SearchProvider = process.env.BRAVE_API_KEY
  ? new BraveSearchProvider()
  : new MockSearchProvider();
