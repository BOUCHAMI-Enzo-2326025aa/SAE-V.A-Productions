import { useState } from "react";
import Notification from "./Notification";
import "../Calendrier.css";
import plus_icon from "../../../assets/plus-icon.svg";

const Button = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    company: "",
    location: "",
    description: "",
  });
  const [notification, setNotification] = useState(null);

  // Fonction pour ouvrir le formulaire
  const handleOpen = () => setIsOpen(true);

  // Fonction pour fermer le formulaire et réinitialiser les champs
  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      startTime: "",
      endTime: "",
      company: "",
      location: "",
      description: "",
    });
  };

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation des données du formulaire
  const validateFormData = () => {
    if (!formData.startTime || !formData.endTime || !formData.company) {
      setNotification({
        message: "Tous les champs obligatoires doivent être remplis.",
        type: "error",
      });
      return false;
    }

    return true;
  };

  // Fonction pour enregistrer les données
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const newEvent = {
      startTime: formData.startTime,
      endTime: formData.endTime,
      company: formData.company,
      location: formData.location,
      description: formData.description,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.ok) {
        const savedEvent = await response.json();
        onCreate(savedEvent);
        setNotification({
          message: "Événement enregistré avec succès !",
          type: "success",
        });
        handleClose();
      } else {
        setNotification({
          message: "Erreur lors de l'enregistrement de l'événement.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "Une erreur s'est produite lors de la requête.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <button
        className="bg-[#3F3F3F] text-white font-medium gap-2 px-6 py-3 rounded-sm font-inter flex items-center"
        onClick={handleOpen}
      >
        <img src={plus_icon} alt="plus" />
        Nouveau rendez-vous
      </button>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div
        className={`absolute right-0 top-0 h-screen max-h-screen w-[100%] lg:w-[40%] xl:w-[33%] bg-[#F6F6F6] z-30 transition-all border border-[#818181] border-opacity-15 p-10 overflow-y-scroll transform ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 text-[#000000]">
          Créer un nouvel événement
        </h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-inter text-[#3f3f3F]">
              Heure de début
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full bg-white font-inter text-[#3f3f3F]"
            />
          </div>

          <div className="mb-4">
            <label className="block font-inter text-[#3f3f3F]">
              Heure de fin
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full bg-white font-inter text-[#3f3f3F]"
            />
          </div>

          <div className="mb-4">
            <label className="block font-inter text-[#3f3f3F]">Client</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full bg-white font-inter text-[#3f3f3F]"
            />
          </div>

          <div className="mb-4">
            <label className="block font-inter text-[#3f3f3F]">Lieu</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full bg-white font-inter text-[#3f3f3F]"
            />
          </div>

          <div className="mb-4">
            <label className="block font-inter text-[#3f3f3F]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full bg-white font-inter text-[#3f3f3F]"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="calendrier-button text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 flex items-center"
            >
              {isSaving ? <span>Enregistrement...</span> : "Enregistrer"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Button;
