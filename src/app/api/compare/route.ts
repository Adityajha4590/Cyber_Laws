import { NextRequest, NextResponse } from "next/server";
import { ComparisonService } from "@/services/comparison-service";
import { ComparisonRequestSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ComparisonRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.format() },
        { status: 400 }
      );
    }

    const { crimeSlug, countryCodes } = parsed.data;
    const comparison = await ComparisonService.compareCrimeAcrossCountries(
      crimeSlug,
      countryCodes
    );

    if (!comparison) {
      return NextResponse.json(
        { error: "Specified cybercrime not found in database catalogue" },
        { status: 404 }
      );
    }

    return NextResponse.json({ comparison });
  } catch (error: any) {
    console.error("API comparison error:", error);
    return NextResponse.json(
      { error: "Comparison failed", details: error.message },
      { status: 500 }
    );
  }
}

