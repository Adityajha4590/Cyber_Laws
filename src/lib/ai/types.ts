import { ResearchCitationData, SourceReliability } from "@/types";

export interface AIProviderCompletionRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
}

export interface AIProviderResponse {
  content: string;
  providerUsed: string;
  modelUsed: string;
  promptTokens?: number;
  completionTokens?: number;
}

export interface AIServiceProvider {
  name: string;
  isConfigured(): boolean;
  complete(request: AIProviderCompletionRequest): Promise<AIProviderResponse>;
}

export interface SearchQueryResult {
  title: string;
  url: string;
  snippet: string;
  organization: string;
  reliability: SourceReliability;
  publicationDate?: string;
}

export interface SearchProvider {
  name: string;
  isConfigured(): boolean;
  search(query: string, maxResults?: number): Promise<SearchQueryResult[]>;
}
