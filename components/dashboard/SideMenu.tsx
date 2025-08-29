"use client";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

const SideMenu = () => {
  const [frontendOpen, setFrontendOpen] = useState(false);
  return (
    <div className="w-full px-8 py-10 flex flex-col ">
      <div className="text-[14px]   flex flex-col gap-2 ">
        <div className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
          Dashboard
        </div>
        {/* --------Frontend Manage---------- */}
        <div
          className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() => setFrontendOpen(!frontendOpen)}
        >
          Manage Frontend{" "}
          <ChevronRight
            size={15}
            className={`font-semibold transition-all duration-300 ease-in-out ${
              frontendOpen ? "rotate-90" : ""
            }`}
          />
        </div>

        {frontendOpen && (
          <ul
            className="ml-8 overflow-hidden transition-all duration-300 ease-in-out 
          "
          >
            <li className="py-2 px-3  rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
              Manage Frontend
            </li>
            <li className="py-2 px-3  rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
              Manage Frontend
            </li>
            <li className="py-2 px-3  rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
              Manage Frontend
            </li>
            <li className="py-2 px-3  rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
              Manage Frontend
            </li>
          </ul>
        )}
        {/* --------Frontend Manage---------- */}

        <div className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
          Manage Booking <ChevronRight size={15} className="font-semibold" />
        </div>
        <div className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
          Manage Users <ChevronRight size={15} className="font-semibold" />
        </div>
        <div className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
          Messages
        </div>
        <div className="py-2 px-3 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out">
          Settings
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
