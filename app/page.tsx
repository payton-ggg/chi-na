import Navbar from "./_shared/layout/Navbar";
import Hero from "./_modules/home/Hero";
import Features from "./_modules/home/Features";
import PopularTours from "./_modules/home/PopularTours";
import TourSummary from "./_modules/home/TourSummary";
import HowItWorks from "./_modules/home/HowItWorks";
import Accommodation from "./_modules/home/Accommodation";
import Footer from "./_shared/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <PopularTours />
      <HowItWorks />
      <TourSummary />
      <Accommodation />
      <Footer />
    </main>
  );
}
