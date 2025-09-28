"use client";
import {
  Calendar,
  Car,
  ChevronRight,
  CopyPlus,
  LayoutDashboard,
  Monitor,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const sidemenu = [
  {
    label: "Dashboard",
    name: "dashboard",
    icon: "LayoutDashboard",
    type: "link",
    href: "/admin/dashboard",
  },
  {
    label: "Manage Category",
    name: "manage_category",
    icon: "CopyPlus",
    type: "link",
    href: "/admin/dashboard/manage_category",
  },
  {
    label: "Manage Cars",
    name: "manage_cars",
    icon: "Car",
    type: "link",
    href: "/admin/dashboard/manage_cars",
  },

  {
    label: "Bookings",
    name: "bookings",
    icon: "Calendar",
    type: "link",
    href: "/admin/bookings",
  },
  {
    label: "Manage Frontend",
    icon: "Monitor",
    name: "manage-frontend",
    type: "dropdown",
    children: [
      {
        label: "Hero Section",
        name: "hero-section",
        href: "/admin/dashboard/hero-section",
        type: "link",
      },
    ],
  },
  {
    label: "Users",
    name: "users",
    icon: "Users",
    type: "link",
    href: "/admin/dashboard/manage-users",
  },

  {
    label: "Settings",
    name: "settings",
    icon: "Settings",
    type: "link",
    href: "/admin/dashboard/settings",
  },
];

const icons: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  Car,
  CopyPlus,
  Monitor,
  Settings,
  Calendar,
};

const SideMenu = () => {
  const [menuOpen, setmenuOpen] = useState<string | null>(null);
  const toggleMenu = (name: string) => {
    setmenuOpen((prev) => (prev === name ? null : name));
  };

  console.log(menuOpen);
  return (
    <div className="w-full mt-5 lg:w-full lg:p-5 md:px-10 flex flex-col ">
      {sidemenu &&
        sidemenu.map((menu, index) => {
          const Icon = icons[menu.icon as keyof typeof icons]; // <-- Get icon dynamically

          return (
            <div key={index} className="text-[14px]   flex flex-col gap-2 ">
              {/* --------Frontend Manage---------- */}

              {sidemenu && menu.type === "dropdown" && (
                <div>
                  <div
                    className="py-2 px-2 mt-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={() => {
                      toggleMenu(menu.name);
                    }}
                  >
                    <div className="flex items-center gap-5">
                      {Icon && <Icon size={16} />}
                      {menu.label}
                    </div>
                    <ChevronRight
                      size={15}
                      className={`font-semibold transition-all duration-300 ease-in-out ${
                        menuOpen === menu.name ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {menuOpen === menu.name && (
                    <ul
                      className="ml-8 overflow-hidden transition-all duration-300 ease-in-out 
          "
                    >
                      {menu.children?.map((child, index) => (
                        <Link
                          href={`${child.href}`}
                          key={index}
                          className="py-2 px-2 mt-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {sidemenu && menu.type === "link" && (
                <Link
                  href={`${menu.href}`}
                  className="py-2 px-2 mt-2 rounded-sm hover:bg-primary hover:text-text-primary hover:font-semibold flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center gap-5">
                    {Icon && <Icon size={16} />}
                    {menu.label}
                  </div>
                </Link>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default SideMenu;
