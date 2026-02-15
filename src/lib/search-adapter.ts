import { SearchProvider } from "./types";
import { BraveSearchProvider } from "./brave-search";
import { GoogleSearchProvider } from "./google-search";
import { MOCK_LURES } from "./mock-data";
import { LureResult } from "./types";

/**
 * Mock search provider — fallback when no API keys are configured.
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

/** Pick the best available provider */
function pickProvider(): SearchProvider {
  if (process.env.GOOGLE_API_KEY && process.env.GOOGLE_CX) {
    return new GoogleSearchProvider();
  }
  if (process.env.BRAVE_API_KEY) {
    return new BraveSearchProvider();
  }
  return new MockSearchProvider();
}

export const searchProvider: SearchProvider = pickProvider();
export const providerName: string = process.env.GOOGLE_API_KEY && process.env.GOOGLE_CX
  ? "google"
  : process.env.BRAVE_API_KEY
    ? "brave"
    : "mock";
