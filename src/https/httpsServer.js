const https = require('https');
const  fs = require('fs');


const options = {
  key: fs.readFileSync('./cert/server.key'),
  cert:  fs.readFileSync('./cert/server.crt'),
}
const server = https.createServer(options, function(req, res){
  res.writeHead(200,'ok')
  res.end('这是来自HTTPS服务器的返回');
});

// 修改本地host 127.0.0.1       httpstest.com
server.listen(3001, ()=> {
  console.log("https://httpstest.com:3001")
});
