const FilterInput = ({ title, children, className }) => {
  return (
    <div className={"flex flex-col w-full text-[#3F3F3F] text-sm " + className}>
      <p className="uppercase pb-2 text-[#3F3F3F] opacity-80 text-sm">
        {title}
      </p>
      {children}
    </div>
  );
};

export default FilterInput;
