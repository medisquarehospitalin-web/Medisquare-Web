import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN ,
});

export function isSanityConfigured(): boolean {
  return !!(projectId && dataset);
}

export function resolveSanityImageUrl(
  asset: { _ref?: string; url?: string } | string | null | undefined,
): string {
  if (!asset) return "";
  if (typeof asset === "string") {
    if (asset.startsWith("http")) return asset;
    return "";
  }
  if (asset.url) return asset.url;
  return "";
}
