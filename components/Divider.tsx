import React from "react";

type Props = {
  style: string;
};
const Divider = ({ style }: Props) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={` ${style} border-b-2 border-gray-300  mb-3`}></div>
    </div>
  );
};

export default Divider;
