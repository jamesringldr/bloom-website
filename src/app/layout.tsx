import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";

const ogImageAlt =
  "BLOOM — Where little hearts grow, play, and bloom. Opening January 2027 in Lenexa, KS.";

export const metadata: Metadata = {
  title: `${site.name} | Lenexa, KS Daycare Opening January 2027`,
  description: site.metaDescription,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.name} — Where little ones bloom`,
    description: site.metaDescription,
    url: `https://${site.domain}`,
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.metaDescription,
    images: [{ url: "/og-image.jpg", alt: ogImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
