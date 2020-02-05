/**
 * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
 * The order and references of result values are determined by the first array.
 * @param firstArray
 * @param secondArray
 * @returns []
 * @private
 */
const _difference = (firstArray = [], secondArray = []) => {
  return firstArray.filter(item => !secondArray.includes(item));
};

export default _difference;
