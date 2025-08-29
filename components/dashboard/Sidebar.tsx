"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideMenu from "./SideMenu";

const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="h-20 border-b-1 border-gray-700 flex items-center justify-center">
        <Link
          href="/admin/dashboard"
          className=" flex flex-col lg:flex-row md:flex-row items-center justify-center gap-0 lg:gap-5 md:gap-3"
        >
          <Image
            src="../../logo-white.svg"
            alt="SiteLogo"
            width={650}
            height={640}
            className="w-[80%] lg:w-[30%] md:w-[50%] "
          />
          <h1 className="lg:text-2xl md:text-2xl text-lg font-extrabold text-dash-text-primary uppercase">
            Rydzen
          </h1>
        </Link>
      </div>
      <SideMenu />
    </div>
  );
};

export default Sidebar;
