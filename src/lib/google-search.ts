import { LureResult, SearchProvider } from "./types";

const API_KEY = process.env.GOOGLE_API_KEY ?? "";
const CX = process.env.GOOGLE_CX ?? "";
const GOOGLE_URL = "https://www.googleapis.com/customsearch/v1";

interface GoogleImageItem {
  title: string;
  link: string; // page URL
  image: {
    contextLink: string;
    thumbnailLink: string;
    width: number;
    height: number;
  };
}

interface GoogleResponse {
  items?: GoogleImageItem[];
}

export class GoogleSearchProvider implements SearchProvider {
  async search(query: string): Promise<LureResult[]> {
    if (!API_KEY || !CX) {
      throw new Error("GOOGLE_API_KEY or GOOGLE_CX not configured");
    }

    const fullQuery = `${query} fishing lure`;

    const url = new URL(GOOGLE_URL);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("cx", CX);
    url.searchParams.set("q", fullQuery);
    url.searchParams.set("searchType", "image");
    url.searchParams.set("num", "10");
    url.searchParams.set("imgSize", "large");

    // Do two pages in parallel for more results
    const url2 = new URL(url.toString());
    url2.searchParams.set("start", "11");

    const [res1, res2] = await Promise.all([
      fetch(url.toString()),
      fetch(url2.toString()),
    ]);

    const [data1, data2]: [GoogleResponse, GoogleResponse] = await Promise.all([
      res1.json(),
      res2.json(),
    ]);

    const allItems = [...(data1.items ?? []), ...(data2.items ?? [])];

    return allItems
      .filter((item) => item.image?.width && item.image?.height)
      .map((item, i) => ({
        id: `google-${i}-${Date.now()}`,
        name: item.title || query,
        imageUrl: item.link,
        productUrl: item.image.contextLink,
        aspectRatio: item.image.width / item.image.height,
        tags: query.toLowerCase().split(/\s+/).filter(Boolean),
      }));
  }
}
