"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import Button from "./Button";
import { CatTypes } from "../types/catTypes";

const BrowseByCategory = () => {
  const [carCategory, setCarCategory] = useState<CatTypes[]>([]);
  const [startIndex, setStartIndex] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const visibleCount = 5;

  const fetchCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/get-category`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const result = await res.json();

      if (!res.ok) {
        console.log(result.error);
      } else {
        const unique = result.fetchCategory.filter(
          (cat: CatTypes, i: number, arr: CatTypes[]) =>
            arr.findIndex((c) => c._id === cat._id) === i
        );
        setCarCategory(unique);
      }
    } catch (error) {
      console.log("API ERROR!", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const extendedCategories = [
    ...carCategory.slice(-visibleCount),
    ...carCategory,
    ...carCategory.slice(0, visibleCount),
  ];

  const nextCat = () => {
    setStartIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prevCat = () => {
    setStartIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const interval = setInterval(nextCat, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (startIndex >= extendedCategories.length - visibleCount) {
      setTimeout(() => {
        setIsTransitioning(false);
        setStartIndex(visibleCount);
      }, 500);
    }
    if (startIndex <= 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setStartIndex(extendedCategories.length - visibleCount * 2);
      }, 500);
    }
  }, [startIndex, extendedCategories.length]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-80 lg:mt-0 md:mt-30 py-20 bg-[url('/category_bg.png')] bg-cover bg-no-repeat bg-right-top gap-5">
      <div className="w-[75%] flex justify-center items-center">
        <SectionTitle
          headingStyle="text-center"
          titleStyle="text-center text-white"
          heading="CAR CATEGORY"
          title="Browse By Car Type"
        />
      </div>

      {/* 👇 Loading handled in JSX, NOT with early return */}
      {carCategory.length === 0 ? (
        <div className="w-[75%] text-center text-white py-10">
          Loading Categories...
        </div>
      ) : (
        <div className="w-[75%] overflow-hidden relative flex items-center justify-center">
          <div
            className=" gap-6  flex items-center justify-center"
            style={{
              transform: `translateX(-${startIndex * (25 / visibleCount)}%)`,
              transition: isTransitioning ? "transform 0.5s ease" : "none",
              width: `${(extendedCategories.length / visibleCount) * 100}%`,
            }}
          >
            {extendedCategories.map((cat, index) => (
              <div
                key={index}
                className="w-full rounded-full border-4 border-dashed border-primary px-5 py-3 flex-shrink-0 flex flex-col justify-center items-center bg-white hover:scale-105 cursor-pointer transition-transform"
                style={{ width: `${55 / visibleCount}%` }}
              >
                <Image
                  src={cat.catImg}
                  alt={cat.catName || "Car Category"}
                  width={150}
                  height={150}
                  className="rounded-full py-4"
                />
                <h1 className="mt-2 text-text-primary text-sm font-semibold">
                  {cat.catName || "Unknown"}
                </h1>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2">
            <Button clickEvent={prevCat} btnTitle="Prev" btnStyle="z-10" />
            <Button clickEvent={nextCat} btnTitle="Next" btnStyle="z-10" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseByCategory;
