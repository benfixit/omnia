/**
 * Convert decimal to binary number
 * @param num
 * @returns {number}
 * @private
 */
const _dec2bin = num => {
  return Number(num.toString(2));
};

export default _dec2bin;
