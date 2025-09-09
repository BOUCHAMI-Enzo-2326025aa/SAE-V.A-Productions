
const ChangeStatusButton = ({ statusToShow, setStatusToShow }) => {
  return (
    <div className="bg-black bg-opacity-5  flex justify-around w-[400px] py-2 font-semibold rounded-xl mt-5 relative">
      <span
        className={`bg-white w-[33%] h-[95%] absolute -translate-y-[50%] top-[50%] rounded-xl transition-all z-10 ${
          statusToShow === "pending" ? "left-[0%] " : ""
        } ${
          statusToShow === "approved" ? "left-[50%] -translate-x-[50%] " : ""
        } ${
          statusToShow === "cancel" ? "left-[100%] -translate-x-[100%]" : ""
        }`}
      />

      <a
        className="z-20 cursor-pointer w-24 text-center"
        onClick={() => setStatusToShow("pending")}
      >
        En attentes
      </a>
      <a
        className="z-20 cursor-pointer w-24 text-center"
        onClick={() => setStatusToShow("approved")}
      >
        Validés
      </a>
      <a
        className="z-20 cursor-pointer w-24 text-center"
        onClick={() => setStatusToShow("cancel")}
      >
        Annulés
      </a>
    </div>
  );
};

export default ChangeStatusButton;
