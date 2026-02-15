import { LureResult, SearchProvider } from "./types";

/**
 * Uses DuckDuckGo image search (no API key needed).
 * We fetch via the DDG instant answer + image proxy endpoint.
 */
export class DuckDuckGoSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    const fullQuery = `${query} fishing lure`;

    // DDG image search via their vqd token flow
    // Step 1: Get vqd token
    const tokenRes = await fetch(
      `https://duckduckgo.com/?q=${encodeURIComponent(fullQuery)}`,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; LureSeek/1.0)" } }
    );
    const html = await tokenRes.text();
    const vqdMatch = html.match(/vqd=["']([^"']+)["']/)?.[1] 
      ?? html.match(/vqd=([\d-]+)/)?.[1];

    if (!vqdMatch) {
      throw new Error("Could not get DDG search token");
    }

    // Step 2: Fetch images
    const imageUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(fullQuery)}&vqd=${vqdMatch}&f=,,,,,&p=1`;
    const imgRes = await fetch(imageUrl, {
      headers: { 
        "User-Agent": "Mozilla/5.0 (compatible; LureSeek/1.0)",
        "Referer": "https://duckduckgo.com/"
      },
    });

    if (!imgRes.ok) {
      throw new Error(`DDG image search failed: ${imgRes.status}`);
    }

    const data = await imgRes.json();

    interface DDGResult {
      title?: string;
      image?: string;
      url?: string;
      width?: number;
      height?: number;
    }

    return ((data.results ?? []) as DDGResult[])
      .filter((r) => r.image && r.width && r.height)
      .slice(0, 40)
      .map((r, i) => ({
        id: `ddg-${i}-${Date.now()}`,
        name: r.title || query,
        imageUrl: r.image!,
        productUrl: r.url || "#",
        aspectRatio: (r.width || 1) / (r.height || 1),
        tags: query.toLowerCase().split(/\s+/).filter(Boolean),
      }));
  }
}
