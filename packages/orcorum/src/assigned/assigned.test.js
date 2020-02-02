import _assigned from './index';

describe('Checks that value is assigned', () => {
  test('Test null', () => {
    expect(_assigned(null)).toBe(true);
  });

  test('Test number', () => {
    expect(_assigned(3)).toBe(true);
  });

  test('Test empty and non-empty object', () => {
    expect(_assigned({})).toBe(true);
    expect(_assigned({ text: 'Assigned' })).toBe(true);
  });
});

describe('Checks that value is not assigned', () => {
  test('Test undefined', () => {
    expect(_assigned(undefined)).toBe(false);
  });
});
