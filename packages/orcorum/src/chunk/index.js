/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 * @param array
 * @param size
 */
const _chunk = (array = [], size = 1) => {
  let startIndex = 0;
  let endIndex = size;
  let newArr = [];

  while (startIndex < array.length) {
    newArr = [...newArr, array.slice(startIndex, endIndex)];
    startIndex += size;
    endIndex += size;
  }
  return newArr;
};

export default _chunk;
