export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

// Validation function
export const formValidator = (fields: Object) => {
  let noEmpty = true;
  Object.entries(fields).forEach(([key, value]) => {
    if (!value) {
      noEmpty = false;
    }
  });
  return noEmpty;
};

//
export const formatNumber = (number: number) => {
  const numberString = number.toString();

  const [integerPart, decimalPart] = numberString.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (decimalPart) {
    return `${formattedInteger}.${decimalPart}`;
  } else {
    return formattedInteger;
  }
};

export function stringToNumeric(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the numeric timestamp in milliseconds
  const numericValue = date.getTime();

  return numericValue;
}
