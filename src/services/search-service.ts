import {
  SEED_CRIMES,
  SEED_COUNTRIES,
  SEED_LEGISLATION,
} from "@/lib/db/seed-data";

export interface UnifiedSearchResult {
  type: "crime" | "country" | "legislation" | "provision";
  id: string;
  title: string;
  subtitle: string;
  url: string;
  snippet: string;
  badge?: string;
  relevanceScore: number;
}

export class SearchService {
  static async search(query: string): Promise<UnifiedSearchResult[]> {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();
    const results: UnifiedSearchResult[] = [];

    // 1. Search Cybercrimes
    for (const crime of SEED_CRIMES) {
      let score = 0;
      if (crime.name.toLowerCase() === q) score += 100;
      else if (crime.name.toLowerCase().startsWith(q)) score += 60;
      else if (crime.name.toLowerCase().includes(q)) score += 40;

      if (crime.synonyms?.some((s) => s.toLowerCase().includes(q))) score += 35;
      if (crime.shortDescription.toLowerCase().includes(q)) score += 20;
      if (crime.commonTerminology?.toLowerCase().includes(q)) score += 25;
      if (crime.categoryName?.toLowerCase().includes(q)) score += 15;

      if (score > 0) {
        results.push({
          type: "crime",
          id: crime.id,
          title: crime.name,
          subtitle: crime.categoryName || "Cybercrime",
          url: `/crimes/${crime.slug}`,
          snippet: crime.shortDescription,
          badge: crime.isAiRelated ? "AI-Related Crime" : "Cybercrime",
          relevanceScore: score,
        });
      }
    }

    // 2. Search Countries
    for (const country of SEED_COUNTRIES) {
      let score = 0;
      if (country.name.toLowerCase() === q || country.code.toLowerCase() === q) score += 90;
      else if (country.name.toLowerCase().includes(q)) score += 50;
      else if (country.region.toLowerCase().includes(q)) score += 20;

      if (score > 0) {
        results.push({
          type: "country",
          id: country.id,
          title: `${country.flagEmoji || "🌐"} ${country.name}`,
          subtitle: country.region,
          url: `/countries/${country.code.toLowerCase()}`,
          snippet: country.description || `${country.name} cybersecurity legal profile.`,
          badge: country.code,
          relevanceScore: score,
        });
      }
    }

    // 3. Search Legislation
    for (const leg of SEED_LEGISLATION) {
      let score = 0;
      if (leg.title.toLowerCase().includes(q)) score += 50;
      if (leg.commonName?.toLowerCase().includes(q)) score += 60;
      if (leg.citation?.toLowerCase().includes(q)) score += 45;
      if (leg.description.toLowerCase().includes(q)) score += 20;

      if (score > 0) {
        results.push({
          type: "legislation",
          id: leg.id,
          title: leg.title,
          subtitle: `${leg.countryName} • ${leg.year}`,
          url: `/legislation/${leg.id}`,
          snippet: leg.description,
          badge: leg.status,
          relevanceScore: score,
        });
      }

      // 4. Search provisions inside legislation
      if (leg.provisions) {
        for (const prov of leg.provisions) {
          let provScore = 0;
          if (prov.sectionNumber.toLowerCase().includes(q)) provScore += 70;
          if (prov.officialHeading.toLowerCase().includes(q)) provScore += 45;
          if (prov.plainExplanation.toLowerCase().includes(q)) provScore += 25;

          if (provScore > 0) {
            results.push({
              type: "provision",
              id: prov.id,
              title: `${prov.sectionNumber}: ${prov.officialHeading}`,
              subtitle: `${leg.title} (${leg.countryName})`,
              url: `/legislation/${leg.id}#${prov.id}`,
              snippet: prov.plainExplanation,
              badge: prov.status,
              relevanceScore: provScore,
            });
          }
        }
      }
    }

    // Sort by relevance score descending
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

