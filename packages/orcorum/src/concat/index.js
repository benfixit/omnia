/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @param rest
 */
const _concat = (...rest) => {
  return rest.reduce(
    (acc, item) => (Array.isArray(item) ? [...acc, ...item] : [...acc, item]),
    []
  );
};

export default _concat;
