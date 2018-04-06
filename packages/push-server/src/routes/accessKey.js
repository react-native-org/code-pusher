const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: `/accessKeys`
});

// router.post('/token');

module.exports = {
  router
};
