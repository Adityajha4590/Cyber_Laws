import Link from "next/link";
import { Clock, Scale, Globe, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { TimelineService } from "@/services/timeline-service";
import { CountryService } from "@/services/country-service";
import { formatDate } from "@/lib/utils";

interface TimelinePageProps {
  searchParams: {
    country?: string;
    eventType?: string;
  };
}

export const revalidate = 60;

export default async function TimelinePage({ searchParams }: TimelinePageProps) {
  const countries = await CountryService.getAllCountries();
  const eventTypes = await TimelineService.getEventTypes();

  const selectedCountry = searchParams.country;
  const selectedType = searchParams.eventType;

  const events = await TimelineService.getAllEvents({
    countryCode: selectedCountry,
    eventType: selectedType,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Clock className="h-4 w-4" />
          <span>Legislative Evolution</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Legal Timeline & Statutory Milestones
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Chronological registry of statutory enactments, key amendments, gazette notifications, and landmark judicial decisions shaping global cyber law.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
        <Link
          href="/timeline"
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !selectedCountry && !selectedType
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          All Milestones ({events.length})
        </Link>
        {countries.slice(0, 5).map((c) => (
          <Link
            key={c.code}
            href={`/timeline?country=${c.code}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
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

      {/* Timeline Tree Component */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-8 pb-12">
        {events.map((evt) => (
          <div key={evt.id} className="relative pl-6 sm:pl-8 group">
            {/* Dot Node */}
            <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-[#070d1e] group-hover:bg-blue-500 transition-colors" />

            {/* Event Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0a1226] hover:border-slate-700 transition-colors space-y-3 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800/40">
                    {evt.eventType}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {evt.countryName} ({evt.countryCode})
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>{formatDate(evt.eventDate)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {evt.title}
                </h3>
                <span className="text-xs text-indigo-400 block mt-0.5">
                  Statute: {evt.legislationTitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {evt.description}
              </p>

              {evt.officialGazetteRef && (
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span>
                    Official Gazette Citation: <strong className="text-slate-200 font-mono">{evt.officialGazetteRef}</strong>
                  </span>
                  {evt.sourceUrl && (
                    <a
                      href={evt.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-medium"
                    >
                      <span>Primary Record</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
