"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useProtectedRoute } from "../../../context/useProtected";
import { carDetailsTypes } from "../../../types/carDetails";
import NotificarionAlert from "../../alertAndNotification/NotificarionAlert";
import { Loader } from "lucide-react";
import { inputStyle } from "../../../data/styles";
import { CatTypes } from "../../../types/catTypes";

const CarForm = () => {
  useProtectedRoute(["admin"]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [catDetails, setCatDetails] = useState<CatTypes[] | null>([]);

  const [formData, setFormData] = useState<carDetailsTypes>({
    name: "",
    brand: "",
    model: "",
    category: "",
    year: "",
    image: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    mileage: "",
    pricePerDay: "",
    availability: false,
  });

  const getCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/get-category`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setCatDetails(result.fetchCategory);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e: any) => {
    const { type, name, value, files, checked } = e.target;
    setFormData((prev: any) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else if (type === "checkbox") {
        return { ...prev, [name]: checked };
      } else if (type === "number") {
        return { ...prev, [name]: value === "" ? "" : Number(value) };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("brand", formData.brand);
    form.append("model", formData.model);
    form.append("category", formData.category);
    form.append("year", formData.year);
    form.append("image", formData.image);
    form.append("transmission", formData.transmission);
    form.append("fuelType", formData.fuelType);
    form.append("seatingCapacity", formData.seatingCapacity.toString());
    form.append("mileage", formData.mileage.toString());
    form.append("pricePerDay", formData.pricePerDay.toString());
    form.append("availability", formData.availability.toString());
    setIsSubmitLoading(true);

    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/new-car`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );
      const result = await res.json();
      setIsSubmitLoading(false);

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage("New Car added successfully.");
        setFormData({
          name: "",
          brand: "",
          model: "",
          category: "",
          year: "",
          image: "",
          transmission: "",
          fuelType: "",
          seatingCapacity: "",
          mileage: "",
          pricePerDay: "",
          availability: false,
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setError(false);
      setSuccess(false);
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div className="w-full flex items-center justify-center">
      {/* notification alert */}
      {message !== "" && (
        <NotificarionAlert
          message={message}
          iconStyle={`${success ? " text-green-600" : "text-red-600"}`}
          style={`${
            success ? "bg-green-200 text-white" : "bg-red-200 text-white"
          }`}
          textStyle={`${
            success
              ? "text-green-700  font-semibold"
              : "text-red-700  font-semibold"
          }`}
        />
      )}
      <div className="lg:w-11/12 w-full flex flex-col gap-5">
        <h1>Add new Category</h1>
        {isSubmitLoading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <Loader size={30} className="animate-spin" />
            <h1>Loading</h1>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action=""
            encType="multipart/form-data"
            className="w-full flex flex-wrap gap-3 "
          >
            <div className="w-full flex gap-3 flex-wrap lg:flex-nowrap md:flex-nowrap">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Car Name"
                className={`${inputStyle}`}
              />
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={`${inputStyle} bg-dash-bg-primary`}
              >
                <option value="">Select Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Nissan">Nissan</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Mazda">Mazda</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Kia">Kia</option>
                <option value="BMW">BMW</option>
                <option value="Audi">Audi</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Volvo">Volvo</option>
                <option value="Ford">Ford</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Tesla">Tesla</option>
                <option value="Dodge">Dodge</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Maruti Suzuki">Maruti Suzuki</option>
              </select>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className={`${inputStyle} cursor-pointer`}
              />
            </div>
            <div className="w-full flex gap-3 lg:flex-nowrap md:flex-nowrap flex-wrap">
              <input
                type="text"
                name="model"
                onChange={handleChange}
                value={formData.model}
                placeholder="Car Model"
                className={`${inputStyle}`}
              />
              <select
                name="category"
                id=""
                onChange={handleChange}
                className={`${inputStyle} bg-dash-bg-primary`}
              >
                <option value="">Select category</option>
                {catDetails &&
                  catDetails.map((cat) => (
                    <option key={cat._id} value={cat.catName}>
                      {cat.catName}
                    </option>
                  ))}
              </select>

              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Year"
                className={`${inputStyle}`}
              />
            </div>
            <div className="w-full flex gap-3 lg:flex-nowrap md:flex-nowrap flex-wrap">
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className={`${inputStyle} bg-dash-bg-primary`}
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="AMT">AMT</option>
                <option value="CVT">CVT</option>
                <option value="DCT">DCT</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className={`${inputStyle} bg-dash-bg-primary`}
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                <option value="Hydrogen">Hydrogen</option>
              </select>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                placeholder="Seating Capacity"
                className={`${inputStyle}`}
              />
            </div>
            <div className="w-full flex gap-3 lg:flex-nowrap md:flex-nowrap flex-wrap">
              <input
                type="number"
                name="mileage"
                onChange={handleChange}
                value={formData.mileage}
                placeholder="Mileage"
                className={`${inputStyle}`}
              />
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="Price Per Day"
                className={`${inputStyle}`}
              />
              <div className="w-full flex items-center justify-center">
                <label htmlFor="availability" className="text-[14px]">
                  Availability
                </label>
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  placeholder="seating Capacity"
                  className={`${inputStyle} cursor-pointer`}
                />
                <h1
                  className={`text-[14px] ${
                    formData.availability ? "text-primary" : "text-red-600"
                  }`}
                >
                  {formData.availability ? "Availabile" : "Not Availabile"}
                </h1>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                type="submit"
                value="Add Car"
                className={`py-2 px-2 w-full text-[14px] rounded-sm bg-primary text-text-primary hover:bg-text-secondary hover:text-white  flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out`}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CarForm;
