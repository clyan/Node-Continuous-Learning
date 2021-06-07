const fs = require("fs");
const path = require("path");
console.log('=======================文件读取========================');

//同步读取，指定编码
try{
  const data = fs.readFileSync('../package.json', 'utf-8')
  console.log('同步读取', data)
} catch (e) {
  console.log(e)
}
//异步读取
fs.readFile('../package.json', 'utf-8',function (err, file) {
  if (err) {
    console.log(err)
  }
  console.log('异步读取', file)
})


// 文件流读取文件
const readStream = fs.createReadStream("../package.json",'utf-8');
readStream.on('data', function (chunk) {
  console.log("读取数据", chunk);
}).on('err', function (err) {
  console.log("出错", err)
}).on("end", function () {
  console.log("没有数据")
}).on("close", function () {
  console.log("关闭")
})

console.log('=======================文件写入========================');

//异步写入
fs.writeFile("../public/fs/writeFile.txt", 'helloWorld', 'utf-8', function (err) {
  if (err)
    throw  err;
  console.log("写入成功")
})


//同步写入
try {
  fs.writeFileSync("../public/fs/writeFileSync.txt", 'helloWorld', 'utf-8');
  console.log('文件同步写入成功');
} catch (e) {
   throw e;
}

console.log('=======================文件、文件夹的创建、判断========================');
//判断文件是否存在,第二个参数还可以判断文件的权限
fs.access("../package.json", fs.constants.F_OK, (err)=> {
  if (err)
    throw err;
  console.log("文件存在")
})

// 异步创建目录
fs.mkdir('./fs', function (err) {
  if (err) throw  err;
  console.log("异步创建文件夹成功")
})
// 同步创建目录
try {
  fs.mkdirSync('./fsSync')
} catch (e) {
  console.log("同步创建文件夹成功")
}

//删除文件夹
fs.rmdir("./fs", function (err) {
  if (err) throw err
  console.log("异步删除文件夹成功")
})
//删除文件夹
try {
  fs.rmdirSync("./fsSync")
} catch (e) {
  console.log("同步删除文件夹失败", e)
}

fs.unlink("../public/fs/writeFile.txt", function (err) {
  console.log("异步删除文件成功")
})

try {
  fs.unlinkSync("../public/fs/writeFileSync.txt")
  console.log("同步删除文件夹成功")
} catch (e) {
  console.log("同步删除文件夹失败", e)
}
const stats = fs.statSync('fs.js')
console.log( {
  ...stats
})

console.log('=======================文件夹遍历========================');
//异步遍历
function getFilesInDir (dir) {
  var results = [ ];
  return new Promise((resolve, reject) => {
    fs.readdir(dir, function (err, files) {
      if (err)
        reject(err);
      files.forEach((file, index) => {
        file = path.resolve(dir, file);
        var stats = fs.statSync(file);
        if (stats.isFile()) {
          results.push(file)
        } else if (stats.isDirectory()){
          results = results.concat( getFilesInDir(file) );
        }
      })
      resolve(results);
    })

  })
}
getFilesInDir ('./').then(res=> {
  console.log("遍历目录文件", res)
})


console.log('=======================文件重命名========================');
// 将newName与oldName来回变换
fs.rename("../public/oldName", "../public/newName",function (err) {
  if (err) {
    fs.rename("../public/newName", "../public/oldName",function (err) {
      if (err) {
        throw  err;
      }
    })
  }
})

console.log('=======================文件监听========================');
// fs.watch()比fs.watchFile()高效很多
// fs.watchFile()实现原理：轮询。每隔一段时间检查文件是否发生变化。所以在不同平台上表现基本是一致的。


var options = {
  persistent: true,
  recursive: true,
  encoding: 'utf8'
};

fs.watch('../', options, function(event, filename){
  console.log('触发事件:' + event);
  if(filename){
    console.log('文件名是: ' + filename);
  }else{
    console.log('文件名是没有提供');
  }
});



console.log('=======================文件修改权限========================');
fs.chmodSync('../public/fs/chmod/index.js', '555')
fs.writeFile('../public/fs/chmod/index.js', '不可写', function (err) {
  if (err) {
    console.error("修改权限后写入失败")
  }
  console.log("修改权限后写入成功")
})
