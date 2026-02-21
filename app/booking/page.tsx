import Navbar from "../_shared/layout/Navbar";
import Footer from "../_shared/layout/Footer";
import BookingHero from "../modules/booking/BookingHero";
import BookingForm from "../modules/booking/BookingForm";
import SmoothScroll from "../_shared/common/SmoothScroll";

export default function BookingPage() {
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
        <BookingForm />
      </div>
    </main>
  );
}
