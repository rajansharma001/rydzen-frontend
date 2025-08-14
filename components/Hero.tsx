"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Slider } from "../data";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const nextSlide = () => {
    setImgIndex((index) => {
      if (index === Slider.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };

  const prevSlide = () => {
    setImgIndex((index) => {
      if (index === 0) {
        return Slider.length - 1;
      }
      return index - 1;
    });
  };

  const currentSlide = Slider[imgIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-full h-[250px] lg:h-[600px] md:h-[400px] overflow-hidden  relative">
      <div className="w-full flex items-center h-full bg-[url('/slides/slideBg.png')] ">
        <div className="w-[50%] flex">
          <div className="w-full lg:ml-25 lg:p-10 md:lg:p-5 p-2 flex flex-col  gap-6 ">
            <h1 className="lg:text-7xl md:text-5xl font-bold text-text-primary text-right ">
              {currentSlide.slideText}
            </h1>
            <div className="flex justify-end">
              <ButtonLink
                btnStyle=""
                btnTitle={currentSlide.btnTitle}
                btnLink={currentSlide.btnLink}
              />
            </div>
          </div>
        </div>
        <div className="w-[50%]  flex justify-end ">
          <Image
            src={currentSlide.slideImage}
            width={1080}
            height={720}
            alt={currentSlide.slideText}
            className="w-full  object-contain transition-all duration-700 ease-in-out "
          />
        </div>
      </div>
      {/* slide navigation button */}
      <div className="absolute bottom-0 lg:top-[50%] md:top-[50%] w-full flex justify-between items-center">
        <Button btnTitle="<<" clickEvent={prevSlide} />
        <Button btnTitle=">>" clickEvent={nextSlide} />
      </div>
    </div>
  );
};

export default Hero;
