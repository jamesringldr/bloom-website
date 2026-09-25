import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";

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
        url: "/logo-bloom-web.png",
        width: 800,
        height: 400,
        alt: "BLOOM wordmark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.metaDescription,
    images: ["/logo-bloom-web.png"],
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
