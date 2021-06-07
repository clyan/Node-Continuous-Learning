const path = require("path");
const filePath = "E:\\learnMaterials\\Node系统性学习\\package.json";

const dirname = path.dirname(filePath);
console.log('dirname: ', dirname);  //  E:\learnMaterials\Node系统性学习

//basename只是输出路径的最后一部分，并不会判断是否文件名

const basename = path.basename(filePath);
console.log('basename: ', basename); // package.json

const basenameExt = path.basename(filePath, ".json");
console.log('basenameExt: ', basenameExt);    // package


//原理，从最后一个 . 开始截取，如果 没有 . 获取 . 位于第一位返回 ''
const extname = path.extname(filePath);
console.log('extname: ', extname); // .json

const NotHasPointExtname = path.extname('index');
console.log('NotHasPointExtname: ', NotHasPointExtname); // ''

const FirstHasPointExtname = path.extname('.index');
console.log('FirstHasPointExtname: ', FirstHasPointExtname); // ''

const LastHasPointExtname = path.extname('index.');
console.log('LastHasPointExtname: ', LastHasPointExtname); // .

const TwoPointExtname = path.extname('index.ts.js');
console.log('TwoPointExtname: ', TwoPointExtname);  // .js


/* =======================路径组合======================== */
console.log('=======================路径组合========================');

//join将路径拼接，并标准化
const joinPath = path.join('/foo','bar','.','/','cccc','aa.txt')
console.log(joinPath) //   \foo\bar\cccc\aa.txt

// resolve()默认获取当前文件所在的绝对路径，当前文件位于 E:\learnMaterials\Node系统性学习\src
console.log( path.resolve('')); // E:\learnMaterials\Node系统性学习\src

//后面接的参数都是根据前一个参数的路径进行拼接，
console.log(path.resolve('', '/a', './b'))    // E:\a\b
// 如果以  / 开头，会忽略前面的路径，以第一个为基准
console.log(path.resolve('', '/a', '/b'))    // E:\b
// 如果含有其他盘符

console.log(path.resolve('', '/a', 'D:\\')) // D:\

// 将路劲解析为对象 root dir base ext name
/*
* {
root: 'E:\\',
  dir: 'E:\\learnMaterials\\Node系统性学习',
  base: 'package.json',
  ext: '.json',
  name: 'package'
}
* */
console.log(path.parse(filePath));


/* path.parse() 的反操作，  */
console.log(path.format({
    root: 'E:\\',
    dir: 'E:\\learnMaterials\\Node系统性学习',
    base: 'package.json',
    ext: '.json',
    name: 'package'
}))


// 获取后面一个路径相对于前一个路径的 路径
// 如果from、to中任一者为空，那么，返回当前工作路径。
// 如果from、to指向同个路径，那么，返回空字符串。
var p1 = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
console.log(p1)


console.log('=======================平台相关========================');

console.log(process.env)

console.log(process.env.PATH.split(path.delimiter))

