const InvoiceInput = ({
  title,
  inputType = "text",
  value="",
  mandatory = false,
  onChange,
}) => {
  return (
    <label
      className="font-inter text-[#3F3F3F] font-medium text-md w-full"
      onChange={(e) => onChange(e)}
    >
      <div className="flex">
        <p>{title}</p>
        {mandatory && <p className="text-[#FF6767]">*</p>}
      </div>
      <input
        type={inputType}
        value={value}
        className="text-[#3F3F3F] font-semibold w-full px-2 py-2 rounded-sm mt-1 border-[#E1E1E1] border-[1px]"
      ></input>
    </label>
  );
};

export default InvoiceInput;
