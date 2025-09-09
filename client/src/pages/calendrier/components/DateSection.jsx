import React from "react";
import Event from "./Event";

// Fonction pour convertir une date en format lisible
const convertToDateTimeLocal = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Date invalide";
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
};

// Fonction pour regrouper les événements par date
const groupEventsByDate = (events) => {
  return events.reduce((acc, event) => {
    const eventDate = new Date(event.startTime).toISOString().split("T")[0];
    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});
};

const DateSection = ({ events, onDeleteEvent }) => {
  if (!events || !Array.isArray(events) || events.length === 0) {
    return <p>Aucun événement disponible</p>;
  }

  // Regrouper les événements par date
  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="date-section mb-8">
      {Object.keys(groupedEvents).map((date) => (
        <div key={date}>
          <h2 className="text-lg font-semibold mb-4">
            {convertToDateTimeLocal(date)}
          </h2>
          {groupedEvents[date].map((event) => (
            <Event
              key={event._id}
              date={date}
              id={event._id}
              {...event}
              onDeleteEvent={() => onDeleteEvent(event._id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default DateSection;
