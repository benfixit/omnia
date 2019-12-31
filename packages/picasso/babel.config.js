module.exports = function babelConfig(api) {
  api.cache.forever();

  const presets = ["@babel/preset-env", "@babel/preset-react"];

  return {
    presets
  };
};
