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
    displayedDate = hours ? hourTime(timeStamp) : 'Today';
  } else if (displayedDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
    // ? Yesterday
    displayedDate = 'Yesterday';
  } else {
    // ? Before yesterday, display the date => day/month/year
    displayedDate = displayedDate.toLocaleDateString();
  }

  return displayedDate;
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
