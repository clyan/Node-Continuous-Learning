通常在企业中面向公网使用的证书通常是由全球权威 CA 机构签发的证书，受各大浏览器厂商信任。
在开发测试时为了简单点我们可以自签名证书，但是这在浏览器中打开时会有安全问题提示。

1. 使用 openssl 的 genrsa 命令生成一个服务器私钥文件
```shell script
# genrsa 生成密钥
# -out 指定输出的文件
openssl genrsa -out server.key 2048
```
2. 生成证书请求文件
```shell script
# -new 执行生成新的证书请求
# -key 指定输入的密钥
openssl req -new -key server.key -out server.csr

# 会有以下交互提示，Common Name 这个可以自定域名，修改 hosts 文件域名映射即可。
Country Name (2 letter code) []:CN
State or Province Name (full name) []:ShangHai
Locality Name (eg, city) []:ShangHai
Organization Name (eg, company) []:Node.js
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:test.https.com
Email Address []:
```

3. 根据第 2 步的证书请求文件和第 1 步的服务器私钥文件生成证书
```shell script
# x509 根据现有的证书请求生成自签名根证书
# -days 设置证书的有效天数
# -in 指定输入证书请求文件
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
成功之后会生成如下 3 个文件：
key 是服务器上的私钥文件。
csr 是证书请求签名文件，用于提交给证书颁发机构 CA。
crt 是证书颁发机构 CA 签名后的证书。
