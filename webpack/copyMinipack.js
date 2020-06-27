const fs = require('fs');
const path = require('path');
const babylon = require('babylon'); // 解析js语法，生产AST 语法树
const traverse = require('babel-traverse').default; // babel-traverse是一个对ast进行遍历的工具, 对ast进行替换
const {transformFromAst} = require('babel-core'); // 将es6 es7 等高级的语法转化为es5的语法
let ID = 0;
function createAsset(filename) {
  const content = fs.readFileSync(filename, 'utf-8'); // filename 可以是相对路径或绝对路径
  const ast = babylon.parse(content, {
    sourceType: 'module',
  });
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({node}) => { // 查找import节点
        dependencies.push(node.source.value);
    },
  });
  const id = ID++;
  const {code} = transformFromAst(ast, null, {
    presets: ['env'],
  });
  return {
    id,
    filename,
    dependencies,
    code,
  };
}
function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}
function bundle(graph) {
  let modules = '';
  graph.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });
  const result = `
    (function(modules) {
      function require(id) { //🌟
        const [fn, mapping] = modules[id];
        function localRequire(name) { //⏰
          return require(mapping[name]); //🌟
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports); 
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;
  return result;
}
const graph = createGraph('../example/entry.js');
console.log(graph, 'graph');
const result = bundle(graph);
console.log(result, 'result');

fs.mkdir('dist', (err) => {
  if (!err) fs.writeFile('dist/main.js', result, (err1) => {
    if (!err1) console.log("打包成功");
  })
})
