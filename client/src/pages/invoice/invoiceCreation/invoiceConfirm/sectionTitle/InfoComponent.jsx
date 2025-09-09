const InfoComponent = ({ name, value }) => {
  return (
    <div className="flex justify-between text-[#3F3F3F] w-full">
      <p className="uppercase opacity-50 text-sm">{name}</p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
};

export default InfoComponent;
