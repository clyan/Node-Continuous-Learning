const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const port = 3004;

server.on('message', function(message, rinfo){
  console.log('server got message from: ' + rinfo.address + ':' + rinfo.port);
});

server.bind(port);
