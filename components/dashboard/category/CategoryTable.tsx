"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { CatTypes } from "../../../types/catTypes";
import { Delete, Edit, Loader, X } from "lucide-react";
import Alert from "../../alertAndNotification/Alert";
import { inputStyle } from "../../../data/styles";
import NotificarionAlert from "../../alertAndNotification/NotificarionAlert";

const CategoryTable = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [deleteConfirmPop, setDeleteConfirmPop] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState<CatTypes[] | null>([]);
  const [updatePop, setUpdatePop] = useState(false);
  const [category_id, setCategory_id] = useState<string>("");
  const [fetchcategoryById, setFetchCategoryById] = useState<CatTypes>();
  const [formData, setFormData] = useState<CatTypes>({
    catName: "",
    catSlug: "",
    catImg: "",
  });
  const fetchCategory = async () => {
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
        setCategoryDetails(result.fetchCategory);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleDeletePop = (categoryId: string) => {
    setDeleteConfirmPop(true);
    getCategoryById(categoryId);
    setCategory_id(categoryId);
  };
  const deleteCategory = async (categoryId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/delete-category/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await res.json();
      fetchCategory();

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage("Category deleted successfully.");
        setDeleteConfirmPop(false);
        setCategoryDetails(
          (prev) =>
            prev?.filter((category) => category._id !== categoryId) || []
        );
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const getCategoryById = async (categoryId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/get-singlecategory/${categoryId}`,
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
        setFetchCategoryById(result.getCategoryById);
        setFormData({
          catName: result.getCategoryById.catName || "",
          catSlug: result.getCategoryById.catSlug || "",
          catImg: result.getCategoryById.catImg || "",
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

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

  const handleUpdatePop = (categoryId: string) => {
    setUpdatePop(true);
    getCategoryById(categoryId);
    setCategory_id(categoryId);
  };
  const handleUpdate = async (e: FormEvent) => {
    const form = new FormData();
    form.append("catName", formData.catName);
    form.append("catSlug", formData.catSlug);
    form.append("catImg", formData.catImg);
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/category/update-category/${category_id}`,
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
        fetchCategory();
        setIsUpdateLoading(false);
        setMessage("Category updated successfully.");
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

  console.log(formData);
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
      <div className=" w-full flex flex-col gap-5 relative">
        <h1>Recent Category</h1>
        <div className="w-full border rounded-sm overflow-hidden relative ">
          {/* Header */}
          <div className="grid grid-cols-5 bg-dash-bg-secondary text-[13px] font-semibold text-white border-b">
            <div className="p-3 text-start border-r-1">S.No</div>
            <div className="p-3 text-start border-r-1">Category Title</div>
            <div className="p-3 text-start border-r-1">Category Image</div>
            <div className="p-3 text-start border-r-1">Category Slug</div>
            <div className="p-3 text-center">Action</div>
          </div>

          {/* Rows */}
          {categoryDetails && categoryDetails.length <= 0 ? (
            <h1 className="text-[13px] py-2  text-center">
              Category not found!
            </h1>
          ) : (
            categoryDetails?.map((category, index) => (
              <div
                key={index}
                className="grid  grid-cols-5 text-[13px] border-b  transition-all duration-200"
              >
                <div className="p-3 border-r-1 text-start font-medium">
                  {index + 1}
                </div>
                <div className="p-3 border-r-1">{category.catName}</div>
                <div className="p-3 border-r-1">
                  <img
                    src={category.catImg}
                    alt="category"
                    className="h-12 w-20 object-cover rounded-md border"
                  />
                </div>
                <div className="p-3 border-r-1">{category.catSlug}</div>

                <div className="p-3 border-r-1 flex items-center justify-center gap-8">
                  <Edit
                    size={20}
                    className="text-yellow-500 cursor-pointer hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => handleUpdatePop(category._id as string)}
                  />

                  <Delete
                    size={20}
                    className="text-red-500 cursor-pointer hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => {
                      handleDeletePop(category._id as string);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {deleteConfirmPop && (
        <div className="absolute top-0 left-100">
          <Alert
            desc="You want to delete this Category?"
            cancel={() => setDeleteConfirmPop(false)}
            confirm={() => deleteCategory(category_id)}
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
          <h1 className="text-center">Update Category</h1>
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
                  name="catName"
                  onChange={handleChange}
                  value={formData.catName}
                  placeholder="Category Name"
                  className={`${inputStyle}`}
                />
                <img
                  src={fetchcategoryById?.catImg}
                  alt=""
                  className="absolute left-5 top-5 w-[100px]"
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
                  value="Update Category"
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

export default CategoryTable;
