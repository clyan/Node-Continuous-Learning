const fs = require("fs");
// 普通日志打印。
console.log('log: hello');
// 错误日志打印。
console.error('error: hello', 'chyingp');

console.info('info: hello', 'chyingp') // 等同于console.log(msg)

console.warn('warn: hello', 'chyingp') //等同于console.error(msg)


console.log('=======================自定义实例========================');
//将信息保存到本地文件中
const write =  fs.createWriteStream('../public/log/logger.txt')
const logger = new console.Console(write, write);
logger.log("hello")
logger.log("world")

//
console.dir({ a:{b:"深层打印"}})


// 代码运行时间,判断setTimeout并不是严格的定时，setTimeout第三个参数是传给回调的第一个参数
console.time('time')
setTimeout(console.timeEnd,1000, 'time')


//断言 通过 console.assert(value, message) 进行断言。如果value不为true，那么抛出AssertionError异常，并中断程序执行。
try{
  console.assert(1 == 1, 'error occurred');
}catch(e){
  console.log(e.message);
}



console.trace("错误输出流")
