# 相关命令

```
add     Create a new access key associated with your account
remove  Remove an existing access key
rm      Remove an existing access key
list    List the access keys associated with your account
ls      List the access keys associated with your account
```

## add

用于创建一个访问 KEY：`code-push access-key add <key name>`

```
POST /accessKeys/ HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Req Body:
{
	"createdBy": "Jay-PC",
	"friendlyName": "Key1",
	"ttl": 5184000000
}

Res Body:
{
	"accessKey": {
		"name": "c74X4qrPezLDqZDGEBI4USGwKg5xtD9LKKVna",
		"createdTime": 1523026380000,
		"createdBy": "Jay-PC",
		"expires": 1528210380000,
		"isSession": false,
		"description": "",
		"friendlyName": "Key1"
	}
}
```

**关键属性**

```
createdTime: response.body.accessKey.createdTime,
expires: response.body.accessKey.expires,
key: response.body.accessKey.name,
name: response.body.accessKey.friendlyName
```

## remove / rm

用于删除一个访问 KEY：`code-push access-key remove <key name>` or `code-push access-key rm <key name>`

```
DELETE /accessKeys/:key
DELETE /accessKeys/Key1 HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"friendlyName": "Key1"
}
```

## list / ls

查看访问 KEY 列表：`code-push access-key list` or `code-push access-key ls`

```
GET /accessKeys HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"accessKeys": [{
		"id": "1",
		"name": "(hidden)",
		"createdTime": 1521429435000,
		"createdBy": "Jay-PC",
		"expires": 1524021435000,
		"friendlyName": "Login-1521458235168",
		"isSession": true,
		"description": "Login-1521458235168"
	}]
}
```

**关键属性**

```
!serverAccessKey.isSession &&
accessKeys.push({
  createdTime: serverAccessKey.createdTime,
  expires: serverAccessKey.expires,
  name: serverAccessKey.friendlyName
});
```

只有 `isSession` 不为 true，才会在控制台显示
