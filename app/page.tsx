import Navbar from "./shared/layout/Navbar";
import Hero from "./modules/home/Hero";
import Features from "./modules/home/Features";
import PopularTours from "./modules/home/PopularTours";
import TourSummary from "./modules/home/TourSummary";
import HowItWorks from "./modules/home/HowItWorks";
import Accommodation from "./modules/home/Accommodation";
import Footer from "./shared/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Туры по Китаю с гидом — Шанхай, Горы Аватара",
  description:
    "Авторские туры по Китаю с русскоязычным гидом Львом Логачевым. Шанхай, Горы Аватара, Восточная Венеция. Мини-группы до 5 человек, без визы для граждан РФ.",
  keywords: [
    "туры по китаю",
    "авторские туры в китай",
    "экскурсии шанхай",
    "горы аватара тур",
    "чжанцзяцзе тур",
  ],
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsunamitravel.ru"
    }/`,
  },
};

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
