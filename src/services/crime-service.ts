import {
  SEED_CATEGORIES,
  SEED_CRIMES,
  SEED_MAPPINGS,
  SEED_SOURCES,
} from "@/lib/db/seed-data";
import { CybercrimeData, CybercrimeCategoryData } from "@/types";

export class CrimeService {
  static async getAllCategories(): Promise<CybercrimeCategoryData[]> {
    return [...SEED_CATEGORIES].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getAllCrimes(options?: {
    categoryId?: string;
    isAiRelated?: boolean;
    search?: string;
  }): Promise<CybercrimeData[]> {
    let results = [...SEED_CRIMES];

    if (options?.categoryId) {
      results = results.filter((c) => c.categoryId === options.categoryId);
    }

    if (options?.isAiRelated !== undefined) {
      results = results.filter((c) => c.isAiRelated === options.isAiRelated);
    }

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.commonTerminology?.toLowerCase().includes(q) ||
          c.synonyms?.some((s) => s.toLowerCase().includes(q))
      );
    }

    return results;
  }

  static async getFeaturedCrimes(): Promise<CybercrimeData[]> {
    const featuredSlugs = [
      "unauthorized-computer-access",
      "ransomware-and-extortionate-malware",
      "phishing-and-deceptive-communications",
      "deepfake-impersonation-fraud",
    ];
    return SEED_CRIMES.filter((c) => featuredSlugs.includes(c.slug));
  }

  static async getAiCrimes(): Promise<CybercrimeData[]> {
    return SEED_CRIMES.filter((c) => c.isAiRelated);
  }

  static async getCrimeBySlug(slug: string): Promise<CybercrimeData | null> {
    const crime = SEED_CRIMES.find((c) => c.slug === slug);
    if (!crime) return null;

    // Attach mapped legislation count and sources
    const mappings = SEED_MAPPINGS.filter((m) => m.crimeId === crime.id);
    const sources = SEED_SOURCES;

    return {
      ...crime,
      legislationCount: mappings.length,
      sources,
    };
  }

  static async getCrimeById(id: string): Promise<CybercrimeData | null> {
    const crime = SEED_CRIMES.find((c) => c.id === id);
    return crime || null;
  }
}

