const fs = require('fs')
const path = require('path')
const readline = require('readline');

function get(key){
    fs.readFile(path.resolve(__dirname,'db.json'),(err,data)=>{
        if(err)
            console.log(err)
        const json =JSON.parse(data)
        console.log(json[key])
    })
}
function set(key,value){
    fs.readFile(path.resolve(__dirname,'db.json'),(err,data)=>{
        if(err)
            console.log("文件不存在")
        const json = data ? JSON.parse(data) : {}
        json[key] = value

        fs.writeFile(path.resolve(__dirname,'db.json'),JSON.stringify(json),(err)=>{
            if(err)
                console.log(err)
            console.log('写入成功')
        })

    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', (input) => {
    const [op,key,value] =input.split(" ")
    if(op == 'get'){
        get(key)
    }else if(op == 'set'){
        set(key,value)

    }else if(op == 'quit'){
        rl.close()
    }else {
        console.log('没有该操作')
    }
});

rl.on('close',()=>{
    console.log("程序结束")
    process.exit(0)
})

function readLine () {
    return new Promise(resolve => {
        rl.on('line',(str => {
            resolve(str);
        }))
    })
}
function close () {
    rl.close();
}
