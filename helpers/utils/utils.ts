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
