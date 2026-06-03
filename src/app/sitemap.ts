import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://heartcrafted.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#builder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/#about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/#contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/track`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
