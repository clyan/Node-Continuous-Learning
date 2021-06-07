const http = require('http');
const url = require('url');

let port = 3000;
const server = http.createServer(function (req, resp) {

}).listen(port, function () {
  console.log(`http://127.0.0.1:${port}`)
})

function f(req, resp) {
  resp.writeHead(200, {'Content-Type': 'text/plain'});
  let writeHead = resp.writeHead;
  resp.writeHead = function () {
    let cookies = res.getHeader('Set-Cookie');
    let session = serialize(key,req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
  }
  resp.end()
}
const METHOD = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT'
}

//请求方法
function requestMethod (req, resp) {
  switch (req.method) {
    case METHOD.POST:
      update(req, resp);
      break;
    case METHOD.DELETE:
      remove(req, resp);
      break;
    case METHOD.PUT:
      create(req, resp);
    case METHOD.GET:
    default:
      update(req, resp);

  }
}
//静态文件服务器

function staticFile (req, resp) {
  const pathname = url.parse(req.url).pathname;
  fs.readFile(path.join(ROOT, pathname), function (err, file) {
    if (err) {
      resp.writeHead(404);
      res.end('找不到相关文件');
      return ;
    }
    resp.writeHead(200);
    res.end(file);
  })
}

//根据路径来选择控制器
/**
 * @description /controller/action/a/b/c
 * @param req
 * @param resp
 */
function selectController (req, resp) {
  let pathname = url.parse(req.url).pathname;
  let paths = pathname.split('/');
  let controller = paths[1] || 'index';
  let action = paths[2] || 'index';
  let args = paths.slice(3);
  if (handles[controller] && handles[controller][action]) {
    handles[controller][action].apply(null, [req, resp].concat(args));
  } else {
    resp.writeHead(500);
    res.end('找不到响应服务器');
  }
}
//查询字符串
function queryStr (req, resp) {
  req.query = url.parse(req.url, true).query;
}

/**
 *
 * @param cookie
 */
function parseCookie (cookie) {
  let cookies = {};
  if (! cookie)
    return cookies;
  let list = cookie.split('; ');
  for (let i = 0; i < list.length; i++) {
    let pair =list[i].split('=');
    cookies[pair[0].trim()] = pair[1];
  }
  return cookies;
}
function queryCookie (req, resp) {
  req.cookies = parseCookie(req.header.cookie);
}

function serialize (name, val, opt) {
  let pairs = [name + '=' + encode(val)];
  opt = opt || {};
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if (opt.domain) pairs.push('Domain=' + opt.domain);
  if (opt.path) pairs.push('Path=' + opt.path);
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');
  return pairs.join('; ');
}

let sessions = {};
let key = 'session_id';
let EXPIRES = 20 * 60 * 1000;
let generate = function () {
  let session = {};
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expire: (new Date()).getTime() + EXPIRES
  };
  sessions[session.id] = session;
  return session;
}
function checkCookie (req, resp) {
  let id = req.cookies[key];
  if (! id) req.session = generate();
  else {
    let session = sessions[id];
    if (session) {
      if (session.cookie.expire > (new Date()).getTime()) {
        session.cookie.expire = (new Date()).getTime() + EXPIRES;
        req.session = session;
      } else {
        delete session[id];
        req.session = generate();
      }
    } else {
      req.session = generate();
    }
  }
}

