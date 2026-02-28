import { getAllSlugs, getTourBySlug } from "@/lib/tours-repository";
import Navbar from "@/app/shared/layout/Navbar";
import Footer from "@/app/shared/layout/Footer";
import TourHero from "@/app/modules/tour-detail/TourHero";
import TourDescription from "@/app/modules/tour-detail/TourDescription";
import React from "react";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ id: slug }));
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

  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <Navbar />
      <TourHero tour={tour} />
      <TourDescription tour={tour} />
      <Footer />
    </main>
  );
}
