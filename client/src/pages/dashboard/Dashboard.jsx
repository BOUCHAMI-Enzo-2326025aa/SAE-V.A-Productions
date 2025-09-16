import { useState } from "react";
import LinkList from "./linkList/LinkList";
import ContactList from "./contactList/ContactList";
import FactureList from "./factureList/FactureList";
import { ClientChart } from "./clientChart/ClientChart";
import WelcomeAnimation from "./welcomeAnimation/WelcomeAnimation";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const alreadyConnected = localStorage.getItem("alreadyConnected");

  return (
    <>
      {!alreadyConnected && <WelcomeAnimation />}
      <div className="flex flex-col pt-3">
        <p className="font-inter text-[#3F3F3F] text-[40px] font-[700] max-[680px]:text-2xl">
          Salut,
        </p>
        <p className="font-inter text-[#3F3F3F] text-[20px] opacity-80 max-[680px]:text-sm">
          Bienvenue sur l'application de V.A Productions
        </p>
      </div>
      <LinkList />
      <div className="mt-4">
        <ClientChart />
      </div>
      <div className="flex mt-4 gap-4 max-[680px]:flex-col">
        <ContactList />
        <FactureList />
      </div>
    </>
  );
};

export default Dashboard;
