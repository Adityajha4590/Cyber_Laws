import { NextRequest, NextResponse } from "next/server";
import { ResearchService } from "@/services/research-service";
import { ResearchQuerySchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ResearchQuerySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const response = await ResearchService.executeResearch(parsed.data);
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("API research assistant error:", error);
    return NextResponse.json(
      { error: "Research processing failed", details: error.message },
      { status: 500 }
    );
  }
}

