const Router = require('koa-router');
const config = require('../config');

const router = new Router({
  prefix: '/account'
});

module.exports = {
  router
};
