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

export const getDate = () => {
  const date = new Date();
  const month = getDateMonth();
  date.setMonth(month);
  return JSON.stringify(date).slice(1, 11);
};
