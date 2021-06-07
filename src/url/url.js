/*nodejs中，提供了url这个非常实用的模块，用来做URL的解析。
在做node服务端的开发时会经常用到。使用很简单，总共只有3个方法。*/

//.parse(urlString)：将url字符串，解析成object，便于开发者进行操作。
// .format(urlObj)：.parse() 方法的反向操作。
// .resove(from, to)：以from作为起始地址，解析出完整的目标地址（还是看直接看例子好些）


const url = require('url');
const str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

const obj = url.parse(str);
console.log(obj);

console.log('=====================query为对象============================');
const obj1 = url.parse(str, true);
console.log(obj1);


/*
* protocol：协议，需要注意的是包含了:，并且是小写的。
  slashes：如果:后面跟了两个//，那么为true。
  auth：认证信息，如果有密码，为usrname:passwd，如果没有，则为usrname。注意，这里区分大小写。
  host：主机名。注意包含了端口，比如ke.qq.com:8080，并且是小写的。
  hostname：主机名，不包含端口，并且是小写的。
  hash：哈希部分，注意包含了#。
  search：查询字符串，注意，包含了?，此外，值是没有经过decode的。
  query：字符串 或者 对象。如果是字符串，则是search去掉?，其余一样；如果是对象，那么是decode过的。
  path：路径部分，包含search部分。
  pathname：路径部分，不包含search部分。
  href：原始的地址。不过需要注意的是，protocol、host会被转成小写字母。
* */


console.log('=====================resolve为对象============================');
console.log(url.resolve('/one/two/three', 'four'))     // '/one/two/four'
console.log(url.resolve('http://example.com/', '/one'))    // 'http://example.com/one'
console.log(url.resolve('http://example.com/one', '/two')) // 'http://example.com/two'
