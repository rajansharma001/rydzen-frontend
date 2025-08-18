"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { NavMenu } from "../data";
import Link from "next/link";
import { linkeSytle } from "../style";
import { Menu, SearchIcon, ShoppingCart, X } from "lucide-react";
import ButtonLink from "./ButtonLink";

const Header = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSideMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full  bg-white flex shadow-2xl shadow-gray-300 transition-all duration-300 ease-in-out    ${
        scroll ? "top-0 fixed   z-50" : "top-11 "
      }`}
    >
      <div className="w-[25%] p-2 lg:p-8 md:p-8 flex gap-2 justify-center items-center bg-primary">
        <Link
          href="/"
          className=" flex flex-col lg:flex-row md:flex-row items-center justify-center gap-0 lg:gap-5 md:gap-3"
        >
          <Image
            src="/logo.svg"
            alt="SiteLogo"
            width={650}
            height={640}
            className="w-[80%] lg:w-[30%] md:w-[50%]"
          />
          <h1 className="lg:text-3xl md:text-2xl text-lg font-extrabold text-text-primary uppercase">
            Rydzen
          </h1>
        </Link>
      </div>
      <div className="lg:w-[75%] w-full flex justify-end items-center lg:px-15 md:px-10 px-5">
        <div className="lg:w-[70%] w-[50%] flex items-center justify-center">
          {/* small device menu */}
          <button
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="lg:hidden flex"
          >
            <Menu
              size={28}
              className={`text-text-primary ml-15 ${linkeSytle} `}
            />
          </button>

          {/* side menu */}
          <div
            ref={menuRef}
            className={`${
              sideMenuOpen
                ? "min-w-[90%] translate-0"
                : "w-0 -translate-100 translate-y-0"
            } absolute z-10 top-31 bg-text-primary text-white left-0   h-screen transition-all ease-in-out duration-300`}
          >
            <div className="relative w-full  items-center justify-start  flex-col flex z-20 mt-20 ">
              <div className="absolute right-28 -mt-20">
                <button onClick={() => setSideMenuOpen(!sideMenuOpen)}>
                  <X
                    size={28}
                    className={`text-white ml-15 absolute z-20 ${linkeSytle} `}
                  />
                </button>
              </div>
              {NavMenu &&
                NavMenu.map((nav, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-start gap-3 px-20"
                  >
                    <Link
                      href={nav.link}
                      className={`${linkeSytle} font-bold uppercase text-[16px] text-white mt-5`}
                    >
                      {nav.name}
                    </Link>
                    <span className="w-full border-b-2 border-gray-500 "></span>
                  </div>
                ))}
            </div>
          </div>

          {/* large device menu */}
          <ul className=" gap-5 items-center hidden lg:flex">
            {NavMenu &&
              NavMenu.map((nav, index) => (
                <li key={index}>
                  <Link
                    href={nav.link}
                    className={`${linkeSytle} font-bold uppercase text-[16px] text-text-secondary`}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="lg:w-[30%] w-[50%] flex justify-end items-center gap-4">
          <SearchIcon size={22} className={`text-text-primary ${linkeSytle}`} />
          <span className="text-gray-500 font-bold">|</span>
          <ShoppingCart
            size={28}
            className={`text-text-primary ${linkeSytle}`}
          />
          <ButtonLink
            btnLink="/#"
            btnTitle="Purchase now"
            btnStyle="hidden md:flex lg:flex"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
