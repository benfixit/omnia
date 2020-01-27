/* eslint-disable import/prefer-default-export */
export const falseyCheck = (firstNum, secondNum) => {
  if (firstNum !== undefined) {
    return firstNum;
  }
  return secondNum;
};
