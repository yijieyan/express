[1.用户注册](#id1)
[2.用户登陆](#id2)
[3.用户退出](#id3)
[4.上传文件](#id4)
[5.下载文件](#id5)
[6.生成验证码图片](#id6)

> 本项目的http请求除了 /public/*开头的路由不用加token，其他的请求全部需要加token,token 写在header中
### <span id="id1">1.用户注册 </span>
#### 1.1参数
|参数|value|类型|
|----|----|---|
|phone|手机号|String|
|email|邮箱|String|
|password|密码|String|
|gender|性别|Boolean|
|username|用户名|String|
> phone和email 2选1， password必填
```
url: 'http://localhost:3000/public/signUp',
method: 'post'
```

```
curl -X POST \
  http://localhost:3000/public/signUp \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: a7a43fd2-c9d5-df8e-780f-50b6aa5371ed' \
  -d 'phone=13023459870&email=123456%40qq.com&password=123456&gender=true&username=tom'
```
#### 1.2服务器返回
```
{
    "code": 0,
    "data": {
        "message": "signIn successful"
    }
}
```
### <span id="id2">2.用户登陆</span>
#### 2.1 参数
|参数|value|类型|
|----|----|---|
|phone|手机号|String|
|email|邮箱|String|
|password|密码|String|
> phone和email任何一个作为账号
```
url: 'http://localhost:3000/public/signIn',
method:'post'
```
```
curl -X POST \
  http://localhost:3000/public/signIn \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: bbdd4047-1f50-7939-4d5e-b117c3cf7b0a' \
  -d 'email=123456%40qq.com&password=123456'
```
#### 2.2服务器返回
```
{
    "code": 0,
    "data": {
        "token": "fccf728aa307b20fa185cba07885f17421d1f5fd38f242d63b972f47325e7457603a4e6bbcdec796"
    }
}
```
### <span id="id3">3.用户退出</span>
#### 3.1 参数
> 传token
```
url:'http://localhost:3000/user/signOut',
method: 'post'
```
```
curl -X POST \
  http://localhost:3000/user/signOut \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 50338df8-9f5c-5ca4-9e35-97907d6e0ecb' \
  -H 'token: fccf728aa307b20fa185cba07885f17421d1f5fd38f242d63b972f47325e7457603a4e6bbcdec796'
```
#### 3.2服务器返回
```
{
    "code": 0,
    "data": {
        "data": "signOut successful!"
    }
}
```
### <span id="id4">4.上传文件</span>
#### 4.1 参数
|参数|value|类型|
|----|----|---|
|photos|选中的文件|file|

```
url: 'http://localhost:3000/public/uploadFile',
method: 'post'
```
```
curl -X POST \
  http://localhost:3000/public/uploadFile \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 9af72841-e2f4-a955-6668-ffd294710871' \
  -F files=@2.jpg
```
#### 4.2  服务器返回
```
{
    "code": 0,
    "data": {
        "fileId": "59b8a4584099a82d7324cc0b"
    }
}
```
### <span id="id5">5.下载文件</span>
#### 5.1 参数
|参数|value|类型|
|----|----|---|
|fileId|文件id|String|
```
url:'http://localhost:3000/public/downloadFile',
method: 'get'
```
```
curl -X GET \
  'http://localhost:3000/public/downloadFile?fileId=59b89eeb560c5e2b3ca7dc98' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 89a688f8-e5ac-1550-3a31-96a2d0c80be5'
```
#### 5.2 服务器返回
> 文件
### <span id="id6">6.生成验证码图片</span>
> mac 和ubuntu下测试可以，在window 10上，没安装成功ccap，如果windows安装不成功，就找个linux服务器了，😆
#### 客户端
```
url: 'http://localhost:3000/public/getCcap',
method: 'get'
```
#### 服务器返回
一张包含验证码的图片