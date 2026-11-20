import { SEED_TIMELINE_EVENTS, SEED_LEGISLATION } from "@/lib/db/seed-data";
import { LegislationEventData } from "@/types";

export class TimelineService {
  static async getAllEvents(filters?: {
    countryCode?: string;
    legislationId?: string;
    eventType?: string;
  }): Promise<LegislationEventData[]> {
    let events = [...SEED_TIMELINE_EVENTS];

    if (filters?.countryCode) {
      events = events.filter(
        (e) => e.countryCode?.toUpperCase() === filters.countryCode?.toUpperCase()
      );
    }

    if (filters?.legislationId) {
      events = events.filter((e) => e.legislationId === filters.legislationId);
    }

    if (filters?.eventType) {
      events = events.filter((e) => e.eventType === filters.eventType);
    }

    // Sort chronologically descending
    return events.sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );
  }

  static async getEventTypes(): Promise<string[]> {
    const types = Array.from(new Set(SEED_TIMELINE_EVENTS.map((e) => e.eventType)));
    return types;
  }
}
