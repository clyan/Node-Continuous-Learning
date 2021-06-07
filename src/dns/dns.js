const dns = require('dns');

dns.lookup('more.yanwenyao.com', function (err, address, family) {
  if (err) throw err;
  console.log('例子A: ' + address);
})

/*查询一个域名对应多个ip*/
const options = {all: true};

dns.lookup('www.yanwenyao.com', options, function(err, address, family){
  if(err) throw err;
  console.dir('例子B: ' + JSON.stringify(address));
});
// 或者

dns.resolve4('id.qq.com', function(err, address){
  if(err) throw err;
  console.log('例子C: ' + JSON.stringify(address) );
});
/*
从上面的例子来看，两个方法都可以查询域名的ip列表。那么，它们的区别在什么地方呢？

可能最大的差异就在于，当配置了本地Host时，是否会对查询结果产生影响。

dns.lookup()：有影响。
dns.resolve4()：没有影响。
*/
