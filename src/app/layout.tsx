import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageProvider } from "@/context/PageContext";
import { fetchMenuFront, fetchSettings, fetchMenuByName } from "@/lib/api";

export const metadata: Metadata = {
  title: "MediSquare Superspeciality Hospital and Research Institute",
  description: "MediSquare based in Ahmedabad is one of the best superspeciality hospital for oncology, neurology and pediatric nephrology.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menu: Menu[] = [];
  let footerMenu: Menu[] = [];
  let settings: Setting[] = [];
  try {
    const [menuRes, footerMenuRes, settingsRes] = await Promise.all([
      fetchMenuFront(),
      fetchMenuByName("Footer").catch(() => null),
      fetchSettings().catch(() => []),
    ]);
    if (menuRes && menuRes.success && Array.isArray(menuRes.data)) {
      menu = menuRes.data;
    }
    if (footerMenuRes && footerMenuRes.success && Array.isArray(footerMenuRes.data)) {
      footerMenu = footerMenuRes.data;
    }
    if (settingsRes) {
      settings = settingsRes;
    }
  } catch (error) {
    console.error("Failed to fetch menu or settings in RootLayout:", error);
  }

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <PageProvider>
          <div className="flex flex-col min-h-screen">
            <Header menu={menu} settings={settings} />
            <div className="flex-grow">{children}</div>
            <Footer settings={settings} footerMenu={footerMenu} />
          </div>
        </PageProvider>
      </body>
    </html>
  );
}
