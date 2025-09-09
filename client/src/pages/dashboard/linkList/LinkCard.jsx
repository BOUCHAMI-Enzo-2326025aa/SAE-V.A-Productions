import React from "react";
import "./linkCard.css";

const LinkCard = ({ img, title, subTitle, link }) => {
  return (
    <a
      href={link}
      className="dashboard-link-card overflow-hidden w-full relative h-40 flex flex-col justify-end px-6 pb-3 rounded-[10px] max-xl:h-32 max-lg:h-24 max-lg:px-3 max-[920px]:w-full max-[920px]:min-h-full"
    >
      <img
        className="w-full h-full absolute left-0 top-0 object-cover hover:scale-[1.1] transition-all"
        src={img}
      ></img>
      <p className="uppercase z-10 text-3xl font-black pointer-events-none max-xl:text-2xl max-lg:text-xl">
        {title}
      </p>
      <p className="opacity-90 z-10 pointer-events-none max-2xl:text-sm max-lg:text-[12px] max-lg:leading-3">
        {subTitle}
      </p>
    </a>
  );
};

export default LinkCard;
