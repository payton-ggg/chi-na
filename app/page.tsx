import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PopularTours from "./components/PopularTours";
import ChinaContrast from "./components/ChinaContrast";
import HowItWorks from "./components/HowItWorks";
import Trust from "./components/Trust";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <PopularTours />
      <ChinaContrast />
      <HowItWorks />
      <Trust />
      <FinalCTA />
      <Footer />
    </main>
  );
}
