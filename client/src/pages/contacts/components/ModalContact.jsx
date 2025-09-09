import axios from "axios";
import React, { useEffect, useState } from "react";
import SnackBar from "./SnackBar";
import CloseIcon from "../../../assets/CloseIcon.svg";
import "../contact.css";

const ModalContact = ({ handleCloseModal, fetchContact, isModalOpen }) => {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    comments: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const nameRegex = /^[A-Za-z'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{2}( ?:?[0-9]{2}){4}$/;
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({
        company: "",
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        comments: "",
        status: "",
      });
      setErrors({});
    }
  }, [isModalOpen]);

  const showSnackbar = (type, message) => {
    setSnackbar({ open: true, type, message });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    switch (name) {
      case "name":
      case "surname":
        if (value && !nameRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              "Seules les lettres, les tirets et les apostrophes sont autorisés.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        break;
      case "email":
        if (value && !emailRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "L'adresse email est incorrecte.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        break;
      case "phoneNumber":
        if (value && !phoneRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Le numéro de téléphone est incorrecte.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        break;
      case "status":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Veuillez cocher la case appropriée",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
    }
  };

  const handleSubmit = async () => {
    if (!formData.status) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        status: "Veuillez sélectionner une option (Prospect ou Client).",
      }));
      return;
    }
    if (Object.values(errors).some((error) => error)) {
      alert("Veuillez corriger les erreurs avant de soumettre.");
      return;
    }
    try {
      setIsCreating(true);
      const response = await axios.post(
        import.meta.env.VITE_API_HOST + "/api/contact/create",
        {
          company: formData.company,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          comments: formData.comments,
          lastCall: Date.now(),
          status: formData.status,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la création du contact : ", error);
      showSnackbar(
        "error",
        "Une erreur est survenue lors de la création du contact."
      );
    } finally {
      showSnackbar("success", "Le nouveau contact a été créé avec succès !");
      fetchContact();
      handleCloseModal();
      setIsCreating(false);
    }
  };

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
          "fixed inset-0 flex items-center justify-center z-50 transform-all transition-all " +
          (!isModalOpen && "translate-y-full")
        }
      >
        <div className="bg-[#F6F6F6] w-[300px] p-4 rounded-lg shadow-lg">
          <form
            className="flex flex-col gap-[20px]"
            onSubmit={(e) => {
              e.preventDefault();
              fetchContact();
            }}
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-[#3F3F3F]">
                Nouveau contact
              </h2>
              <img src={CloseIcon} onClick={handleCloseModal} />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Entreprise
                </label>
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="Microsoft"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                {errors.surname && (
                  <p className="text-red-500 text-sm">{errors.surname}</p>
                )}
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="John"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresse email
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="johndoe@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="07 85 42 12 34"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note(s)
                </label>
                <div className="border-[1px] border-[#3F3F3F] border-opacity-15 rounded-lg p-[5px] space-x-[5px] items-center flex">
                  <input
                    className="bg-transparent focus:border-transparent focus:ring-0 border-transparent focus:outline-none font-inter text-[#3F3F3F] placeholder-opacity-50 w-screen "
                    placeholder="Un homme génial"
                    name="comments"
                    type="text"
                    value={formData.comments}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status}</p>
                )}
                <div
                  className="flex flex-row gap-[5px] text-gray-700"
                  onChange={handleChange}
                >
                  <input type="radio" value="PROSPECT" name="status" />
                  Prospect
                  <input type="radio" value="CLIENT" name="status" /> Client
                </div>
              </div>
            </div>

            <button
              className={
                "text-white px-4 py-2 rounded-md btn-new-contact " +
                (isCreating && "opacity-70")
              }
              onClick={handleSubmit}
              disabled={isCreating ? true : false}
            >
              {isCreating ? (
                <div
                  role="status"
                  className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                ></div>
              ) : (
                <p>Créer</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalContact;
