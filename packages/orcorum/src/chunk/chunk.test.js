import _chunk from './index';

describe('Checks that the input array is chunked', () => {
  test('Non empty array', () => {
    expect(_chunk([2, 4, 3, 34, 11, 10], 2)).toEqual([
      [2, 4],
      [3, 34],
      [11, 10]
    ]);
  });

  test('Empty array', () => {
    expect(_chunk([])).toEqual([]);
  });
});
