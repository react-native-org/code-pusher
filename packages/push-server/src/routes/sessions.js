const Router = require('koa-router');
const { accountBiz, sessionsBiz } = require('../bizs');

const router = new Router({
  prefix: '/sessions'
});

router.use(accountBiz.checkUserExists);

router.delete('/:machineName', sessionsBiz.deleteUserToken);

module.exports = {
  router
};
