const ProfileImage = ({ name = "", surname = "" }) => {
  const firstNameInitial = name ? name[0] : "";
  const lastNameInitial = surname ? surname[0] : "";

  return (
    <span className="flex justify-center uppercase items-center w-[50px] h-[50px] text-white text-[24px] font-semibold bg-red-500 rounded-full">
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};

export default ProfileImage;
