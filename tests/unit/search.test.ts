import { describe, it, expect } from "vitest";
import { SearchService } from "@/services/search-service";

describe("Unified SearchService", () => {
  it("should return empty array for empty or whitespace query", async () => {
    const res = await SearchService.search("   ");
    expect(res).toEqual([]);
  });

  it("should find cybercrimes by name or synonym (e.g. 'phishing')", async () => {
    const res = await SearchService.search("phishing");
    expect(res.length).toBeGreaterThan(0);
    const top = res[0];
    expect(top.type).toBe("crime");
    expect(top.title.toLowerCase()).toContain("phishing");
  });

  it("should find countries by name or code (e.g. 'India' or 'IN')", async () => {
    const res = await SearchService.search("India");
    const country = res.find((r) => r.type === "country");
    expect(country).toBeDefined();
    expect(country?.title).toContain("India");
    expect(country?.badge).toBe("IN");
  });

  it("should find legislation by title or citation (e.g. 'CFAA' or 'IT Act')", async () => {
    const res = await SearchService.search("CFAA");
    const leg = res.find((r) => r.type === "legislation");
    expect(leg).toBeDefined();
    expect(leg?.title).toContain("Computer Fraud and Abuse Act");
  });

  it("should find legal provisions by section number (e.g. 'Section 66')", async () => {
    const res = await SearchService.search("Section 66");
    const prov = res.find((r) => r.type === "provision");
    expect(prov).toBeDefined();
    expect(prov?.title).toContain("Section 66");
  });
});

