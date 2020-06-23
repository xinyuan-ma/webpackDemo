let path = require("path");
module.exports = {
  mode: 'development',
  entry: "./loader/index.js",
  output: {
    path: path.join(__dirname, "distLoader"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.demo$/,
        use: [
          path.resolve(__dirname, 'loader/loader', 'style-loader'),
          path.resolve(__dirname, 'loader/loader', 'demo-loader')
        ]
      }]
  }
  // resolveLoader: {
  //   modules: [path.join(__dirname, "./src/loaders"), "node_modules"]
  // },
  // plugins: [
  //   new HtmlWebpackPlugin(),
  //   new HotModuleReplacementPlugin()
  // ]
};
