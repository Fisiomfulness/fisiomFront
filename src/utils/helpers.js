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

// * ISO Dates
export const isDateOnRange = (value, minYearsAgo, maxYearsAgo) => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!value || typeof value !== 'string' || !isoDateRegex.test(value))
    return false;

  const currentDate = new Date();
  const dateISO = new Date(value);

  const minDate = new Date(
    currentDate.getFullYear() - maxYearsAgo,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const maxDate = new Date(
    currentDate.getFullYear() - minYearsAgo,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return dateISO >= minDate && dateISO <= maxDate;
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

export const isDynamicIdPath = (path) => {
  // * Working with mongo objectId.
  const objectIdRegExp = /[0-9a-fA-F]{24}/;
  return objectIdRegExp.test(path);
};

export const isValidPdf = (fileName) => {
  return fileName && fileName.split('.').pop() === 'pdf';
};

// ? Used for example for form optional fields that inits with a falsy value ("" for example)
// ? but zod.optional() has to receive undefined
export const removeObjFalsyValues = (object) => {
  for (const key in object) {
    if (!object[key]) delete object[key];
  }
  return object;
};
