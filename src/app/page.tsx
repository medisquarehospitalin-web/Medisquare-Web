import { fetchPageSections, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const canonical = "https://medisquare.in/";
  const settings = await fetchSettings().catch(() => []);

  try {
    const pageData = await fetchPageSections("home");

    const title = pageData?.metaTitle || "MediSquare Superspeciality Hospital";
    const description =
      pageData?.metaDescription ||
      getSettingValue(
        settings,
        "default_page_description",
        "MediSquare based in Ahmedabad is one of the best superspeciality hospital for oncology, neurology and pediatric nephrology."
      );

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "MediSquare Hospital",
        locale: "en_IN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "MediSquare Superspeciality Hospital and Research Institute",
      description: "Best Superspeciality Hospital in Ahmedabad",
    };
  }
}

export default async function Home() {
  let pageData: PageResponse;
  let settings: Setting[] = [];

  try {
    pageData = await fetchPageSections("home");
    settings = await fetchSettings();
  } catch (error) {
    console.error("Error loading home page components:", error);
    return (
      <main className="flex min-h-screen items-center justify-center px-6 bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Unable to load page
          </h1>
          <p className="text-gray-600">
            Please check your local database files and try again.
          </p>
        </div>
      </main>
    );
  }

  const sortedSections = [...pageData.sections].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <main className="min-h-screen">
      {pageData?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageData.schemaMarkup.replace(/<\/?script[^>]*>/gi, ""),
          }}
        />
      )}

      <SectionRenderer
        sections={sortedSections}
        settings={settings}
      />
    </main>
  );
}
