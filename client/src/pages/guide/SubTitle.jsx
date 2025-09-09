import React from "react";

const SubTitle = ({ children, onClick }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill="3F3F3F"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
      <p
        onClick={onClick}
        className="font-bold cursor-pointer opacity-80 hover:opacity-100 transition-all"
      >
        {children}
      </p>
    </div>
  );
};

export default SubTitle;
