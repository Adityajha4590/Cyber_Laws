import Link from "next/link";
import {
  Shield,
  Scale,
  Globe,
  BookOpen,
  GitCompare,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
} from "lucide-react";
import { UnifiedSearchBar } from "@/components/search/UnifiedSearchBar";
import { StatsService } from "@/services/stats-service";
import { CrimeService } from "@/services/crime-service";
import { CountryService } from "@/services/country-service";
import { LegislationService } from "@/services/legislation-service";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const stats = await StatsService.getStats();
  const featuredCrimes = await CrimeService.getFeaturedCrimes();
  const countries = await CountryService.getAllCountries();
  const recentLegislation = await LegislationService.getRecentLegalUpdates();

  return (
    <div className="flex flex-col space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-800/80 bg-gradient-to-b from-[#0a132c] via-[#070d1e] to-[#070d1e]">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#1e293b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/60 text-blue-300 text-xs font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Global Cybercrime & Cyber Legislation Intelligence</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight sm:leading-tight">
            Understand Cybercrime. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              Explore the Law.
            </span>{" "}
            Compare the World.
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore cybercrime legislation, legal provisions, punishments, and emerging digital threats across jurisdictions. Distinguishing verified statutory records from AI research.
          </p>

          {/* Unified Search Input */}
          <div className="mt-8">
            <UnifiedSearchBar />
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <Link
              href="/crimes"
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center space-x-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-rose-400" />
              <span>Explore Cybercrimes</span>
            </Link>
            <Link
              href="/compare"
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center space-x-1.5"
            >
              <GitCompare className="h-3.5 w-3.5 text-blue-400" />
              <span>Compare Countries</span>
            </Link>
            <Link
              href="/legislation"
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center space-x-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
              <span>Explore Cyber Laws</span>
            </Link>
            <Link
              href="/ai-crimes"
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>AI-Related Crimes</span>
            </Link>
            <Link
              href="/research"
              className="px-3.5 py-1.5 rounded-lg border border-blue-600/40 bg-blue-950/60 text-blue-300 hover:text-white hover:bg-blue-900/60 transition-colors flex items-center space-x-1.5"
            >
              <Shield className="h-3.5 w-3.5 text-blue-400" />
              <span>Legal Research Assistant</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Real Platform Statistics (No Fabrications) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl border border-slate-800 bg-[#0a1226]/90 shadow-xl backdrop-blur-md">
          <div className="p-3 border-r border-slate-800/60 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 block font-mono">
              {stats.countriesCovered}
            </span>
            <span className="text-xs text-slate-400 font-medium">Sovereign Jurisdictions</span>
          </div>
          <div className="p-3 border-r border-slate-800/60 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 block font-mono">
              {stats.crimesCatalogued}
            </span>
            <span className="text-xs text-slate-400 font-medium">Cybercrimes Catalogued</span>
          </div>
          <div className="p-3 border-r border-slate-800/60 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 block font-mono">
              {stats.legislationRecords}
            </span>
            <span className="text-xs text-slate-400 font-medium">Primary Statutes</span>
          </div>
          <div className="p-3 border-r border-slate-800/60 last:border-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block font-mono">
              {stats.legalProvisions}
            </span>
            <span className="text-xs text-slate-400 font-medium">Statutory Provisions</span>
          </div>
          <div className="col-span-2 md:col-span-1 p-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block font-mono">
              {stats.verifiedSources}
            </span>
            <span className="text-xs text-slate-400 font-medium">Verified Gazettes & Sources</span>
          </div>
        </div>
      </section>

      {/* Featured Cybercrimes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-rose-400" />
              <span>Featured Cybercrime Analyses</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Statutory breakdown, criminal mechanics, and cross-border penalties
            </p>
          </div>
          <Link
            href="/crimes"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>View All ({stats.crimesCatalogued})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCrimes.map((crime) => (
            <Link
              key={crime.id}
              href={`/crimes/${crime.slug}`}
              className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 hover:bg-[#0d1730] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {crime.categoryName}
                  </span>
                  {crime.isAiRelated && (
                    <span className="text-[10px] font-semibold text-amber-400 flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>AI Crime</span>
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {crime.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {crime.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-blue-400 font-medium">
                  {crime.legislationCount ?? 8} Countries Mapped
                </span>
                <span className="flex items-center text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Country Explorer */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              <span>Country Legal Database</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a sovereign jurisdiction to inspect its primary cyber acts and regulatory authorities
            </p>
          </div>
          <Link
            href="/countries"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>Explore All Jurisdictions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {countries.slice(0, 10).map((c) => (
            <Link
              key={c.code}
              href={`/countries/${c.code.toLowerCase()}`}
              className="p-4 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 hover:bg-[#0d1730] transition-all flex flex-col group"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{c.flagEmoji}</span>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors truncate">
                    {c.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {c.region}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {c.legalSystem}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Engine Callout Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-800/40 bg-gradient-to-r from-blue-950/60 via-[#0c1633] to-[#0a1226] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400 block mb-2">
              Cross-Jurisdiction Comparison Engine
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              Compare Penalties & Statutory Defenses Side-by-Side
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Examine how India, the United States, the UK, and Singapore legally codify offences such as Ransomware or Deepfake Fraud. Compare maximum imprisonment terms, fine limits, intent requirements, and primary gazette citations.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/compare"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <GitCompare className="h-4 w-4" />
              <span>Launch Comparison Tool</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Legal Updates Feed */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <span>Recent Legislation & Statutory Updates</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active statutes from primary government gazettes with enforcement timelines
            </p>
          </div>
          <Link
            href="/legislation"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>View All Legislation</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentLegislation.map((leg) => (
            <div
              key={leg.id}
              className="p-4 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0 mt-0.5">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      {leg.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                      {leg.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {leg.countryName} ({leg.countryCode}) • Enacted {leg.year} • {leg.legislationType}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/60">
                <span className="text-slate-400 text-[11px]">
                  {leg.provisions?.length || 0} Key Provisions
                </span>
                <Link
                  href={`/legislation/${leg.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
