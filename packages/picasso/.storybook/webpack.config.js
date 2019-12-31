const customWebpackConfig = require("../webpack.config.js");

module.exports = async ({ config }) => {
  const newConfig = {
    ...config,
    module: { ...config.module, rules: customWebpackConfig.module.rules }
  };
  console.log("New Config === ", newConfig);
  return newConfig;
};
