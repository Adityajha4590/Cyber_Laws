import Link from "next/link";
import { Scale, FileText, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { LegislationService } from "@/services/legislation-service";
import { CountryService } from "@/services/country-service";
import { LegislativeStatus } from "@/types";

interface LegislationPageProps {
  searchParams: {
    country?: string;
    status?: string;
    q?: string;
  };
}

export const revalidate = 60;

export default async function LegislationPage({
  searchParams,
}: LegislationPageProps) {
  const countries = await CountryService.getAllCountries();
  const selectedCountry = searchParams.country;
  const selectedStatus = searchParams.status as LegislativeStatus | undefined;

  const legislations = await LegislationService.getAllLegislation({
    countryCode: selectedCountry,
    status: selectedStatus,
    search: searchParams.q,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Scale className="h-4 w-4" />
          <span>Statutory Frameworks</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Legislation Database
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Primary cybercrime acts, criminal penal codes, telecommunication directives, and data privacy legislation across sovereign jurisdictions.
        </p>
      </div>

      {/* Country Filters */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
        <Link
          href="/legislation"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !selectedCountry
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          All Jurisdictions ({legislations.length})
        </Link>
        {countries.map((c) => (
          <Link
            key={c.code}
            href={`/legislation?country=${c.code}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
              selectedCountry?.toUpperCase() === c.code.toUpperCase()
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <span>{c.flagEmoji}</span>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>

      {/* Legislation List */}
      <div className="space-y-4">
        {legislations.map((leg) => (
          <div
            key={leg.id}
            className="p-6 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-white text-base">
                  {leg.title}
                </span>
                {leg.commonName && (
                  <span className="text-xs font-mono text-slate-400">
                    ({leg.commonName})
                  </span>
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                  {leg.status}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {leg.countryName} ({leg.countryCode})
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {leg.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                <span>Citation: <strong className="text-slate-300">{leg.citation || "Statute"}</strong></span>
                <span>Enacted: <strong className="text-slate-300">{leg.year}</strong></span>
                <span>Jurisdiction: <strong className="text-slate-300">{leg.jurisdiction}</strong></span>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
              <Link
                href={`/legislation/${leg.id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-colors flex items-center space-x-1"
              >
                <span>Inspect Provisions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
