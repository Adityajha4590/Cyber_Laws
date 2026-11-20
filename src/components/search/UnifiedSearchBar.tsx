"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, BookOpen, Globe, FileText, Scale, ArrowRight } from "lucide-react";
import { UnifiedSearchResult } from "@/services/search-service";

interface UnifiedSearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
}

export function UnifiedSearchBar({
  placeholder = "Search cybercrime, legislation, legal sections, or countries...",
  autoFocus = false,
}: UnifiedSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "crime":
        return <BookOpen className="h-4 w-4 text-rose-400" />;
      case "country":
        return <Globe className="h-4 w-4 text-emerald-400" />;
      case "legislation":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "provision":
        return <Scale className="h-4 w-4 text-amber-400" />;
      default:
        return <Search className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className="w-full h-13 pl-12 pr-4 rounded-xl border border-slate-700/80 bg-slate-900/90 text-sm text-white placeholder-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Auto-suggest dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 rounded-xl border border-slate-800 bg-[#0b1329] shadow-2xl overflow-hidden divide-y divide-slate-800/80 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No matching legal records found for &quot;{query}&quot;. Try searching for &quot;phishing&quot;, &quot;Section 66&quot;, &quot;CFAA&quot;, or &quot;India&quot;.
            </div>
          ) : (
            results.map((item) => (
              <button
                key={`${item.type}-${item.id}`}
                onClick={() => handleSelect(item.url)}
                className="w-full text-left p-3.5 hover:bg-slate-800/50 transition-colors flex items-start space-x-3 group"
              >
                <div className="mt-0.5 p-1.5 rounded-md bg-slate-800/60 border border-slate-700/50 shrink-0">
                  {getItemIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm text-slate-100 group-hover:text-blue-400 truncate">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {item.subtitle} — {item.snippet}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-blue-400 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

