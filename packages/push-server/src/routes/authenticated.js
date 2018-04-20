const Router = require('koa-router');
const config = require('../config');
const { accountBiz } = require('../bizs');

const router = new Router({
  prefix: `/authenticated`
});

router.get('/', accountBiz.checkUserExists, accountBiz.getUserIsAuthenticated);

module.exports = {
  router
};
