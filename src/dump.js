const heapdump = require('heapdump');
const v8 = require('v8');
const http = require('http');
let leakArray = [];
let leak = function () {
  leakArray.push("aaa");
}
http.createServer(function (req,res) {
  leak();
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end('hello')
}).listen(3000)
heapdump.writeSnapshot('./'+ Date.now() + '.heapsnapshot',function (result) {
  console.log(result)
})

const stream = v8.getHeapSnapshot();
stream.pipe(process.stdout);
