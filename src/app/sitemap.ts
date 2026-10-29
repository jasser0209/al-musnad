import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL = "https://al-musnad.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Static Core Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/levels`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/browse`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // 2. The 6 Primary Grade Levels
  const gradeSlugs = [
    "grade-1",
    "grade-2",
    "grade-3",
    "grade-4",
    "grade-5",
    "grade-6",
  ];

  let gradeRoutes: MetadataRoute.Sitemap = [];
  try {
    const gradesFromDb = await db.grade.findMany({
      select: { slug: true, createdAt: true },
    });

    const activeSlugs =
      gradesFromDb.length > 0
        ? gradesFromDb.map((g) => ({
            slug: g.slug,
            updatedAt: g.createdAt || currentDate,
          }))
        : gradeSlugs.map((s) => ({ slug: s, updatedAt: currentDate }));

    gradeRoutes = activeSlugs.map((g) => ({
      url: `${BASE_URL}/levels/${g.slug}`,
      lastModified: g.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    gradeRoutes = gradeSlugs.map((slug) => ({
      url: `${BASE_URL}/levels/${slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  }

  // 3. Dynamic Public Worksheets
  let worksheetRoutes: MetadataRoute.Sitemap = [];
  try {
    const worksheets = await db.worksheet.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        id: true,
        updatedAt: true,
      },
      take: 5000,
      orderBy: { updatedAt: "desc" },
    });

    worksheetRoutes = worksheets.map((w) => ({
      url: `${BASE_URL}/worksheet/${w.id}`,
      lastModified: w.updatedAt || currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    worksheetRoutes = [];
  }

  return [...staticRoutes, ...gradeRoutes, ...worksheetRoutes];
}
