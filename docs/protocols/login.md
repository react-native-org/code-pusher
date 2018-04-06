# 相关命令

```
login                                   Logs in to the Mobile Center server
login --accessKey mykey                 Logs in on behalf of the user who owns and created the access key "mykey"
login --proxy http://someproxy.com:455  Logs in with the specified proxy url
```

## login

登录 Server ：`code-push login`

```
GET /authenticated HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"authenticated": true
}
```
