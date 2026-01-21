import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TSUNAMI TRAVEL | Авторские туры в Китай",
  description:
    "Премиальные туры в Китай. Откройте для себя Поднебесную с экспертами.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoSlab.variable} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
