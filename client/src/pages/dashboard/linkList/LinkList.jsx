import React from "react";
import LinkCard from "./LinkCard";
import contactImg from "../../../assets/contact-illustration.png";
import facturationImg from "../../../assets/facture-illustration.png";
import calendarImg from "../../../assets/calendar-illustration.png";

const LinkList = () => {
  return (
    <div className="w-full flex gap-2 mt-8 max-[920px]:flex-col">
      <LinkCard
        img={contactImg}
        title={"Contacts"}
        subTitle={"Retrouvez la liste de tous les contacts enregistrés"}
        link={"/contacts"}
      />
      <LinkCard
        img={facturationImg}
        title={"FACTURATION"}
        subTitle={"Retrouvez la liste des factures et leurs statuts"}
        link={"/invoice"}
      />
      <LinkCard
        img={calendarImg}
        title={"CALENDRIER"}
        subTitle={"Retrouvez les prochains rendez-vous et appels"}
        link={"/calendrier"}
      />
    </div>
  );
};

export default LinkList;
