class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin',(stats) => {
      console.log("完成");
    })
  }
}

module.exports = DonePlugin
