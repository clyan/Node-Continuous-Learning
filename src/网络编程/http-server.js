const http = require('http')
const fs =require('fs')
const server = http.createServer((req,resp)=>{
    const {url,method,headers} =req

    if(url === '/' && method === 'GET'){
        fs.readFile('index.html',(err,data)=>{
            if(err){
                resp.writeHead(500,{'Content-Type':'text/plain;charset=utf8'})
                resp.end('server error 服务器错误！')
            }
            resp.writeHead(200,{'Content-Type':'text/html'})
            resp.end(data)
        })
        console.log('aa')
    }else if(url === '/users'&& method === 'GET'){
        resp.writeHead(200,{'Content-Type':'application/json'})
        resp.end(JSON.stringify({name:'xia'}))
    }
   /* console.log('request',url,method)*/

})
server.listen(3001)
