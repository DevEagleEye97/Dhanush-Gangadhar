import { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = portfolioConfig.domain || "https://bonddigital.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
