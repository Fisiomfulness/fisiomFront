export function getMonday(inputDate) {
  const date = new Date(inputDate);
  const dayOfWeek = date.getDay();
  const difference = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const mondayDate = new Date(date.setDate(difference));
  return mondayDate;
}

export function createQuoteTime(hours, minutes) {
  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  return currentDate;
}

export function createQuoteDay(day) {
  const currentDate = new Date();
  currentDate.setDate(day);
  return currentDate;
}
