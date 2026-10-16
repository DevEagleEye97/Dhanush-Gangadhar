import { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio";
import { projectsData } from "@/data/projects";
import { notesData } from "@/data/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioConfig.domain || portfolioConfig.existingPortfolioUrl || "https://dhanush-gangadhar.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cybersecurity`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const staticProjectSlugs = projectsData.map((project) => project.slug);
  const githubSlugs = [
    "threat-x",
    "shvasa-banking-co",
    "basic-chess-game-",
    "shvasaa",
    "dhanush-gangadhar",
  ];
  const allProjectSlugs = Array.from(new Set([...staticProjectSlugs, ...githubSlugs]));

  const projectRoutes: MetadataRoute.Sitemap = allProjectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const noteRoutes: MetadataRoute.Sitemap = notesData.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
