"use client";
import React, { FormEvent, useState } from "react";
import Button from "../../../../components/Button";
import PageHeader from "../../../../components/PageHeader";
import { useProtectedRoute } from "../../../../context/useProtected";
import { useRouter } from "next/navigation";

const Login = () => {
  useProtectedRoute([""], true);
  const router = useRouter();
  const [formData, setFormData] = useState({
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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
      if (!res.ok) {
        console.log("Response error.");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("API ERROR.", error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <PageHeader headingTitle="Login" />
      <div className="lg:w-[30%] md:w-[50%] w-[90%] flex flex-col p-10 shadow-2xl shadow-gray-400 gap-5 mb-20">
        <h1 className="text-center text-2xl font-semibold text-text-primary">
          Login
        </h1>
        <form
          className="w-full flex flex-col gap-5 "
          action=""
          onSubmit={handleLogin}
        >
          <input
            type="text"
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
      </div>
    </div>
  );
};

export default Login;
