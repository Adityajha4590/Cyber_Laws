# CyberLaw Atlas — Relational Database Schema Plan

## 1. Relational Design Overview
The database is modeled in PostgreSQL using Prisma ORM. It enforces strict referential integrity, relational mappings, and indexed search capabilities.

## 2. Core Entities & Tables

### 2.1 Geographic & Category Entities
- **`Country`**: Stores jurisdictions with ISO-2, ISO-3, flag icon/code, region, government portal URL, legal system overview (Common Law, Civil Law, Islamic Law, Hybrid).
- **`CybercrimeCategory`**: High-level taxonomies (e.g. Unauthorized Access, Financial Crime, AI-Related Crimes, Cyber Espionage).
- **`Cybercrime`**: Specific offences (e.g., Ransomware, Deepfake Fraud, Phishing) with descriptions, mechanics, prevention tips, and AI crime flags.
- **`CybercrimeSynonym`**: Synonyms for search normalization (e.g. "Computer Intrusion" -> "Unauthorized Computer Access").
- **`CybercrimeRelation`**: Semantic graph connecting related offences (e.g. Phishing -> Credential Theft -> Unauthorized Access).

### 2.2 Legislative & Statutory Entities
- **`Legislation`**: Official statutes, acts, or directives (e.g. Information Technology Act 2000, Computer Fraud and Abuse Act 18 U.S.C. § 1030, Computer Misuse Act 1990).
  - Status enum: `DRAFT`, `PROPOSED`, `PENDING`, `ENACTED`, `NOTIFIED`, `IN_FORCE`, `PARTIALLY_IN_FORCE`, `NOT_YET_COMMENCED`, `AMENDED`, `REPEALED`, `SUPERSEDED`, `UNKNOWN`.
  - Enactment, assent, notification, commencement, and amendment dates.
- **`LegalProvision`**: Section/Article/Clause-level statutory records.
  - Linked to parent `Legislation`.
  - Fields: section number, clause, title, official text, plain-English summary, intent requirement (mens rea), jurisdiction scope, effective date.
- **`LegalPunishment`**: Structured punishment specifications.
  - Imprisonment minimum/maximum & unit (years/months).
  - Fine minimum/maximum, currency, fine type (fixed, multiplier of damage, discretionary).
  - Additional sanctions (license revocation, confiscation, debarment).
  - Descriptive text for complex legal consequences.
- **`CrimeLegislationMapping`**: Join entity linking `Cybercrime` to `LegalProvision` and `Legislation`.
  - Coverage classification: `EXPLICITLY_REGULATED`, `INDIRECTLY_COVERED`, `GENERAL_LAW_APPLICABLE`, `PROPOSED_LEGISLATION`, `LEGAL_GAP_IDENTIFIED`, `UNCERTAIN`.

### 2.3 Legislative Timeline & Events
- **`LegislationEvent`**: Milestone events in legislative history (e.g. "Bill Introduced in Parliament", "Presidential Assent", "Section 66A struck down by Supreme Court in Shreya Singhal v. UOI", "2008 Amendment notified").

### 2.4 Sources & Citations
- **`Source`**: Primary authoritative sources (Government portals, gazettes, official repositories).
  - Reliability tier: `PRIMARY_OFFICIAL`, `GOVERNMENT`, `COURT`, `REGULATOR`, `INTERNATIONAL_ORGANIZATION`, `ACADEMIC`, `SECONDARY_LEGAL`, `NEWS`, `OTHER`, `UNVERIFIED`.
- **`ProvisionSource`**: Junction between provisions and authoritative source citations.

### 2.5 Research Assistant & Audit
- **`ResearchQuery`**: Logs user/admin research questions.
- **`ResearchResult`**: Extracted legal facts, summaries, and synthesis.
- **`ResearchCitation`**: Specific cited URL, excerpt, and verification score.
- **`ResearchReviewQueue`**: Admin review pipeline for approving AI findings into authoritative records.
- **`User` / `UserRole`**: Admin authentication and session management.
- **`AuditLog`**: Tamper-evident log of administrative mutations.

