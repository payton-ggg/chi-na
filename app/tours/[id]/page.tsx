import { tours } from "@/app/data/tours";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import TourHero from "@/app/components/tours/TourHero";
import TourDescription from "@/app/components/tours/TourDescription";

export function generateStaticParams() {
  return tours.map((tour) => ({
    id: tour.id.toString(),
  }));
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === parseInt(id));

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
