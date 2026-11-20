import { SEED_LEGISLATION, SEED_TIMELINE_EVENTS } from "@/lib/db/seed-data";
import { LegislationData, LegislativeStatus, LegislationEventData } from "@/types";

export class LegislationService {
  static async getAllLegislation(filters?: {
    countryCode?: string;
    status?: LegislativeStatus;
    search?: string;
  }): Promise<LegislationData[]> {
    let results = [...SEED_LEGISLATION];

    if (filters?.countryCode) {
      results = results.filter(
        (l) => l.countryCode?.toLowerCase() === filters.countryCode?.toLowerCase()
      );
    }

    if (filters?.status) {
      results = results.filter((l) => l.status === filters.status);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.commonName?.toLowerCase().includes(q) ||
          l.citation?.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    return results;
  }

  static async getLegislationById(id: string): Promise<LegislationData | null> {
    const leg = SEED_LEGISLATION.find((l) => l.id === id);
    if (!leg) return null;

    const events = SEED_TIMELINE_EVENTS.filter((e) => e.legislationId === id);
    return {
      ...leg,
      events,
    };
  }

  static async getRecentLegalUpdates(): Promise<LegislationData[]> {
    return [...SEED_LEGISLATION]
      .sort((a, b) => b.year - a.year)
      .slice(0, 5);
  }
}

