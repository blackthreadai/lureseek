import { LureResult, SearchProvider } from "./types";
import { MOCK_LURES } from "./mock-data";

/**
 * Mock search provider — filters lures by matching query terms against
 * the name and tags. Simulates a small network delay.
 */
class MockSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (terms.length === 0) return MOCK_LURES;

    return MOCK_LURES.filter((lure) => {
      const haystack = `${lure.name} ${lure.tags.join(" ")}`.toLowerCase();
      return terms.some((t) => haystack.includes(t));
    });
  }
}

// TODO: Implement real providers:
// - SerpAPISearchProvider (Google image search for fishing lures)
// - AmazonSearchProvider  (Amazon Product Advertising API)
// - TackleWarehouseProvider (scraper / affiliate API)
//
// Each should implement SearchProvider. Swap the active provider below.

/** The active search provider used by the API route */
export const searchProvider: SearchProvider = new MockSearchProvider();
