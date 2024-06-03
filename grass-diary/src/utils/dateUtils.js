const formatDate = selectedDate => {
  const date = new Date(selectedDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return [month, day].join('/');
};

const getDaysInYear = year => {
  const isLeapYear = new Date(year, 1, 29).getMonth() === 1;
  return isLeapYear ? 366 : 365;
};

const getDaysArray = year => {
  const daysInYear = getDaysInYear(year);
  return Array.from({ length: daysInYear }, (_, i) => new Date(year, 0, i + 1));
};

export { formatDate, getDaysInYear, getDaysArray };
