const https = require('https');

var options = {
  protocol: 'https:',
  hostname: 'httpstest.com',
  port: '3000',
  path: '/',
  method: 'GET',
  rejectUnauthorized: false  // 忽略安全警告，不加会被error监听
};
https.request('https://httpstest.com:3000', options, (res)=> {
  res.pipe(process.stdout);
}).on('error', (err) =>{
  console.log("验证失败", err) // 验证失败 Error: self signed certificate
}).end()
