import React from "react";
import ProfileImage from "../../../components/ProfileImage";

const CardContact = ({
  id,
  company,
  name,
  surname,
  phoneNumber,
  lastCall,
  handleOpenDetail,
}) => {
  return (
    <div
      className="flex flex-row cursor-pointer hover:scale-105 transition-all bg-[#FFFFFF] border-[2px] border-[#3F3F3F] border-opacity-15 rounded-lg w-full p-[20px] space-x-[15px] items-center"
      onClick={() => handleOpenDetail(id)}
    >
      <div className="w-[40px] h-[40px] ">
        <ProfileImage name={company} surname="" />
      </div>
      <div className="flex flex-col w-screen">
        <div className=" flex flex-row justify-between ">
          <div className="flex flex-row gap-1 items-center">
            <p className="text-[#3F3F3F] font-inter text-[15px] font-[600]">
              {company}
            </p>
            <p className="text-[#3F3F3F] font-inter text-[12.5px] font-[500] italic opacity-70">
              {name}
            </p>
            <p className="text-[#3F3F3F] font-inter text-[12.5px] font-[500] italic opacity-70">
              {surname}
            </p>
          </div>

          <p className="text-[#3F3F3F] font-inter text-[15px] font-[500] opacity-50">
            {new Date(lastCall).toLocaleDateString()}
          </p>
        </div>
        <p className="text-[#3F3F3F] font-inter text-[15px] font-[600] opacity-60">
          {phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default CardContact;
