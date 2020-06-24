class FilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FilePlugin',(compilcation, cb) => {
      // console.log(compilcation, "compilcation");
      setTimeout(() => {
        console.log('发射出来')
        cb()
      }, 1000)
    })
  }
}

module.exports = FilePlugin
