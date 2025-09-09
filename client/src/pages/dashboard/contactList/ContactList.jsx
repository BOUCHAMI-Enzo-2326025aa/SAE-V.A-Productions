import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import axios from "axios";

const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    await axios
      .get(import.meta.env.VITE_API_HOST + "/api/events")
      .then((res) => {
        setContactList(res.data.slice(0, 3));
        setContactList((prev) =>
          prev.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        );
        console.log(contactList);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-white w-[50%] py-5 px-8 h-full rounded-[15px] max-[680px]:w-full">
      <div className="flex justify-between items-center">
        <p className="text-main-color text-xl font-semibold max-[850px]:text-sm">
          Prochain rendez-vous
        </p>
        <a
          href="/calendrier"
          className="text-secondary-color text-sm font-semibold max-[850px]:text-xs"
        >
          Voir plus
        </a>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {isLoading ? (
          <div className="flex flex-row gap-2 w-[100%] items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          contactList.map((contact, index) => (
            <ContactCard
              key={index}
              name={contact.company}
              description={contact.description}
              lastSeen={contact.startTime}
              phoneNumber={contact.phoneNumber}
              isLast={index === contactList.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
