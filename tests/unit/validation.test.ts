import { describe, it, expect } from "vitest";
import {
  CrimeCreateSchema,
  ComparisonRequestSchema,
  ResearchQuerySchema,
} from "@/lib/validation/schemas";

describe("Zod Validation Schemas", () => {
  it("validates comparison request correctly", () => {
    const valid = ComparisonRequestSchema.safeParse({
      crimeSlug: "unauthorized-computer-access",
      countryCodes: ["IN", "US"],
    });
    expect(valid.success).toBe(true);

    const invalid = ComparisonRequestSchema.safeParse({
      crimeSlug: "",
      countryCodes: [],
    });
    expect(invalid.success).toBe(false);
  });

  it("validates research assistant query correctly", () => {
    const valid = ResearchQuerySchema.safeParse({
      query: "What is the penalty for DDoS in the US?",
    });
    expect(valid.success).toBe(true);

    const tooShort = ResearchQuerySchema.safeParse({
      query: "a",
    });
    expect(tooShort.success).toBe(false);
  });
});

