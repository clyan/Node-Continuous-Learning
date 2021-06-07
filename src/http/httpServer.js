const http = require("http");
var url = require('url');
const queryString = require("querystring");
const dealWithPost =  (req, resp)  => {
  let body = '';
  req.on('data', (thunk) => {
    body += thunk;
  })
  req.on('end', () => {
    console.log( 'post body is: ' + body );
  })
}

//处理get请求及参数
const dealWithGet =  (req, resp)  => {
  const urlObj = url.parse(req.url);
  const query = urlObj.query;
  const queryObj = queryString.parse(query);
}
//处理Head请求及参数
const dealWithHead =  (req, resp)  => {

  console.log("Head params is");
}

const addEvent = (req, resp) => {
  resp.on('finish', ()=> {
    console.log("finish")
  })

  resp.on('close', ()=> {
    console.log("响应关闭了")
  })

  req.on('aborted', function(){
    console.log('2、客户端请求aborted');
  });
}
const app = http.createServer(function (req, resp) {
  console.log("客户端请求地址：", req.url);
  console.log("http版本：", req.httpVersion);
  console.log("http请求方法：", req.method);
  if (req.method == "POST") {
    dealWithPost(req, resp);
    resp.writeHead(200, 'ok', {
      'x-head': req.url,
      'Content-Type': 'text/html'
    })
    //等效于
    // resp.statusCode = 200;
    // resp.statusMessage = 'ok'
    // resp.setHeader('x-head', req.url)
    /*注意 writeHead设置的header会覆盖 resp.setHeader 的设置，resp.setHeader不能出现在writeHead后面 */
    // resp.end(req.url);
    //等效于
  
    resp.write('hello')
    resp.write('world')
    resp.end();
  }else if (req.method == "GET") {
    dealWithGet(req, resp);
    resp.writeHead(200, 'ok', {
      'x-head': req.url,
      'Content-Type': 'text/plain',
      'Set-Cookie':'age=123,ll=456;Max-Age=10;HttpOnly'
    })

   resp.end("hhh");
  }else if (req.method == "HEAD") {
    dealWithHead(req, resp);
    resp.writeHead(200, 'ok', {
      'x-head': req.url,
      'Content-Type': 'text/html'
    })
    //等效于
    // resp.statusCode = 200;
    // resp.statusMessage = 'ok'
    // resp.setHeader('x-head', req.url)
    /*注意 writeHead设置的header会覆盖 resp.setHeader 的设置，resp.setHeader不能出现在writeHead后面 */
    // resp.end(req.url);
    //等效于
  
    resp.write('hello')
    resp.write('world')
    resp.end();
  }


  //添加事件
  addEvent(req, resp);
})

app.on('upgrade', (req, socket, head)=> {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
    'Upgrade: WebSocket\r\n' +
    'Connection: Upgrade\r\n' +
    '\r\n');
  socket.pipe(socket);
})

app.listen(3000, ()=> {
  console.log(`访问：http://localhost:3000`)
});
