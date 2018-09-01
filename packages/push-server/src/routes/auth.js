var express = require('express');
var router = express.Router();
var _ = require('lodash');
var config = require('../core/config');
var validator = require('validator');
var log4js = require('log4js');
var log = log4js.getLogger("cps:auth");
var accountManager = require('../core/services/account-manager')();
var security = require('../core/utils/security');
var AppError = require('../core/app-error');

router.get('/login', (req, res) => {
  // var codePushWebUrl = _.get(config, 'common.codePushWebUrl');
  // if (codePushWebUrl && validator.isURL(codePushWebUrl)) {
  //   log.debug(`login redirect:${codePushWebUrl}`);
  //   res.redirect(`${codePushWebUrl}/login`);
  // } else {
  //   res.render('auth/login', { title: 'CodePushServer' });
  // }
  var identical = '4ksvOXqog';
  var newAccessKey = security.randToken(28).concat(identical);
  var uid = 1;

  var createdBy = _.trim("Login-1535789572978");
  var friendlyName = _.trim('Login-1535789572978');
  var ttl = parseInt('2592000000');
  var description = _.trim('Login-1535789572978');
  accountManager.createAccessKey(uid, newAccessKey, ttl, friendlyName, createdBy, description)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      if (e instanceof AppError.AppError) {
        log.debug(e)
        res.status(406).send(e.message);
      } else {
        next(e);
      }
    });
});

router.get('/link', (req, res) => {
  res.redirect(`/auth/login`);
});

router.get('/register', (req, res) => {
  var codePushWebUrl = _.get(config, 'common.codePushWebUrl');
  var isRedirect = false;
  if (codePushWebUrl && validator.isURL(codePushWebUrl)) {
    log.debug(`register redirect:${codePushWebUrl}`);
    res.redirect(`${codePushWebUrl}/register`);
  } else {
    // res.render('auth/login', { title: 'CodePushServer' });
  }
});

router.post('/logout', (req, res) => {
  res.send("ok");
});

router.post('/login', (req, res, next) => {
  var AppError = require('../core/app-error');
  var accountManager = require('../core/services/account-manager')();
  var security = require('../core/utils/security');
  var account = _.trim(req.body.account);
  var password = _.trim(req.body.password);
  var tokenSecret = _.get(config, 'jwt.tokenSecret');
  log.debug(`login:${account}`);
  accountManager.login(account, password)
  .then((users) => {
    var jwt = require('jsonwebtoken');
    return jwt.sign({ uid: users.id, hash: security.md5(users.ack_code), expiredIn: 7200 }, tokenSecret);
  })
  .then((token) => {
    log.debug(token);
    res.send({status:'OK', results: {tokens: token}});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      log.debug(e);
      res.send({status:'ERROR', errorMessage: e.message});
    } else {
      next(e);
    }
  });
});

module.exports = router;
