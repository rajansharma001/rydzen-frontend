"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { carCategory } from "../data";
import Image from "next/image";
import Button from "./Button";

const BrowseByCategory = () => {
  const visibleCount = 8;

  const extendedCategories = [
    ...carCategory.slice(-visibleCount),
    ...carCategory,
    ...carCategory.slice(0, visibleCount),
  ];
  const [startIndex, setStartIndex] = useState(visibleCount);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextCat();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextCat = () => {
    setStartIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prevCat = () => {
    setStartIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

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
  }, [startIndex]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-80 lg:mt-0 md:mt-30 py-20 px-0 bg-[url('/category_bg.png')] bg-cover bg-no-repeat bg-right-top gap-5">
      <div className="w-[75%] flex justify-center items-center">
        <SectionTitle
          headingStyle="text-center "
          titleStyle="text-center text-white"
          heading="CAR CATEGORY"
          title="Browse By Car Type"
        />
      </div>
      <div className="w-[75%] overflow-hidden flex gap-3 relative">
        <div
          className="flex gap-6 "
          style={{
            transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
            width: `${(extendedCategories.length / visibleCount) * 100}%`,
          }}
        >
          {extendedCategories.map((cat, index) => (
            <div
              key={index}
              className="rounded-full border-4 border-dashed border-primary px-5 py-3 flex-shrink-0 flex gap-0  flex-col justify-center items-center bg-white hover:scale-[90%] cursor-pointer"
              style={{ width: `${100 / visibleCount}%` }}
            >
              <Image
                src={cat.categoryImg}
                alt={cat.category}
                width={320}
                height={250}
                className=" relative rounded-full w-[150px] py-8  "
              />
              <h1 className="absolute bottom-3 text-text-primary text-sm font-semibold -mt-5">
                {cat.category}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute w-full flex items-center justify-between">
        <Button clickEvent={prevCat} btnTitle="Prev" btnStyle="" />
        <Button clickEvent={nextCat} btnTitle="Next" btnStyle="" />
      </div>
    </div>
  );
};

export default BrowseByCategory;
