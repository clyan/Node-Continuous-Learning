const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

/*参照fs模块的案例*/
/*Readable Stream*/
/*Writable Stream*/

/*
* 最常见的Duplex stream应该就是net.Socket实例了、
* */



/*
Transform stream是Duplex stream的特例，也就是说，
Transform stream也同时可读可写。
跟Duplex stream的区别点在于，Transform stream的输出与输入是存在相关性的。
常见的Transform stream包括zlib、crypto，这里举个简单例子：文件的gzip压缩。
*/

const gzip = zlib.createGzip();

const inFile = fs.createReadStream(path.resolve(__dirname,"../../public/stream/zip.js") );
const out = fs.createWriteStream(path.resolve(__dirname,"../../public/stream/zip.js.gz"));

inFile.pipe(gzip).pipe(out).addListener('close', function () {
  console.log("压缩完成")
});
