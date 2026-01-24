import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PopularTours from "./components/PopularTours";
import TourSummary from "./components/TourSummary";
import HowItWorks from "./components/HowItWorks";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <PopularTours />
      <TourSummary />
      <HowItWorks />
      <FinalCTA />
      {/* <Footer /> */}
    </main>
  );
}
