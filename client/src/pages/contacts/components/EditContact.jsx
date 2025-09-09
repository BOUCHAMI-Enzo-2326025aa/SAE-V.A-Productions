import { useState } from "react";
import Input from "../../../components/Input.jsx";
import Button from "../../../components/ui/Button";

const EditContact = ({ contact, closeModal, saveContact }) => {
  const [contactCopy, setContact] = useState(contact);

  const handleChange = (field, value) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className="absolute bg-black bg-opacity-50 w-full h-full z-[99] flex appearAnimation"
      onClick={closeModal}
    >
      <div
        className="bg-white px-10 py-7 min-w-[60%] w-[600px] rounded flex flex-col gap-2 h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="font-bold text-lg">Modifier les informations</p>
          <p className="text-sm opacity-70">
            Modifier toutes les informations relatives au contact
          </p>
        </div>
        <Input
          title={"Entreprise"}
          style={"mt-4"}
          value={contactCopy.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            title={"Nom"}
            style={"w-full"}
            value={contactCopy.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            title={"Prenom"}
            style={"w-full"}
            value={contactCopy.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
          />
        </div>
        <Input
          title={"Numéro de téléphone"}
          value={contactCopy.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <Input
          title={"Adresse Mail"}
          value={contactCopy.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Button
          value={"Enregistrer"}
          className={"mt-6"}
          onClickFunction={() => saveContact(contactCopy)}
        />
      </div>
    </div>
  );
};

export default EditContact;
