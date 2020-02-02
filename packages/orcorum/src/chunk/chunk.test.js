import _chunk from './index';

describe('Checks that the input array is chunked', () => {
  test('Display Name set', () => {
    expect(_chunk(null)).toBe(true);
  });

  test('Name set', () => {
    expect(_chunk(null)).toBe(true);
  });

  test('Display Name and Name not set', () => {
    expect(_chunk(null)).toBe(true);
  });
});
