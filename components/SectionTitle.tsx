import React from "react";

type Props = {
  title: string;
};
const SectionTitle = ({ title }: Props) => {
  return (
    <h1 className="text-sm capitalize font-semibold text-primary ">{title}</h1>
  );
};

export default SectionTitle;
