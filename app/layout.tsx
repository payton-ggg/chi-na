import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./shared/common/SmoothScroll";
import Preloader from "./shared/common/Preloader";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "TSUNAMI TRAVEL | Авторские экскурсии в Китай",
  description:
    "Премиальные экскурсии в Китай. Откройте для себя Поднебесную с экспертами.",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${robotoSlab.variable} antialiased`}>
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
