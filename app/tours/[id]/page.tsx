import { tours } from "@/app/data/tours";
import Navbar from "@/app/_shared/layout/Navbar";
import Footer from "@/app/_shared/layout/Footer";
import TourHero from "@/app/modules/tour-detail/TourHero";
import TourDescription from "@/app/modules/tour-detail/TourDescription";
import React from "react";

export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = tours.find((t) => t.slug === id);

  if (!tour) {
    return (
      <div className="min-h-screen bg-dark-section flex items-center justify-center text-white">
        Тур не найден
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <Navbar />
      <TourHero tour={tour} />
      <TourDescription tour={tour} />
      <Footer />
    </main>
  );
}
