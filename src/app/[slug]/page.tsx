import { fetchPageBySlug, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

export const revalidate = 30;

interface UnifiedPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = [
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
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: UnifiedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await fetchSettings().catch(() => []);

  try {
    const response = await fetchPageBySlug(slug);
    if (!response?.success || !response.data) {
      return { title: "Page Not Found" };
    }

    const pageData = response.data;
    const title = pageData.metaTitle || pageData.title || "MediSquare Hospital";
    const description =
      pageData.metaDescription ||
      getSettingValue(
        settings,
        "default_page_description",
        "MediSquare Superspeciality Hospital and Research Institute"
      );
    const canonical = `https://medisquare.in/${slug}`;

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
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return { title: "MediSquare Hospital" };
  }
}

export default async function UnifiedPage({ params }: UnifiedPageProps) {
  const { slug } = await params;

  let pageData: PageResponse | undefined;
  let settings: Setting[] = [];

  try {
    const response = await fetchPageBySlug(slug);
    if (!response?.success || !response.data) notFound();
    pageData = response.data;
    settings = await fetchSettings();
  } catch {
    notFound();
  }

  const sortedSections = [...pageData!.sections].sort(
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
