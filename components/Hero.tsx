"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "../data";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { motion } from "framer-motion";

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
        <div className="w-[50%] flex ">
          <motion.div
            className="w-full lg:ml-25 lg:p-10 md:lg:p-5 p-2 flex flex-col  gap-6 transition-all duration-300 ease-in-out "
            key={currentSlide.slideImage}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 className="lg:text-7xl md:text-5xl font-bold text-text-primary text-right ">
              {currentSlide.slideText}
            </motion.h1>
            <motion.div
              key={currentSlide.slideImage}
              className="flex justify-end "
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
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
        <div className="w-[50%]  flex justify-end  ">
          <motion.img
            src={currentSlide.slideImage}
            alt={currentSlide.slideText}
            className="w-full  object-contain transition-all duration-700 ease-in"
            key={currentSlide.slideImage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </div>
      {/* slide navigation button */}
      <div className="absolute  lg:top-[50%] md:top-[50%] w-full flex justify-between items-center">
        <Button btnStyle="" btnTitle="<<" clickEvent={prevSlide} />
        <Button btnStyle="" btnTitle=">>" clickEvent={nextSlide} />
      </div>
    </div>
  );
};

export default Hero;
