import { LureResult, SearchProvider } from "./types";

const BRAVE_API_KEY = process.env.BRAVE_API_KEY ?? "";
const BRAVE_IMAGE_URL = "https://api.search.brave.com/res/v1/images/search";

interface BraveImageResult {
  title: string;
  url: string;          // page URL
  properties: {
    url: string;        // image URL
  };
  thumbnail: {
    src: string;
    width: number;
    height: number;
  };
}

interface BraveImageResponse {
  results: BraveImageResult[];
}

export class BraveSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    if (!BRAVE_API_KEY) {
      throw new Error("BRAVE_API_KEY not configured");
    }

    // Append "fishing lure" to bias results toward lures
    const fullQuery = `${query} fishing lure`;

    const url = new URL(BRAVE_IMAGE_URL);
    url.searchParams.set("q", fullQuery);
    url.searchParams.set("count", "40");
    url.searchParams.set("safesearch", "off");

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip",
        "X-Subscription-Token": BRAVE_API_KEY,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Brave API error ${res.status}: ${text}`);
    }

    const data: BraveImageResponse = await res.json();

    return (data.results ?? [])
      .filter((r) => r.thumbnail?.src && r.thumbnail.width && r.thumbnail.height)
      .map((r, i) => ({
        id: `brave-${i}-${Date.now()}`,
        name: r.title || query,
        imageUrl: r.properties?.url || r.thumbnail.src,
        productUrl: r.url,
        aspectRatio: r.thumbnail.width / r.thumbnail.height,
        tags: query.toLowerCase().split(/\s+/).filter(Boolean),
      }));
  }
}
