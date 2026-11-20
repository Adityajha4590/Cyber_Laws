import Link from "next/link";
import { Sparkles, AlertTriangle, Shield, Scale, ArrowRight, ExternalLink, GitCompare } from "lucide-react";
import { CrimeService } from "@/services/crime-service";

export const revalidate = 60;

export default async function AiCrimesPage() {
  const aiCrimes = await CrimeService.getAiCrimes();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Frontier Technology Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          AI & Emerging Cybercrimes
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Comprehensive statutory analysis of crimes leveraging or targeting artificial intelligence: synthetic voice cloning, deepfake extortion, model weight exfiltration, and training data poisoning.
        </p>
      </div>

      {/* Coverage Classification Legend */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-[#0a1226] space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Statutory Coverage Classifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
            <span className="font-bold text-emerald-400 block mb-1">
              EXPLICITLY_REGULATED
            </span>
            <p className="text-[11px] text-slate-400">
              Dedicated statutory provision explicitly codifies the artificial intelligence modality by name.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40">
            <span className="font-bold text-blue-400 block mb-1">
              INDIRECTLY_COVERED
            </span>
            <p className="text-[11px] text-slate-400">
              Addressed via cyber legislation provisions (e.g. computer personation, identity theft).
            </p>
          </div>

          <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40">
            <span className="font-bold text-indigo-400 block mb-1">
              GENERAL_LAW_APPLICABLE
            </span>
            <p className="text-[11px] text-slate-400">
              Prosecuted under traditional fraud, wire fraud, forgery, or copyright statutes.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40">
            <span className="font-bold text-amber-400 block mb-1">
              LEGAL_GAP_IDENTIFIED
            </span>
            <p className="text-[11px] text-slate-400">
              Substantial ambiguity where conduct may evade existing criminal thresholds or definitions.
            </p>
          </div>
        </div>
      </div>

      {/* AI Cybercrime Catalog */}
      <div className="space-y-6">
        {aiCrimes.map((crime) => (
          <div
            key={crime.id}
            className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 transition-colors space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white">
                    {crime.name}
                  </h2>
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
                    AI Specific
                  </span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Category: {crime.categoryName}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href={`/compare?crime=${crime.slug}&countries=IN,US,GB,SG`}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <GitCompare className="h-3.5 w-3.5 text-blue-400" />
                  <span>Cross-Border Comparison</span>
                </Link>
                <Link
                  href={`/crimes/${crime.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  Full Profile
                </Link>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {crime.shortDescription}
            </p>

            {crime.aiSpecificDetails && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs space-y-1">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] block">
                  AI Technological Vector & Legal Complexities
                </span>
                <p className="text-amber-200/90 leading-relaxed">
                  {crime.aiSpecificDetails}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">
                  Operational Mechanics
                </span>
                <p className="text-slate-300 line-clamp-3">
                  {crime.howItWorks}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">
                  Mitigation & Guardrails
                </span>
                <p className="text-slate-300 line-clamp-3">
                  {crime.preventionRecommendations}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

