import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import PopularTours from "./components/sections/PopularTours";
import TourSummary from "./components/sections/TourSummary";
import HowItWorks from "./components/sections/HowItWorks";
import Accommodation from "./components/sections/Accommodation";
import Footer from "./components/layout/Footer";

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
