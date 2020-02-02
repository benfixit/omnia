import _displayName from './index';

describe('Checks that display name is returned', () => {
  test('Display Name set', () => {
    expect(_displayName(null)).toBe(true);
  });

  test('Name set', () => {
    expect(_displayName(null)).toBe(true);
  });

  test('Display Name and Name not set', () => {
    expect(_displayName(null)).toBe(true);
  });
});
