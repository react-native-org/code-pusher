# 相关命令

```
add      Add a new deployment to an app
clear    Clear the release history associated with a deployment
remove   Remove a deployment from an app
rm       Remove a deployment from an app
rename   Rename an existing deployment
list     List the deployments associated with an app
ls       List the deployments associated with an app
history  Display the release history for a deployment
h        Display the release history for a deployment
```

## add

为 App 新增一个发布:`code-push deployment add <app name> <deployment name>`，例如：`code-push deployment add app2-android NewDeployment`

```
POST /apps/:appName/deployments/ HTTP/1.1
POST /apps/app2-android/deployments/ HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Req Body:
{
	"name": "NewDeployment2"
}

Res Body:
{
	"deployment": {
		"name": "NewDeployment2",
		"key": "lawK1NIM3LXJcIt287teWNlRQHqb4ksvOXqog"
	}
}
```

## clear

清空特定的发布：`deployment clear MyApp MyDeployment`

```
DELETE /apps/app2-android/deployments/OldTest/history HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
ok
```

## remove / rm

为 App 移除一个发布：`code-push deployment rm <app name> <deployment name>`，例如：`code-push deployment rm app2-android NewDeployment2`

```
DELETE /apps/app2-android/deployments/NewDeployment2 HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"deployment": {
		"name": "NewDeployment2"
	}
}
```

## rename

修改发布的名称：`code-push deployment rename <appName> <currentDeploymentName> <newDeploymentName>`

```
PATCH /apps/:appName/deployments/:deploymentName HTTP/1.1
PATCH /apps/app2-android/deployments/NewDeployment HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Req Body:
{
	"name": "OldTest"
}

Res Body:
{
	"deployment": {
		"name": "OldTest"
	}
}
```

## list / ls

查看指定 App 的部署记录：`code-push deployment list <app name>`，例如：`code-push deployment list app2-android`

```
GET /apps/:appName/deployments/ HTTP/1.1
GET /apps/TestApp-android/deployments/ HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna

Res Body:
{
	"deployments": [{
		"createdTime": 1522999363000,
		"id": "5",
		"key": "0BB43ad7GI94ls0G8UQ3bSqCIM224ksvOXqog",
		"name": "Production",
		"package": null
	}, {
		"createdTime": 1522999363000,
		"id": "6",
		"key": "ZDWSV3YMHcxTV1yUT8auu9yywwyL4ksvOXqog",
		"name": "Staging",
		"package": null
	}]
}
```

## history / h

查看某个发布的版本记录：`code-push deployment h MyApp MyDeployment`

```
GET /apps/app2-android/deployments/OldTest/history HTTP/1.1

GET /apps/app2-android/deployments/OldTest/metrics HTTP/1.1

Req Header:
Authorization	Bearer paIYnxPoGUC4qBQToBmqHea8dXTJtD9LKKVna
```
