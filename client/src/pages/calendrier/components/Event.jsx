import React, { useState } from "react";
import PersonIcon from "../../../assets/PersonIcon";
import LocationIcon from "../../../assets/LocationIcon";
import ScheduleIcon from "../../../assets/ScheduleIcon";
import FlecheIcon from "../../../assets/FlecheIcon";
import FormComponent from "./FormComponent";

// Fonction pour formater la date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("fr-FR", options);
};

const Event = ({
  id,
  startTime,
  endTime,
  company,
  location,
  description,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    startTime,
    endTime,
    company,
    location,
    description,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!formData.startTime || !formData.endTime || !formData.company) {
      setErrorMessage("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    try {
      setErrorMessage(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/events/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedEvent = await response.json();
        onEditEvent(updatedEvent);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message ||
            "Une erreur est survenue lors de la modification."
        );
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
    }
  };

  const deleteEvent = async () => {
    try {
      setErrorMessage(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDeleteEvent(id);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Une erreur est survenue lors de la suppression."
        );
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
    }
  };
  return (
    <div>
      <div className="event">
        <div className="event-date relative flex flex-col">
          <span
            className={`event-day ${
              new Date(startTime).getDate() !== new Date().getDate()
                ? "!text-[#3f3f3f]"
                : ""
            }`}
          >
            {formatDate(startTime).split(" ")[0]}
          </span>
          <span
            className={`event-month ${
              new Date(startTime).getDate() !== new Date().getDate()
                ? "!text-[#3f3f3f]"
                : ""
            }`}
          >
            {formatDate(startTime).split(" ")[1]}
          </span>
        </div>

        <div className="event-details">
          <div className="event-meta">
            <div className="event-item flex items-center font-inter text-[#3f3f3F]">
              <ScheduleIcon className="mr-2" />
              <span>
                {new Date(formData.startTime).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(formData.endTime).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="event-item flex items-center font-inter text-[#3f3f3F]">
              <PersonIcon className="mr-2" />
              <span>{formData.company}</span>
            </div>
            <div className="event-item flex items-center font-inter text-[#3f3f3F]">
              <LocationIcon className="mr-2" />
              <span>{formData.location}</span>
            </div>
          </div>
          <p className="event-description mt-4 font-inter text-[#3f3f3F]">
            {formData.description}
          </p>
        </div>
        <button
          className="modify-button flex items-center"
          onClick={handleEdit}
        >
          Modifier <FlecheIcon />
        </button>
      </div>

      {isOpen && (
        <FormComponent
          formData={formData}
          handleChange={handleChange}
          handleSaveEdit={handleSaveEdit}
          onDeleteEvent={deleteEvent}
          onClose={() => setIsOpen(false)}
          isOpen={true}
        />
      )}
    </div>
  );
};

export default Event;
