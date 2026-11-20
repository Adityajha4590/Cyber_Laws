# CyberLaw Atlas — Global Cybercrime & Cyber Legislation Intelligence Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Restrained%20Cyber-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Tests-Passing%20(18%2F18)-brightgreen?logo=vitest)](https://vitest.dev/)

**CyberLaw Atlas** is a global cybercrime and cyber legislation intelligence platform engineered to provide comprehensive, structured, searchable, and verified intelligence on global computer crimes, statutory penalties, sovereign legislation, cross-border legal comparisons, and emerging AI-driven offences.

---

## 🌟 Key Capabilities

1. **Unified Multi-Entity Search**:
   - High-performance debounced search across cybercrimes, statutory synonyms, sovereign countries, legislation titles, citations, section numbers, and keywords.
2. **Comprehensive Cybercrime Library**:
   - 15 taxonomical categories covering 40+ cybercrimes.
   - Structured detail views: plain-language explanation, operational mechanics, victim impact, prevention recommendations, and sovereign statutory mappings.
3. **Cross-Border Legal Comparison Engine**:
   - Interactive side-by-side comparison matrix across up to 6 sovereign jurisdictions simultaneously.
   - Compares applicable acts, section numbers, plain explanations, mens rea (criminal intent requirements), structured punishments, and gazette citations.
   - Responsive design (tabular view on desktop, stacked cards on mobile).
   - Export reports as formal **PDF** and **CSV**.
4. **AI & Emerging Cybercrimes Intelligence**:
   - Dedicated coverage of artificial intelligence vectors: Deepfake fraud, voice cloning, model weight exfiltration, and training data poisoning.
   - Standardized coverage classifications (`EXPLICITLY_REGULATED`, `INDIRECTLY_COVERED`, `GENERAL_LAW_APPLICABLE`, `LEGAL_GAP_IDENTIFIED`).
5. **AI Legal Research Assistant**:
   - Grounded statutory question answering.
   - Database-first retrieval with modular provider abstraction (Gemini, OpenAI, Groq, Ollama, and built-in verified legal knowledge engine).
   - Authoritative primary web search abstraction (Tavily, Brave, SerpAPI, and Primary Gazette repository).
   - Enforces strict verification without legal hallucination. Every claim is substantiated by primary gazette citations.
6. **Statutory Evolution & Legal Timeline**:
   - Visual timeline tracking statutory lifecycles: Bill Introductions, Enactments, Gazette Notifications, Enforcements, Amendments, and Landmark Supreme Court decisions (e.g. *Shreya Singhal v. UOI*, *Van Buren v. United States*).
7. **Administrative Dashboard & Staging Queue**:
   - Administrative portal with actual database metrics.
   - Review queue for approving, editing, or rejecting AI research findings before publication to the authoritative legal catalog.
   - Immutable audit logging.

---

## 🏗️ Technology Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Next.js Server Components, Route Handlers, Zod Validation Schemas.
- **Database & ORM**: PostgreSQL (Neon / Supabase), Prisma ORM with connection pooling.
- **AI & Research Abstraction**: Modular multi-LLM driver & multi-search provider architecture with zero-crash fallbacks.
- **Exports**: jsPDF with autoTable for formatted PDF generation, custom RFC-4180 CSV export engine.
- **Testing**: Vitest with React Testing Library.

---

## 🚀 Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd Cyber_Laws
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
*Note: The platform is engineered to function out of the box with zero external API keys using built-in verified statutory knowledge.*

### 3. Generate Prisma Client
```bash
npm run db:generate
```

### 4. Run Automated Test Suite
```bash
npm test
```
All 18 unit and integration tests will execute and pass.

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚖️ Authoritative Sovereign Sources

- **India**: Ministry of Electronics and Information Technology (MeitY), India Code, Information Technology Act 2000.
- **United States**: Office of the Law Revision Counsel of the U.S. House of Representatives, Title 18 U.S.C. § 1030 (CFAA), § 1343 (Wire Fraud).
- **United Kingdom**: The National Archives, UK Legislation, Computer Misuse Act 1990 (c. 18), Online Safety Act 2023.
- **Singapore**: Attorney-General's Chambers, Singapore Statutes Online, Computer Misuse Act 1993 (Cap. 50A).

---

## 📜 Disclaimer
CyberLaw Atlas is an educational and legal-tech research instrument. Information provided herein is compiled from authoritative government gazettes and statutory repositories for informational purposes and does not constitute formal legal counsel.

