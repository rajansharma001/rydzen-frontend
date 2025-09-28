import { MailIcon, MapPin, PhoneIcon, User2Icon } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { linkeSytle } from "../style";

const TopBar = () => {
  return (
    <div className="w-full flex md:flex lg:flex flex-col lg:flex-row md:flex-col justify-between items-center  gap-5 p-3 px-15 bg-text-primary text-white ">
      <div className="w-full md:w-full lg:w-[60%] hidden lg:flex md:flex justify-center lg:justify-start">
        <ul className="flex gap-2 md:gap-3 lg:gap-5 text-[14px]  ">
          <li className={`${linkeSytle}`}>
            <PhoneIcon size={18} className="text-primary" /> +(163)-1202-0088
          </li>
          <span className="text-gray-500 font-bold">|</span>
          <li className={`${linkeSytle}`}>
            <MailIcon size={18} className="text-primary" /> help24/7@gmail.com
          </li>
          <span className="text-gray-500 font-bold">|</span>
          <li className={`${linkeSytle}`}>
            <MapPin size={18} className="text-primary" /> 835 Middle Country Rd,
            NY 11784, USA
          </li>
        </ul>
      </div>
      <div className="w-full md:w-full lg:w-[40%] flex justify-center lg:justify-end">
        <ul className="flex gap-5 text-[16px]">
          <li className="flex justify-center items-center gap-3">
            <User2Icon size={18} className="text-primary" />
            <Link href="/login" className={`${linkeSytle}`}>
              Login
            </Link>{" "}
          </li>
          <span className="text-gray-500 font-bold">|</span>
          <li className=" hover:text-primary cursor-pointer flex justify-center items-center gap-5">
            <FaFacebookF size={18} className={`text-white ${linkeSytle}`} />
            <FaInstagram size={18} className={`text-white ${linkeSytle}`} />
            <FaYoutube size={18} className={`text-white ${linkeSytle}`} />
            <FaLinkedin size={18} className={`text-white ${linkeSytle}`} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
