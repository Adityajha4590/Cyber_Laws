import { PrismaClient } from "@prisma/client";
import {
  SEED_CATEGORIES,
  SEED_COUNTRIES,
  SEED_CRIMES,
  SEED_SOURCES,
  SEED_LEGISLATION,
} from "../src/lib/db/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CyberLaw Atlas Database...");

  // 1. Seed Categories
  for (const cat of SEED_CATEGORIES) {
    await prisma.cybercrimeCategory.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        displayOrder: cat.displayOrder,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        displayOrder: cat.displayOrder,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_CATEGORIES.length} Cybercrime Categories`);

  // 2. Seed Countries
  for (const country of SEED_COUNTRIES) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {
        iso3: country.iso3,
        name: country.name,
        flagEmoji: country.flagEmoji,
        region: country.region,
        legalSystem: country.legalSystem,
        officialPortals: country.officialPortals,
        description: country.description,
      },
      create: {
        id: country.id,
        code: country.code,
        iso3: country.iso3,
        name: country.name,
        flagEmoji: country.flagEmoji,
        region: country.region,
        legalSystem: country.legalSystem,
        officialPortals: country.officialPortals,
        description: country.description,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_COUNTRIES.length} Sovereign Countries`);

  // 3. Seed Sources
  for (const src of SEED_SOURCES) {
    await prisma.source.upsert({
      where: { id: src.id },
      update: {
        title: src.title,
        organization: src.organization,
        url: src.url,
        domain: src.domain,
        sourceType: src.sourceType,
        reliability: src.reliability as any,
        excerpt: src.excerpt,
        publicationDate: src.publicationDate ? new Date(src.publicationDate) : null,
      },
      create: {
        id: src.id,
        title: src.title,
        organization: src.organization,
        url: src.url,
        domain: src.domain,
        sourceType: src.sourceType,
        reliability: src.reliability as any,
        excerpt: src.excerpt,
        publicationDate: src.publicationDate ? new Date(src.publicationDate) : null,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_SOURCES.length} Authoritative Primary Sources`);

  // 4. Seed Cybercrimes
  for (const crime of SEED_CRIMES) {
    await prisma.cybercrime.upsert({
      where: { slug: crime.slug },
      update: {
        name: crime.name,
        categoryId: crime.categoryId,
        shortDescription: crime.shortDescription,
        detailedExplanation: crime.detailedExplanation,
        commonTerminology: crime.commonTerminology,
        howItWorks: crime.howItWorks,
        typicalImpact: crime.typicalImpact,
        preventionRecommendations: crime.preventionRecommendations,
        isAiRelated: crime.isAiRelated,
        aiSpecificDetails: crime.aiSpecificDetails,
      },
      create: {
        id: crime.id,
        name: crime.name,
        slug: crime.slug,
        categoryId: crime.categoryId,
        shortDescription: crime.shortDescription,
        detailedExplanation: crime.detailedExplanation,
        commonTerminology: crime.commonTerminology,
        howItWorks: crime.howItWorks,
        typicalImpact: crime.typicalImpact,
        preventionRecommendations: crime.preventionRecommendations,
        isAiRelated: crime.isAiRelated,
        aiSpecificDetails: crime.aiSpecificDetails,
      },
    });
  }
  console.log(`✓ Seeded ${SEED_CRIMES.length} Cybercrime Catalog Records`);

  console.log("Database Seeding Successfully Completed!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

