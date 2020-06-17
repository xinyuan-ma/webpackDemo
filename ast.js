/* eslint-disable */

const express = require("express")
const app = express()
const fs = require("fs")
const babylon = require("babylon")
const code = "const a = 1"
const ast = babylon.parse(code)
var readline = require('readline'); // 逐行读取文件，保证读取的内容原样输出


app.get("/ast", function(req, res) {
  res.send(ast)
})
app.get("/readFileSync", function(req, res) {
  let content = fs.readFileSync('example/entry.js', 'utf-8');
  res.send(content)
})

// 逐行读取文件
app.get('/readline', function (req,res) {
  var fRead = fs.createReadStream('package.json');
  var objReadline = readline.createInterface({
    input:fRead
  });
  var arr = new Array();
  objReadline.on('line',function (line) {
    arr.push(`<br>${line}`);
  });
  objReadline.on('close',function () {
    res.send(arr.toString().replace(/,,/g, ',').replace(/{,/g, '{').replace(/},/g, '}'))
  });
})

app.listen(8088)
