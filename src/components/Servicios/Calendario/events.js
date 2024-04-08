const currentDate = new Date();
export const tomorrowDate = new Date(currentDate);
tomorrowDate.setDate(currentDate.getDate() + 1);

export const createEvent = (startHour, endHour, title, date = currentDate) => {
  const startDateTime = new Date(date);
  startDateTime.setHours(startHour, 0, 0, 0);

  const endDateTime = new Date(date);
  endDateTime.setHours(endHour, 0, 0, 0);

  return {
    start: startDateTime,
    end: endDateTime,
    title: title,
  };
};