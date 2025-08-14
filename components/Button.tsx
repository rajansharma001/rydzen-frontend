import React from "react";

type Props = {
  btnTitle: string;
  clickEvent?: () => void;
};
const Button = ({ btnTitle, clickEvent }: Props) => {
  return (
    <button
      onClick={clickEvent}
      className="py-4 px-7 bg-primary hover:bg-text-primary hover:text-white cursor-pointer transition-all duration-300 ease-in-out uppercase text-sm "
    >
      {btnTitle}
    </button>
  );
};

export default Button;
