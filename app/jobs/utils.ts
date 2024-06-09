export const shortenDescription = (description: string) => {
  const maxDescriptionLength = 200;
  const shortenedDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + '...'
      : description;
  return shortenedDescription;
};

type Price = {
  type?: string;
  amount?: number;
  currency?: string;
}

export const formatPrice = (price: Price | undefined) => {
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