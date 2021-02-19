let path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 自定义plugin
const HostUrlPlugin = require('./plugins/HostUrlPlugin')
// const FilePlugin = require('./plugins/FilePlugin')
// const FileListPlugin = require('./plugins/FileListPlugin')
module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].[hash:8].js'
    // publicPath: "https://img-pub01.visitshanghai.com.cn" // 文件前面加上域名
  },
  /**
   * loader默认会在node_modules查找，也可以添加指定的目录，来查找我们自定义的loader
   * */
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loader')]
  },
  module: {
    rules: [
      {
        test: /\.demo$/,
        use: [  'style-loader', 'demo-loader', 'async-loader']
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
    // new DonePlugin(),
    new HostUrlPlugin,
    // new FilePlugin(),
    // new FileListPlugin()
    new HtmlWebpackPlugin()
  ]
};
