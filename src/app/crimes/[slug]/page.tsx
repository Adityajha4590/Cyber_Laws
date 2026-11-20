import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Shield,
  Scale,
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { CrimeService } from "@/services/crime-service";
import { ComparisonService } from "@/services/comparison-service";
import { formatImprisonment, formatFine, formatDate } from "@/lib/utils";

interface CrimeDetailPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export default async function CrimeDetailPage({ params }: CrimeDetailPageProps) {
  const crime = await CrimeService.getCrimeBySlug(params.slug);
  if (!crime) notFound();

  // Load sample multi-country statutory provisions for this crime
  const comparison = await ComparisonService.compareCrimeAcrossCountries(
    crime.slug,
    ["IN", "US", "GB", "SG"]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back Navigation */}
      <div>
        <Link
          href="/crimes"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Cybercrime Library</span>
        </Link>
      </div>

      {/* Crime Header */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0a1226] shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            {crime.categoryName}
          </span>
          {crime.isAiRelated && (
            <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2.5 py-1 rounded flex items-center space-x-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Related Cybercrime</span>
            </span>
          )}
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded flex items-center space-x-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Verified Legal Record</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {crime.name}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          {crime.shortDescription}
        </p>

        {crime.synonyms && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Common Terminology:</span>
            {crime.synonyms.map((syn) => (
              <span
                key={syn}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
              >
                {syn}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            Last Verified: <span className="text-slate-300">{formatDate(crime.lastVerifiedDate)}</span>
          </div>
          <Link
            href={`/compare?crime=${crime.slug}&countries=IN,US,GB,SG`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-md shadow-blue-600/30"
          >
            <GitCompare className="h-4 w-4" />
            <span>Launch Multi-Country Comparison</span>
          </Link>
        </div>
      </div>

      {/* Technical Breakdown & Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Legal & Technical Explanation */}
          <section className="p-6 rounded-xl border border-slate-800 bg-[#0a1226]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-rose-400" />
              <span>Detailed Legal Explanation</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {crime.detailedExplanation}
            </p>
          </section>

          {/* How the Crime Works */}
          <section className="p-6 rounded-xl border border-slate-800 bg-[#0a1226]">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span>How the Crime Works (Technical Mechanics)</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {crime.howItWorks}
            </p>
          </section>

          {/* AI Specific Details (if applicable) */}
          {crime.isAiRelated && crime.aiSpecificDetails && (
            <section className="p-6 rounded-xl border border-amber-900/40 bg-amber-950/20">
              <h2 className="text-lg font-bold text-amber-300 mb-3 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>AI Specific Dynamics & Legal Ambiguities</span>
              </h2>
              <p className="text-sm text-amber-200/90 leading-relaxed">
                {crime.aiSpecificDetails}
              </p>
            </section>
          )}
        </div>

        {/* Sidebar: Impact & Prevention */}
        <div className="space-y-6">
          <section className="p-6 rounded-xl border border-slate-800 bg-[#0a1226]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Typical Harm & Impact</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {crime.typicalImpact}
            </p>
          </section>

          <section className="p-6 rounded-xl border border-slate-800 bg-[#0a1226]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Prevention & Mitigation</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {crime.preventionRecommendations}
            </p>
          </section>
        </div>
      </div>

      {/* Multi-Jurisdiction Statutory Provisions Preview */}
      {comparison && comparison.matrix.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Scale className="h-5 w-5 text-indigo-400" />
                <span>Statutory Provisions by Jurisdiction</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Primary legislative acts, section numbers, and maximum penalties
              </p>
            </div>
            <Link
              href={`/compare?crime=${crime.slug}&countries=IN,US,GB,SG`}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Full Comparison Matrix</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparison.matrix.map((item) => (
              <div
                key={item.countryCode}
                className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      {item.countryName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.countryCode}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
                    {item.coverageStatus.replace(/_/g, " ")}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {item.legislationTitle} {item.legislationCommonName ? `(${item.legislationCommonName})` : ""}
                  </h4>
                  <span className="text-xs font-mono text-indigo-400 block mt-0.5">
                    {item.sectionNumber} — {item.heading}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.plainExplanation}
                </p>

                <div className="pt-2 border-t border-slate-800/60 text-xs flex flex-col space-y-1">
                  <span className="text-slate-400 text-[11px]">
                    <strong className="text-slate-200">Statutory Penalty:</strong> {item.punishmentText}
                  </span>
                  {item.intentRequirement && (
                    <span className="text-slate-400 text-[11px]">
                      <strong className="text-slate-200">Mens Rea:</strong> {item.intentRequirement}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Authoritative Sources */}
      {crime.sources && crime.sources.length > 0 && (
        <section className="p-6 rounded-xl border border-slate-800 bg-[#0a1226]">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
            <ExternalLink className="h-4 w-4 text-blue-400" />
            <span>Authoritative Government & Legal Sources</span>
          </h2>
          <div className="divide-y divide-slate-800/80">
            {crime.sources.map((src) => (
              <div key={src.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                <div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {src.organization} • {src.sourceType}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
                  {src.reliability}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
