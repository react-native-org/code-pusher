const Router = require('koa-router');
const config = require('../config');
const { userBiz } = require('../bizs');

const router = new Router({
  prefix: `/authenticated`
});

router.get('/', userBiz.getUserIsAuthenticated);

module.exports = {
  router
};
