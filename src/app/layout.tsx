import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "../../components/TopBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FooterCredit from "../../components/FooterCredit";

export const metadata: Metadata = {
  title: "Rydzen",
  description: "Car Rental Site",
  icons: {
    icon: "/RydzenIcon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full bg-black max-h-screen">
        <header className="w-full">
          <TopBar />
          <Header />
        </header>
        <div className="w-full">{children}</div>
        <footer className=" bottom-0 p-0">
          <Footer />
          <FooterCredit />
        </footer>
      </body>
    </html>
  );
}
