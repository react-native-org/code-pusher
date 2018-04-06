# Functions & DB

## 用户信息存储

第一阶段，仅需要完成简单的用户管理即可，需要存储一些用户的基本信息。表名为：`user`

| 字段       | 类型         | 描述                         |
| ---------- | ------------ | ---------------------------- |
| id         | int          | 用户 ID，自增主键            |
| username   | varchar(50)  | 用户名，必填                 |
| password   | varchar(200) | 加密后的密码                 |
| secretCode | varchar(50)  | 针对用户生成的用于加密的代码 |
| email      | varchar(50)  | 用户邮箱                     |
| phone      | varchar(50)  | 用户密码                     |
| createDate | long         | 创建时间                     |
| updateDate | long         | 最后更新时间                 |

## 认证用户的 token 表

在 `code-push-cli` 中，需要认证用户的身份，此时提供账户和密码并不可取，更好的是采用 token 进行认证。所以需要一个 token 表，表名为：`user_token`

| 字段        | 类型         | 描述                                                      |
| ----------- | ------------ | --------------------------------------------------------- |
| id          | int          | Token ID，自增主键                                        |
| userId      | int          | 关联的用户 ID                                             |
| tokenName   | varchar(50)  | Token 名称                                                |
| description | varchar(500) | 描述信息                                                  |
| token       | varchar(200) | 具体的 Token                                              |
| createDate  | long         | 创建时间                                                  |
| expiresDate | long         | 过期时间                                                  |
| status      | varchar(50)  | Token 的状态，默认为 active，可选 ['inactive', 'deleted'] |
| updateDate  | long         | 最后更新时间                                              |

## 应用程序表

`code-push` 针对的是 App，所以我们也要对 App 进行存储。表名为：`app`

| 字段       | 类型        | 描述                                              |
| ---------- | ----------- | ------------------------------------------------- |
| id         | int         | Token ID，自增主键                                |
| appName    | varchar(50) | App 的名称                                        |
| osPlatform | varchar(50) | 所属平台，ios 或者 android                        |
| ownerId    | int         | 创建人 ID                                         |
| createDate | long        | 创建时间                                          |
| updateDate | long        | 最后更新时间                                      |
| status     | varchar(50) | 状态，默认为 active，可选 ['inactive', 'deleted'] |

## 应用程序部署 ID 表

`code-push` 提供了两个环境，Staging 以及 Production。我们需要为一个 App 生成多个 Key，存取如下，表名为：`app_deployment`

| 字段          | 类型         | 描述                                              |
| ------------- | ------------ | ------------------------------------------------- |
| id            | int          | Token ID，自增主键                                |
| appId         | int          | 关联的 App ID                                     |
| name          | varchar(50)  | Key 的名称，固定生成                              |
| deploymentKey | varchar(200) | 用于部署的 Key                                    |
| createDate    | long         | 创建时间                                          |
| updateDate    | long         | 最后更新时间                                      |
| status        | varchar(50)  | 状态，默认为 active，可选 ['inactive', 'deleted'] |
