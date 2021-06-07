const os= require('os')
const cpuStat = require('cpu-stat')

module.exports.getState = function(){
    /*以整数的形式返回空闲的系统内存量（以字节为单位）。*/
    const freemem = os.freemem()
    console.dir(`内存占用量${freemem}`)

    /*以整数的形式返回系统的内存总量（以字节为单位）。*/
    const totalmem = os.totalmem()
    console.dir(`内存总量${totalmem}`)

    const mem = os.freemem() / os.totalmem() * 100
    console.dir(`内存占用率${mem}%`)

    const arch = os.arch()
    console.dir(`操作系统:${arch}`)
    /*每个逻辑 CPU 内核的信息*/
    const cpus = os.cpus()
    console.dir(cpus)

    /*返回标识操作系统平台的字符串*/
    const platform =os.platform()
    console.dir(`platform:${platform}`)

    const release =os.release()
    console.dir(`release:${release}`)

    /*该字符串标识为其编译 Node.js 二进制文件的 CPU 的字节序*/
    const endianness = os.endianness()
    console.dir(`endianness:${endianness}`)

    /*以字符串的形式返回操作系统的默认临时文件目录。*/
    const tmpdir = os.tmpdir()
    console.dir(`默认临时文件目录${tmpdir}`)
    /*返回系统的正常运行时间（以秒为单位）*/
    const uptime =  os.uptime()
    console.dir(`系统的正常运行时间:${uptime}`)
    cpuStat.usagePercent((err,percent)=>{
        console.dir(`cpu占用${percent}%`)
    })

}
