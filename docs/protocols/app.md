# 相关命令

```
add     Add a new app to your account
remove  Remove an app from your account
rm      Remove an app from your account
rename  Rename an existing app
list    Lists the apps associated with your account
ls      Lists the apps associated with your account
```

## add

添加 APP ：`code-push app add <appName> <os> <platform>`，例如：`code-push app add TestApp android react-native`

```
POST /apps/ HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Req Body:
{
	"name": "TestApp-android",
	"os": "Android",
	"platform": "React-Native",
	"manuallyProvisionDeployments": false
}

Res Body:
{
	"app": {
		"name": "TestApp-android",
		"collaborators": {
			"lisong2010@gmail.com": {
				"permission": "Owner"
			}
		}
	}
}
```

**注意：执行该命令还会访问 deployment API**

## remove / rm

删除APP：`code-push app rm <app name>` or `code-push app remove <app name>`，例如：`code-push app rm TestApp-android`

```
DELETE /apps/TestApp-android HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
[1, 1, 2]
```

## rename

修改App的名称：`app rename <current name> <new name>`

```
PATCH /apps/:appName HTTP/1.1
PATCH /apps/app1-android HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Req Body：
{
	"name": "app2-android"
}
```

## list / ls

查看App列表：`code-push app list` or `code-push app ls`

```
GET /apps HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body：
{
	"apps": [{
		"collaborators": {
			"lisong2010@gmail.com": {
				"permission": "Owner",
				"isCurrentAccount": true
			}
		},
		"deployments": ["Production", "Staging"],
		"name": "app1-android",
		"id": 4
	}]
}
```

## Other

```
GET /apps/app2-android/deployments/Staging HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"deployment": {
		"isFulfilled": false,
		"isRejected": false
	}
}
```
