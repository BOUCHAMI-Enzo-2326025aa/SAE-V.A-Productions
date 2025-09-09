import { useState } from "react";
import ActionModal from "./ActionModal";

const ActionButton = ({selectedOrder, validateOrder, cancelOrder}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <button
      onClick={() => setIsModalOpen(!isModalOpen)}
      className="border-2 relative border-[#3F3F3F] px-14 text-[#3F3F3F] pl-16 text-sm py-2 font-semibold rounded flex items-center"
    >
      Action
      <svg
        className="size-6 fill-[#3F3F3F] ml-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M480-357.85 253.85-584 296-626.15l184 184 184-184L706.15-584 480-357.85Z" />
      </svg>
      {isModalOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 bg-appear-animation"></div>
          <ActionModal selectedOrder={selectedOrder} validateOrder={validateOrder} cancelOrder={cancelOrder}/>
        </>
      )}
    </button>
  );
};

export default ActionButton;
