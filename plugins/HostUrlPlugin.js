// 独立模块，对外导出一个类
class HostUrlPlugin {
  constructor (options) {
    // 在构造函数中获取用户为该插件传入的配置
    this.options = options;
  }
  // 定义apply函数，并注入compiler对象, webpack 钩子 https://www.webpackjs.com/api/compiler-hooks/
  apply (compiler) {
    // 挂载webpack 钩子，这里调用emit事件
    compiler.hooks.emit.tapAsync("HostUrlPlugin", (compilation, callback) => {
      // process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数，
      let env = process.argv[2];
      let reg = /http:\/\/gate.visitshanghai.net\/|https:\/\/gate.visitshanghai.com.cn\//g
      // compilation.fileDependencies 获取所有依赖的资源列表
      console.log(compilation.outputOptions, 'compilation.outputOptions');
      // console.log(compilation.fileDependencies, "compilationParams");
      // compilation.assets 获取打包后的文件列表
      Object.keys(compilation.assets).forEach(data=> {
        let content = compilation.assets[data].source(); // 要处理的代码
        switch (env) {
          case '-prd':
            content = content.replace(reg, 'https://gate.visitshanghai.com.cn/');
            break;
          case '-pre':
            content = content.replace(reg, 'https://gate.visitshanghai.net/');
            break;
            console.log(content, "compilation.assets");
        }
        compilation.assets[data] = { // 修改打包文件的内容
          source(){
            return content
          },
          size(){
            return content.length
          }
        }
      });
      callback();
    });

    compiler.hooks.done.tap("HostUrlPlugin", (compilation) => {  // 同步钩子
      console.log("打包完成");
      // 自定义操作……
    });

  }
}
module.exports = HostUrlPlugin;
