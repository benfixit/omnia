import _bin2dec from './index';

describe('Convert binary number to decimal', () => {
  test('Test 8', () => {
    expect(_bin2dec(1000)).toBe(8);
  });

  test('Test 3', () => {
    expect(_bin2dec(11)).toBe(3);
  });
});
