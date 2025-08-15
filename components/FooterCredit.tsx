import React from "react";

const FooterCredit = () => {
  return (
    <div className="w-full p-2 bg-text-secondary text-gray-300 text-center text-[14px] ">
      ©ALl Rights Reserved | Developed by{" "}
      <a
        href="https://rajansharma.info.np"
        className="text-primary hover:text-white transition-all duration-300 ease-in-out"
      >
        Rajan Sharma
      </a>
    </div>
  );
};

export default FooterCredit;
