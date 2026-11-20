import Link from "next/link";
import { Globe, ArrowRight, Shield, Scale, ExternalLink } from "lucide-react";
import { CountryService } from "@/services/country-service";

interface CountriesPageProps {
  searchParams: {
    region?: string;
  };
}

export const revalidate = 60;

export default async function CountriesPage({ searchParams }: CountriesPageProps) {
  const regions = await CountryService.getAvailableRegions();
  const selectedRegion = searchParams.region || "All";
  const countries = await CountryService.getAllCountries(selectedRegion);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Globe className="h-4 w-4" />
          <span>Sovereign Jurisdictions</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Country Database
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Explore cybersecurity frameworks, criminal penal codes, data privacy laws, and regulatory oversight authorities across sovereign jurisdictions worldwide.
        </p>
      </div>

      {/* Region Filter */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
        {regions.map((reg) => (
          <Link
            key={reg}
            href={reg === "All" ? "/countries" : `/countries?region=${encodeURIComponent(reg)}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedRegion === reg
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {reg}
          </Link>
        ))}
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {countries.map((country) => (
          <Link
            key={country.code}
            href={`/countries/${country.code.toLowerCase()}`}
            className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 hover:bg-[#0d1730] transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">{country.flagEmoji}</span>
                <div>
                  <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {country.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">
                    {country.code} • {country.iso3}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="text-[11px] text-slate-400 font-medium">
                  Region: <span className="text-slate-300">{country.region}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium line-clamp-2">
                  System: <span className="text-slate-300">{country.legalSystem}</span>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {country.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-blue-400 font-medium">
              <span>View Legal Profile</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
