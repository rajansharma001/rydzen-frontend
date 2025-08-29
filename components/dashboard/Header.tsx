"use client";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="w-full bg-dash-bg-secondary h-20 flex items-center justify-center ">
      <div className="w-full px-10 flex justify-between items-center">
        <div className="">
          <Menu size={20} />
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <Search size={20} />
          </div>
          <div className="relative">
            <Bell size={20} />
            <div className="w-2 h-2 rounded-full bg-red-700 absolute top-0 right-0 animate-pulse "></div>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/defaultuser.jpeg"
              alt="UserImg"
              width={650}
              height={640}
              className="h-10 w-10 rounded-full  border-2 border-gray-500"
            />
            <div>
              <h1 className="text-[14px] font-semibold">Rajan</h1>
              <h2 className="text-[12px]">Admin</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
