import type { Metadata } from "next";
import "../globals.css";
import TopBar from "../../../components/TopBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FooterCredit from "../../../components/FooterCredit";
import { AuthProvider } from "../../../context/authProvider";

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
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <header className="w-full">
            <TopBar />
            <Header />
          </header>
          <main className=" w-full flex-grow ">{children}</main>
          <footer className="w-full ">
            <Footer />
            <FooterCredit />
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
