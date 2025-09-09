import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowBack from "../../../assets/ArrowBack";
import ProfileImage from "../../../components/ProfileImage";
import EditIcon from "../../../assets/EditIcon";
import SaveIcon from "../../../assets/SaveIcon.svg";
import SnackBar from "./SnackBar";
import Chips from "./Chips";
import CardFacture from "./CardFacture";

const DetailContact = ({
  contactId,
  company,
  isMenuOpen,
  setIsMenuOpen,
  resetSelectedId,
  refreshContact,
  updateContactLocally,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [contactInfos, setContactInfos] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFetchingInvoices, setIsFetchingInvoices] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });

  const showSnackbar = (type, message) => {
    setSnackbar({ open: true, type, message });
  };

  const fetchContactById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_HOST + "/api/contact/" + contactId
      );
      setContactInfos(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations du contact : ",
        error
      );
      showSnackbar(
        "error",
        "Une erreur est survenue lors de la récupération des informations du contact."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoicesByCompany = async () => {
    setIsFetchingInvoices(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_HOST + "/api/invoice/" + company
      );
      setInvoiceList(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des factures du contact : ",
        error
      );
      showSnackbar(
        "error",
        "Une erreur est survenue lors de la récupération des factures du contact."
      );
    } finally {
      setIsFetchingInvoices(false);
    }
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        import.meta.env.VITE_API_HOST + "/api/contact/update/" + contactId,
        formData
      );
      setIsEditingName(false);
      setIsEditingCompany(false);
      refreshContact();
      fetchContactById();
    } catch (error) {
      console.error("Erreur lors de la mise à du contact : ", error);
      showSnackbar(
        "error",
        "Une erreur est survenue lors de la mise à jours des informations"
      );
    } finally {
      showSnackbar(
        "success",
        "Les informations viennent d'être mises à jours !"
      );
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        import.meta.env.VITE_API_HOST + "/api/contact/delete/" + contactId
      );
      setIsMenuOpen(false);
      refreshContact();
    } catch (error) {
      console.error("Erreur lors de la suppression du contact : ", error);
      showSnackbar(
        "error",
        "Une erreur est survenue lors de la suppressions de ce contact."
      );
    } finally {
      setIsDeleting(false);
      showSnackbar("success", "Le contact vient d'être supprimé !");
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    updateContactLocally(contactId, name, value);
  };

  useEffect(() => {
    if (contactId) {
      setIsEditingName(false);
      fetchContactById();
      fetchInvoicesByCompany();
    }
  }, [contactId]);

  useEffect(() => {
    if (contactInfos) {
      setFormData({
        company: contactInfos.company,
        name: contactInfos.name,
        surname: contactInfos.surname,
        email: contactInfos.email,
        phoneNumber: contactInfos.phoneNumber,
        comments: contactInfos.comments,
        status: contactInfos.status,
      });
    }
  }, [contactInfos]);

  return (
    <>
      {snackbar.open && (
        <SnackBar
          type={snackbar.type}
          message={snackbar.message}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        />
      )}
      <div
        className={
          "absolute left-0 top-0 h-screen max-h-screen w-full bg-[#F6F6F6] z-30 transition-all border border-[#818181] border-opacity-15 p-10 overflow-y-scroll " +
          (!isMenuOpen && "translate-x-[100%] ")
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
              ) : (
                <ProfileImage name={formData.company} surname="" />
              )}
              {loading ? (
                <div className="animate-pulse bg-gray-300 w-20 h-8 rounded-lg"></div>
              ) : (
                <Chips text={formData.status} />
              )}
            </div>

            <ArrowBack
              onClick={() => {
                updateContactLocally(
                  contactId,
                  "company",
                  contactInfos.company
                );
                updateContactLocally(contactId, "name", contactInfos.name);
                updateContactLocally(
                  contactId,
                  "surname",
                  contactInfos.surname
                );
                updateContactLocally(
                  contactId,
                  "phoneNumber",
                  contactInfos.phoneNumber
                );
                updateContactLocally(contactId, "email", contactInfos.email);
                updateContactLocally(
                  contactId,
                  "comments",
                  contactInfos.comments
                );
                resetSelectedId("");
                setIsMenuOpen(false);
                setIsEditingName(false);
                setIsEditingCompany(false);
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              {isEditingCompany ? (
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <p className="text-[#3F3F3F] font-semibold text-[18px]">
                      Entreprise
                    </p>
                    <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[10px] items-center flex">
                      <input
                        onChange={handleFormChange}
                        className="bg-transparent w-full focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50"
                        value={formData.company}
                        name="company"
                        id="company"
                        placeholder="Entreprise"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={"flex flex-col " + (loading && "gap-2")}>
                  <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                    ) : (
                      <>
                        {formData.company}
                        <EditIcon
                          className="ml-2 "
                          onClick={() => {
                            if (!isEditingCompany) setIsEditingCompany(true);
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              {isEditingName ? (
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <p className="text-[#3F3F3F] font-semibold text-[18px]">
                      Nom
                    </p>
                    <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[10px] items-center flex">
                      <input
                        onChange={handleFormChange}
                        className="bg-transparent w-full focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50"
                        value={formData.name}
                        name="name"
                        id="name"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-[#3F3F3F] font-semibold text-[18px]">
                      Prénom
                    </p>
                    <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[10px] items-center flex">
                      <input
                        onChange={handleFormChange}
                        className="bg-transparent w-full focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50"
                        value={formData.surname}
                        name="surname"
                        id="surname"
                        placeholder="Prénom"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className={"flex flex-col " + (loading && "gap-2")}>
                  <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
                    {loading ? (
                      <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full mt-2"></div>
                    ) : (
                      <>
                        {formData.name} {formData.surname}
                        <EditIcon
                          className="ml-2 "
                          onClick={() => {
                            if (!isEditingName) setIsEditingName(true);
                          }}
                        />
                      </>
                    )}
                  </div>
                  {loading ? (
                    <div className="animate-pulse bg-gray-300 w-45 h-5 rounded-full"></div>
                  ) : (
                    <span className="text-[#3F3F3F] text-[14px]">
                      {formData.comments}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-[100%] h-10 rounded-lg"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
                  Numéro de téléphone
                </div>
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[5px] items-center">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 flex-1"
                    onChange={handleFormChange}
                    value={formData.phoneNumber}
                    id="phoneNumber"
                    name="phoneNumber"
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-[100%] h-10 rounded-lg"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
                  Adresse mail
                </div>
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    value={formData.email}
                    onChange={handleFormChange}
                    name="email"
                    id="email"
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col">
            {loading ? (
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-[100%] h-40 rounded-lg"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
                  Commentaires
                </div>
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[10px] space-x-[5px] items-center flex">
                  <textarea
                    className="flex-1 font-inter text-[#3F3F3F] p-2 bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none resize-none"
                    rows="5"
                    value={formData.comments}
                    onChange={handleFormChange}
                    name="comments"
                    id="comments"
                  />
                </div>
              </>
            )}
          </div>

          <div
            className={
              "flex relative py-[15px] px-[33px] btn-new-contact rounded-lg gap-3 items-center justify-center " +
              (loading && "opacity-70")
            }
            onClick={() => {
              if (!loading) handleSubmit();
            }}
          >
            {isUpdating ? (
              <div
                role="output"
                className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              ></div>
            ) : (
              <img src={SaveIcon} className="fill-white" />
            )}

            <p className="text-[#FFFFFF] font-inter font-[600] text-center">
              Sauvegarder les modifications
            </p>
          </div>
          <div
            className={
              "flex relative py-[15px] px-[33px] btn-delete-contact rounded-lg gap-3 items-center justify-center " +
              (loading && "opacity-70")
            }
            onClick={() => {
              if (!loading) handleDelete();
            }}
          >
            {isDeleting ? (
              <div
                role="output"
                className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              ></div>
            ) : (
              <img src={SaveIcon} className="fill-white" />
            )}
            <p className="text-[#FFFFFF] font-inter font-[600] text-center">
              Supprimer ce contact
            </p>
          </div>
          <div className="flex flex-col mt-[25px] gap-2 ">
            <div className="flex items-center text-[#3F3F3F] font-semibold text-[18px]">
              Historique des factures
            </div>
            {isFetchingInvoices ? (
              <div className="flex justify-center items-center w-full">
                <div
                  role="output"
                  className="inline-block h-5 w-5 mr-2 animate-spin rounded-full border-2 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                ></div>
              </div>
            ) : (
              <>
                {invoiceList.map((facture) => (
                  <div key={facture.id} className="flex flex-col ">
                    <CardFacture
                      fileName={
                        facture.entreprise + "-" + facture.number + ".pdf"
                      }
                      supportList={facture.supportList}
                      price={5}
                      date={facture.date}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailContact;
