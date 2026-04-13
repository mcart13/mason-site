import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/work` },
    { url: `${siteUrl}/writing` },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/contact` },
  ];
}
