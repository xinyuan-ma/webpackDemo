function loader (source) {
  console.log("style-loader");
  let style = `
    let style = document.createElement('style');
    style.setAttribute("type", "text/css"); 
    style.innerHTML = ${source};
    document.head.appendChild(style)`
  return style
}

module.exports = loader
module.exports.pitch = function() {
  console.log("style-pitch");
}
