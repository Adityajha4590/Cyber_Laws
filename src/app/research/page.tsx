"use client";

import { useState } from "react";
import {
  Search,
  Sparkles,
  Loader2,
  ExternalLink,
  Shield,
  Scale,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ResearchAssistantResponse } from "@/types";

const SUGGESTED_QUERIES = [
  "What is the punishment for phishing in India?",
  "Compare ransomware legislation in India and the United States.",
  "Is deepfake fraud explicitly criminalized in the UK?",
  "What laws apply to unauthorized computer access in Singapore?",
  "What are the legal gaps concerning AI-generated cybercrime?",
];

export default function ResearchAssistantPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResearchAssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async (textToSearch: string) => {
    if (!textToSearch.trim()) return;
    setLoading(true);
    setError(null);
    setQuery(textToSearch);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSearch }),
      });

      if (!res.ok) {
        throw new Error("Research query processing failed.");
      }

      const data = await res.json();
      setResponse(data.response);
      if (!history.includes(textToSearch)) {
        setHistory([textToSearch, ...history].slice(0, 5));
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Shield className="h-4 w-4" />
          <span>Statutory Intelligence Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          AI Legal Research Assistant
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Ask complex legal research questions. Grounded directly in primary government gazettes, statutory codes, and codified provisions with verified non-fabricated citations.
        </p>
      </div>

      {/* Query Input Card */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] shadow-xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What is the statutory punishment for unauthorized access in India?"
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 flex items-center justify-center space-x-2 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Researching...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Execute Research</span>
              </>
            )}
          </button>
        </form>

        {/* Suggested Queries */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Suggested Research Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((sq) => (
              <button
                key={sq}
                type="button"
                onClick={() => handleSearch(sq)}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-left"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Output */}
      {error && (
        <div className="p-5 rounded-xl border border-rose-800/40 bg-rose-950/20 text-rose-300 text-sm flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Research Output Workspace */}
      {response && (
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0a1226] shadow-2xl space-y-6">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Primary Citations</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Confidence: {(response.confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Researched: {response.lastResearchDate}
            </span>
          </div>

          {/* Direct Answer */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">
              Direct Statutory Answer
            </h2>
            <p className="text-base text-white font-medium leading-relaxed">
              {response.directAnswer}
            </p>
          </section>

          {/* Executive Summary */}
          <section className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Executive Legal Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {response.executiveSummary}
            </p>
          </section>

          {/* Country-Specific Analysis */}
          {response.countryAnalysis.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Scale className="h-4 w-4 text-indigo-400" />
                <span>Statutory Breakdown by Jurisdiction</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {response.countryAnalysis.map((ca, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">
                        {ca.countryName}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300">
                        {ca.legalStatus}
                      </span>
                    </div>
                    <div className="text-slate-300 font-medium">
                      Act: {ca.applicableLegislation}
                    </div>
                    <div className="text-blue-400 font-mono">
                      {ca.sections}
                    </div>
                    <div className="p-2.5 rounded bg-amber-950/20 border border-amber-800/30 text-amber-200/90 font-medium">
                      {ca.punishmentSummary}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comparative Analysis */}
          {response.comparativeAnalysis && (
            <section className="space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">
                Cross-Jurisdictional Comparative Analysis
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {response.comparativeAnalysis}
              </p>
            </section>
          )}

          {/* Legal Gaps */}
          {response.legalGaps && (
            <section className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/20 text-xs space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] block flex items-center space-x-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Identified Legal Gap / Regulatory Frontier</span>
              </span>
              <p className="text-amber-200/90 leading-relaxed">
                {response.legalGaps}
              </p>
            </section>
          )}

          {/* Source Citations */}
          <section className="space-y-3 pt-4 border-t border-slate-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
              <span>Authoritative Citations & Source Documents ({response.citations.length})</span>
            </h3>
            <div className="divide-y divide-slate-800/80">
              {response.citations.map((c, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <span>{c.sourceTitle}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {c.organization}
                    </span>
                    {c.excerpt && (
                      <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-2">
                        &ldquo;{c.excerpt}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 shrink-0">
                    {c.reliability}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Disclaimer */}
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 text-[11px] text-slate-400 leading-relaxed">
            {response.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
}
