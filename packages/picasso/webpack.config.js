const path = require("path");

module.exports = {
  entry: path.resolve("./index.js"),
  output: {
    filename: "picasso.min.js",
    path: path.resolve(__dirname),
    publicPath: "/"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
