const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname, "../../public/readLineFile/logger.log"))
})
rl.on('line', function (line) {
  const arr = line.split(' ');
  console.log('访问时间：%s %s，访问地址：%s', arr[0], arr[1], arr[13]);
})
