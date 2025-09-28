"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../context/useProtected";
import { SlideTypes } from "../../../../../types/slideTypes";
import { Cross, Delete, Edit, LayoutDashboard, Loader, X } from "lucide-react";
import Alert from "../../../../../components/alertAndNotification/Alert";
import NotificarionAlert from "../../../../../components/alertAndNotification/NotificarionAlert";
import { inputStyle } from "../../../../../data/styles";

const HeroSection = () => {
  useProtectedRoute(["admin"]);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [deleteConfirmPop, setDeleteConfirmPop] = useState(false);
  const [slideDetails, setSlideDetails] = useState<SlideTypes[] | null>([]);
  const [updatePop, setUpdatePop] = useState(false);
  const [slide_id, setSlide_id] = useState<string>("");
  const [fetchSlideById, setFetchSlideById] = useState<SlideTypes>();
  const [formData, setFormData] = useState({
    slideText: "",
    slideImage: "",
    btnTitle: "",
    btnLink: "",
  });

  const handleChange = (e: any) => {
    const { type, name, value, files } = e.target;
    setFormData((prev) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    const form = new FormData();
    form.append("slideText", formData.slideText);
    form.append("slideImage", formData.slideImage);
    form.append("btnTitle", formData.btnTitle);
    form.append("btnLink", formData.btnLink);
    setIsSubmitLoading(true);

    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slide/new-slide`,
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
        fetchSlides();
        setMessage("New Slide added successfully.");
        setFormData({
          slideText: "",
          slideImage: "",
          btnTitle: "",
          btnLink: "",
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const fetchSlides = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slide/get-slide`,
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
        setSlideDetails(result.getSlide);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleDeletePop = (slideId: string) => {
    setDeleteConfirmPop(true);
    getSlideById(slideId);
    setSlide_id(slideId);
  };
  const deleteSlides = async (slideId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slide/delete-slide/${slideId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      fetchSlides();

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage("Slide deleted successfully.");
        setDeleteConfirmPop(false);
        setSlideDetails(
          (prev) => prev?.filter((slide) => slide._id !== slideId) || []
        );
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const getSlideById = async (slideId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slide/get-singleslide/${slideId}`,
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
        setFetchSlideById(result.getSlideById);
        setFormData({
          slideText: result.getSlideById.slideText || "",
          slideImage: result.getSlideById.slideImage || "",
          btnTitle: result.getSlideById.btnTitle || "",
          btnLink: result.getSlideById.btnLink || "",
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleUpdatePop = (slideId: string) => {
    setUpdatePop(true);
    getSlideById(slideId);
    setSlide_id(slideId);
  };
  const handleUpdate = async (e: FormEvent) => {
    const form = new FormData();
    form.append("slideText", formData.slideText);
    form.append("slideImage", formData.slideImage);
    form.append("btnTitle", formData.btnTitle);
    form.append("btnLink", formData.btnLink);
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/slide/slide-update/${slide_id}`,
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
        setSuccess(true);
        fetchSlides();
        setIsUpdateLoading(false);
        setMessage("Slide updated successfully.");
        setFormData({
          slideText: "",
          slideImage: "",
          btnTitle: "",
          btnLink: "",
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
    <div className="w-full flex flex-col justify-center items-center gap-3">
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
        <h1>Add new Slide</h1>
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
                name="slideText"
                onChange={handleChange}
                value={formData.slideText}
                placeholder="Slide Name"
                className={`${inputStyle}`}
              />
              <input
                type="file"
                name="slideImage"
                onChange={handleChange}
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className={`${inputStyle} cursor-pointer`}
              />
            </div>
            <div className="w-full flex gap-3">
              <input
                type="text"
                name="btnTitle"
                value={formData.btnTitle}
                onChange={handleChange}
                placeholder="Button Name"
                className={`${inputStyle}`}
              />
              <input
                type="text"
                name="btnLink"
                onChange={handleChange}
                value={formData.btnLink}
                placeholder="https://slide-link.com"
                className={`${inputStyle}`}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <input
                type="submit"
                value="Add slide"
                className={`${
                  slideDetails && slideDetails?.length >= 5 ? "hidden" : ""
                } py-2 px-2 w-full text-[14px] rounded-sm bg-primary text-text-primary hover:bg-text-secondary hover:text-white  flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out`}
              />
              {slideDetails && slideDetails.length >= 5 && (
                <h1 className="text-[12px] text-red-400">
                  You can not add more than 5 slides. You can update or delete
                  exisiting slide to add new one.
                </h1>
              )}
            </div>
          </form>
        )}
      </div>
      <div className=" w-full flex flex-col gap-5  ">
        <h1>Recent Slide</h1>
        <div className="w-full border rounded-sm overflow-hidden ">
          {/* Header */}
          <div className="grid grid-cols-6 bg-dash-bg-secondary text-[13px] font-semibold text-white border-b">
            <div className="p-3 text-start border-r-1">S.No</div>
            <div className="p-3 text-start border-r-1">Slide Title</div>
            <div className="p-3 text-start border-r-1">Slide Image</div>
            <div className="p-3 text-start border-r-1">Button Title</div>
            <div className="p-3 text-start border-r-1">Button Link</div>
            <div className="p-3 text-center">Action</div>
          </div>

          {/* Rows */}
          {slideDetails && slideDetails.length <= 0 ? (
            <h1 className="text-[13px] py-2  text-center">Slider not found!</h1>
          ) : (
            slideDetails?.map((slide, index) => (
              <div
                key={index}
                className="grid  grid-cols-6 text-[13px] border-b  transition-all duration-200"
              >
                <div className="p-3 border-r-1 text-start font-medium">
                  {index + 1}
                </div>
                <div className="p-3 border-r-1">{slide.slideText}</div>
                <div className="p-3 border-r-1">
                  <img
                    src={slide.slideImage}
                    alt="Slide"
                    className="h-12 w-20 object-cover rounded-md border"
                  />
                </div>
                <div className="p-3 border-r-1">{slide.btnTitle}</div>
                <div className="p-3 border-r-1 text-blue-600 underline cursor-pointer">
                  {slide.btnLink}
                </div>
                <div className="p-3 border-r-1 flex items-center justify-center gap-8">
                  <Edit
                    size={20}
                    className="text-yellow-500 cursor-pointer hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => handleUpdatePop(slide._id)}
                  />

                  <Delete
                    size={20}
                    className="text-red-500 cursor-pointer hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => {
                      handleDeletePop(slide._id);
                      // deleteSlides(slide._id);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {deleteConfirmPop && (
        <Alert
          desc="You want to delete this slide?"
          cancel={() => setDeleteConfirmPop(false)}
          confirm={() => deleteSlides(slide_id)}
        />
      )}
      {/* update form popup */}
      {updatePop && (
        <div className="w-6/12 flex flex-col gap-5 absolute top-70 right-70 p-8 rounded-sm bg-dash-bg-secondary ">
          <X
            size={20}
            className="text-white absolute top-5 right-5 hover:text-primary cursor-pointer"
            onClick={() => setUpdatePop(false)}
          />
          <h1 className="text-center">Update Slide</h1>
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
              className="w-full flex flex-wrap gap-3 mt-10"
            >
              <div className="w-full flex gap-3">
                <input
                  type="text"
                  name="slideText"
                  onChange={handleChange}
                  value={formData.slideText}
                  placeholder="Slide Name"
                  className={`${inputStyle}`}
                />
                <img
                  src={fetchSlideById?.slideImage}
                  alt=""
                  className="absolute left-5 top-5 w-[100px]"
                />
                <input
                  type="file"
                  name="slideImage"
                  onChange={handleChange}
                  accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                  className={`${inputStyle} cursor-pointer`}
                />
              </div>
              <div className="w-full flex gap-3">
                <input
                  type="text"
                  name="btnTitle"
                  value={formData.btnTitle}
                  onChange={handleChange}
                  placeholder="Button Name"
                  className={`${inputStyle}`}
                />
                <input
                  type="text"
                  name="btnLink"
                  onChange={handleChange}
                  value={formData.btnLink}
                  placeholder="https://slide-link.com"
                  className={`${inputStyle}`}
                />
              </div>
              <div className="w-full flex items-center justify-center">
                <input
                  type="submit"
                  value="Update slide"
                  className={` py-2 px-2 w-full text-[14px] rounded-sm bg-primary text-text-primary hover:bg-text-secondary hover:text-white  flex justify-between items-center cursor-pointer transition-all duration-300 ease-in-out`}
                />
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
