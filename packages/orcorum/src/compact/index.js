/**
 *  Creates an array with all falsey values removed.
 *  The values false, null, 0, "", undefined, and NaN are falsey.
 * @param array
 */
const _compact = (array = []) => {
  return array.filter(value => !!value);
};

export default _compact;
