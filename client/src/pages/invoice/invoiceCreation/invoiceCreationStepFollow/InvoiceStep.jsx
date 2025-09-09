const InvoiceStep = ({ title, subtitle, isLastStep, isComplete = false }) => {
  return (
    <div
      className={
        "flex font-inter text-[#3F3F3F] transition-all  " +
        (!isComplete && "opacity-50")
      }
    >
      <div className={"flex flex-col items-center gap-2 "}>
        {/* Rond de complétion*/}
        {!isComplete ? (
          <span className="size-16 border-[#3F3F3F] border-[3px] rounded-full "></span>
        ) : (
          <span className="size-16 bg-[#3F3F3F] rounded-full flex items-center justify-center ">
            <svg className="size-9" viewBox="0 -960 960 960" fill="#FFFFFF">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </span>
        )}

        {/* Barre de progression */}
        {!isLastStep && (
          <span className="w-[4px] h-16 bg-[#3F3F3F] mb-2 rounded-full"></span>
        )}
      </div>
      <div className="ml-4 mt-2 flex flex-col gap-1">
        <p className="font-bold">{title}</p>
        <p className="opacity-50 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default InvoiceStep;
