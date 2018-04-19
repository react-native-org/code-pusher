const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: '/account'
});

router.get('/');

module.exports = {
  router
};
