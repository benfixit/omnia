module.exports = function babelConfig(api) {
  api.cache.forever();

  const plugins = [];

  const presets = ['@babel/preset-env', '@babel/preset-react'];

  return {
    plugins,
    presets
  };
};
