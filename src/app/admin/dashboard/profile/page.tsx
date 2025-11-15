"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useProtectedRoute } from "../../../../../context/useProtected";
import Image from "next/image";
import { UserTypes } from "../../../../../types/userTypes";
import Button from "../../../../../components/Button";
import { inputStyle } from "../../../../../data/styles";
import { Loader } from "lucide-react";
import NotificarionAlert from "../../../../../components/alertAndNotification/NotificarionAlert";
import Input from "../../../../../components/Input";

const Profile = () => {
  useProtectedRoute(["admin", "user"]);

  const [userProfile, setUserProfile] = useState<UserTypes>();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
    profileImg: "",
  });
  const handleChange = (e: any) => {
    const { type, files, value, name } = e.target;
    setFormData((prev) => {
      if (type === "file" && files) {
        return { ...prev, [name]: files[0] };
      } else return { ...prev, [name]: value };
    });
  };

  console.log(formData);
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res.json();
      setUserProfile(result.userProfile);
    } catch (error) {
      console.log("API ERROR!");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/change-password`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
      setIsSubmitLoading(false);

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage("Password updated successfully.");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
          profileImg: "",
        });
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    const form = new FormData();
    form.append("profileImg", formData.profileImg);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/update-profile-image`,
        {
          method: "PATCH",
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
        setMessage("Profile Image updated successfully.");
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setError(false);
        setSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full p-2">
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
      <h1 className="">Manage Profile</h1>
      <div className="w-full flex gap-5">
        <div className="w-[20%] flex flex-col gap-2">
          <Image
            alt="profile image"
            src={userProfile?.profileImg || "/defaultuser.jpeg"}
            width={450}
            height={450}
            className="w-[100%] border-2 border-gray-100"
          />
          {isSubmitLoading ? (
            <div className="w-full flex flex-col items-center justify-center">
              <Loader size={30} className="animate-spin" />
              <h1>Loading</h1>
            </div>
          ) : (
            <form action="" onChange={handleProfileSubmit}>
              <input
                type="file"
                onChange={handleChange}
                name="profileImg"
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className="py-4 px-3 text-center bg-primary hover:bg-text-primary hover:text-white cursor-pointer transition-all duration-300 ease-in-out uppercase text-sm w-full"
              />
            </form>
          )}
        </div>
        <div className="w-[80%] flex flex-col gap-2">
          <h1 className="">Profile Details</h1>

          <div className=" flex w-full gap-2">
            <h1 className={`${inputStyle}`}>{userProfile?.firstName}</h1>
            <h1 className={`${inputStyle}`}>{userProfile?.lastName}</h1>
          </div>
          <div className=" flex w-full gap-2">
            <h1 className={`${inputStyle}`}>{userProfile?.phone}</h1>
            <h1 className={`${inputStyle}`}>{userProfile?.email}</h1>
          </div>
          <div className=" flex w-full gap-2">
            <h1 className={`${inputStyle}`}>{userProfile?.role}</h1>
            <h1 className={`${inputStyle}`}>
              {userProfile?.isVerified ? "Verified" : "Not verified"}
            </h1>
          </div>
          {isSubmitLoading ? (
            <div className="w-full flex flex-col items-center justify-center">
              <Loader size={30} className="animate-spin" />
              <h1>Loading</h1>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className=" flex w-full flex-col gap-2 mt-5 ">
                <h1>Change password</h1>

                <input
                  type="password"
                  name="oldPassword"
                  onChange={handleChange}
                  value={formData.oldPassword}
                  placeholder="Old Password"
                  className={`${inputStyle}`}
                />
                <input
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  value={formData.newPassword}
                  placeholder="New Password"
                  className={`${inputStyle}`}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  className={`${inputStyle}`}
                />
                {formData.newPassword !== formData.confirmPassword ? (
                  <h1 className="text-red-400 text-[12px]">
                    Confirm password did not match.
                  </h1>
                ) : (
                  <Button btnStyle="" btnTitle="Update password" />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
