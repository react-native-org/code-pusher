# Protocol Analysis

以下内容为根据操作，抓取的 API 信息。

## 命令行类 API


### 3、collaborator

### 4、debug

### 6、link

### 9、patch

### 10、promote

### 11、register

### 12、release

### 13、release-cordova

### 15、rollback

## App 上访问的 API

### 检查更新 API

```
GET	http://localhost:3000/updateCheck?deploymentKey=oWm8OifeO44qSgQ0WCHJyFBA3RzrtD9LKKVna&appVersion=1.0&packageHash=fac0de18049933f5393ae1c69d37f5364d3b81c91afe485eba0c0ad933c70f5f&isCompanion=&label=v4&clientUniqueId=c4a7b888307ded97
```

**QueryString**

```
deploymentKey	oWm8OifeO44qSgQ0WCHJyFBA3RzrtD9LKKVna
appVersion	1.0
packageHash	fac0de18049933f5393ae1c69d37f5364d3b81c91afe485eba0c0ad933c70f5f
isCompanion
label	v4
clientUniqueId	c4a7b888307ded97
```

**Response**

```json
{
  "updateInfo": {
    "downloadURL": "",
    "downloadUrl": "",
    "description": "",
    "isAvailable": false,
    "isMandatory": false,
    "appVersion": "1.0",
    "packageHash": "",
    "label": "",
    "packageSize": 0,
    "updateAppVersion": false,
    "shouldRunBinaryVersion": false
  }
}
```
