"use client";
import React, { FormEvent, useEffect, useState } from "react";
import NotificarionAlert from "../../../../../components/alertAndNotification/NotificarionAlert";
import { UserTypes } from "../../../../../types/userTypes";
import { Edit, X } from "lucide-react";
import { useProtectedRoute } from "../../../../../context/useProtected";
import Alert from "../../../../../components/alertAndNotification/Alert";

const ManageUsers = () => {
  useProtectedRoute(["admin"], true);
  const [updatePop, setUpdatePop] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails] = useState<UserTypes[] | null>([]);
  const [userId, setUserId] = useState("");

  const [formData, setformData] = useState<UserTypes>({
    _id: "",
  });
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`,
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
        setUserDetails(result.getUsers);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  const handleSuspend = async () => {
    const form = new FormData();
    form.append("_id", userId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/suspend-user`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        fetchUser();
        setUpdatePop(false);
        setSuccess(true);
        setMessage("User updated sucessfully.");
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
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
            <h1>Recent Users</h1>
          </div>

          <div className="lg:w-11/12 w-full  overflow-x-auto border rounded-sm shadow-md h-[600px]">
            <table className="min-w-[1000px] w-full border-collapse  overflow-scroll ">
              {/* Header */}
              <thead className="bg-dash-bg-secondary text-white text-xs md:text-sm font-semibold">
                <tr>
                  <th className="px-3 py-3 border-b border-r text-left">
                    S.No
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Name
                  </th>
                  <th className="px-3 py-3 border-b border-r  text-center">
                    Image
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Phone
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Email
                  </th>
                  <th className="px-3 py-3 border-b border-r text-left">
                    Role
                  </th>
                  <th className="px-3 py-3 border-b border-r text-center">
                    IsVerified
                  </th>
                  <th className="px-3 py-3 border-b border-r text-center">
                    IsSuspended
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="text-xs md:text-sm  ">
                {userDetails && userDetails.length <= 0 ? (
                  <tr>
                    <td colSpan={14} className="py-4 text-center text-gray-500">
                      User not found!
                    </td>
                  </tr>
                ) : (
                  userDetails?.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-dash-bg-secondary transition-colors duration-150"
                    >
                      <td className="px-3 py-2 border-b border-r">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        <img
                          src={user.profileImg || "/avatar-default.svg"}
                          alt={user.firstName}
                          className="mx-auto block h-12 w-20 object-contain rounded-md border "
                        />
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {user.phone}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {user.email}
                      </td>
                      <td className="px-3 py-2 border-b border-r">
                        {user.role}
                      </td>
                      <td className="px-3 py-2 border-b border-r text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            user.isVerified
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.isVerified ? "Verified" : "Not-Verified"}
                        </span>
                      </td>
                      <td
                        className="px-3 py-2 border-b border-r text-center cursor-pointer"
                        onClick={() => {
                          if (!user._id) return;
                          setUserId(user._id);
                          setUpdatePop(true);
                          setformData({
                            _id: user._id,
                          });
                        }}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            user.isSuspend
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.isSuspend ? "Suspended" : "Not-Suspended"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* update form popup */}
      {updatePop && (
        <div className="w-full absolute top-100 flex items-center justify-center">
          <Alert
            desc="You want to update this user?"
            cancel={() => setUpdatePop(false)}
            confirm={() => handleSuspend()}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
