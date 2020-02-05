/**
 *This method is like _.difference except that it accepts iteratee which is invoked for each element of array and values
 * to generate the criterion by which they're compared. The order and references of result values are determined by the first array.
 * The iteratee is invoked with one argument: (value).
 * @param firstArray
 * @param secondArray
 * @param iteratee
 * @returns []
 * @private
 */
const _differenceBy = (
  firstArray = [],
  secondArray = [],
  iteratee = () => {}
) => {
  const newFirstArray = firstArray.map(item => iteratee(item));
  const newSecondArray = secondArray.map(item => iteratee(item));

  return firstArray.filter(
    (item, index) => !newSecondArray.includes(newFirstArray[index])
  );
};

export default _differenceBy;
