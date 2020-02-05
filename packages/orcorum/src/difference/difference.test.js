import _difference from './index';

describe('Get the difference between two arrays', () => {
  test('Both non empty arrays', () => {
    expect(_difference([2, 1], [2, 3])).toEqual([1]);
  });

  test('Both empty arrays', () => {
    expect(_difference([], [])).toEqual([]);
  });

  test('First array empty', () => {
    expect(_difference([], [1, 2, 5])).toEqual([]);
  });

  test('Second array empty', () => {
    expect(_difference([2, 46], [])).toEqual([2, 46]);
  });
});
