// * example = I like apples => I like ...
export const truncateText = (text, maxWords) => {
  return text.split(' ').slice(0, maxWords).join(' ') + '...';
};

// * hour:minutes am/pm
export const hourTime = (timeStamp) => {
  const date = new Date(timeStamp);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

// * Works for ISO 8601 and UNIX timestamps
export const dateFormatter = (timeStamp, hours = true) => {
  let displayedDate = new Date(
    typeof timeStamp === 'number' ? timeStamp * 1000 : timeStamp
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0); // * For an accurate comparison
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (displayedDate.toLocaleDateString() === today.toLocaleDateString()) {
    // ? Today... show hours? => hour:minute am/pm
    displayedDate = hours ? hourTime(timeStamp) : 'Hoy';
  } else if (
    displayedDate.toLocaleDateString() === yesterday.toLocaleDateString()
  ) {
    // ? Yesterday
    displayedDate = 'Ayer';
  } else {
    // ? Before yesterday, display the date => day/month/year
    displayedDate = displayedDate.toLocaleDateString();
  }

  return displayedDate;
};

export const actualMinDate = () => {
  // Convertir la fecha actual a un objeto Date
  const ActualDate = new Date();

  // Calcular los milisegundos por año
  const millisecondsForYear = 1000 * 60 * 60 * 24 * 365;

  // Restar 18 años en milisegundos a la fecha actual
  const milliseconds18years = millisecondsForYear * 18;
  const minimalDateMillisecMillisec =
    ActualDate.getTime() - milliseconds18years;

  // Convertir los milisegundos de la fecha mínima a un objeto Date
  const minimalDate = new Date(minimalDateMillisecMillisec);

  // Formatear la fecha mínima a YYYY-MM-DD
  const minimalDateString = minimalDate.toISOString().slice(0, 10);

  //retorna "yyyy-mm-dd"
  console.log(minimalDateString);
  return minimalDateString;
};

export const scrollTo = (elementId, direction = 'top') => {
  const scrollContainer = document.getElementById(elementId);
  if (scrollContainer && (direction == 'top' || direction == 'bottom')) {
    const scrollOptions = {
      top: direction === 'top' ? 0 : scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    };
    scrollContainer.scrollTo(scrollOptions);
  }
};

export const stripHTMLTags = (string) => {
  if (string === null || string === '') return false;
  else string = string.toString();
  return string.replace(/<[^>]*>/g, ' ');
};

export const isDynamicIdPath = (path, basePath) => {
  // * Working with mongo objectId.
  const dynamicRouteRegExp = new RegExp(`^${basePath}/[0-9a-fA-F]{24}$`);
  return dynamicRouteRegExp.test(path);
};
