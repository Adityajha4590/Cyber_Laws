# CyberLaw Atlas — System Architecture & Technical Specification

## 1. System Overview
**CyberLaw Atlas** is a global cybercrime and cyber legislation intelligence platform engineered to provide structured, searchable, and verified intelligence on:
- Global cybercrimes and emerging technology threats (including AI-driven offences).
- Comprehensive country-specific cyber legislation, criminal codes, data protection, and critical infrastructure laws.
- Granular statutory provisions, section-level definitions, intent requirements, and structured punishments (imprisonment ranges, fines, currency, additional sanctions).
- Multi-jurisdictional legal comparison engine with side-by-side legal cross-mapping and exports (PDF & CSV).
- Legislative timelines tracking statutory lifecycles (Draft, Enacted, In Force, Partially in Force, Repealed).
- AI-powered Legal Research Assistant with database-first retrieval, external authoritative web research abstraction (Tavily/Brave/SerpAPI), source verification, and strict citation enforcement without fabrication.
- Administrative curation workflow for reviewing AI research, maintaining verified data, and publishing records.

---

## 2. Architectural Principles
1. **Source Reliability & Verification First**:
   - The platform strictly distinguishes between `SOURCE_VERIFIED` / `HUMAN_REVIEWED` legal records and `AI_RESEARCHED` unverified findings.
   - Every legal provision is tied to an authoritative primary source (official gazettes, legislative repositories, government portals).
2. **Provider Agnostic AI & Search Architecture**:
   - AI Assistant interfaces with an abstract `AIServiceProvider` supporting OpenAI, Gemini, Claude, Groq, OpenRouter, and local Ollama without vendor lock-in.
   - Search research interfaces with an abstract `SearchProvider` (Tavily, Brave, SerpAPI, Mock/Local fallback).
3. **Database Normalization & Relational Integrity**:
   - Relational model (PostgreSQL with Prisma ORM) linking cybercrimes, categories, jurisdictions, statutes, legal provisions, structured penalties, amendments, and citations.
   - Normalized structures prevent unstructured monolithic blobs while allowing flexible metadata where appropriate.
4. **Resilience & Graceful Degradation**:
   - Full public browsing, search, comparison, and timeline functions work with 0 external API keys.
   - When AI or external search credentials are absent, graceful informative states and mock/local demonstration drivers maintain platform usability.
5. **Security & Role-Based Access Control (RBAC)**:
   - Public read access for published statutes.
   - Admin RBAC for creating, editing, and publishing statutory provisions and reviewing AI research queues.

---

## 3. Technology Stack Breakdown

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 14+ (App Router) | High-performance Server Components, dynamic SSR, SEO optimization |
| **Language** | TypeScript (Strict mode) | Type safety across client, server, and database domains |
| **Styling & UI** | Tailwind CSS + shadcn/ui + Radix UI | Modern, restrained cybersecurity aesthetic with accessible components |
| **Icons & Visualization** | Lucide Icons + Recharts | Professional iconography and responsive comparative charts |
| **Database & ORM** | PostgreSQL + Prisma ORM | Relational data integrity, typed queries, automated migrations |
| **Data Validation** | Zod | Runtime type validation for API requests, forms, and service boundaries |
| **AI Abstraction** | Custom Multi-LLM Driver | Standardized prompt completion, streaming, and citation mapping |
| **Export Generation** | PDFKit / jsPDF & CSV Formatter | Formal legal intelligence export documents |
| **Testing** | Vitest / Jest + React Testing Library | Unit, integration, and end-to-end verification |

---

## 4. Application Flow & Service Architecture

```
[ Public Users / Researchers ]              [ Administrators ]
           │                                        │
           ▼                                        ▼
   [ Next.js App Router ]                  [ Admin Portal ]
 ┌────────────────────────────────────────────────────────┐
 │ Pages: /, /crimes, /countries, /legislation,           │
 │        /compare, /timeline, /ai-crimes, /research      │
 └─────────────────────────┬──────────────────────────────┘
                           │
                           ▼
                 [ Service Layer (lib/services) ]
  ┌────────────────────────┼────────────────────────┐
  ▼                        ▼                        ▼
[ CrimeService ]     [ ComparisonService ]   [ ResearchService ]
[ CountryService ]   [ TimelineService ]             │
[ LegislationService]                                ▼
  │                                           ┌──────────────┐
  │                                           │ AI Provider  │
  │                                           │ Search Engine│
  │                                           └──────────────┘
  └────────────────────────┬────────────────────────┘
                           │
                           ▼
                  [ Prisma ORM Client ]
                           │
                           ▼
                 [ PostgreSQL Database ]
```

---

## 5. Security Architecture
- **Input Sanitization**: All queries passed through Zod schemas.
- **SQL Injection Prevention**: Prisma parameterization guarantees immunity against SQL injection.
- **XSS & CSRF Prevention**: Next.js App Router server actions with CSRF tokenization and React JSX auto-escaping.
- **Data Safeguards**: AI queries treat web retrieval data as untrusted text, preventing prompt injection.
