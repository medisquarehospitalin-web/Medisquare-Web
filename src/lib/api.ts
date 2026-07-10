import homeData from "../../data/home.json";
import oncologyData from "../../data/oncology.json";
import movementdisordersData from "../../data/movementdisorders.json";
import pediatricData from "../../data/pediatric.json";
import drEktaData from "../../data/dr_ekta.json";
import drMiteshData from "../../data/dr_mitesh.json";
import awarenessData from "../../data/awareness.json";
import educationOncologyData from "../../data/education_oncology.json";
import educationMovementdisordersData from "../../data/education_movementdisorders.json";
import educationPediatricData from "../../data/education_pediatric.json";
import menuData from "../../data/menu.json";
import settingsData from "../../data/settings.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataMap: Record<string, any> = {
  home: homeData,
  oncology: oncologyData,
  movementdisorders: movementdisordersData,
  pediatric: pediatricData,
  dr_ekta: drEktaData,
  dr_mitesh: drMiteshData,
  awareness: awarenessData,
  education_oncology: educationOncologyData,
  education_movementdisorders: educationMovementdisordersData,
  education_pediatric: educationPediatricData,
  menu: menuData,
  settings: settingsData,
};

export async function fetchPageSections(pageType: string): Promise<PageResponse> {
  const normalized = pageType.toLowerCase().replace(/-/g, "_");
  const data = dataMap[normalized === "home" ? "home" : normalized];
  if (!data) {
    throw new Error(`No mock data found for page type "${pageType}"`);
  }
  return data;
}

export async function fetchSettings(): Promise<Setting[]> {
  return (dataMap.settings as Setting[]) || [];
}

export async function fetchMenuFront(): Promise<MenusResponse> {
  const menu = dataMap.menu;
  if (!menu) {
    return { success: true, status: 200, message: "No menu", data: [] };
  }
  return {
    success: true,
    status: 200,
    message: "Menu fetched",
    data: menu,
  };
}

export async function fetchMenuByName(): Promise<MenusResponse> {
  return fetchMenuFront();
}

export async function fetchPageBySlug(slug: string): Promise<PageBySlugResponse> {
  const normalized = slug.toLowerCase().replace(/-/g, "_");
  const data = dataMap[normalized];
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
  const slugs = [
    "home",
    "oncology",
    "movementdisorders",
    "pediatric",
    "dr_ekta",
    "dr_mitesh",
    "awareness",
    "education_oncology",
    "education_movementdisorders",
    "education_pediatric",
  ];
  return {
    pages: slugs.map((slug) => ({
      slug: slug === "home" ? "" : slug,
      updatedAt: new Date().toISOString(),
      changefreq: "daily",
      priority: slug === "home" ? "1.0" : "0.7",
    })),
  };
}
