import { div } from "motion/react-client";
import React from "react";

type Props = {
  type: string;
  name: string;
  handleChange: () => void;
  placeholder: string;
  style: string;
};
const Input = ({ type, name, handleChange, placeholder, style }: Props) => {
  return (
    <div className="w-full flex  flex-col">
      <label htmlFor={name}>Full Name</label>
      <input
        type="text"
        name=""
        value=""
        onChange={handleChange}
        placeholder={placeholder}
        className={` focus:outline-primary p-3 bg-gray-300 border-1 border-gray-500`}
      />
    </div>
  );
};

export default Input;
