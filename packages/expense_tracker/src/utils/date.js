/* eslint-disable import/prefer-default-export */
export const monthsOfYear = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

export const getDateYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const getDateMonth = () => {
  const date = new Date();
  return date.getDate() > 24 ? date.getMonth() + 1 : date.getMonth();
};

export const getDate = (
  year = getDateYear(),
  month = getDateMonth(),
  day = 1
) => {
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(day);
  return JSON.stringify(date).slice(1, 11);
};

export const getQueryYearAndMonth = (year = getDateYear(), month) => {
  const monthIndex =
    monthsOfYear[month] === undefined ? getDateMonth() : monthsOfYear[month];
  return {
    year: Number(year),
    month: Number(monthIndex)
  };
};
