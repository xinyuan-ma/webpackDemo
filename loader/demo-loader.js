function loader (source) {
  console.log("加载loader");
  let css = JSON.stringify(source)
  css = css.replace(/img-pub01.visitshanghai.com.cn/g, 'img-pub01.visitshanghai.com.cn/app')
  return css
}

module.exports = loader
