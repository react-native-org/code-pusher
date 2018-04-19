const Router = require('koa-router');
const { accountBiz } = require('../bizs');

const router = new Router({
  prefix: '/account'
});

router.get('/', accountBiz.checkUserExists, accountBiz.getAccountInfoByToken);

module.exports = {
  router
};
