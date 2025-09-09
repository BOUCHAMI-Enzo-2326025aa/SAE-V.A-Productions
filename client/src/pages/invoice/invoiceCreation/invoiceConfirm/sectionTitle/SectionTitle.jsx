import React from "react";

const SectionTitle = ({ title, svg, className }) => {
  return (
    <div className={"flex gap-1 items-center text-start w-full " + className}>
      {svg}
      <p className="text-[#3F3F3F] text-sm font-bold">{title}</p>
    </div>
  );
};

export default SectionTitle;
