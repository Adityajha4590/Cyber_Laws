import {
  SEED_CRIMES,
  SEED_COUNTRIES,
  SEED_LEGISLATION,
  SEED_MAPPINGS,
} from "@/lib/db/seed-data";
import {
  ComparisonResult,
  ComparisonMatrixItem,
  CountryData,
  LegalCoverage,
} from "@/types";

export class ComparisonService {
  static async compareCrimeAcrossCountries(
    crimeSlug: string,
    countryCodes: string[]
  ): Promise<ComparisonResult | null> {
    const crime = SEED_CRIMES.find((c) => c.slug === crimeSlug);
    if (!crime) return null;

    const normalizedCodes = countryCodes.map((c) => c.toUpperCase());
    const selectedCountries: CountryData[] = SEED_COUNTRIES.filter((c) =>
      normalizedCodes.includes(c.code.toUpperCase())
    );

    const matrix: ComparisonMatrixItem[] = [];

    for (const country of selectedCountries) {
      // Find mappings for this crime & country
      const mapping = SEED_MAPPINGS.find(
        (m) =>
          m.crimeId === crime.id &&
          m.countryCode.toUpperCase() === country.code.toUpperCase()
      );

      const legislation = SEED_LEGISLATION.find(
        (l) => l.countryCode?.toUpperCase() === country.code.toUpperCase()
      );

      const provision = mapping?.provision;
      const punishment = provision?.punishments?.[0];

      let coverageStatus: LegalCoverage = "UNCERTAIN";
      if (mapping) {
        coverageStatus = mapping.coverageStatus;
      } else if (legislation) {
        coverageStatus = "GENERAL_LAW_APPLICABLE";
      }

      matrix.push({
        countryCode: country.code,
        countryName: country.name,
        coverageStatus,
        legislationTitle:
          mapping?.legislationTitle ||
          legislation?.title ||
          "General Criminal / Penal Law",
        legislationCommonName:
          mapping?.legislationCommonName || legislation?.commonName || undefined,
        sectionNumber: provision?.sectionNumber || "Applicable Provisions Under Review",
        heading: provision?.officialHeading || "General computer / fraud provision",
        plainExplanation:
          provision?.plainExplanation ||
          mapping?.notes ||
          `Offence addressed under broader criminal or fraud principles in ${country.name}. Specific statutory codification is being researched.`,
        intentRequirement: provision?.intentRequirement || "Mens rea / intentional conduct",
        status: provision?.status || legislation?.status || "IN_FORCE",
        punishmentText:
          punishment?.descriptiveText ||
          "Statutory penalties vary by damage scale and judicial sentencing guidelines.",
        imprisonmentMax: punishment?.imprisonmentMax ?? null,
        imprisonmentUnit: punishment?.imprisonmentUnit || "years",
        fineSummary: punishment?.fineCurrency
          ? `${punishment.fineType || "Fine"} (${punishment.fineCurrency})`
          : "Fines at judicial discretion",
        effectiveDate: provision?.effectiveDate || legislation?.effectiveDate,
        sourceUrl: legislation?.officialUrl,
        sourceTitle: legislation?.governmentSource,
      });
    }

    const methodologyNotes = [
      "Comparative classifications (EXPLICITLY_REGULATED, INDIRECTLY_COVERED, GENERAL_LAW_APPLICABLE) reflect whether statutory text specifically codifies the digital modality or relies on general criminal fraud/mischief laws.",
      "Penalties are statutory maximums or representative sentencing ranges under primary acts; actual sentences depend on criminal intent (mens rea), proven financial damage, and judicial discretion.",
      "Extraterritorial provisions may apply across jurisdictions where computer systems or victims reside across borders.",
      "This comparative matrix is compiled for academic and policy research and does not constitute formal legal counsel.",
    ];

    return {
      crime,
      countries: selectedCountries,
      matrix,
      methodologyNotes,
    };
  }
}

