function loader (source) {
  let style = `let style = document.createElement('style')
  style.innerHTML = ${source}
  document.head.appendChild(style)`
  return style
}

module.exports = loader
