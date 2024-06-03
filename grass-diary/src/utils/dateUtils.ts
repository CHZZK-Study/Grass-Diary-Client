type TFormatDate = (selectedDate: Date | null) => string;

const formatDate: TFormatDate = selectedDate => {
  const date: Date = selectedDate ? new Date(selectedDate) : new Date();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');

  return [month, day].join('/');
};

type TGetDaysInYear = (year: number) => number;

const getDaysInYear: TGetDaysInYear = year => {
  const isLeapYear: boolean = new Date(year, 1, 29).getMonth() === 1;
  return isLeapYear ? 366 : 365;
};

type TGetDaysArray = (year: number) => Date[];

const getDaysArray: TGetDaysArray = year => {
  const daysInYear = getDaysInYear(year);
  return Array.from({ length: daysInYear }, (_, i) => new Date(year, 0, i + 1));
};

export { formatDate, getDaysInYear, getDaysArray };
