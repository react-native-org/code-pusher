const Router = require('koa-router');
const config = require('../config');
const { accountBiz, accessKeysBiz } = require('../bizs');

const router = new Router({
  prefix: '/accessKeys'
});

router.use(accountBiz.checkUserExists);

router
  // 创建Access Key
  .post('/', accessKeysBiz.createAccessKey)
  // 删除Access Key
  .delete('/:key', accessKeysBiz.deleteAccessKey)
  // 获取用户的Access Key列表
  .get('/', accessKeysBiz.getAccessKeyList);

module.exports = {
  router
};
