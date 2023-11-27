export const shortenDescription = (description) => {
  const maxDescriptionLength = 110;
  const shortenedDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + '...'
      : description;
  return shortenedDescription;
};

export const formatPrice = (price) => {
  if (!price) {
    return "Free";
  }
  let priceSymbol = "$";
  if (price.type === "monthly") {
    return `${priceSymbol}${price.amount}/m`;
  } else {
    return `${priceSymbol}${price.amount}`;
  }
}