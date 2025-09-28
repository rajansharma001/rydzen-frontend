"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { inputStyle } from "../../../data/styles";
import { useProtectedRoute } from "../../../context/useProtected";
import { Loader } from "lucide-react";
import NotificarionAlert from "../../alertAndNotification/NotificarionAlert";
import { CatTypes } from "../../../types/catTypes";

const NewCategoryForm = () => {
  useProtectedRoute(["admin"]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<CatTypes>({
    catName: "",
    catSlug: "",
    catImg: "",
  });

  const handleChange = (e: any) => {
    const { type, name, value, files } = e.target;
    setFormData((prev: any) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    const form = new FormData();
    form.append("catName", formData.catName);
    form.append("catSlug", formData.catSlug);
    form.append("catImg", formData.catImg);
    setIsSubmitLoading(true);

    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/new-category`,
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
        setMessage("New Slide added successfully.");
        setFormData({
          catName: "",
          catSlug: "",
          catImg: "",
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
      <div className="lg:w-6/12 md:w-full w-full flex flex-col gap-5">
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
            <div className="w-full flex gap-3">
              <input
                type="text"
                name="catName"
                onChange={handleChange}
                value={formData.catName}
                placeholder="Category Name"
                className={`${inputStyle}`}
              />
              <input
                type="text"
                name="catSlug"
                value={formData.catSlug}
                onChange={handleChange}
                placeholder="category-slug"
                className={`${inputStyle}`}
              />
            </div>
            <div className="w-full flex gap-3">
              <input
                type="file"
                name="catImg"
                onChange={handleChange}
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className={`${inputStyle} cursor-pointer`}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                type="submit"
                value="Add slide"
                className={`py-2 px-2 w-full text-[14px] rounded-sm bg-primary text-text-primary hover:bg-text-secondary hover:text-white  flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out`}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewCategoryForm;
