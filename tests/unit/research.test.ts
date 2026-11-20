import { describe, it, expect } from "vitest";
import { ResearchService } from "@/services/research-service";

describe("AI Legal Research Assistant Pipeline", () => {
  it("should answer query with structured legal analysis and verified citations", async () => {
    const res = await ResearchService.executeResearch({
      query: "What is the punishment for phishing in India?",
    });

    expect(res).toBeDefined();
    expect(res.directAnswer).toContain("India");
    expect(res.countryAnalysis.length).toBeGreaterThan(0);
    expect(res.countryAnalysis[0].countryName).toBe("India");
    expect(res.countryAnalysis[0].applicableLegislation).toContain("Information Technology Act");

    // Verify non-fabricated primary citations are attached
    expect(res.citations.length).toBeGreaterThan(0);
    expect(res.citations[0].url).toMatch(/^https?:\/\//);
    expect(res.citations[0].organization).toBeTruthy();

    // Verify legal disclaimer and verification status
    expect(res.verificationStatus).toBe("SOURCE_VERIFIED");
    expect(res.disclaimer).toContain("not constitute formal legal advice");
  });

  it("should identify legal gaps for AI cybercrime inquiries", async () => {
    const res = await ResearchService.executeResearch({
      query: "What are the legal gaps regarding AI deepfake fraud in the UK?",
    });

    expect(res).toBeDefined();
    expect(res.citations.length).toBeGreaterThan(0);
  });
});
