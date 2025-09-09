import { useEffect, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import InfoComponent from "./sectionTitle/InfoComponent";
import SectionTitle from "./sectionTitle/SectionTitle";
import InvoiceButton from "../../component/InvoiceButton";
import InvoiceSummary from "../invoiceSummary/InvoiceSummary";

const InvoiceConfirm = ({
  invoice,
  supportList,
  createOrder,
  returnFunction,
  TVA_PERCENTAGE,
  handleChange,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const signaturePadRef = useRef(null);
  const [signatureData, setSignatureData] = useState("");

  const calcPrice = () => {
    setTotalPrice(0);
    supportList.forEach((support) => {
      setTotalPrice(
        (prevTotal) => parseInt(prevTotal) + parseInt(support.price)
      );
    });
    handleChange("totalPrice", totalPrice);
  };

  const clearSignature = () => {
    signaturePadRef.current.clear();
    setSignatureData("");
  };

  useEffect(() => {
    calcPrice();
  }, [supportList]);

  return (
    <div className="bg-white w-full h-full py-8 px-9 rounded-md flex min-h-[600px]  page-appear-animation">
      <div className=" min-h-full mt-5 flex flex-col items-center px-10 w-full">
        {/* Icone de confirmation */}
        <div className="relative h-fit w-fit">
          <svg className="fill-[#30d72d] size-24" viewBox="0 -960 960 960">
            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
          <span className="size-32 bg-[#30d72d] absolute top-[50%] left-[50%] rounded-full opacity-10 -translate-x-[50%] -translate-y-[50%]"></span>
        </div>

        {/* Titre */}
        <p className="text-xl mt-8 text-[#3F3F3F] font-semibold">
          Confirmation de la commande
        </p>
        <p className="opacity-50 text-[#3F3F3F] text-sm mb-10">
          Confirmer que tous les éléments indiqués soient corrects
        </p>

        {/* Informations client */}
        <SectionTitle
          title={"Informations client"}
          svg={
            <svg
              className="fill-[#3F3F3F] size-[24px]"
              viewBox="0 -960 960 960"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          }
        />
        <div className="flex flex-col w-full gap-1 mt-4">
          <InfoComponent name={"NOM"} value={invoice.client.name} />
          <InfoComponent name={"EMAIL"} value={invoice.client.email} />
          <InfoComponent
            name={"NUMÉRO DE TÉLÉPHONE"}
            value={invoice.client.phone}
          />
        </div>

        <div className="flex flex-col w-full mt-6 gap-1">
          <InfoComponent name={"VILLE"} value={invoice.client.city} />
          <InfoComponent
            name={"CODE POSTAL"}
            value={invoice.client.postalCode}
          />
          <InfoComponent name={"ADRESSE 1"} value={invoice.client.address1} />
          <InfoComponent name={"ADRESSE 2"} value={invoice.client.address2} />
        </div>

        <SectionTitle
          title={"Signature"}
          className={"mt-10"}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z" />
            </svg>
          }
        />

        <div className="mt-4 w-full ">
          <SignatureCanvas
            ref={signaturePadRef}
            penColor="black"
            onEnd={() =>
              handleChange("signature", signaturePadRef.current.toDataURL())
            }
            canvasProps={{
              className: "border border-gray-300 rounded w-full h-40",
            }}
          />
          <InvoiceButton
            value={"Effacer"}
            className={" py-3 mt-1 !w-full "}
            primary={false}
            onClickFunction={clearSignature}
          />
        </div>

        {/* Zone de signature */}
        <div className="w-full mt-6">
          {/*<div className="flex gap-2 mt-3">
            <InvoiceButton
              value={"Effacer"}
              primary={false}
              onClickFunction={clearSignature}
            />
            <InvoiceButton
              value={"Sauvegarder la signature"}
              onClickFunction={saveSignature}
            />
          </div>
          */}
        </div>

        {/* Affichage de la signature sauvegardée */}
        {signatureData && (
          <div className="mt-6">
            <p className="text-sm text-[#3F3F3F]">Signature sauvegardée :</p>
            <img
              src={signatureData}
              alt="Signature"
              className="border border-gray-300 rounded w-full h-40"
            />
          </div>
        )}
      </div>

      {/* Côté facturation */}
      <div className="w-full min-h-full flex flex-col border-l-2 border-opacity-[0.05] border-black items-start px-6 py-6">
        <SectionTitle
          title={"Informations de facturation"}
          svg={
            <svg
              className="fill-[#3F3F3F] size-[24px]"
              viewBox="0 -960 960 960"
            >
              <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17-11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480Z" />
            </svg>
          }
        />
        <InvoiceSummary supportList={supportList} />

        <div className="flex flex-col text-[#3F3F3F] w-full justify-end h-full items-end mt-5">
          <table>
            <tr className="gap-5">
              <td className="opacity-70">SOUS TOTAL</td>
              <td className="min-w-32 text-right">{totalPrice.toFixed(2)} €</td>
            </tr>
            <tr className="gap-5">
              <td className="opacity-70">TAUX DE T.V.A</td>
              <td className="min-w-32 text-right">{TVA_PERCENTAGE * 100}%</td>
            </tr>
            <tr className="gap-5">
              <td className="opacity-70">T.V.A</td>
              <td className="min-w-32 text-right">
                {parseInt(totalPrice) * TVA_PERCENTAGE} €
              </td>
            </tr>
            <tr className="gap-5 ">
              <td className="font-bold text-xl pt-3">TOTAL</td>
              <td className="min-w-32 text-right font-bold text-xl pt-3">
                {parseInt(totalPrice) + parseInt(totalPrice) * TVA_PERCENTAGE} €
              </td>
            </tr>
          </table>
          <div className="flex gap-2 mt-5">
            <InvoiceButton
              value={"Retour"}
              primary={false}
              onClickFunction={returnFunction}
            />
            <InvoiceButton
              value={"Confirmer la commande"}
              onClickFunction={() => {
                if (signaturePadRef.current.isEmpty()) {
                  alert("Veuillez signer avant de confirmer la commande.");
                } else {
                  console.log(invoice);
                  createOrder(signatureData);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceConfirm;
