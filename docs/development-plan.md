# CyberLaw Atlas — Phased Development & Execution Plan

## Phase 0: Project Audit and Planning [COMPLETED]
- [x] Workspace inspection (empty repository).
- [x] Git initialization.
- [x] Architecture specification (`docs/architecture.md`).
- [x] Relational database plan (`docs/database.md`).
- [x] Environment configuration & API key plan (`docs/environment-config.md`).
- [x] Development roadmap formulation.

## Phase 1: Foundation Setup
- [ ] Initialize Next.js 14 App Router project with TypeScript, Tailwind CSS, Lucide icons, and modern design tokens.
- [ ] Install dependencies: Prisma, Zod, Radix UI primitives, Recharts, clsx, tailwind-merge.
- [ ] Configure Tailwind theme with dark navy, charcoal, crisp white, and restrained legal-cyber accents.
- [ ] Implement responsive Layout with navigation (Desktop & Mobile drawer), Breadcrumbs, and Footer.
- [ ] Create Prisma schema (`prisma/schema.prisma`) defining all models and enums.
- [ ] Build database connection helper (`lib/db/prisma.ts`).
- [ ] Implement robust error boundaries and loading skeletons.
- [ ] Build seed data runner and script infrastructure.

## Phase 2: Core Data Platform & Seeding
- [ ] Seed comprehensive verified data:
  - 10+ initial jurisdictions: India, United States, United Kingdom, Singapore, Australia, Canada, Germany, France, Japan, UAE.
  - 15 cybercrime categories.
  - 40+ specific cybercrime catalog entries with detailed breakdowns, mechanics, prevention.
  - Major cyber legislation: India IT Act 2000 & DPDP Act 2023; US CFAA, ECPA, Wire Fraud; UK Computer Misuse Act 1990 & Online Safety Act 2023; Singapore Cybersecurity Act & Computer Misuse Act; etc.
  - Detailed legal provisions with structured punishments (fines, imprisonment terms, intent requirement).
  - Official government sources and verification tags.
- [ ] Implement Data Access Services:
  - `CrimeService`
  - `CountryService`
  - `LegislationService`
  - `SourceService`

## Phase 3: Public Website & UI
- [ ] **Homepage**:
  - Hero with multi-entity unified search.
  - Real database metrics counter (crimes, countries, legislation, provisions, sources).
  - Quick navigation shortcuts.
  - Featured cybercrimes grid.
  - Interactive Country Explorer with regional categorization.
  - Recent legal updates feed.
- [ ] **Cybercrime Library (`/crimes`)**:
  - Filterable catalog by category, severity, AI-relation.
  - Detailed Crime View (`/crimes/[slug]`): plain-language explanation, how it works, technical impact, prevention recommendations, mapped legislation by country, punishments, official sources.
- [ ] **Country Database (`/countries`)**:
  - Country profile view (`/countries/[code]`): legal system overview, primary cybersecurity laws, data protection laws, criminal code provisions, regulatory bodies, mapped crimes.
- [ ] **Legislation Database (`/legislation`)**:
  - Statute breakdown (`/legislation/[id]`): status badge (in force, amended, draft, etc.), full provision list with section explanations, punishments, source links.

## Phase 4: Legal Comparison Engine (`/compare`)
- [ ] Interactive multi-jurisdiction comparison tool.
- [ ] Selector for crime + 2 to 4 countries.
- [ ] Side-by-side comparison matrix:
  - Statutory definitions
  - Applicable legislation and sections
  - Maximum & minimum imprisonment
  - Fine structures & currency
  - Mens rea / Intent requirements
  - Legislative status & effective dates
  - Authoritative sources
- [ ] Responsive stacked card view on mobile.
- [ ] Methodology disclaimer and legal limitations.

## Phase 5: Legislative Status & Legal Timeline (`/timeline`)
- [ ] Timeline visualization of legislative amendments, enactments, and landmark court decisions.
- [ ] Filters by country, legislation, status, and event type.
- [ ] Distinct visual states for "Enacted but not commenced" vs "In force" vs "Proposed".

## Phase 6: AI-Related Cybercrimes (`/ai-crimes`)
- [ ] Dedicated section for AI & emerging threats: Deepfakes, Voice Cloning Fraud, AI-generated Phishing, Non-consensual synthetic media, Model theft, Data poisoning.
- [ ] Coverage classification indicators (`EXPLICITLY_REGULATED`, `INDIRECTLY_COVERED`, `LEGAL_GAP_IDENTIFIED`).
- [ ] Gaps analysis across jurisdictions.

## Phase 7: AI Legal Research Assistant (`/research`)
- [ ] Multi-LLM provider abstraction (OpenAI, Gemini, Groq, Ollama, Anthropic, Mock/Local).
- [ ] Multi-search provider abstraction (Tavily, Brave, SerpAPI, Mock/Internal).
- [ ] Pipeline: Query -> Database Search -> Authoritative Web Retrieval -> Source Extraction -> Synthesis with Citations.
- [ ] Interactive chat/workspace with citation popovers, confidence scores, and legal disclaimers.
- [ ] Admin Research Queue for verifying and graduating research into database records.

## Phase 8: Export Features
- [ ] PDF comparison report generation.
- [ ] CSV comparison export.
- [ ] Printable research briefing.

## Phase 9: Admin Portal, Security & RBAC (`/admin`)
- [ ] Admin dashboard with system metrics, pending reviews, audit log.
- [ ] CRUD interfaces for Crimes, Countries, Legislation, Provisions, Sources.
- [ ] Input validation with Zod.
- [ ] Audit logging for modifications.

## Phase 10: Testing, Verification & Production Build
- [ ] Unit & integration tests for search, comparison logic, punishment parsing, citation formatting.
- [ ] Build validation (`next build`).
- [ ] Verification of all acceptance criteria.

