# CyberLaw Atlas — Production Deployment Guide

## 1. Overview
CyberLaw Atlas is architected for zero-maintenance serverless deployment on **Vercel** with a managed PostgreSQL instance on **Neon** or **Supabase**.

---

## 2. Prerequisites
1. **Node.js**: v18.17+ or v20.x
2. **PostgreSQL Database**: Free-tier serverless PostgreSQL on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
3. **Vercel Account**: [vercel.com](https://vercel.com).

---

## 3. Database Provisioning & Schema Migration

### 3.1 Retrieve Database Connection URLs
From your Neon or Supabase dashboard, obtain:
1. `DATABASE_URL`: Connection string with connection pooling (PgBouncer) for serverless queries.
2. `DIRECT_URL`: Direct unpooled connection string for migrations (`prisma db push`).

### 3.2 Run Migrations & Seed Data
Execute from your local or CI terminal:
```bash
# Push Prisma schema to production PostgreSQL
npx prisma db push

# Populate initial sovereign countries, cybercrimes, and legislation
npm run db:seed
```

---

## 4. Environment Variables Configuration

In your Vercel Project Settings -> **Environment Variables**, configure:

| Key | Example Value | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql://...` | Pooled PostgreSQL connection string |
| `DIRECT_URL` | `postgresql://...` | Direct connection string for Prisma |
| `AI_PROVIDER` | `mock` / `openai` / `groq` | Multi-LLM provider abstraction selection |
| `SEARCH_PROVIDER` | `mock` / `tavily` | Multi-search provider abstraction selection |
| `OPENAI_API_KEY` | `sk-...` | (Optional) If AI_PROVIDER="openai" |
| `GROQ_API_KEY` | `gsk_...` | (Optional) If AI_PROVIDER="groq" |
| `TAVILY_API_KEY` | `tvly-...` | (Optional) If SEARCH_PROVIDER="tavily" |
| `NEXTAUTH_SECRET` | `secure-random-32-char-string` | Application session encryption token |
| `ADMIN_ACCESS_KEY` | `secure-admin-passphrase` | Secret key for administrative actions |

---

## 5. Deploying to Vercel

### Option A: Via Vercel Git Integration (Recommended)
1. Push this repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Framework Preset: **Next.js**.
4. Build Command: `next build` (or `npm run build`).
5. Output Directory: `.next`.
6. Add the environment variables specified in Section 4.
7. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 6. Post-Deployment Verification Checklist
- [ ] Homepage loads and displays verified database counts.
- [ ] Multi-entity search auto-suggests crimes, sections, and countries.
- [ ] Side-by-side Legal Comparison Engine displays matrices and exports PDF & CSV.
- [ ] AI Legal Research Assistant operates with primary source citations.
- [ ] Admin Portal displays staging queue and system integrity checks.
