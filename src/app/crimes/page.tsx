import Link from "next/link";
import { BookOpen, Sparkles, CheckCircle2, Search, ArrowRight, Shield } from "lucide-react";
import { CrimeService } from "@/services/crime-service";

interface CrimesPageProps {
  searchParams: {
    category?: string;
    ai?: string;
    q?: string;
  };
}

export const revalidate = 60;

export default async function CrimesPage({ searchParams }: CrimesPageProps) {
  const categories = await CrimeService.getAllCategories();
  const selectedCategory = searchParams.category;
  const isAiFilter = searchParams.ai === "true";

  const crimes = await CrimeService.getAllCrimes({
    categoryId: selectedCategory,
    isAiRelated: isAiFilter ? true : undefined,
    search: searchParams.q,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="h-4 w-4 text-rose-400" />
          <span>Statutory Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Cybercrime Library
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Comprehensive catalog of computer crimes, cyber offences, and emerging AI threats. Structured by technical mechanics, victim impact, and cross-border statutory codification.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
        <Link
          href="/crimes"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !selectedCategory && !isAiFilter
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          All Offences ({crimes.length})
        </Link>
        <Link
          href="/crimes?ai=true"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
            isAiFilter
              ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
              : "bg-slate-900 text-amber-400 hover:bg-slate-800 border border-amber-800/40"
          }`}
        >
          <Sparkles className="h-3 w-3" />
          <span>AI-Related Offences</span>
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/crimes?category=${cat.id}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Crimes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {crimes.map((crime) => (
          <Link
            key={crime.id}
            href={`/crimes/${crime.slug}`}
            className="p-5 rounded-xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 hover:bg-[#0d1730] transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  {crime.categoryName}
                </span>
                {crime.isAiRelated && (
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>AI Crime</span>
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {crime.name}
              </h2>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {crime.shortDescription}
              </p>

              {crime.synonyms && crime.synonyms.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {crime.synonyms.slice(0, 3).map((syn) => (
                    <span
                      key={syn}
                      className="text-[10px] text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="text-blue-400 font-medium">
                {crime.legislationCount ?? 8} Countries Mapped
              </span>
              <span className="flex items-center text-emerald-400 text-[11px]">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

