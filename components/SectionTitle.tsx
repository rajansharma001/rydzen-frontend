import React from "react";

type Props = {
  title: string;
  heading: string;
  headingStyle: string;
  titleStyle: string;
};
const SectionTitle = ({ heading, title, headingStyle, titleStyle }: Props) => {
  return (
    <div>
      <h1
        className={`${headingStyle} text-sm capitalize font-semibold text-primary `}
      >
        {heading}
      </h1>
      <h1
        className={`${titleStyle} lg:text-4xl md:text-2xl text-xl font-bold font-sans text-text-primary text-center lg:text-start md:text-start`}
      >
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;
