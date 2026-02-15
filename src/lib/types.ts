/** A single fishing lure search result */
export interface LureResult {
  id: string;
  name: string;
  imageUrl: string;
  productUrl: string;
  /** Aspect ratio hint (width / height) for masonry layout */
  aspectRatio: number;
  tags: string[];
}

/** Shape returned by the search API */
export interface SearchResponse {
  results: LureResult[];
  query: string;
  total: number;
}

/** Interface every search provider must implement */
export interface SearchProvider {
  search(query: string): Promise<LureResult[]>;
}
