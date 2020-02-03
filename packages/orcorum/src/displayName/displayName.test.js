import _displayName from './index';

describe('Checks that display name is returned', () => {
  test('Display Name set', () => {
    const component = { displayName: 'TestComponent' };
    expect(_displayName(component)).toBe('TestComponent');
  });

  test('Name set', () => {
    const component = { name: 'TestComponent' };
    expect(_displayName(component)).toBe('TestComponent');
  });

  test('Display Name and Name not set', () => {
    const component = {};
    expect(_displayName(component)).toBe('Component');
  });
});
