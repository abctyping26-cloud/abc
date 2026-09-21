import { MetadataRoute } from "next";
import { CATEGORIES, slugify } from "./data/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.abcauh.ae";

  // Dedicated service pages
  const serviceUrls: MetadataRoute.Sitemap = CATEGORIES.flatMap((category) =>
    category.services.map((service) => ({
      url: `${baseUrl}/services/${slugify(service.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}
