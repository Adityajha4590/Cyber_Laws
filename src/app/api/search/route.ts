import { NextRequest, NextResponse } from "next/server";
import { SearchService } from "@/services/search-service";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    const results = await SearchService.search(query);
    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("API search error:", error);
    return NextResponse.json(
      { error: "Search query failed", details: error.message },
      { status: 500 }
    );
  }
}
