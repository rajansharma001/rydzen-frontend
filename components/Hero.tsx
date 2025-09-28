"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { motion } from "framer-motion";
import { SlideTypes } from "../types/slideTypes";

const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [slider, setSlider] = useState<SlideTypes[]>([]);

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/slide/get-slide`,
          {
            credentials: "include",
            method: "GET",
          }
        );
        const result = await res.json();
        setSlider(result.getSlide || []);
        if (!res.ok) console.log(result.error);
      } catch (error) {
        console.log("API ERROR!", error);
      }
    };
    fetchSlide();
  }, []);

  const nextSlide = () => {
    setImgIndex((index) => (index === slider.length - 1 ? 0 : index + 1));
  };

  const prevSlide = () => {
    setImgIndex((index) => (index === 0 ? slider.length - 1 : index - 1));
  };

  useEffect(() => {
    if (slider.length === 0) return;
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [slider.length]);

  if (slider.length === 0) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentSlide = slider[imgIndex];

  return (
    <div className="w-full h-[250px] lg:h-[600px] md:h-[400px] overflow-hidden relative">
      <div className="w-full flex items-center h-full bg-[url('/slides/slideBg.png')]">
        <div className="w-[50%] flex">
          <motion.div
            className="w-full lg:ml-25 lg:p-10 md:p-5 p-2 flex flex-col gap-6"
            key={currentSlide.slideImage}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 className="lg:text-7xl md:text-5xl font-bold text-text-primary text-right">
              {currentSlide.slideText}
            </motion.h1>

            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <ButtonLink
                btnStyle=""
                btnTitle={currentSlide.btnTitle}
                btnLink={currentSlide.btnLink}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="w-[50%] flex justify-end">
          <motion.img
            key={currentSlide.slideImage}
            src={currentSlide.slideImage}
            alt={currentSlide.slideText || "Slide Image"}
            className="w-full object-contain transition-all duration-700 ease-in"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute lg:top-[50%] md:top-[50%] w-full flex justify-between items-center">
        <Button btnTitle="<<" clickEvent={prevSlide} btnStyle="" />
        <Button btnTitle=">>" clickEvent={nextSlide} btnStyle="" />
      </div>
    </div>
  );
};

export default Hero;
