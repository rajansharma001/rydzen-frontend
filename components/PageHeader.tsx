import React from "react";

type Props = {
  headingTitle: string;
};
const PageHeader = ({ headingTitle }: Props) => {
  return (
    <div className='w-full px-10 lg:px-50 md:px-30  bg-[url("/category_bg.png")] bg-cover bg-right bg-no-repeat mb-20'>
      <div className="w-full h-[150px] lg:h-[250px] md:h-[250px] flex items-center justify-start text-primary  lg:px-30 text-3xl  lg:text-5xl md:text-4xl font-bold">
        {headingTitle}
      </div>
    </div>
  );
};

export default PageHeader;
