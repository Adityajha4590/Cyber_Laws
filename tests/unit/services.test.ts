import { describe, it, expect } from "vitest";
import { CrimeService } from "@/services/crime-service";
import { CountryService } from "@/services/country-service";
import { LegislationService } from "@/services/legislation-service";

describe("Core Data Services", () => {
  describe("CrimeService", () => {
    it("should retrieve all 15 categories", async () => {
      const cats = await CrimeService.getAllCategories();
      expect(cats.length).toBe(15);
      expect(cats[0].name).toBe("Unauthorized Access and Hacking");
    });

    it("should filter AI-related cybercrimes", async () => {
      const aiCrimes = await CrimeService.getAiCrimes();
      expect(aiCrimes.length).toBeGreaterThan(0);
      expect(aiCrimes.every((c) => c.isAiRelated)).toBe(true);
    });

    it("should find crime by slug with attached sources", async () => {
      const crime = await CrimeService.getCrimeBySlug("ransomware-and-extortionate-malware");
      expect(crime).not.toBeNull();
      expect(crime?.name).toContain("Ransomware");
      expect(crime?.sources?.length).toBeGreaterThan(0);
    });
  });

  describe("CountryService", () => {
    it("should retrieve initial sovereign countries", async () => {
      const countries = await CountryService.getAllCountries();
      expect(countries.length).toBeGreaterThanOrEqual(10);
      const codes = countries.map((c) => c.code);
      expect(codes).toContain("IN");
      expect(codes).toContain("US");
      expect(codes).toContain("GB");
      expect(codes).toContain("SG");
    });

    it("should retrieve country by ISO code case-insensitively", async () => {
      const india = await CountryService.getCountryByCode("in");
      expect(india).not.toBeNull();
      expect(india?.name).toBe("India");
    });
  });

  describe("LegislationService", () => {
    it("should retrieve legislations by country", async () => {
      const inLegs = await LegislationService.getAllLegislation({ countryCode: "IN" });
      expect(inLegs.length).toBeGreaterThan(0);
      expect(inLegs[0].countryCode).toBe("IN");
    });
  });
});

