import type { MetadataRoute } from "next";

const BASE_URL = "https://al-musnad.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/levels",
          "/levels/*",
          "/browse",
          "/worksheet/*",
          "/support",
          "/publisher/*",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/moderator",
          "/moderator/*",
          "/inspector",
          "/inspector/*",
          "/api",
          "/api/*",
          "/profile",
          "/upload",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
