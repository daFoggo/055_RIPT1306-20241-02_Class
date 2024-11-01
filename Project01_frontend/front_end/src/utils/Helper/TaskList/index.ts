export const formatDisplayDate = (dateString: string) => {
  try {
    const localDate = getDateWithoutTime(dateString);
    if (!localDate) {
      return "Invalid Date";
    }

    return localDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting display date:", error);
    return "Invalid Date Format";
  }
};

export const getDateWithoutTime = (dateString: string) => {
  try {
    const date = new Date(dateString);

    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    return localDate;
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null;
  }
};
