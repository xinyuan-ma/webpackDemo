class HostUrlPlugin {
  constructor (options) {
    this.options = options;
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync("HostUrlPlugin", (compilation, callback) => {
      let env = process.argv[2];
      let reg = /http:\/\/gate.visitshanghai.net\/|https:\/\/gate.visitshanghai.com.cn\//g
      console.log(env, "process.argv");

      // compilation.fileDependencies 获取所有依赖的资源列表
      // console.log(compilation.fileDependencies, "compilationParams");

      // compilation.assets 获取打包后的文件列表
      Object.keys(compilation.assets).forEach((data) => {
        let content = compilation.assets[data].source(); // 欲处理的文本
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
  }
}
module.exports = HostUrlPlugin;
