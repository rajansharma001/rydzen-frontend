import React from "react";
import { AuthProvider } from "../../../../context/authProvider";
import Header from "../../../../components/dashboard/Header";
import { Metadata } from "next";
import "../../globals.css";
import Sidebar from "../../../../components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard - Rydzen",
  description: "Car Rental Site",
  icons: {
    icon: "/RydzenIcon.png",
  },
};
const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="">
      <body className="min-h-screen flex flex-col text-dash-text-primary bg-dash-bg-primary">
        <AuthProvider>
          <div className="w-full h-screen flex justify-between bg-bg-primary">
            <div className="w-0 lg:w-[18%] md:[18%] bg-dash-bg-secondary border-r-1 border-gray-700">
              <Sidebar />
            </div>
            <div className="w-full lg:w-[82%] md:w-[82%]  relative">
              <header className="w-full border-b-1 border-gray-700">
                <Header />
              </header>
              <main className=" w-full flex-grow bg-dash-bg-primary ">
                {children}
              </main>
              <footer className="w-[100%] flex-grow bg-dash-bg-secondary absolute bottom-0">
                Footer
              </footer>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default AdminLayout;
