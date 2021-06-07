const http = require("http");
var querystring = require('querystring');
let options = {
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: '3000',
  path: '/a?id=1&name="GET"',
  method: 'GET'
};
let clientGet = http.request(options,(res)=> {
  var data = '';
  res.on('data', function(chunk){
    data += chunk;
  });
  res.on('end', function(){
    console.log("get res",data);
  });
})

clientGet.end();
clientGet.on('upgrade', (res, socket, upgradeHead) => {
  console.log('got upgraded!');
  socket.end();
  process.exit(0);
});


options = {
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: '3000',
  path: '/a',
  method: 'POST'
};
const clientPost = http.request(options, (res)=> {
  let data = '';
  res.on('data', function(chunk){
    data += chunk;
  });
  res.on('end', function(){
    console.log("post res",data);
  });

})
setTimeout(function(){
  clientPost.abort();  // 故意延迟100ms，确保请求发出
}, 100);
clientPost.write(querystring.stringify({id:3, name:'POST'}))
clientPost.end();

console.log("==============================================================");

options = {
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: '3000',
  path: '/a',
  method: 'Head'
};

const clientHead = http.request(options, (res)=> {
  let data = '';

  res.on('data', function(chunk){
    data += chunk;
  });

  res.on('end', function(){
    console.log("head res",data);
  });

})
clientHead.end();
