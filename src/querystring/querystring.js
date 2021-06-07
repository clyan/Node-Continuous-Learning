const querystring = require('querystring');
// 参数：querystring.parse(str[, sep[, eq[, options]]])
const str = 'nick=casper&age=24';
const obj = querystring.parse(str);
console.log(JSON.stringify(obj, null, 4));


console.log('=====================sep 与 eq ============================');
const str1 = 'nick=casper&age=24&extra=name-chyingp|country-cn';
const obj1 = querystring.parse(str1);

console.log(obj1);
/* [Object: null prototype] {
nick: 'casper',
  age: '24',
  extra: 'name-chyingp|country-cn'
}*/


const obj2 = querystring.parse(obj1.extra , '|', '-');
console.log(JSON.stringify(obj2, null, 4));



console.log('=====================参数拼接 ============================');

const obj3 = {
  "name": "chyingp",
  "country": "cn"
};
const str2 = querystring.stringify(obj3, '|', '-');
console.log(str2);

var str3 = querystring.stringify(obj3);
console.log(str3);
