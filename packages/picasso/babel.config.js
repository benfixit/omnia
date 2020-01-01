module.exports = function babelConfig(api) {
  api.cache.forever();

  const presets = ['@babel/preset-env', '@babel/preset-react'];

  const plugins = [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ];

  return {
    presets,
    plugins
  };
};
