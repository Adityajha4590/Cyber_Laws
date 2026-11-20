import { describe, it, expect } from "vitest";
import { ComparisonService } from "@/services/comparison-service";

describe("ComparisonService", () => {
  it("should return null for non-existent cybercrime slug", async () => {
    const res = await ComparisonService.compareCrimeAcrossCountries("non-existent-crime", ["IN", "US"]);
    expect(res).toBeNull();
  });

  it("should generate side-by-side comparison for valid crime and jurisdictions", async () => {
    const res = await ComparisonService.compareCrimeAcrossCountries(
      "unauthorized-computer-access",
      ["IN", "US", "GB", "SG"]
    );

    expect(res).not.toBeNull();
    expect(res?.crime.name).toBe("Unauthorized Computer Access");
    expect(res?.countries.length).toBe(4);
    expect(res?.matrix.length).toBe(4);

    // Verify India entry
    const india = res?.matrix.find((m) => m.countryCode === "IN");
    expect(india).toBeDefined();
    expect(india?.legislationTitle).toContain("Information Technology Act");
    expect(india?.sectionNumber).toContain("Section 66");
    expect(india?.status).toBe("IN_FORCE");
    expect(india?.coverageStatus).toBe("EXPLICITLY_REGULATED");

    // Verify US entry
    const us = res?.matrix.find((m) => m.countryCode === "US");
    expect(us).toBeDefined();
    expect(us?.legislationTitle).toContain("Computer Fraud and Abuse Act");
    expect(us?.sectionNumber).toContain("18 U.S.C. § 1030");

    // Verify methodology notes present
    expect(res?.methodologyNotes.length).toBeGreaterThan(0);
  });
});

