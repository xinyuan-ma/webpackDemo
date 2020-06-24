let path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自定义plugin
const DonePlugin = require('./plugins/DonePlugin')
const FilePlugin = require('./plugins/FilePlugin')
const FileListPlugin = require('./plugins/FileListPlugin')
module.exports = {
  mode: 'development',
  entry: "./example/entry.js",
  output: {
    path: path.join(__dirname, "dist1"),
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


  plugins: [
    new HtmlWebpackPlugin(),
    new DonePlugin(),
    new FilePlugin(),
    new FileListPlugin()
  ]
};
