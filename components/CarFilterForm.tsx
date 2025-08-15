"use client";
import React from "react";
import Input from "./Input";
import Button from "./Button";

const CarFilterForm = () => {
  const handleChange = () => {};
  return (
    <div className="w-full flex items-center justify-center ">
      <form action="" className="w-full flex justify-center items-center">
        <div className="w-full lg:w-[75%] md:w-[85%] flex flex-col gap-4 shadow-2xl shadow-gray-300 py-7 lg:px-20 md:px-15 px-10 ">
          <h1 className="text-center text-text-secondary text-3xl font-semibold">
            Find your Dream car
          </h1>
          <div className="w-full flex lg:flex-row flex-col gap-4">
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Condition</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Model</option>
                <option value="">Select Mileage</option>
                <option value="">Select Year</option>
                <option value="">gs</option>
              </select>
            </div>
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Mileage</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>{" "}
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Year</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-4">
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Color</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Transmission</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>
            <div className="lg:w-3/12 w-full">
              <select
                name="select"
                id=""
                className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
              >
                <option value="">Select Price</option>
                <option value="">gs</option>
                <option value="">gs</option>
                <option value="">gs</option>
              </select>
            </div>
            <div className="lg:w-3/12 w-full">
              <Button btnTitle="Search Now" btnStyle="w-full" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarFilterForm;
