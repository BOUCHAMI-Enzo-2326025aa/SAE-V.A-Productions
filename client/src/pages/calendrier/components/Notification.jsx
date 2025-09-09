import React, { useEffect, useState } from "react";

// Composant Notification pour afficher un message contextuel temporaire (succès ou erreur)
const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  // Définition des styles dynamiques en fonction du type de notification
  const notificationStyles = {
    success: {
      bgColor: "bg-green-100 dark:bg-green-900",
      borderColor: "border-green-500 dark:border-green-700",
      iconColor: "text-green-600",
      textColor: "text-green-900 dark:text-green-100",
    },
    error: {
      bgColor: "bg-red-100 dark:bg-red-900",
      borderColor: "border-red-500 dark:border-red-700",
      iconColor: "text-red-600",
      textColor: "text-red-900 dark:text-red-100",
    },
  };

  // Styles extraits pour simplifier l'application
  const { bgColor, borderColor, iconColor, textColor } =
    notificationStyles[type] || {};

  // Rendu de la notification avec animation
  return (
    <div
      className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 space-y-2 p-2 z-[9999] transition-all duration-300 ease-in-out transform ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      <div
        role="alert"
        className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-2 rounded-lg flex items-center`}
      >
        <svg
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className={`h-5 w-5 flex-shrink-0 mr-2 ${iconColor}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
        <p className="text-xs font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
