import { NextRequest, NextResponse } from "next/server";
import { searchProvider } from "@/lib/search-adapter";
import { SearchResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  try {
    const results = await searchProvider.search(query);
    const response: SearchResponse = {
      results,
      query,
      total: results.length,
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 },
    );
  }
}
