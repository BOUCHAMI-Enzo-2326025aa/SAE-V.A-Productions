import React, { useMemo } from "react";

const SupportStats = ({ name, image, invoices }) => {
  const { totalRevenue, invoiceCount, lastOrderDate } = useMemo(() => {
    const filteredInvoices = invoices
      .map((invoice) => ({
        ...invoice,
        supportList: invoice.supportList.filter(
          (support) => support.supportName.toLowerCase() === name.toLowerCase()
        ),
      }))
      .filter((invoice) => invoice.supportList.length > 0);

    const totalRevenue = filteredInvoices.reduce((sum, invoice) => {
      return (
        sum +
        invoice.supportList.reduce(
          (innerSum, support) => innerSum + support.price,
          0
        )
      );
    }, 0);

    const invoiceCount = filteredInvoices.length;

    const lastOrderDate =
      filteredInvoices
        .map((invoice) => new Date(invoice.date))
        .sort((a, b) => b - a)[0]
        ?.toLocaleDateString("fr-FR") || "N/A";

    return { totalRevenue, invoiceCount, lastOrderDate };
  }, [invoices, name]);

  return (
    <div className="min-h-[300px] w-full px-4 py-4 pb-6 relative overflow-hidden bg-[#3f3f3f] rounded">
      <span className="bg-gradient absolute left-0 bottom-0 h-[50%] z-[30]  w-full opacity-90"></span>
      <img
        src={image}
        className="absolute w-[200%] h-[200%] blur-[20px] left-[-50%] top-[-50%] z-10 translate-x-[50%] opacity-40"
      />
      <img
        src={image}
        alt="image support"
        className="h-[70%] rounded-lg object-cover w-full h-44 z-[999] relative"
      />
      <div className="flex w-full justify-between items-center mt-2 z-20">
        <p className="font-semibold text-2xl mt-2 z-40">{name}</p>
        <p className="text-sm z-20"></p>
      </div>

      <div className="flex mt-4 justify-between z-40">
        <div className="flex flex-col items-center w-24 z-40">
          <p className="opacity-80 text-sm font-light">Revenu</p>
          <p className="font-bold ">{totalRevenue.toLocaleString("fr-FR")}€</p>
        </div>
        <div className="flex flex-col items-center w-24 z-40">
          <p className="opacity-80 text-sm font-light">Facture</p>
          <p className="font-bold ">{invoiceCount}</p>
        </div>
        <div className="flex flex-col items-center w-44 z-40">
          <p className="opacity-80 text-xs font-light">Dernière commande</p>
          <p className="font-bold ">{lastOrderDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportStats;
