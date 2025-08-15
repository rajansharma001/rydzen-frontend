import Image from "next/image";
import React from "react";
import SectionTitle from "./SectionTitle";
import Divider from "./Divider";
import ButtonLink from "./ButtonLink";

const About = () => {
  return (
    <div className="w-full flex h-[600px] justify-center items-start lg:mt-20 md:mt-20 mt-50">
      <div className="lg:w-[75%] md:w-[85%] w-full flex flex-col lg:flex-row md:flex-row items-start justify-center gap-5 p-3 ">
        <div className=" w-full lg:w-[50%] md:w-[50%] relative flex items-center justify-start mt-0 lg:mt-50 md:mt-70">
          <Image
            src="/about/about_thumb_bg.png"
            alt="aboutImgBack"
            width={720}
            height={420}
            className="absolute z-0 mt-40 -ml-100  w-full h-[600px]"
          />
          <Image
            src="/about/about1.png"
            alt="aboutImgBack"
            width={420}
            height={320}
            className="absolute z-10  w-[70%]"
          />
          <Image
            src="/about/about2.png"
            alt="aboutImgBack"
            width={420}
            height={320}
            className="absolute z-20 top-10 lg:left-40 md:left-30 w-[60%]"
          />

          <div className=" absolute px-8 py-12 -top-50 lg:right-15 right-0  rounded-full border-8 border-primary bg-white z-30">
            <h1 className="text-4xl font-bold stroke-2 text-center">1k+</h1>
            <p className="text-sm font-semibold text-center text-text-secondary">
              BEST CAR <br />
              DEALER AWARD
            </p>
          </div>
        </div>
        <div className=" w-full lg:w-[50%] md:w-[50%] mt-60 lg:mt-0 md:mt-0 flex flex-col justify-center items-start gap-3">
          <div className="w-full flex items-center justify-center lg:justify-start md:justify-start">
            <SectionTitle title="ABOUT OUR COMPANY" />
          </div>
          <h1 className="lg:text-4xl md:text-2xl text-xl font-bold font-sans text-text-primary text-center lg:text-start md:text-start">
            Welcome to Our Dealaro Car Dealer Company
          </h1>
          <p className="text-sm text-text-secondary gap-3 text-justify ">
            Progressively develop out-of-the-box initiatives with superior
            opportunities. Interactively streamline cross-media partnerships
            without efficient process improvements. Distinctively network
            exceptional e-services. Progressively develop out-of-the-box
            initiatives with superior opportunities. Interactively streamline
            cross-media partnerships without efficient process improvements.
            Distinctively network exceptional e-services. Progressively develop
            out-of-the-box initiatives with superior opportunities.{" "}
          </p>
          <p className="text-sm text-text-secondary gap-3 text-justify">
            Interactively streamline cross-media partnerships without efficient
            process improvements. Distinctively network exceptional
            e-services.Progressively develop out-of-the-box initiatives with
            superior opportunities. Interactively streamline cross-media
            partnerships without efficient process improvements. Distinctively
            network exceptional e-services. Progressively develop out-of-the-box
            initiatives with superior opportunities. Interactively streamline
          </p>
          <Divider />
          <div className="w-full flex items-center justify-center lg:justify-start md:justify-start">
            <ButtonLink btnLink="/#" btnStyle="" btnTitle="Learn More" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default About;
