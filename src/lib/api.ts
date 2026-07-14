/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityClient } from "./sanity";
import {
  ALL_SITE_DETAILS_QUERY,
  ALL_SOCIALS_QUERY,
  NAVIGATION_MENU_QUERY,
  PAGE_BY_SLUG_QUERY,
  PAGE_BY_TYPE_QUERY,
  PAGES_SITEMAP_QUERY,
} from "./queries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sanityFetch<T = any>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return sanityClient.fetch<T>(query, params);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageData(raw: any): PageResponse | null {
  if (!raw) return null;

  const camelToSnake = (str: string): string => {
    if (!str) return "";
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  };

  return {
    slug: raw.slug || "",
    title: raw.title || "",
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    pageType: raw.pageType || "",
    schemaMarkup: raw.schemaMarkup,

    sections: Array.isArray(raw.sections)
      ? raw.sections
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((section: any) => {
            if (!section) return false;
            const sectionData = section.sectionData || section;
            return (
              sectionData.hideSection !== true && section.hideSection !== true
            );
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((section: any, index: number) => {
            const isProjected = section && "sectionData" in section;

            let id = "";
            let rawType = "";
            let sortOrder = index + 1;
            let sectionData = {};

            if (isProjected) {
              id = section.id || section._key || "";
              rawType = section.sectionType || section._type || "";
              sortOrder = section.sortOrder ?? index + 1;
              sectionData = section.sectionData || {};
            } else {
              id = section._key || "";
              rawType = section._type || "";
              sortOrder = index + 1;
              sectionData = { ...section };
            }

            // Clean null and undefined values from sectionData
            let cleanSectionData = {};
            if (sectionData && typeof sectionData === "object") {
              cleanSectionData = Object.fromEntries(
                Object.entries(sectionData).filter(
                  ([, v]) => v !== null && v !== undefined,
                ),
              );
            }

            const sectionType = camelToSnake(rawType);

            return {
              id,
              sectionType,
              sortOrder,
              sectionData: cleanSectionData,
            };
          })
      : [],
  };
}

export async function fetchPageSections(pageType: string): Promise<PageResponse> {
  const raw = await sanityFetch(PAGE_BY_TYPE_QUERY, {
    pageTypeName: pageType,
  });
  console.log(raw,"rawrawraw");

  const page = mapPageData(raw);
  if (!page) {
    throw new Error(`No published page found for type "${pageType}"`);
  }
  
  return page;
}

export async function fetchSettings(): Promise<Setting[]> {
  const [rawDetails, rawSocials] = await Promise.all([
    sanityFetch(ALL_SITE_DETAILS_QUERY),
    sanityFetch(ALL_SOCIALS_QUERY),
  ]);

  const settings: Setting[] = [];

  if (Array.isArray(rawDetails)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawDetails.forEach((d: any) => {
      settings.push({
        id: d._id || d.key,
        key: d.key,
        value: d.value || "",
      });
    });
  }

  if (Array.isArray(rawSocials)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawSocials.forEach((s: any) => {
      settings.push({
        id: s._id || s.socialKey,
        key: s.socialKey,
        value: s.socialValue || "",
      });
    });
  }

  return settings.filter((s) => s.value !== "");
}

export async function fetchMenuFront(): Promise<MenusResponse> {
  const raw = await sanityFetch(NAVIGATION_MENU_QUERY, {
    menuTypeName: "Header",
  });

  if (!raw || !Array.isArray(raw.items)) {
    return { success: true, status: 200, message: "No menu", data: [] };
  }

  const items = raw.items
    .filter((item: any) => item && item.status === 1)
    .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item: any, idx: number) => {
      let link = "#";
      if (item.linkType === "page") {
        const slug = item.pageSlug || "";
        link = slug === "home" || slug === "/" ? "/" : slug ? `/${slug}` : "#";
      } else {
        link = item.externalLink || "#";
      }

      return {
        id: `menu-${idx}`,
        menuName: item.menuName || "",
        link,
        parentPageId: null,
        sortOrder: item.sortOrder ?? idx,
        status: "active",
        isClickable: item.isClickable !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentPage: null,
        segment: null,
        children: Array.isArray(item.children)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? item.children
              .filter((child: any) => child && child.status === 1)
              .map((child: any, cidx: number) => {
                let childLink = "#";
                if (child.linkType === "page") {
                  const slug = child.pageSlug || "";
                  childLink = slug === "home" || slug === "/" ? "/" : slug ? `/${slug}` : "#";
                } else {
                  childLink = child.externalLink || "#";
                }
                return {
                  id: `menu-${idx}-${cidx}`,
                  menuName: child.menuName || "",
                  link: childLink,
                  parentPageId: `menu-${idx}`,
                  sortOrder: child.sortOrder ?? cidx,
                  status: "active",
                  isClickable: child.isClickable !== false,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  parentPage: null,
                  segment: null,
                  children: [],
                };
              })
          : [],
      };
    });

  return { success: true, status: 200, message: "Menu fetched", data: items };
}

