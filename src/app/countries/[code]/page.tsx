import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Globe,
  Scale,
  Shield,
  FileText,
  ExternalLink,
  ArrowLeft,
  GitCompare,
  CheckCircle2,
} from "lucide-react";
import { CountryService } from "@/services/country-service";
import { formatDate } from "@/lib/utils";

interface CountryProfilePageProps {
  params: {
    code: string;
  };
}

export const revalidate = 60;

export default async function CountryProfilePage({
  params,
}: CountryProfilePageProps) {
  const country = await CountryService.getCountryByCode(params.code);
  if (!country) notFound();

  const legislations = await CountryService.getCountryLegislations(country.code);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/countries"
          className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Country Database</span>
        </Link>
      </div>

      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0a1226] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {country.name}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                  {country.code} / {country.iso3}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {country.region} • {country.legalSystem}
              </p>
            </div>
          </div>

          <div>
            <Link
              href={`/compare?crime=unauthorized-computer-access&countries=${country.code},US`}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-colors"
            >
              <GitCompare className="h-4 w-4" />
              <span>Compare with Other Nations</span>
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {country.description}
        </p>

        {country.officialPortals && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Official Portals:</span>
            {country.officialPortals.split(",").map((p) => {
              const url = p.trim();
              return (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-blue-400 hover:text-blue-300 hover:border-slate-700 flex items-center space-x-1"
                >
                  <span>{new URL(url).hostname}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Legislation List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Scale className="h-5 w-5 text-indigo-400" />
              <span>Primary Cyber & Data Legislation</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Governing acts, penal provisions, and statutory frameworks
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {legislations.length} Statute{legislations.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-4">
          {legislations.map((leg) => (
            <div
              key={leg.id}
              className="p-6 rounded-xl border border-slate-800 bg-[#0a1226] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white">
                      {leg.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                      {leg.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Citation: {leg.citation || "Statute"} • Enacted: {leg.year} • Type: {leg.legislationType}
                  </span>
                </div>
                <Link
                  href={`/legislation/${leg.id}`}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 text-xs hover:bg-slate-700 transition-colors self-start sm:self-auto"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Full Provisions ({leg.provisions?.length || 0})</span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {leg.description}
              </p>

              {/* Provisions list */}
              {leg.provisions && leg.provisions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Highlighted Key Provisions & Sanctions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {leg.provisions.map((prov) => (
                      <div
                        key={prov.id}
                        className="p-3.5 rounded-lg border border-slate-850 bg-slate-900/60 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-blue-400">
                            {prov.sectionNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prov.status}
                          </span>
                        </div>
                        <h5 className="font-semibold text-slate-200">
                          {prov.officialHeading}
                        </h5>
                        <p className="text-slate-400 line-clamp-2">
                          {prov.plainExplanation}
                        </p>
                        {prov.punishments?.[0] && (
                          <div className="pt-1.5 text-[11px] text-amber-300/90 font-medium">
                            Penalty: {prov.punishments[0].descriptiveText}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

