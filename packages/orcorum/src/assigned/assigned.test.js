import _assigned from './index';

describe('Checks that value is assigned', () => {
  test('Test null', () => {
    expect(_assigned(null)).toBeTruthy();
  });

  test('Test number', () => {
    expect(_assigned(3)).toBeTruthy();
  });

  test('Test empty and non-empty object', () => {
    expect(_assigned({})).toBeTruthy();
    expect(_assigned({ text: 'Assigned' })).toBeTruthy();
  });
});

describe('Checks that value is not assigned', () => {
  test('Test undefined', () => {
    expect(_assigned(undefined)).toBeFalsy();
  });
});
