const space = ['0px', '2px', '4px', '8px', '16px', '32px', '64px'];

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '34px'];

const headingSizes = ['32px', '24px', '18px', '16px', '12px', '10px'];

const fonts = {
  sansSerif: '"Helvetica Neue", Arial, Helvetica, sans-serif'
};

const fontWeights = [
  0, // Placeholder
  100, // Thin
  200, // Extra Light
  300, // Light
  400, // Normal
  500, // Medium
  600, // Semi Bold
  700, // Bold
  800, // Extra Bold
  900 // Ultra Bold
];

const colors = {
  primary: '#3498db',
  hoveredPrimary: '#2980b9',
  gray: '#808080',
  success: '#5cb85c',
  danger: '#d9534f',
  hoveredDanger: '#b7312d',
  white: '#ffffff',
  lightBlue: '#5bc0de',
  black: '#000000',
  textDefault: '#222222',
  textLabel: '#666666'
};

const theme = {
  space,
  colors,
  fontSizes,
  fonts,
  fontWeights,
  headingSizes
};

export default theme;
