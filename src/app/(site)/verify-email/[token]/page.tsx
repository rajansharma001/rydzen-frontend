"use client";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Verify = () => {
  const params = useParams();
  const { token } = params;

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleVerification = async () => {
    try {
      setIsSubmitLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result.error);
      setIsSubmitLoading(false);
      if (!result) {
        setError(true);
        setMessage(`Invalid or expired verification link. ${result.error}`);
      } else {
        setSuccess(true);
        setMessage(`Your account is now verified. Please proced to signin.`);
      }
    } catch (error) {
      setError(true);
      setMessage("API ERROR!");
    }
  };
  useEffect(() => {
    handleVerification();
  }, [token]);
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center">
      {/* notification alert */}
      {message !== "" && (
        <div
          className={`lg:w-[400px] md:w-[300px] w-full p-5 ${
            success ? "bg-green-200 text-white" : "bg-red-200 text-white"
          }`}
        >
          <h1 className={`${success ? "text-green-700 " : "text-red-700 "}`}>
            {message}
            <a href="/login" className="text-error font-semibold underline">
              Click Here
            </a>
          </h1>
        </div>
      )}

      {isSubmitLoading ?? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin  text-primary" size={35} />
        </div>
      )}
    </div>
  );
};

export default Verify;
