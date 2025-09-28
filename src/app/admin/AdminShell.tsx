"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Header from "../../../components/dashboard/Header";

interface Props {
  children: React.ReactNode;
}

const AdminShell: React.FC<Props> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(true); // Start open on desktop

  return (
    <div className="w-full h-screen flex bg-bg-primary relative">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full lg:h-auto bg-dash-bg-secondary border-r border-gray-700 z-50 transition-all duration-300 ease-in-out
        ${
          sideMenuOpen
            ? "translate-x-0 w-[250px] lg:w-[18%]"
            : "-translate-x-full lg:w-0 hidden"
        }`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {sideMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSideMenuOpen(false)}
        />
      )}

      {/* Right Side */}
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col relative z-10
        ${sideMenuOpen ? "w-full lg:w-[82%]" : "w-full lg:w-full"}`}
      >
        <header className="w-full border-b border-gray-700">
          <Header
            sideMenuOpen={sideMenuOpen}
            setSideMenuOpen={setSideMenuOpen}
          />
        </header>

        <main className="w-full flex-grow bg-dash-bg-primary p-4">
          {children}
        </main>

        <footer className="w-full bg-dash-bg-secondary mt-auto">Footer</footer>
      </div>
    </div>
  );
};

export default AdminShell;
