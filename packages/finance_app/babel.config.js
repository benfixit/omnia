module.exports = function babelConfig(api) {
  api.cache.forever();

  const plugins = ['@babel/plugin-proposal-class-properties'];

  const presets = ['@babel/preset-env', '@babel/preset-react'];

  return {
    plugins,
    presets
  };
};
