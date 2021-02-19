function loader (source) {
  console.log("demo-loader");
  let css = JSON.stringify(source)
  css = css.replace(/img-pub01.visitshanghai.com.cn/g, 'img-pub01.visitshanghai.com.cn/app')
  return css
}

module.exports = loader

// loader上的pitch方法，非必须
module.exports.pitch =  function() {
  console.log('demo-pitch');
  // todo
}
