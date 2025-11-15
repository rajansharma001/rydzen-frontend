"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { carDetailsTypes } from "../../../../../types/carDetails";
import ButtonLink from "../../../../../components/ButtonLink";

const carDetails = () => {
  const { id } = useParams();
  const [carDetailsById, setCarDetailsById] = useState<carDetailsTypes>();

  const fetchCarDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details/${id}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (!res.ok) {
        console.log("Something went wrong.");
      } else {
        console.log("Car details fetched successfully.");
        setCarDetailsById(result.getCarDetailsById);
      }
    } catch (error) {
      console.log("API ERROR!");
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  return (
    <div className="w-full px-30 py-10 gap-3 flex">
      <div className="w-[60%]  flex items-center justify-center">
        <div className="w-full relative flex flex-col gap-3">
          <Image
            src={(carDetailsById?.image as string) || "/category_bg.png"}
            width={500}
            height={700}
            alt={`${carDetailsById?.name}`}
            className="p-5 border-2 border-gray-200 shadow-2xl shadow-gray-400  rounded-lg w-full max-h-[400px] object-contain "
          />
          <div
            className={`absolute top-5 left-5 px-3 py-2 rounded-lg text-sm ${
              carDetailsById?.availability
                ? "bg-green-700 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {carDetailsById?.availability ? "Available" : "Not available"}
          </div>
          <ButtonLink
            btnLink=""
            btnStyle="w-full rounded-lg"
            btnTitle="Book this vehicle now"
          />
        </div>
      </div>
      <div className="w-[40%] bg-white shadow-2xl shadow-gray-400  rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          {carDetailsById?.name}
        </h1>

        <table className="w-full text-sm text-left text-gray-700">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-3 font-medium text-gray-600">Brand</td>
              <td className="py-3">{carDetailsById?.brand}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Model</td>
              <td className="py-3">{carDetailsById?.model}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Year</td>
              <td className="py-3">{carDetailsById?.year}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Category</td>
              <td className="py-3">{carDetailsById?.category}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Fuel Type</td>
              <td className="py-3">{carDetailsById?.fuelType}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Mileage</td>
              <td className="py-3">{carDetailsById?.mileage} km/l</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Transmission</td>
              <td className="py-3">{carDetailsById?.transmission}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">
                Seating Capacity
              </td>
              <td className="py-3">{carDetailsById?.seatingCapacity}</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-gray-600">Price Per Day</td>
              <td className="py-3 font-semibold text-primary">
                ${carDetailsById?.pricePerDay}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default carDetails;
