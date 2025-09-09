import { useEffect, useState, useCallback } from "react";
import ProfileImage from "../../../components/ProfileImage";
import EditContact from "./EditContact";
import SupportRevenu from "./SupportRevenu";
import ambition_sud from "../../../assets/supports/ambition-sud.png";
import roses_en_provence from "../../../assets/supports/roses-en-provence.png";
import rouges_et_blancs from "../../../assets/supports/rouges-et-blancs.png";
import w_mag from "../../../assets/supports/w-mag.png";
import axios from "axios";
import { formatDateSlash } from "../../../utils/formatDate";
import Button from "../../../components/ui/Button";
import CardFacture from "./CardFacture";
import CopyConfirmMessage from "./CopyConfirmMessage";
import not_found_illustration from "../../../assets/not-found-illustration.svg";

const DetailContactV2 = ({
  contactId,
  closeDetail,
  setContactsList,
  deleteContact,
}) => {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contact, setContact] = useState(null);
  const [clientInvoice, setClientInvoice] = useState([]);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [commentValue, setCommentValue] = useState(""); // État pour gérer les changements immédiats
  const [debounceTimer, setDebounceTimer] = useState(null); // Minuterie de debounce

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_HOST + "/api/contact/" + contactId)
      .then((response) => {
        setContact(response.data);
        setCommentValue(response.data.comments || ""); // Initialiser avec la valeur des commentaires
      });
  }, [contactId]);

  useEffect(() => {
    fetchClientInvoice();
  }, [contact]);

  const handleShowCopyMessage = () => {
    if (showCopyMessage) return;
    setShowCopyMessage(true);
    setTimeout(() => {
      setShowCopyMessage(false);
    }, 1000);
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    handleShowCopyMessage();
  };

  const saveContact = async (contact) => {
    await axios
      .put(import.meta.env.VITE_API_HOST + "/api/contact/" + contactId, contact)
      .then((response) => {
        setContact(response.data);
      });
    setContactsList((prev) => {
      const index = prev.findIndex((c) => c._id === contactId);
      prev[index] = contact;
      return [...prev];
    });
    setContact(contact);
    setIsEditingContact(false);
  };

  const fetchClientInvoice = async () => {
    await axios
      .get(import.meta.env.VITE_API_HOST + "/api/invoice/client/" + contactId)
      .then((response) => {
        setClientInvoice(response.data);
      });
  };

  const handleDebouncedCommentChange = useCallback(
    (value) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(() => {
        setContact((prev) => ({ ...prev, comments: value }));
        saveContact({ ...contact, comments: value });
      }, 2000);

      setDebounceTimer(timer);
    },
    [debounceTimer, contact]
  );

  const handleImmediateCommentChange = (value) => {
    setCommentValue(value);
    handleDebouncedCommentChange(value);
  };

  if (contact === null) return <></>;

  return (
    <div className="appearAnimation w-full h-full absolute left-0 top-0 z-10 bg-black bg-opacity-50 p-4 text-[#3F3F3F] appearAnimation">
      {isEditingContact && (
        <EditContact
          closeModal={() => setIsEditingContact(false)}
          contact={contact}
          setContact={setContact}
          saveContact={saveContact}
        />
      )}
      <div className="bg-white w-full h-full overflow-scroll rounded-lg px-12 py-8 ">
        <div className="flex gap-6">
          <ProfileImage name={"test"} surname="" />
          <div className="mt-1 text-lg font-semibold flex flex-col">
            <p className="leading-6">
              {contact.name} {contact.surname}
            </p>
            <div className="flex gap-2 text-sm opacity-80 font-medium leading-4">
              <p>{contact.company}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              value={"Modifier"}
              className={"!py-0 h-8  w-[100px] !min-w-[50px] text-sm"}
              primary={true}
              onClickFunction={() => {
                setIsEditingContact(true);
              }}
            />
            <Button
              value={"Fermer"}
              className={"!py-0 h-8 w-[100px] !min-w-[50px] text-sm "}
              primary={false}
              onClickFunction={closeDetail}
            />
          </div>
        </div>

        <div className="flex mt-3 gap-1 opacity-100">
          <div className="flex items-center gap-2 rounded opacity-80 text-[#3F3F3F] pb-2 ">
            <p className="text-sm font-semibold ">
              Dernière commande <b>{formatDateSlash(contact.lastCall)}</b>
            </p>
          </div>
        </div>

        <div className="mt-1 flex gap-2">
          <div
            onClick={() => handleCopy(contact.email)}
            className="bg-[#3f3f3f] cursor-pointer flex border-2 w-fit px-10 py-2 rounded-md gap-1 items-center"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 -960 960 960">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z" />{" "}
            </svg>
            <p className="text-sm font-semibold text-white ">{contact.email}</p>
          </div>
          <div
            onClick={() => handleCopy(contact.phoneNumber)}
            className="bg-[#3f3f3f] cursor-pointer flex border-2 w-fit px-10 py-2 rounded-md gap-1 items-center"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 -960 960 960">
              <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />{" "}
            </svg>
            <p className="text-sm font-semibold text-white ">
              {contact.phoneNumber}
            </p>
          </div>
          {showCopyMessage && <CopyConfirmMessage />}
        </div>

        <textarea
          onChange={(e) => handleImmediateCommentChange(e.target.value)}
          className="min-h-[200px] mt-8 min-w-[60%] bg-black
            bg-opacity-5 rounded-lg p-4 text-[#3F3F3F] font-inter text-sm resize-none"
          value={commentValue}
        ></textarea>

        <p className="font-bold mt-6 flex gap-3 items-center">
          Revenu par support
          <p className="text-white bg-[#3f3f3f] px-4 rounded text-sm py-[4px] ">
            {clientInvoice.reduce((acc, curr) => acc + curr.totalPrice, 0)}€
          </p>
        </p>

        <div className="flex mt-3 gap-2">
          <SupportRevenu
            image={ambition_sud}
            supportName={"Ambition Sud"}
            invoices={clientInvoice}
          />
          <SupportRevenu
            image={roses_en_provence}
            supportName={"Roses en provence"}
            invoices={clientInvoice}
          />
          <SupportRevenu
            image={rouges_et_blancs}
            supportName={"Rouges et blancs"}
            invoices={clientInvoice}
          />
          <SupportRevenu
            image={w_mag}
            supportName={"WMag"}
            invoices={clientInvoice}
          />
        </div>

        <p className="font-bold mt-10 pb-5">Detail des factures</p>
        {clientInvoice.map((facture) => (
          <div key={facture.id} className="flex flex-col ">
            <CardFacture
              fileName={facture.number + "-" + facture.entreprise + ".pdf"}
              supportList={facture.supportList}
              price={5}
              date={facture.date}
            />
          </div>
        ))}
        {clientInvoice.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-4">
            <img className="size-60" src={not_found_illustration} />

            <p className="mt-4 font-medium">Aucune facture pour le moment !</p>
          </div>
        )}
        <div className="flex justify-end w-full">
          <button
            className=" mt-10 ml-auto bg-red-500 h-10 text-center px-6 rounded  text-white  font-semibold"
            onClick={() => deleteContact(contactId)}
          >
            Supprimer le contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailContactV2;
