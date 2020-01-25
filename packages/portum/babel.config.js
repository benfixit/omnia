module.exports = function babelConfig(api) {
  api.cache.forever();

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ];

  const presets = ['@babel/preset-env', '@babel/preset-react'];

  return {
    plugins,
    presets
  };
};
