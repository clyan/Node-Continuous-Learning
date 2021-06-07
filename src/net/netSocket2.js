const net = require('net');
const socket = net.createConnection(3002, '127.0.0.1');

socket.on('connect', function () {
  console.log('客户端：已经与服务端建立连接');
})

socket.on('data', function (data) {
  console.log('客户端：收到服务端数据，内容为{'+ data +'}');
})

socket.on('close', function(data){
  console.log('客户端：连接断开');
});
socket.end('你好，我是客户端2');
console.log(socket.address(),"address");
console.log(socket.remoteAddress,"address")
