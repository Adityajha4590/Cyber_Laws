import { z } from "zod";

export const LegislativeStatusEnum = z.enum([
  "DRAFT",
  "PROPOSED",
  "PENDING",
  "ENACTED",
  "NOTIFIED",
  "IN_FORCE",
  "PARTIALLY_IN_FORCE",
  "NOT_YET_COMMENCED",
  "AMENDED",
  "REPEALED",
  "SUPERSEDED",
  "UNKNOWN",
]);

export const LegalCoverageEnum = z.enum([
  "EXPLICITLY_REGULATED",
  "INDIRECTLY_COVERED",
  "GENERAL_LAW_APPLICABLE",
  "PROPOSED_LEGISLATION",
  "LEGAL_GAP_IDENTIFIED",
  "UNCERTAIN",
  "NOT_RESEARCHED",
]);

export const SourceReliabilityEnum = z.enum([
  "PRIMARY_OFFICIAL",
  "GOVERNMENT",
  "COURT",
  "REGULATOR",
  "INTERNATIONAL_ORGANIZATION",
  "ACADEMIC",
  "SECONDARY_LEGAL",
  "NEWS",
  "OTHER",
  "UNVERIFIED",
]);

export const VerificationStatusEnum = z.enum([
  "UNVERIFIED",
  "AI_RESEARCHED",
  "SOURCE_VERIFIED",
  "HUMAN_REVIEWED",
  "PUBLISHED",
  "NEEDS_UPDATE",
]);

export const CrimeCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  categoryId: z.string().uuid("Invalid category ID"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  detailedExplanation: z.string().min(20, "Detailed explanation must be at least 20 characters"),
  commonTerminology: z.string().optional(),
  howItWorks: z.string().min(20, "How it works must be at least 20 characters"),
  typicalImpact: z.string().min(10, "Impact must be at least 10 characters"),
  preventionRecommendations: z.string().min(10, "Prevention tips must be at least 10 characters"),
  isAiRelated: z.boolean().default(false),
  aiSpecificDetails: z.string().optional(),
});

export const ComparisonRequestSchema = z.object({
  crimeSlug: z.string().min(1, "Crime is required"),
  countryCodes: z.array(z.string().length(2, "Country code must be 2 uppercase characters")).min(1, "At least 1 country is required").max(6, "Maximum 6 countries can be compared side-by-side"),
});

export const ResearchQuerySchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters").max(500, "Query is too long"),
  countryCode: z.string().length(2).optional(),
  crimeSlug: z.string().optional(),
});
