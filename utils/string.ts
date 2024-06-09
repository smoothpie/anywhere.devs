export const shortenDescription = (description: string) => {
  const maxDescriptionLength = 110;
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