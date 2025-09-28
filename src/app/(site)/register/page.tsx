"use client";
import React, { FormEvent, useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useRouter } from "next/navigation";
import Button from "../../../../components/Button";
import { UserTypes } from "../../../../types/userTypes";
import { Loader } from "lucide-react";
import NotificarionAlert from "../../../../components/alertAndNotification/NotificarionAlert";

const Register = () => {
  const router = useRouter();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<UserTypes>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { type, name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      setIsSubmitLoading(false);

      if (!res.ok) {
        setError(true);
        setMessage(result.error);
      } else {
        setSuccess(true);
        setMessage(
          "Account created successully. Verification link has been sent to your account. Verify your email to login. "
        );
        // router.push("/");
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
    <div className="w-full flex flex-col items-center justify-center">
      <PageHeader headingTitle="Login" />
      <div className="lg:w-[30%] md:w-[50%] w-[90%] flex flex-col p-10 shadow-2xl shadow-gray-400 gap-5 mb-20">
        <h1 className="text-center text-2xl font-semibold text-text-primary">
          Register
        </h1>
        {/* notification alert */}
        {message !== "" && (
          <div
            className={`lg:w-[400px] md:w-[300px] w-full p-5 ${
              success ? "bg-green-200 text-white" : "bg-red-200 text-white"
            }`}
          >
            <h1 className={`${success ? "text-green-700 " : "text-red-700 "}`}>
              {message}
            </h1>
          </div>
        )}
        {isSubmitLoading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <Loader size={30} className="animate-spin" />
            <h1>Loading</h1>
          </div>
        ) : (
          <form
            className="w-full flex flex-col gap-5 "
            action=""
            onSubmit={handleRegister}
          >
            {" "}
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your-mail@gmail.com"
              className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="**************"
              className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
            />
            <Button btnTitle="Login" btnStyle="" />
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
