import _differenceBy from './index';

describe('Get the difference between two arrays with an iteratee', () => {
  test('Both non empty arrays', () => {
    expect(_differenceBy([2.1, 1.2], [2.4, 3.5], Math.floor)).toEqual([1.2]);
  });

  test('Both empty arrays', () => {
    expect(_differenceBy([], [], () => {})).toEqual([]);
  });
});
