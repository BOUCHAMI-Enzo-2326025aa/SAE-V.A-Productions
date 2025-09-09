export default function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice.replace(/(?<=\d)\s(?=\d)/g, ".");
}
