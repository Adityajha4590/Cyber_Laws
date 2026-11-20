import {
  SEED_COUNTRIES,
  SEED_CRIMES,
  SEED_LEGISLATION,
  SEED_SOURCES,
} from "@/lib/db/seed-data";

export interface PlatformStats {
  countriesCovered: number;
  crimesCatalogued: number;
  legislationRecords: number;
  legalProvisions: number;
  verifiedSources: number;
  aiCrimesCovered: number;
}

export class StatsService {
  static async getStats(): Promise<PlatformStats> {
    const totalProvisions = SEED_LEGISLATION.reduce(
      (acc, leg) => acc + (leg.provisions?.length || 0),
      0
    );

    const aiCrimes = SEED_CRIMES.filter((c) => c.isAiRelated).length;

    return {
      countriesCovered: SEED_COUNTRIES.length,
      crimesCatalogued: SEED_CRIMES.length,
      legislationRecords: SEED_LEGISLATION.length,
      legalProvisions: totalProvisions,
      verifiedSources: SEED_SOURCES.length,
      aiCrimesCovered: aiCrimes,
    };
  }
}

