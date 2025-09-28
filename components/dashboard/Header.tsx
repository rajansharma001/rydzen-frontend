"use client";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authProvider";

interface HeaderProps {
  sideMenuOpen: boolean;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({ sideMenuOpen, setSideMenuOpen }) => {
  const [profileOption, setProfileOption] = useState(false);
  const [searchOption, setSearchOption] = useState(false);
  const [notificationOption, setNotificationOption] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { logoutUser } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOption(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOption(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full bg-dash-bg-secondary h-20 flex items-center justify-center ">
      <div className="w-full px-2 lg:px-10 md:lg:px-8 flex justify-between items-center">
        <div className="">
          <Menu
            size={20}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex gap-5 items-center">
          <div className="relative" ref={searchRef}>
            <Search
              size={20}
              onClick={() => setSearchOption(!searchOption)}
              className="cursor-pointer"
            />
            {/* Search option */}
            {searchOption && (
              <form
                action=""
                className="flex items-center w-[300px] absolute  top-15  right-1 gap-1 "
              >
                <input
                  type="search"
                  name="search"
                  placeholder="Search..."
                  className="py-2 px-2 rounded-l-sm border-1  hover:border-primary text-white focus:outline-none flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                />
                <input
                  type="submit"
                  value="Search"
                  className="py-2 px-2 rounded-r-sm bg-primary text-text-primary hover:bg-text-secondary hover:text-white  flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                />
              </form>
            )}
          </div>
          <div className="relative" ref={notificationRef}>
            <Bell size={20} />
            <div className="w-2 h-2 rounded-full bg-red-700 absolute top-0 right-0 animate-pulse "></div>
          </div>
          <div
            className="flex items-center gap-3 relative cursor-pointer "
            ref={profileRef}
            onClick={() => setProfileOption(!profileOption)}
          >
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
            {/* profile options */}
            {profileOption && (
              <div className="absolute top-18 right-0 z-10 w-[200px] p-5 bg-dash-bg-secondary rounded-sm">
                <Link
                  href="/admin/dashboard"
                  className="w-full py-2 px-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/profile"
                  className="w-full py-2 px-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Profile
                </Link>
                <Link
                  href="/admin/settings"
                  className="w-full py-2 px-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Settings
                </Link>
                <button
                  onClick={logoutUser}
                  className="w-full py-2 px-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
