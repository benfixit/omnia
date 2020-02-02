import _compact from './index';

describe('Checks that only non-falsey values are returned', () => {
  test('Mixed values', () => {
    expect(_compact([0, 1, false, 2, '', 3])).toBe([1, 2, 3]);
  });

  test('Only falsey values', () => {
    expect(_compact([0, false, '', NaN])).toBe([]);
  });

  test('Only truthy values', () => {
    expect(_compact([{}, 1, 2, 23, 4])).toBe([{}, 1, 2, 23, 4]);
  });
});
