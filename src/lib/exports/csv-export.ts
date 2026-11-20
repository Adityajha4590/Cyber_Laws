import { ComparisonResult } from "@/types";

export function generateComparisonCSV(comparison: ComparisonResult): string {
  const headers = [
    "Country",
    "Country Code",
    "Crime Name",
    "Coverage Status",
    "Legislation Title",
    "Common Name",
    "Section / Article",
    "Heading",
    "Explanation",
    "Intent Requirement",
    "Legislative Status",
    "Max Imprisonment",
    "Fine Summary",
    "Source",
  ];

  const escapeCSV = (val: any) => {
    if (val == null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = comparison.matrix.map((item) => [
    escapeCSV(item.countryName),
    escapeCSV(item.countryCode),
    escapeCSV(comparison.crime.name),
    escapeCSV(item.coverageStatus),
    escapeCSV(item.legislationTitle),
    escapeCSV(item.legislationCommonName || ""),
    escapeCSV(item.sectionNumber || ""),
    escapeCSV(item.heading || ""),
    escapeCSV(item.plainExplanation || ""),
    escapeCSV(item.intentRequirement || ""),
    escapeCSV(item.status),
    escapeCSV(item.imprisonmentMax ? `${item.imprisonmentMax} ${item.imprisonmentUnit || "years"}` : "N/A"),
    escapeCSV(item.fineSummary || ""),
    escapeCSV(item.sourceUrl || ""),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  return csvContent;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
