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
    <html lang="en" className="">
      <body className=" w-full ">
        <header className="w-full">
          <TopBar />
          <Header />
        </header>
        <div className=" w-full h-full ">{children}</div>
        <footer className="w-full  bottom-0  lg:mt-10 md:mt-40 mt-80">
          <Footer />
          <FooterCredit />
        </footer>
      </body>
    </html>
  );
}
