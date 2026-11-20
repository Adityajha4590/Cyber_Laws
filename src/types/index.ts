export type LegislativeStatus =
  | "DRAFT"
  | "PROPOSED"
  | "PENDING"
  | "ENACTED"
  | "NOTIFIED"
  | "IN_FORCE"
  | "PARTIALLY_IN_FORCE"
  | "NOT_YET_COMMENCED"
  | "AMENDED"
  | "REPEALED"
  | "SUPERSEDED"
  | "UNKNOWN";

export type LegalCoverage =
  | "EXPLICITLY_REGULATED"
  | "INDIRECTLY_COVERED"
  | "GENERAL_LAW_APPLICABLE"
  | "PROPOSED_LEGISLATION"
  | "LEGAL_GAP_IDENTIFIED"
  | "UNCERTAIN"
  | "NOT_RESEARCHED";

export type SourceReliability =
  | "PRIMARY_OFFICIAL"
  | "GOVERNMENT"
  | "COURT"
  | "REGULATOR"
  | "INTERNATIONAL_ORGANIZATION"
  | "ACADEMIC"
  | "SECONDARY_LEGAL"
  | "NEWS"
  | "OTHER"
  | "UNVERIFIED";

export type VerificationStatus =
  | "UNVERIFIED"
  | "AI_RESEARCHED"
  | "SOURCE_VERIFIED"
  | "HUMAN_REVIEWED"
  | "PUBLISHED"
  | "NEEDS_UPDATE";

export interface CountryData {
  id: string;
  code: string; // ISO 2
  iso3: string;
  name: string;
  flagEmoji?: string;
  region: string;
  legalSystem?: string;
  officialPortals?: string;
  description?: string;
}

export interface CybercrimeCategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
}

export interface CybercrimeData {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  shortDescription: string;
  detailedExplanation: string;
  commonTerminology?: string;
  howItWorks: string;
  typicalImpact: string;
  preventionRecommendations: string;
  isAiRelated: boolean;
  aiSpecificDetails?: string;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  synonyms?: string[];
  relatedCrimes?: { id: string; name: string; slug: string; relationType: string }[];
  sources?: SourceData[];
  legislationCount?: number;
}

export interface LegalPunishmentData {
  id: string;
  imprisonmentMin?: number | null;
  imprisonmentMax?: number | null;
  imprisonmentUnit?: string;
  fineMin?: number | null;
  fineMax?: number | null;
  fineCurrency?: string;
  fineType?: string;
  additionalSanctions?: string;
  isMandatory: boolean;
  variesByCircumstance: boolean;
  descriptiveText: string;
}

export interface LegalProvisionData {
  id: string;
  legislationId: string;
  legislationTitle?: string;
  legislationCommonName?: string;
  countryName?: string;
  countryCode?: string;
  sectionNumber: string;
  clause?: string;
  officialHeading: string;
  officialText?: string;
  plainExplanation: string;
  intentRequirement?: string;
  jurisdiction?: string;
  effectiveDate?: string;
  status: LegislativeStatus;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  punishments: LegalPunishmentData[];
  sources?: SourceData[];
}

export interface LegislationData {
  id: string;
  title: string;
  commonName?: string;
  countryId: string;
  countryName?: string;
  countryCode?: string;
  legislationType: string;
  year: number;
  citation?: string;
  officialUrl?: string;
  governmentSource?: string;
  enactmentDate?: string;
  assentDate?: string;
  notificationDate?: string;
  commencementDate?: string;
  effectiveDate?: string;
  amendmentDate?: string;
  repealDate?: string;
  status: LegislativeStatus;
  jurisdiction: string;
  description: string;
  fullTextUrl?: string;
  verificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  provisions?: LegalProvisionData[];
  events?: LegislationEventData[];
}

export interface LegislationEventData {
  id: string;
  legislationId: string;
  legislationTitle?: string;
  countryName?: string;
  countryCode?: string;
  eventType: string;
  eventDate: string;
  title: string;
  description: string;
  officialGazetteRef?: string;
  sourceUrl?: string;
}

export interface SourceData {
  id: string;
  title: string;
  organization: string;
  url: string;
  domain: string;
  sourceType: string;
  reliability: SourceReliability;
  excerpt?: string;
  publicationDate?: string;
  accessDate: string;
  verificationStatus: VerificationStatus;
}

export interface CrimeLegislationMappingData {
  id: string;
  crimeId: string;
  crimeName: string;
  legislationId: string;
  legislationTitle: string;
  legislationCommonName?: string;
  countryId: string;
  countryName: string;
  countryCode: string;
  provision?: LegalProvisionData;
  coverageStatus: LegalCoverage;
  notes?: string;
}

export interface ComparisonMatrixItem {
  countryCode: string;
  countryName: string;
  coverageStatus: LegalCoverage;
  legislationTitle: string;
  legislationCommonName?: string;
  sectionNumber?: string;
  heading?: string;
  plainExplanation?: string;
  intentRequirement?: string;
  status: LegislativeStatus;
  punishmentText?: string;
  imprisonmentMax?: number | null;
  imprisonmentUnit?: string;
  fineSummary?: string;
  effectiveDate?: string;
  sourceUrl?: string;
  sourceTitle?: string;
}

export interface ComparisonResult {
  crime: CybercrimeData;
  countries: CountryData[];
  matrix: ComparisonMatrixItem[];
  methodologyNotes: string[];
}

export interface ResearchAssistantQueryRequest {
  query: string;
  countryCode?: string;
  crimeSlug?: string;
}

export interface ResearchCitationData {
  sourceTitle: string;
  organization: string;
  url: string;
  excerpt?: string;
  publicationDate?: string;
  reliability: SourceReliability;
}

export interface ResearchAssistantResponse {
  directAnswer: string;
  executiveSummary: string;
  countryAnalysis: {
    countryName: string;
    applicableLegislation: string;
    sections: string;
    punishmentSummary: string;
    legalStatus: LegislativeStatus;
  }[];
  comparativeAnalysis?: string;
  legalGaps?: string;
  citations: ResearchCitationData[];
  confidenceScore: number;
  lastResearchDate: string;
  verificationStatus: VerificationStatus;
  disclaimer: string;
}
