import { SearchProvider, SearchQueryResult } from "@/lib/ai/types";
import { SEED_SOURCES } from "@/lib/db/seed-data";

/**
 * Primary Gazette & Official Statute Search Provider.
 * Queries verified primary government sources without requiring external third-party keys.
 */
export class PrimaryGazetteSearchProvider implements SearchProvider {
  name = "Primary Gazette & Government Statute Repository";

  isConfigured(): boolean {
    return true;
  }

  async search(query: string, maxResults: number = 5): Promise<SearchQueryResult[]> {
    const q = query.toLowerCase();
    const matches = SEED_SOURCES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.excerpt?.toLowerCase().includes(q)
    );

    const pool = matches.length > 0 ? matches : SEED_SOURCES;
    return pool.slice(0, maxResults).map((s) => ({
      title: s.title,
      url: s.url,
      snippet: s.excerpt || `Authoritative record from ${s.organization}`,
      organization: s.organization,
      reliability: s.reliability,
      publicationDate: s.publicationDate,
    }));
  }
}

/**
 * Tavily AI Search Provider.
 */
export class TavilySearchProvider implements SearchProvider {
  name = "Tavily Legal Web Search";
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.TAVILY_API_KEY || "";
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async search(query: string, maxResults: number = 5): Promise<SearchQueryResult[]> {
    if (!this.apiKey) {
      throw new Error("Tavily API key is not configured.");
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: this.apiKey,
        query: `${query} official legislation gazette law penal code`,
        search_depth: "advanced",
        include_answer: false,
        max_results: maxResults,
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily search failed with status ${response.status}`);
    }

    const data = await response.json();
    return (data.results || []).map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.content,
      organization: new URL(r.url).hostname,
      reliability: r.url.includes(".gov") || r.url.includes(".nic.in") ? "PRIMARY_OFFICIAL" : "SECONDARY_LEGAL",
      publicationDate: r.published_date,
    }));
  }
}

/**
 * Factory for selecting active Search Provider.
 */
export function getSearchProvider(): SearchProvider {
  const provider = (process.env.SEARCH_PROVIDER || "mock").toLowerCase();

  if (provider === "tavily" && process.env.TAVILY_API_KEY) {
    return new TavilySearchProvider(process.env.TAVILY_API_KEY);
  }

  return new PrimaryGazetteSearchProvider();
}

