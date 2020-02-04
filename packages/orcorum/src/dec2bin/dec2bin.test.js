import _dec2bin from './index';

describe('Convert decimal number to binary', () => {
  test('Test 8', () => {
    expect(_dec2bin(8)).toBe(1000);
  });

  test('Test 3', () => {
    expect(_dec2bin(3)).toBe(11);
  });
});
