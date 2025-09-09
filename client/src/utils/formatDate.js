export const formatDateSlash = (date) => {
  return new Date(date).toLocaleDateString("fr-FR");
};

export const getHour = (date) => {
  return new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
