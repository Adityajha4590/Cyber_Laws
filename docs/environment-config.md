# CyberLaw Atlas — Environment Configuration & Service Plan

## 1. Environment Variable Specification

A template is maintained in `.env.example`.

### 1.1 Database Configuration
```bash
# PostgreSQL Connection String (e.g. Supabase, Neon, or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/cyberlaw_atlas?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/cyberlaw_atlas?schema=public"
```

### 1.2 AI Provider Configuration (Modular Abstraction)
The platform defaults to an intelligent built-in fallback/local simulator if no external API key is supplied, ensuring zero runtime crashes and instant usability.
```bash
# Supported AI Providers: "gemini" | "openai" | "groq" | "anthropic" | "ollama" | "mock"
AI_PROVIDER="mock"

# Provider Keys (Optional - only required if provider chosen)
GEMINI_API_KEY=""
OPENAI_API_KEY=""
GROQ_API_KEY=""
ANTHROPIC_API_KEY=""
OLLAMA_BASE_URL="http://localhost:11434"
```

### 1.3 External Web Research Provider (Modular Abstraction)
```bash
# Supported Search Providers: "tavily" | "brave" | "serpapi" | "mock"
SEARCH_PROVIDER="mock"

# Provider Keys (Optional - only required if provider chosen)
TAVILY_API_KEY=""
BRAVE_SEARCH_API_KEY=""
SERPAPI_API_KEY=""
```

### 1.4 Application Security & Admin Authentication
```bash
NEXTAUTH_SECRET="super-secret-development-token-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_KEY="admin-secret-access-token"
```

---

## 2. External Services Status & Fallback Strategy

1. **Database**:
   - Production target: Neon or Supabase PostgreSQL.
   - Development & Seed: PostgreSQL via Prisma. We also include a lightweight Prisma client adapter and memory/json seed loader so the platform can run immediately even before remote DB provisioning.
2. **AI Provider**:
   - When keys are missing: The AI Legal Research Assistant runs on the internal verified knowledge engine, answering queries strictly from seeded statutory records with real citations, rather than crashing.
   - When keys are configured: Seamlessly triggers live synthesis across web + database sources.
3. **Web Search**:
   - When keys are missing: The search pipeline uses the comprehensive database of primary government sources and gazettes.
   - When keys are configured: Queries Tavily/Brave for real-time gazette / statutory updates.

