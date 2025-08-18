"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import ButtonLink from "./ButtonLink";
import Divider from "./Divider";
import { Armchair, Car, CarFront, Fuel } from "lucide-react";
import { carDetailsTypes } from "../types/carDetails";

const CarCard = () => {
  const [carDetails, setCarDetails] = useState<carDetailsTypes[] | null>([]);

  const getCarDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      setCarDetails(result.getCarDetails);
    } catch (error) {
      console.log("API Error");
    }
  };

  useEffect(() => {
    getCarDetails();
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full px-5 lg:px-0 lg:w-[75%] flex justify-center items-center flex-col py-10">
        <SectionTitle
          heading="TOP CAR INVENTORY"
          title="Latest Featured Car Inventory"
          headingStyle="text-center"
          titleStyle=""
        />
        <div className="w-full flex flex-wrap justify-center gap-4 mt-10">
          {carDetails &&
            carDetails.map((car) => (
              <div
                key={car._id}
                className=" shadow-xl shadow-gray-300 w-full lg:w-[32%] md:w-[45%] transition-all duration-300 ease-in-out hover:-translate-y-2 cursor-pointer hover:shadow-gray-400"
              >
                <div className="relative w-full bg-[#eff3fa] flex items-center justify-center py-10 ">
                  <Image
                    alt={car.name}
                    src={car.image || "/slides/product_2_1.png"}
                    width={420}
                    height={150}
                    className=" w-[80%]"
                  />
                  <div className="absolute p-3 top-0 w-full flex justify-between  text-sm text-text-secondary font-semibold ">
                    <h1>{car.name}</h1>
                    <h1>{car.brand}</h1>
                  </div>
                </div>
                <div className=" py-3 px-5 top-0 w-full flex justify-between items-center  text-sm text-text-secondary font-semibold ">
                  <h1 className="text-text-primary">{car.pricePerDay}</h1>
                  <h1 className="py-1 px-2 bg-primary rounded-md text-text-primary">
                    {car.year}
                  </h1>
                </div>
                <Divider style="w-[90%]" />
                <div className="py-3 px-5 w-full flex justify-between  text-text-secondary text-sm">
                  <div className="gap-2 flex flex-col items-center justify-center">
                    <Fuel size={45} className="p-3 rounded-md bg-[#eff3fa]" />{" "}
                    {car.fuelType}
                  </div>
                  <div className="gap-2 flex flex-col items-center justify-center">
                    <CarFront
                      size={45}
                      className="p-3 rounded-md bg-[#eff3fa]"
                    />{" "}
                    {car.transmission}
                  </div>
                  <div className="gap-2 flex flex-col items-center justify-center">
                    <Car size={45} className="p-3 rounded-md bg-[#eff3fa]" />{" "}
                    {car.mileage}
                  </div>
                  <div className="gap-2 flex flex-col items-center justify-center">
                    <Armchair
                      size={45}
                      className="p-3 rounded-md bg-[#eff3fa]"
                    />{" "}
                    {car.seatingCapacity} Seats
                  </div>
                </div>

                <div className="w-full flex items-center justify-center mb-8 mt-5">
                  <ButtonLink
                    btnLink={`/car-details/${car._id}`}
                    btnTitle="View details"
                    btnStyle=""
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
