const http  = require('http')
process.title = "主进程";
let port = Math.round((1 + Math.random()) * 1000);
const app = http.createServer(function (req,resp) {
    resp.writeHead(200, {"Content_Type": "text/plain"});
    resp.end("helloWorld")
}).listen(port, '127.0.0.1',function () {
    console.log("port", port);
})
