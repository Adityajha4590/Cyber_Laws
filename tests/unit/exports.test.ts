import { describe, it, expect } from "vitest";
import { generateComparisonCSV } from "@/lib/exports/csv-export";
import { ComparisonService } from "@/services/comparison-service";

describe("Export Formatter", () => {
  it("should generate valid escaped CSV text for comparison data", async () => {
    const comparison = await ComparisonService.compareCrimeAcrossCountries(
      "unauthorized-computer-access",
      ["IN", "US"]
    );
    expect(comparison).not.toBeNull();

    const csv = generateComparisonCSV(comparison!);
    expect(csv).toContain("Country,Country Code,Crime Name");
    expect(csv).toContain('"India","IN"');
    expect(csv).toContain('"United States","US"');
  });
});

