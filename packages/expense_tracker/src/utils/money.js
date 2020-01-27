export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
});

export const setDecimalNumber = amount => {
  return Number(amount) * 100;
};

export const getDecimalNumber = amount => {
  return Number(amount) / 100;
};
