"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  GitCompare,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  AlertCircle,
  ExternalLink,
  Scale,
  CheckCircle2,
} from "lucide-react";
import {
  ComparisonResult,
  CybercrimeData,
  CountryData,
} from "@/types";
import { SEED_CRIMES, SEED_COUNTRIES } from "@/lib/db/seed-data";
import { generateComparisonCSV, downloadCSV } from "@/lib/exports/csv-export";
import { generateComparisonPDF } from "@/lib/exports/pdf-export";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialCrime = searchParams.get("crime") || "unauthorized-computer-access";
  const initialCountries = searchParams.get("countries")
    ? searchParams.get("countries")!.split(",")
    : ["IN", "US", "GB", "SG"];

  const [selectedCrime, setSelectedCrime] = useState(initialCrime);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(initialCountries);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComparison = async (crimeSlug: string, countryCodes: string[]) => {
    if (countryCodes.length === 0) {
      setError("Please select at least one country for comparison.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crimeSlug, countryCodes }),
      });
      if (!res.ok) {
        throw new Error("Failed to load legal comparison matrix");
      }
      const data = await res.json();
      setComparison(data.comparison);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison(selectedCrime, selectedCountries);
  }, [selectedCrime, selectedCountries]);

  const toggleCountry = (code: string) => {
    if (selectedCountries.includes(code)) {
      if (selectedCountries.length <= 1) return; // Keep at least 1
      setSelectedCountries(selectedCountries.filter((c) => c !== code));
    } else {
      if (selectedCountries.length >= 6) return; // Max 6
      setSelectedCountries([...selectedCountries, code]);
    }
  };

  const handleExportCSV = () => {
    if (!comparison) return;
    const csv = generateComparisonCSV(comparison);
    downloadCSV(`CyberLaw_Atlas_${comparison.crime.slug}_Comparison.csv`, csv);
  };

  const handleExportPDF = () => {
    if (!comparison) return;
    generateComparisonPDF(comparison);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GitCompare className="h-4 w-4" />
            <span>Cross-Border Comparison Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Compare Cyber Laws
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Side-by-side multi-jurisdictional legal analysis of criminal provisions, punishments, and mens rea.
          </p>
        </div>

        {/* Export Buttons */}
        {comparison && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Export PDF Report</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        )}
      </div>

      {/* Control Panel: Selectors */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] space-y-6 shadow-xl">
        {/* Crime Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            1. Select Cybercrime
          </label>
          <select
            value={selectedCrime}
            onChange={(e) => setSelectedCrime(e.target.value)}
            className="w-full sm:w-96 px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SEED_CRIMES.map((crime) => (
              <option key={crime.slug} value={crime.slug}>
                {crime.name} {crime.isAiRelated ? "(AI Crime)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selector Checkboxes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Select Jurisdictions (Compare 1 to 6 Sovereign Countries)
            </label>
            <span className="text-xs text-slate-400">
              {selectedCountries.length} of 6 selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {SEED_COUNTRIES.map((c) => {
              const isSelected = selectedCountries.includes(c.code);
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => toggleCountry(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <span>{c.flagEmoji}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-[#0a1226]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto" />
          <p className="mt-3 text-sm text-slate-400">
            Synthesizing multi-country statutory provisions and punishments...
          </p>
        </div>
      )}

      {error && (
        <div className="p-6 rounded-xl border border-rose-800/50 bg-rose-950/20 text-rose-300 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Comparison Matrix Output */}
      {!loading && comparison && (
        <div className="space-y-6">
          {/* Active Offence Summary */}
          <div className="p-4 rounded-xl border border-slate-800 bg-[#0a1226]/60 text-xs text-slate-300 flex items-center justify-between">
            <div>
              Comparing offence: <strong className="text-white">{comparison.crime.name}</strong> ({comparison.crime.categoryName})
            </div>
            <div className="text-slate-400">
              Verified Primary Statutes
            </div>
          </div>

          {/* Desktop Table Matrix (hidden on mobile, visible on md+) */}
          <div className="hidden md:block rounded-2xl border border-slate-800 bg-[#0a1226] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="p-4 font-bold">Country & Status</th>
                    <th className="p-4 font-bold">Applicable Legislation</th>
                    <th className="p-4 font-bold">Provision & Heading</th>
                    <th className="p-4 font-bold">Plain Explanation</th>
                    <th className="p-4 font-bold">Statutory Punishment</th>
                    <th className="p-4 font-bold">Mens Rea / Intent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {comparison.matrix.map((row) => (
                    <tr key={row.countryCode} className="hover:bg-slate-800/30 transition-colors">
                      {/* Country & Status */}
                      <td className="p-4 align-top">
                        <div className="font-bold text-sm text-white">
                          {row.countryName}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {row.countryCode}
                        </span>
                        <div className="mt-2">
                          <span className="inline-block text-[9px] font-semibold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/40">
                            {row.coverageStatus.replace(/_/g, " ")}
                          </span>
                        </div>
                      </td>

                      {/* Applicable Legislation */}
                      <td className="p-4 align-top max-w-[200px]">
                        <div className="font-semibold text-slate-200">
                          {row.legislationTitle}
                        </div>
                        {row.legislationCommonName && (
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            [{row.legislationCommonName}]
                          </div>
                        )}
                        <span className="inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 mt-2">
                          {row.status}
                        </span>
                      </td>

                      {/* Provision & Heading */}
                      <td className="p-4 align-top max-w-[180px]">
                        <span className="font-mono font-bold text-blue-400 block">
                          {row.sectionNumber}
                        </span>
                        <span className="text-slate-300 font-medium block mt-1">
                          {row.heading}
                        </span>
                      </td>

                      {/* Plain Explanation */}
                      <td className="p-4 align-top max-w-[260px] text-slate-300 leading-relaxed">
                        {row.plainExplanation}
                      </td>

                      {/* Statutory Punishment */}
                      <td className="p-4 align-top max-w-[220px]">
                        <div className="p-2.5 rounded bg-amber-950/20 border border-amber-800/30 text-amber-200/90 font-medium leading-relaxed">
                          {row.punishmentText}
                        </div>
                        {row.fineSummary && (
                          <span className="text-[10px] text-slate-400 block mt-1.5">
                            {row.fineSummary}
                          </span>
                        )}
                      </td>

                      {/* Mens Rea / Intent */}
                      <td className="p-4 align-top max-w-[180px] text-slate-300">
                        {row.intentRequirement || "Intentional unauthorized conduct"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Stacked Cards (visible on mobile < md) */}
          <div className="md:hidden space-y-4">
            {comparison.matrix.map((row) => (
              <div
                key={row.countryCode}
                className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] space-y-3 text-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base text-white">
                      {row.countryName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {row.countryCode}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
                    {row.coverageStatus.replace(/_/g, " ")}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Legislation</div>
                  <div className="font-bold text-slate-200">{row.legislationTitle}</div>
                  <div className="text-blue-400 font-mono mt-0.5">
                    {row.sectionNumber} — {row.heading}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Explanation</div>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    {row.plainExplanation}
                  </p>
                </div>

                <div className="p-3 rounded bg-amber-950/20 border border-amber-800/30">
                  <div className="text-[11px] text-amber-300 font-bold uppercase">Statutory Penalty</div>
                  <p className="text-amber-200/90 mt-0.5">
                    {row.punishmentText}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Mental State / Mens Rea</div>
                  <div className="text-slate-300 mt-0.5">{row.intentRequirement}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodology Notes */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3 text-xs text-slate-400">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center space-x-2">
              <Scale className="h-4 w-4 text-blue-400" />
              <span>Comparative Legal Methodology & Caveats</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              {comparison.methodologyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Suspense
        fallback={
          <div className="p-12 text-center rounded-2xl border border-slate-800 bg-[#0a1226]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto" />
            <p className="mt-3 text-sm text-slate-400">Loading Legal Comparison Matrix...</p>
          </div>
        }
      >
        <CompareContent />
      </Suspense>
    </div>
  );
}
