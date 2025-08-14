"use client";
import React from "react";
import Input from "./Input";

const CarFilterForm = () => {
  const handleChange = () => {};
  return (
    <div className="w-full flex items-center justify-center p-20 bg-gray-400">
      <label htmlFor="select">Full Name</label>

      <select
        name="select"
        id=""
        className="focus:outline-primary p-3 bg-gray-300 border-1 border-gray-500 w-full"
      >
        <option value="">gs</option>
        <option value="">gs</option>
        <option value="">gs</option>
        <option value="">gs</option>
      </select>
    </div>
  );
};

export default CarFilterForm;
