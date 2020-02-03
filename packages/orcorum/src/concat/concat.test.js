import _concat from './index';

describe('Checks that the input values are concatenated', () => {
  test('Mixed input', () => {
    expect(_concat([2, 4, 1], 2, [3], 11, [[4]], { name: 'Test' })).toEqual([
      2,
      4,
      1,
      2,
      3,
      11,
      [4],
      { name: 'Test' }
    ]);
  });

  test('Numbers only', () => {
    expect(_concat(2, 4, 1)).toEqual([2, 4, 1]);
  });
});
