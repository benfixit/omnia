/**
 * Returns true if array is empty, otherwise false
 * @param array
 * @returns {boolean}
 */
const isEEmptyArray = (array = []) => {
  if (Array.isArray(array)) {
    return array.length === 0;
  }
  throw new Error(`Expected an array, but got ${typeof array}`);
};

export default isEEmptyArray;
