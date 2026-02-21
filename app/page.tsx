import Navbar from "./_shared/layout/Navbar";
import Hero from "./modules/home/Hero";
import Features from "./modules/home/Features";
import PopularTours from "./modules/home/PopularTours";
import TourSummary from "./modules/home/TourSummary";
import HowItWorks from "./modules/home/HowItWorks";
import Accommodation from "./modules/home/Accommodation";
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
