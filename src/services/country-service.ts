import { SEED_COUNTRIES, SEED_LEGISLATION } from "@/lib/db/seed-data";
import { CountryData, LegislationData } from "@/types";

export class CountryService {
  static async getAllCountries(region?: string): Promise<CountryData[]> {
    if (region && region !== "All") {
      return SEED_COUNTRIES.filter((c) => c.region === region);
    }
    return [...SEED_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
  }

  static async getCountryByCode(code: string): Promise<CountryData | null> {
    const country = SEED_COUNTRIES.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );
    return country || null;
  }

  static async getCountryLegislations(countryCode: string): Promise<LegislationData[]> {
    return SEED_LEGISLATION.filter(
      (l) => l.countryCode?.toLowerCase() === countryCode.toLowerCase()
    );
  }

  static async getAvailableRegions(): Promise<string[]> {
    const regions = Array.from(new Set(SEED_COUNTRIES.map((c) => c.region)));
    return ["All", ...regions.sort()];
  }
}

