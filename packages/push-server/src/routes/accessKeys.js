var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Promise = require('bluebird');
var security = require('../core/utils/security');
var models = require('../models');
var middleware = require('../core/middleware');
var accountManager = require('../core/services/account-manager')();
var AppError = require('../core/app-error')
var log4js = require('log4js');
var log = log4js.getLogger("cps:accessKey");

router.get('/', middleware.checkToken, (req, res, next) => {
  log.debug('request get acceesKeys')
  var uid = req.users.id;
  accountManager.getAllAccessKeyByUid(uid)
  .then((accessKeys) => {
    log.debug('acceesKeys:', accessKeys)
    res.send({accessKeys: accessKeys});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      log.debug('request get acceesKeys AppError', e)
      res.status(406).send(e.message);
    } else {
      next(e);
    }
  });
});

router.post('/', middleware.checkToken, (req, res, next) => {
  var uid = req.users.id;
  var identical = req.users.identical;
  var createdBy = _.trim(req.body.createdBy);
  var friendlyName = _.trim(req.body.friendlyName);
  var isSession = req.body.isSession;
  var ttl = parseInt(req.body.ttl);
  var description = _.trim(req.body.description);
  var newAccessKey = security.randToken(28).concat(identical);
  return accountManager.isExsitAccessKeyName(uid, friendlyName)
  .then((data) => {
    if (!_.isEmpty(data)) {
      throw new AppError.AppError(`The access key "${friendlyName}"  already exists.`);
    }
  })
  .then(() => {
    return accountManager.createAccessKey(uid, newAccessKey, isSession, ttl, friendlyName, createdBy, description);
  })
  .then((newToken) => {
    var moment = require("moment");
    var info = {
      name : newToken.tokens,
      createdTime : parseInt(moment(newToken.created_at).format('x')),
      createdBy : newToken.created_by,
      expires : parseInt(moment(newToken.expires_at).format('x')),
      isSession: newToken.is_session == 1 ? true :false,
      description : newToken.description,
      friendlyName: newToken.name,
    };
    res.send({accessKey:info});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      res.status(406).send(e.message);
    } else {
      next(e);
    }
  });
});

router.delete('/:name', middleware.checkToken, (req, res, next) => {
  var name = _.trim(decodeURI(req.params.name));
  var uid = req.users.id;
  return models.UserTokens.destroy({where: {name:name, uid: uid}})
  .then((rowNum) => {
    res.send({friendlyName:name});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      res.status(406).send(e.message);
    } else {
      next(e);
    }
  });
});

router.patch('/:name', middleware.checkToken, (req, res, next) => {
  var name = _.trim(decodeURI(req.params.name));
  var friendlyName = _.trim(req.body.friendlyName);
  var ttl = _.trim(req.body.ttl);
  var uid = req.users.id;
  return Promise.all([
    models.UserTokens.findOne({where: {name:name, uid: uid}}),
    accountManager.isExsitAccessKeyName(uid, friendlyName),
  ])
  .spread((token, token2) => {
    if (_.isEmpty(token)) {
      throw new AppError.AppError(`The access key "${name}" does not exist.`);
    }
    if (!_.isEmpty(token2)) {
      throw new AppError.AppError(`The access key "${friendlyName}"  already exists.`);
    }
    return token;
  })
  .then((token) => {
    var moment = require('moment');
    if (ttl > 0 || ttl < 0) {
      var newExp = moment(token.get('expires_at')).add(ttl/1000, 'seconds').format('YYYY-MM-DD HH:mm:ss');
      token.set('expires_at', newExp);
    }
    if (friendlyName.length > 0) {
      token.set('name', friendlyName);
    }
    return token.save();
  })
  .then((token) => {
    var info = {
      name : '(hidden)',
      isSession: token.is_session == 1 ? true :false,
      createdTime : token.created_at,
      createdBy : token.created_by,
      description : token.description,
      expires : token.expires_at,
      friendlyName: token.name,
      id: token.id + ""
    };
    res.send({accessKey: info});
  })
  .catch((e) => {
    if (e instanceof AppError.AppError) {
      res.status(406).send(e.message);
    } else {
      next(e);
    }
  });
});

module.exports = router;
