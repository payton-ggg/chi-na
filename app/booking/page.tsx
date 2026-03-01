import Navbar from "../shared/layout/Navbar";
import BookingHero from "../modules/booking/BookingHero";
import BookingForm from "../modules/booking/BookingForm";
import SmoothScroll from "../shared/common/SmoothScroll";
import { getAllTours } from "@/lib/tours-repository";

export default async function BookingPage() {
  const tours = await getAllTours();
  return (
    <main className="min-h-screen bg-dark-section text-light-surface relative">
      <SmoothScroll />
      <Navbar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cta/10 rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-cta/5 rounded-full blur-[120px] opacity-10" />
      </div>

      <div className="relative z-10">
        <BookingHero />
        <BookingForm tours={tours} />
      </div>
    </main>
  );
}