export async function fetchMenuByName(menuTypeName: string): Promise<MenusResponse> {
  const raw = await sanityFetch(NAVIGATION_MENU_QUERY, {
    menuTypeName,
  });

  if (!raw || !Array.isArray(raw.items)) {
    return { success: true, status: 200, message: "No menu", data: [] };
  }

  const items = raw.items
    .filter((item: any) => item && item.status === 1)
    .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item: any, idx: number) => {
      let link = "#";
      if (item.linkType === "page") {
        const slug = item.pageSlug || "";
        link = slug === "home" || slug === "/" ? "/" : slug ? `/${slug}` : "#";
      } else {
        link = item.externalLink || "#";
      }

      return {
        id: `menu-${idx}`,
        menuName: item.menuName || "",
        link,
        parentPageId: null,
        sortOrder: item.sortOrder ?? idx,
        status: "active",
        isClickable: item.isClickable !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentPage: null,
        segment: null,
        children: Array.isArray(item.children)
          ? item.children
              .filter((child: any) => child && child.status === 1)
              .map((child: any, cidx: number) => {
                let childLink = "#";
                if (child.linkType === "page") {
                  const slug = child.pageSlug || "";
                  childLink = slug === "home" || slug === "/" ? "/" : slug ? `/${slug}` : "#";
                } else {
                  childLink = child.externalLink || "#";
                }
                return {
                  id: `menu-${idx}-${cidx}`,
                  menuName: child.menuName || "",
                  link: childLink,
                  parentPageId: `menu-${idx}`,
                  sortOrder: child.sortOrder ?? cidx,
                  status: "active",
                  isClickable: child.isClickable !== false,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  parentPage: null,
                  segment: null,
                  children: [],
                };
              })
          : [],
      };
    });

  return { success: true, status: 200, message: "Menu fetched", data: items };
}

export async function fetchPageBySlug(slug: string): Promise<PageBySlugResponse> {
  const querySlug = slug === "/" ? "home" : slug;
  const raw = await sanityFetch(PAGE_BY_SLUG_QUERY, { slug: querySlug });

  const data = mapPageData(raw);
  if (!data) {
    return {
      success: false,
      status: 404,
      message: "Page not found",
      data: null,
    };
  }
  return { success: true, status: 200, message: "Page fetched", data };
}

export async function fetchPagesSitemap(): Promise<{
  pages: Array<{ slug: string; updatedAt: string; changefreq?: string; priority?: string }>;
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any[] = await sanityFetch(PAGES_SITEMAP_QUERY);
  const pages = Array.isArray(raw)
    ? raw
        .filter((p) => p.slug)
        .map((p) => ({
          slug: p.slug === "home" ? "" : p.slug,
          updatedAt: p.updatedAt as string,
          changefreq: "daily",
          priority: p.slug === "home" ? "1.0" : "0.7",
        }))
    : [];
  return { pages };
}
