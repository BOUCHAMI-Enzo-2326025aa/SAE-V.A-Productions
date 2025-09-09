const Button = ({ value, className, onClickFunction, primary = true }) => {
  return (
    <>
      {primary ? (
        <button
          onClick={onClickFunction}
          className={
            "bg-[#3F3F3F] min-w-[275px] py-3 rounded-sm font-medium font-inter text-white " +
            className
          }
        >
          {value}
        </button>
      ) : (
        <button
          onClick={onClickFunction}
          className={
            "border-[#3F3F3F] text-[#3F3F3F] rounded-sm border-[2px] min-w-[275px] py-3 font-bold font-inter " +
            className
          }
        >
          {value}
        </button>
      )}
    </>
  );
};

export default Button;
