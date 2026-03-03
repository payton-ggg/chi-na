import { getAllSlugs, getTourBySlug } from "@/lib/tours-repository";
import Navbar from "@/app/shared/layout/Navbar";
import Footer from "@/app/shared/layout/Footer";
import TourHero from "@/app/modules/tour-detail/TourHero";
import TourDescription from "@/app/modules/tour-detail/TourDescription";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsunami-travel.ru";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tour = await getTourBySlug(id);
  if (!tour) return {};

  const url = `${SITE_URL}/tours/${tour.slug}`;
  const guide = tour.guides?.[0];

  return {
    title: `${tour.title} — экскурсия с гидом`,
    description:
      tour.fullDescription?.slice(0, 155) ??
      `${tour.description} Авторская экскурсия с русскоязычным гидом${
        guide ? ` ${guide.name}` : ""
      }. Мини-группа, без визы.`,
    keywords: [
      tour.title.toLowerCase(),
      "тур " + tour.title.toLowerCase(),
      "экскурсия " + tour.title.toLowerCase(),
      "tsunami travel",
      guide?.name?.toLowerCase() ?? "",
    ].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${tour.title} | Tsunami Travel`,
      description: tour.description,
      images: tour.image
        ? [{ url: tour.image, width: 1200, height: 630, alt: tour.title }]
        : [],
    },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await getTourBySlug(id);

  if (!tour) {
    return (
      <div className="min-h-screen bg-dark-section flex items-center justify-center text-white">
        Тур не найден
      </div>
    );
  }

  const guide = tour.guides?.[0];
  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: tour.title,
    description: tour.fullDescription ?? tour.description,
    url: `${SITE_URL}/tours/${tour.slug}`,
    image: tour.image ? `${SITE_URL}${tour.image}` : undefined,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Tsunami Travel",
    },
    ...(guide && {
      guide: {
        "@type": "Person",
        name: guide.name,
        jobTitle: guide.role,
        sameAs: guide.telegram,
      },
    }),
    touristType: ["Туристы", "Путешественники"],
    availableLanguage: "Russian",
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/booking`,
        actionPlatform: "https://schema.org/DesktopWebPlatform",
      },
      result: {
        "@type": "Reservation",
        name: `Бронирование тура ${tour.title}`,
      },
    },
  };

  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      <Navbar />
      <TourHero tour={tour} />
      <TourDescription tour={tour} />
      <Footer />
    </main>
  );
}
