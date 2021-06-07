const PORT = 3003;
const HOST = '127.0.0.1';

const dgram = require('dgram');
const message = Buffer.from('My KungFu is Good!');

const client = dgram.createSocket('udp4');

client.send(message, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
  client.close();
});
