import React from "react";

function Chips({ text }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-[#36393B] w-fit opacity-60">
      <p className="text-sm  font-bold">{text}</p>
    </div>
  );
}

export default Chips;
