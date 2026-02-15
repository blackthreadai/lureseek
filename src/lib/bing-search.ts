import { LureResult, SearchProvider } from "./types";

/**
 * Bing image search scraper — no API key needed.
 * Parses the HTML response from Bing Images.
 */
export class BingSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    const fullQuery = `${query} fishing lure`;
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(fullQuery)}&first=1&count=40&qft=+filterui:photo-photo`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) {
      throw new Error(`Bing search failed: ${res.status}`);
    }

    const html = await res.text();

    // Bing embeds image metadata in "m" attributes as JSON
    const results: LureResult[] = [];
    const mRegex = /m="({[^"]*?})"/g;
    let match;

    while ((match = mRegex.exec(html)) !== null && results.length < 40) {
      try {
        // Bing HTML-encodes the JSON in the m attribute
        const jsonStr = match[1]
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");

        const data = JSON.parse(jsonStr);

        if (data.murl && data.turl) {
          results.push({
            id: `bing-${results.length}-${Date.now()}`,
            name: data.t || query,
            imageUrl: data.murl,       // full-size image
            productUrl: data.purl || data.murl,
            aspectRatio: (data.mw && data.mh) ? data.mw / data.mh : 1.33,
            tags: query.toLowerCase().split(/\s+/).filter(Boolean),
          });
        }
      } catch {
        // Skip malformed entries
      }
    }

    return results;
  }
}
