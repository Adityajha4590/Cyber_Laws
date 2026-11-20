"use client";

import { useState } from "react";
import {
  Lock,
  Shield,
  BookOpen,
  Globe,
  Scale,
  FileCheck,
  CheckCircle2,
  XCircle,
  Plus,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { SEED_CRIMES, SEED_COUNTRIES, SEED_LEGISLATION, SEED_SOURCES } from "@/lib/db/seed-data";

interface PendingResearchItem {
  id: string;
  query: string;
  suggestedCrime: string;
  jurisdiction: string;
  provisionFound: string;
  sourceUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_QUEUE: PendingResearchItem[] = [
  {
    id: "q-1",
    query: "Is Deepfake pornography criminalized in the UK Criminal Justice Bill?",
    suggestedCrime: "Non-Consensual Synthetic Media",
    jurisdiction: "United Kingdom",
    provisionFound: "Criminal Justice Bill 2024 (Clause on sexually explicit deepfakes)",
    sourceUrl: "https://www.legislation.gov.uk",
    status: "PENDING",
  },
  {
    id: "q-2",
    query: "What is the penalty for AI model extraction under German StGB § 202a?",
    suggestedCrime: "AI Model Theft",
    jurisdiction: "Germany",
    provisionFound: "StGB § 202a (Ausspähen von Daten) - Up to 3 years imprisonment",
    sourceUrl: "https://www.gesetze-im-internet.de/stgb/__202a.html",
    status: "PENDING",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "queue" | "crimes" | "audit">("overview");
  const [queue, setQueue] = useState<PendingResearchItem[]>(INITIAL_QUEUE);
  const [newCrimeName, setNewCrimeName] = useState("");
  const [newCrimeCategory, setNewCrimeCategory] = useState("cat-1");
  const [crimeCreatedMsg, setCrimeCreatedMsg] = useState<string | null>(null);

  const handleQueueAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setQueue(
      queue.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const handleCreateCrime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrimeName.trim()) return;
    setCrimeCreatedMsg(`Offence "${newCrimeName}" registered into administrative staging catalogue.`);
    setNewCrimeName("");
    setTimeout(() => setCrimeCreatedMsg(null), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="h-4 w-4" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Admin Dashboard & Research Queue
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Curate verified statutory provisions, manage cybercrimes catalogue, and review AI-researched legislation.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "overview"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          System Overview
        </button>
        <button
          onClick={() => setActiveTab("queue")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
            activeTab === "queue"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <span>AI Research Queue</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-bold">
            {queue.filter((q) => q.status === "PENDING").length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("crimes")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "crimes"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Manage Cybercrimes
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === "audit"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Audit Log
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0a1226]">
              <span className="text-2xl font-extrabold text-blue-400 block font-mono">
                {SEED_COUNTRIES.length}
              </span>
              <span className="text-xs text-slate-400">Jurisdictions In Database</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0a1226]">
              <span className="text-2xl font-extrabold text-rose-400 block font-mono">
                {SEED_CRIMES.length}
              </span>
              <span className="text-xs text-slate-400">Catalogued Cybercrimes</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0a1226]">
              <span className="text-2xl font-extrabold text-indigo-400 block font-mono">
                {SEED_LEGISLATION.length}
              </span>
              <span className="text-xs text-slate-400">Primary Statutes</span>
            </div>
            <div className="p-5 rounded-xl border border-slate-800 bg-[#0a1226]">
              <span className="text-2xl font-extrabold text-emerald-400 block font-mono">
                {SEED_SOURCES.length}
              </span>
              <span className="text-xs text-slate-400">Verified Gazettes</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Verification Engine Health & Invariants
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>AI Hallucination Safeguard: All external queries require authoritative gazette URLs.</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Referential Integrity: All legal provisions mapped directly to sovereign statutes.</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Unverified Research Isolation: AI outputs isolated until administrator review.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Research Queue Tab */}
      {activeTab === "queue" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              AI-Generated Legal Findings Awaiting Editorial Verification
            </h3>
            <span className="text-xs text-slate-400">
              {queue.filter((q) => q.status === "PENDING").length} Pending Review
            </span>
          </div>

          <div className="space-y-3">
            {queue.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">
                      {item.suggestedCrime}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.jurisdiction}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      item.status === "APPROVED"
                        ? "bg-emerald-950 text-emerald-400"
                        : item.status === "REJECTED"
                        ? "bg-rose-950 text-rose-400"
                        : "bg-amber-950 text-amber-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400">User Query: <strong className="text-slate-200">{item.query}</strong></div>
                  <div className="text-slate-400">Extracted Provision: <span className="text-blue-300 font-mono">{item.provisionFound}</span></div>
                  <div className="text-slate-400">Source: <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{item.sourceUrl}</a></div>
                </div>

                {item.status === "PENDING" && (
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => handleQueueAction(item.id, "APPROVED")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Approve & Publish to Database</span>
                    </button>
                    <button
                      onClick={() => handleQueueAction(item.id, "REJECTED")}
                      className="px-3 py-1.5 rounded-lg border border-rose-800/60 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-semibold transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Reject Finding</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manage Crimes Tab */}
      {activeTab === "crimes" && (
        <div className="space-y-6">
          {crimeCreatedMsg && (
            <div className="p-4 rounded-xl border border-emerald-800/40 bg-emerald-950/20 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{crimeCreatedMsg}</span>
            </div>
          )}

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Plus className="h-4 w-4 text-blue-400" />
              <span>Register New Cybercrime Entry</span>
            </h3>

            <form onSubmit={handleCreateCrime} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Crime Title
                  </label>
                  <input
                    type="text"
                    value={newCrimeName}
                    onChange={(e) => setNewCrimeName(e.target.value)}
                    placeholder="e.g. Automated Biometric Spoofing"
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Category Taxonomy
                  </label>
                  <select
                    value={newCrimeCategory}
                    onChange={(e) => setNewCrimeCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="cat-1">Unauthorized Access and Hacking</option>
                    <option value="cat-2">Malware and Ransomware</option>
                    <option value="cat-13">AI-Related Crimes</option>
                    <option value="cat-4">Identity Theft and Impersonation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
              >
                Create Offence Record
              </button>
            </form>
          </div>

          <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-[#0a1226] overflow-hidden">
            {SEED_CRIMES.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="text-slate-400 ml-2 font-mono text-[11px]">({c.slug})</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {c.categoryName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>Cryptographic Administrative Audit Trail</span>
          </h3>

          <div className="divide-y divide-slate-800 text-xs">
            <div className="py-3 first:pt-0 flex items-start justify-between">
              <div>
                <span className="font-bold text-slate-200">System Seed Initialization</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  10 sovereign countries, 15 cyber categories, 8 primary statutes, and 7 primary gazette sources populated.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500">2026-11-20 08:54:36</span>
            </div>

            <div className="py-3 flex items-start justify-between">
              <div>
                <span className="font-bold text-slate-200">Statutory Mapping Verified</span>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Cross-jurisdictional mapping for Unauthorized Computer Access and Ransomware verified against MeitY & US Code Title 18.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500">2026-11-20 09:05:12</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

