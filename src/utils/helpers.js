// * example = I like apples => I like ...
export const truncateText = (text, maxWords) => {
  return text.split(' ').slice(0, maxWords).join(' ') + '...';
};

export const dateFormatter = (timeStamp, hours = true) => {
  let displayedDate = new Date(timeStamp);
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
