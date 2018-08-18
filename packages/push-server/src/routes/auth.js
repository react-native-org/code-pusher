var express = require('express');
var router = express.Router();
var _ = require('lodash');
var security = require('../core/utils/security');
var accountManager = require('../core/services/account-manager')();
var AppError = require('../core/app-error');

router.get('/login', (req, res) => {
  var config = require('../core/config');
  var codePushWebUrl = _.get(config, 'common.codePushWebUrl');
  var isRedirect = false;
  if (codePushWebUrl) {
    var validator = require('validator');
    if (validator.isURL(codePushWebUrl)){
      isRedirect = true;
    }
  }
  if (isRedirect) {
    res.redirect(`${codePushWebUrl}/login`);
  } else {
    res.render('auth/login', { title: 'CodePushServer' });
  }
});

router.get('/link', (req, res) => {
  res.redirect(`/auth/login`);
});

router.get('/register', (req, res) => {
  var config = require('../core/config');
  var codePushWebUrl = _.get(config, 'common.codePushWebUrl');
  var isRedirect = false;
  if (codePushWebUrl) {
    var validator = require('validator');
    if (validator.isURL(codePushWebUrl)){
      isRedirect = true;
    }
  }
  if (isRedirect) {
    res.redirect(`${codePushWebUrl}/register`);
  } else {
    res.render('auth/login', { title: 'CodePushServer' });
  }
});

router.post('/logout', (req, res) => {
  res.send("ok");
});

router.post('/login', (req, res, next) => {
  var account = _.trim(req.body.account);
  var password = _.trim(req.body.password);
  var config = require('../core/config');
  var tokenSecret = _.get(config, 'jwt.tokenSecret');
  accountManager.login(account, password)
  .then((users) => {
    var jwt = require('jsonwebtoken');
    return jwt.sign({ uid: users.id, hash: security.md5(users.ack_code), expiredIn: 7200 }, tokenSecret);
  })
  .then((token) => {
    res.send({status:'OK', results: {tokens: token}});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      res.send({status:'ERROR', errorMessage: e.message});
    } else {
      next(e);
    }
  });
});

module.exports = router;
