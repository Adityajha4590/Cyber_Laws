# CyberLaw Atlas — Security & Threat Modeling Architecture

## 1. Security Principles
CyberLaw Atlas is designed around defense-in-depth principles appropriate for legal intelligence and cybersecurity policy tools.

---

## 2. Threat Modeling & Safeguards

### 2.1 Untrusted Retrieval & Prompt Injection Prevention
- **Threat**: Attackers could attempt prompt injection by embedding malicious instruction sequences in crawled web pages or gazette search queries.
- **Safeguard**: All external search results are treated as untrusted raw strings. Queries are parsed through typed schemas (`Zod`), and AI provider prompt templates strictly demarcate retrieved context from system instructions.

### 2.2 SQL Injection & Relational Integrity
- **Threat**: SQL injection targeting search fields, country codes, or crime slugs.
- **Safeguard**: The application uses **Prisma ORM**, which enforces parameterized SQL statements for every query. Direct raw string interpolation is prohibited.

### 2.3 Cross-Site Scripting (XSS) & Content Security
- **Threat**: Injected JavaScript in statutory excerpts or user comments.
- **Safeguard**: React automatically encodes variables inside JSX. All HTML formatting is sanitized, and CSP headers restrict script execution.

### 2.4 Server-Side Input Validation
- **Threat**: Overlarge payload attacks or malformed parameters causing server crashes.
- **Safeguard**: Every API route (`/api/search`, `/api/compare`, `/api/research`) validates incoming JSON bodies using strict **Zod** schemas.

### 2.5 Secret Protection & Environment Isolation
- **Threat**: Inadvertent leakage of API keys (OpenAI, Groq, Tavily, PostgreSQL credentials) in client bundles or Git.
- **Safeguard**:
  - API keys are scoped exclusively to server-side components and API handlers.
  - No secret variables use the `NEXT_PUBLIC_` prefix.
  - All secrets are excluded from Git via `.gitignore`.
  - `.env.example` provides sanitized template documentation only.

### 2.6 Administrative Role-Based Access Control (RBAC)
- Staging and review of unverified research is isolated in `/admin`.
- Administrative mutations (approvals, rejections, additions) are immutably recorded in the `AuditLog` table.

