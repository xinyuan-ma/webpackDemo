let path = require("path");
module.exports = {
  mode: 'development',
  entry: "./loader/index.js",
  output: {
    path: path.join(__dirname, "distLoader"),
    filename: "bundle.js"
  },
  /**
   * loader默认会在node_modules查找，也可以指定其他的目录，来查找我们自定义的loader
   * */
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loader', 'loader')]
  },
  module: {
    rules: [
      {
        test: /\.demo$/,
        use: [  'style-loader', 'demo-loader']
      }]
  },

  /**
   * loader使用绝对路径的方式引入
   * */
  // module: {
  //   rules: [
  //     {
  //       test: /\.demo$/,
  //       use: [
  //         path.resolve(__dirname, 'loader/loader', 'style-loader'),
  //         path.resolve(__dirname, 'loader/loader', 'demo-loader')
  //       ]
  //     }]
  // }



  // resolveLoader: {
  //   modules: [path.join(__dirname, "./src/loaders"), "node_modules"]
  // },
  // plugins: [
  //   new HtmlWebpackPlugin(),
  //   new HotModuleReplacementPlugin()
  // ]
};
