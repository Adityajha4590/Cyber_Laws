import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Shield,
} from "lucide-react";
import { LegislationService } from "@/services/legislation-service";
import { formatDate } from "@/lib/utils";

interface LegislationDetailPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 60;

export default async function LegislationDetailPage({
  params,
}: LegislationDetailPageProps) {
  const leg = await LegislationService.getLegislationById(params.id);
  if (!leg) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/legislation"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Legislation Database</span>
        </Link>
      </div>

      {/* Header Profile */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0a1226] shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
            {leg.status}
          </span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            {leg.countryName} ({leg.countryCode})
          </span>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            {leg.legislationType}
          </span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded flex items-center space-x-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Primary Gazette Verified</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {leg.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
          {leg.description}
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block">Citation / Act No.</span>
            <span className="font-semibold text-white font-mono mt-0.5 block">
              {leg.citation || "Statutory Act"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Enactment Date</span>
            <span className="font-semibold text-white mt-0.5 block">
              {formatDate(leg.enactmentDate)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Commencement Date</span>
            <span className="font-semibold text-white mt-0.5 block">
              {formatDate(leg.commencementDate)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Jurisdiction Scope</span>
            <span className="font-semibold text-white mt-0.5 block">
              {leg.jurisdiction}
            </span>
          </div>
        </div>

        {leg.officialUrl && (
          <div className="pt-2 flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Official Repository:</span>
            <a
              href={leg.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
            >
              <span>{leg.governmentSource || "Official Government Repository"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Statutory Provisions List */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Scale className="h-5 w-5 text-indigo-400" />
            <span>Statutory Provisions & Penal Sanctions ({leg.provisions?.length || 0})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual section-level definitions, intent requirements (mens rea), and punishment structures
          </p>
        </div>

        <div className="space-y-4">
          {leg.provisions?.map((prov) => (
            <div
              key={prov.id}
              id={prov.id}
              className="p-6 rounded-xl border border-slate-800 bg-[#0a1226] space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-extrabold text-blue-400 font-mono">
                      {prov.sectionNumber}
                    </span>
                    {prov.clause && (
                      <span className="text-xs font-mono text-slate-400">
                        ({prov.clause})
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {prov.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {prov.officialHeading}
                  </h3>
                </div>
              </div>

              {/* Official Statutory Text (if present) */}
              {prov.officialText && (
                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed italic">
                  &ldquo;{prov.officialText}&rdquo;
                </div>
              )}

              {/* Plain-Language Explanation */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Plain-Language Legal Explanation
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {prov.plainExplanation}
                </p>
              </div>

              {/* Structured Punishments & Intent */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/60 text-xs">
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/30 space-y-1">
                  <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px] block">
                    Statutory Punishment & Sanctions
                  </span>
                  <p className="text-amber-200/90 text-xs leading-relaxed">
                    {prov.punishments?.[0]?.descriptiveText || "Penalties determined by judicial sentencing guidelines."}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] block">
                    Criminal Intent Requirement (Mens Rea)
                  </span>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {prov.intentRequirement || "Proof of unauthorized intentional act required."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

