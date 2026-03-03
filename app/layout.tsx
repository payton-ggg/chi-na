import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./shared/common/SmoothScroll";
import Preloader from "./shared/common/Preloader";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsunami-travel.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tsunami Travel — Авторские туры и экскурсии по Китаю",
    template: "%s | Tsunami Travel",
  },
  description:
    "Авторские туры по Китаю с русскоязычным гидом. Шанхай, Горы Аватара, Восточная Венеция. Мини-группы до 5 человек, без визы для граждан РФ.",
  keywords: [
    "туры по китаю",
    "авторские туры в китай",
    "экскурсии шанхай",
    "горы аватара тур",
    "чжанцзяцзе тур",
    "tsunami travel",
    "авторские экскурсии китай",
    "русскоязычный гид шанхай",
    "тур шанхай",
    "восточная венеция тур",
    "поездка в китай 2024",
    "китай без визы",
    "экспедиция китай",
    "лев логачев гид",
    "купить тур в китай",
    "путешествие в китай",
  ],
  authors: [{ name: "Tsunami Travel", url: SITE_URL }],
  creator: "Tsunami Travel",
  publisher: "Tsunami Travel",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Tsunami Travel",
    title: "Tsunami Travel — Авторские туры по Китаю",
    description:
      "Авторские туры по Китаю с русскоязычным гидом. Шанхай, Горы Аватара, Восточная Венеция.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Tsunami Travel" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tsunami Travel — Авторские туры по Китаю",
    description:
      "Авторские туры по Китаю с русскоязычным гидом. Шанхай, Горы Аватара, Восточная Венеция.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
};

/** JSON-LD: Organization + WebSite (rendered once in <head>) */
function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#organization`,
        name: "Tsunami Travel",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        description: "Авторские туры по Китаю с русскоязычным гидом.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CN",
          addressLocality: "Shanghai",
        },
        priceRange: "$$$",
        sameAs: [
          "https://instagram.com/tsunami_travel",
          "https://t.me/tsunamisurfer4ever",
          "https://youtube.com/@tsunami_surfer",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: "Russian",
          url: "https://t.me/Lihach57",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Tsunami Travel",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "ru-RU",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/tours?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoSlab.variable} antialiased`}>
        <JsonLd />
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
