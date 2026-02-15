import { NextRequest, NextResponse } from "next/server";
import { searchProvider, providerName } from "@/lib/search-adapter";
import { SearchResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  try {
    const results = await searchProvider.search(query);
    const response: SearchResponse & { provider?: string } = {
      results,
      query,
      total: results.length,
      provider: providerName,
    };
    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Search failed", detail: message, provider: providerName },
      { status: 500 },
    );
  }
}
