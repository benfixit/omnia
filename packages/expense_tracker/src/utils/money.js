export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2
});

export const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

export const setDecimalNumber = amount => {
  const fixedNumber = Number(amount) * 100;
  return Number(fixedNumber.toFixed());
};

export const getDecimalNumber = amount => {
  return Number(amount) / 100;
};
