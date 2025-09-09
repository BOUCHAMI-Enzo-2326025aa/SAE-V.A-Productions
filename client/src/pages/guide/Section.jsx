import React from "react";

const Section = ({ children, className, name }) => {
  return (
    <div name={name} className={className + " flex flex-col gap-2"}>
      {children}
    </div>
  );
};

export default Section;
