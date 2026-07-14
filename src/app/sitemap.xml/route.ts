import { NextResponse } from "next/server";
import { fetchPagesSitemap } from "@/lib/api";

const BASE_DOMAIN = process.env.BASE_DOMAIN || "https://medisquare.in";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  let pages: Array<{ slug: string; updatedAt: string; changefreq?: string; priority?: string }> = [];

  try {
    const res = await fetchPagesSitemap();
    pages = res.pages;
  } catch (error) {
    console.error("Failed to fetch sitemap pages:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (p) => `
  <url>
    <loc>${BASE_DOMAIN}${p.slug ? `/${p.slug}` : ""}</loc>
    <lastmod>${p.updatedAt ? p.updatedAt.split("T")[0] : today}</lastmod>
    <changefreq>${p.changefreq || "daily"}</changefreq>
    <priority>${p.priority || "0.7"}</priority>
  </url>`
    )
    .join("")}
</urlset>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
