import { Collapse } from "@mantine/core";
import React, { useState } from "react";
import SubTitle from "./SubTitle";

const Paragraph = ({ subtitle, className, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {subtitle && (
        <SubTitle onClick={() => setIsOpen(!isOpen)}>{subtitle}</SubTitle>
      )}
      <Collapse
        in={isOpen || !subtitle}
        style={{
          opacity: 0.8,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {children}
      </Collapse>
    </div>
  );
};

export default Paragraph;
