import React from "react";
import Button from "../../../components/Button";
import SectionTitle from "../../../components/SectionTitle";
import PageHeader from "../../../components/PageHeader";

const Login = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <PageHeader headingTitle="Login" />
      <div className="lg:w-[30%] md:w-[50%] w-[90%] flex flex-col p-10 shadow-2xl shadow-gray-400 gap-5 mb-20">
        <h1 className="text-center text-2xl font-semibold text-text-primary">
          Login
        </h1>
        <form className="w-full flex flex-col gap-5 " action="">
          <input
            type="text"
            name="email"
            placeholder="your-mail@gmail.com"
            className="focus:outline-primary p-4 bg-gray-100 border-1 border-gray-500 w-full"
          />
          <input
            type="password"
            name="password"
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
