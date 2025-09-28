"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { carDetailsTypes } from "../../../types/carDetails";
import NotificarionAlert from "../../alertAndNotification/NotificarionAlert";
import { Delete, Edit, Loader, X } from "lucide-react";
import Alert from "../../alertAndNotification/Alert";
import { inputStyle } from "../../../data/styles";
import { CatTypes } from "../../../types/catTypes";

const CarTable = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [deleteConfirmPop, setDeleteConfirmPop] = useState(false);
  const [carDetails, setCarDetails] = useState<carDetailsTypes[] | null>([]);
  const [updatePop, setUpdatePop] = useState(false);
  const [car_id, setCar_id] = useState<string>("");
  const [catDetails, setCatDetails] = useState<CatTypes[] | null>([]);
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
  const fetchCar = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details`,
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
        setCarDetails(result.getCarDetails);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleDeletePop = (carId: string) => {
    setDeleteConfirmPop(true);
    getCarById(carId);
    setCar_id(carId);
  };
  const deleteCar = async (carId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details/delete/${carId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      fetchCar();

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage("Car deleted successfully.");
        setDeleteConfirmPop(false);
        setCarDetails(
          (prev) => prev?.filter((car) => car._id !== car_id) || []
        );
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const getCarById = async (carId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details/${carId}`,
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
        setSuccess(true);

        setFormData({
          name: result.getCarDetailsById.name || "",
          brand: result.getCarDetailsById.brand || "",
          model: result.getCarDetailsById.model || "",
          category: result.getCarDetailsById.category || "",
          year: result.getCarDetailsById.year || "",
          image: result.getCarDetailsById.image || "",
          transmission: result.getCarDetailsById.transmission || "",
          fuelType: result.getCarDetailsById.fuelType || "",
          seatingCapacity: result.getCarDetailsById.seatingCapacity || 0,
          mileage: result.getCarDetailsById.mileage || 0,
          pricePerDay: result.getCarDetailsById.pricePerDay || 0,
          availability: result.getCarDetailsById.availability || false,
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

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
  const handleUpdatePop = (carId: string) => {
    setUpdatePop(true);
    getCarById(carId);
    setCar_id(carId);
  };
  const handleUpdate = async (e: FormEvent) => {
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

    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/car-details/update/${car_id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: form,
        }
      );
      const result = await res.json();

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setUpdatePop(false);
        setSuccess(true);
        fetchCar();
        setIsUpdateLoading(false);
        setMessage("Car updated successfully.");
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
    <div className="w-full">
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
      <div className=" w-full  gap-5 relative">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="lg:w-11/12 w-full">
            <h1>Recent Cars</h1>
          </div>

          <div className="lg:w-11/12 w-full  overflow-x-auto border rounded-sm shadow-md">
            <table className="min-w-[1000px] w-full border-collapse  ">
              {/* Header */}
              <thead className="bg-dash-bg-secondary text-white text-xs md:text-sm font-semibold">
                <tr>
                  <th className="px-3 py-3 border-b border-r text-left">
                    S.No
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Name
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Image
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Brand
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Model
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Category
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Year
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Transmission
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Fuel
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Seats
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Mileage
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Price/Day
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Available
                  </th>
                  <th className="px-3 py-3 border-b text-center">Action</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="text-xs md:text-sm">
                {carDetails && carDetails.length <= 0 ? (
                  <tr>
                    <td colSpan={14} className="py-4 text-center text-gray-500">
                      Car not found!
                    </td>
                  </tr>
                ) : (
                  carDetails?.map((car, index) => (
                    <tr
                      key={index}
                      className="hover:bg-dash-bg-secondary transition-colors duration-150"
                    >
                      <td className="px-3 py-2 border-b border-r">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.name}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="h-12 w-20 object-cover rounded-md border"
                        />
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.brand}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.model}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.category}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.year}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        {car.transmission}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {car.fuelType}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        {car.seatingCapacity}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        {car.mileage}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        {car.pricePerDay}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            car.availability
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {car.availability ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-3 py-6 mt-3 border-b  flex items-center justify-center gap-5">
                        <Edit
                          size={18}
                          className="text-yellow-500 cursor-pointer hover:text-yellow-700 transition"
                          onClick={() => handleUpdatePop(car._id as string)}
                        />
                        <Delete
                          size={18}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition"
                          onClick={() => handleDeletePop(car._id as string)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteConfirmPop && (
        <div className="absolute top-0 left-100">
          <Alert
            desc="You want to delete this Category?"
            cancel={() => setDeleteConfirmPop(false)}
            confirm={() => deleteCar(car_id)}
          />
        </div>
      )}
      {/* update form popup */}
      {updatePop && (
        <div className="w-6/12 flex flex-col gap-5 absolute top-70 right-70 p-8 rounded-sm bg-dash-bg-secondary ">
          <X
            size={20}
            className="text-white absolute top-5 right-5 hover:text-primary cursor-pointer"
            onClick={() => setUpdatePop(false)}
          />
          <h1 className="text-center">Update Car</h1>
          {isUpdateLoading ? (
            <div className="w-full flex flex-col items-center justify-center">
              <Loader size={30} className="animate-spin" />
              <h1>Loading</h1>
            </div>
          ) : (
            <form
              onSubmit={handleUpdate}
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
      )}
    </div>
  );
};

export default CarTable;
