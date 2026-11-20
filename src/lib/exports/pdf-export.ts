import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ComparisonResult } from "@/types";

export function generateComparisonPDF(comparison: ComparisonResult) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Header
  doc.setFillColor(10, 17, 40); // Dark Navy
  doc.rect(0, 0, 297, 24, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CYBERLAW ATLAS — GLOBAL LEGAL COMPARISON INTELLIGENCE", 14, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} | Reference: CLA-COMP-${Date.now().toString().slice(-6)}`, 14, 18);

  // Crime Title Info
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`Offence Analysis: ${comparison.crime.name}`, 14, 34);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const splitDesc = doc.splitTextToSize(comparison.crime.shortDescription, 269);
  doc.text(splitDesc, 14, 40);

  // Table Data
  const tableData = comparison.matrix.map((row) => [
    `${row.countryName} (${row.countryCode})`,
    row.legislationTitle + (row.legislationCommonName ? `\n[${row.legislationCommonName}]` : ""),
    row.sectionNumber || "General Code",
    row.coverageStatus.replace(/_/g, " "),
    row.status.replace(/_/g, " "),
    row.punishmentText || "Penalties at judicial discretion",
    row.intentRequirement || "Mens rea required",
  ]);

  autoTable(doc, {
    startY: 48,
    head: [
      [
        "Country",
        "Applicable Legislation",
        "Provision / Section",
        "Coverage Type",
        "Status",
        "Statutory Punishment",
        "Intent / Mens Rea",
      ],
    ],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
    },
    columnStyles: {
      0: { cellWidth: 32, fontStyle: "bold" },
      1: { cellWidth: 50 },
      2: { cellWidth: 35 },
      3: { cellWidth: 32 },
      4: { cellWidth: 25 },
      5: { cellWidth: 55 },
      6: { cellWidth: 40 },
    },
    margin: { left: 14, right: 14 },
  });

  // Disclaimer Footer
  const finalY = (doc as any).lastAutoTable.finalY || 160;
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Legal Disclaimer: CyberLaw Atlas is an educational and research platform. The information provided is compiled from primary government gazettes for research purposes and does not constitute formal legal counsel.",
    14,
    Math.min(finalY + 12, 195)
  );

  doc.save(`CyberLaw_Atlas_${comparison.crime.slug}_Comparison.pdf`);
}

