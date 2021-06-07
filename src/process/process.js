// 环境变量：process.env
// 获取系统环境的环境变量
console.log(process.env)


// 执行 node process.js production
console.log('==========================argv===========================')
console.log(process.argv);
/*
*[
  'C:\\Program Files\\nodejs\\node.exe',
  'E:\\learnMaterials\\Node系统性学习\\src\\process\\process.js',
  'production'
]
* */




console.log('==========================cwd()返回当前工作路径===========================')
console.log('Starting directory: ' + process.cwd());  // Starting directory: E:\learnMaterials\Node系统性学习\src\process

console.log('==========================chdir()切换当前工作路径===========================')
try {
  process.chdir('/');
  console.log('New directory: ' + process.cwd()); //  New directory: E:\
}
catch (err) {
  console.log('chdir: ' + err);
}

console.log('==========================process.pid返回进程id===========================')

console.log('process.pid: ' + process.pid);



console.log('==========================process.title可以用它来修改进程的名字===========================')
process.title = "process"
console.log('process.title: ' + process.title);


console.log('==========================当前node进程已经运行了多长时间（单位是秒）===========================')
console.log('process.uptime(): ' + process.uptime());


console.log('==========================返回进程占用的内存，单位为字节===========================')
console.log('process.memoryUsage(): ' + JSON.stringify(process.memoryUsage(), null, 4));
/*
* process.memoryUsage(): {
    "rss": 19697664,          // 是驻留集大小, 是给这个进程分配了多少物理内存（占总分配内存的一部分），包含所有的 C++ 和 JavaScript 对象与代码
    "heapTotal": 4730880,     //  代表 V8 的内存使用情况
    "heapUsed": 3013984,      //  代表 V8 的内存使用情况
    "external": 996723,       //  代表 V8 管理的，绑定到 Javascript 的 C++ 对象的内存使用情况
    "arrayBuffers": 9386      // 指分配给 ArrayBuffer 和 SharedArrayBuffer 的内存，包括所有的 Node.js Buffer
}
*
* */

console.log('==========================process.arch返回当前系统的处理器架构（字符串）===========================')
console.log('process.arch: ' + process.arch);


console.log('==========================process.platform：返回关于平台描述的字符串，比如 darwin、win32 等。===========================')
console.log('process.platform: ' + process.platform);



console.log('==========================process.version：返回当前node的版本===========================')
console.log('process.version: ' + process.version);

console.log('==========================process.versions：返回node的版本，以及依赖库的版本===========================')
console.log('process.versions: ' + JSON.stringify( process.versions, null, 4));



console.log('==========================nextTick===========================')
//将任务放置下一个事件队列
console.log('海贼王');
process.nextTick(function(){
  console.log('火影忍者');
});
console.log('死神');
/*
* 海贼王
  死神
  火影忍者
* */
