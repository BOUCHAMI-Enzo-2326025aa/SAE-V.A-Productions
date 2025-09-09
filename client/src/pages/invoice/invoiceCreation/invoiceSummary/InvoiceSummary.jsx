import CreationSectionTitle from "../../CreationSectionTitle";

const InvoiceSummary = ({ supportList }) => {
  return (
    <div className="bg-white w-full  rounded-md max-h-fit min-h-[300px]">
      <div className="flex flex-col w-full h-full mt-6">
        {supportList.map((support, index) => (
          <div key={index} className="flex text-[#3F3F3F] justify-between">
            <p>{support.supportName}</p>
            <p>{support.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceSummary;
