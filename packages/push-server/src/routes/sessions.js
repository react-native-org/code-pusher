var express = require('express');
var router = express.Router();
var _ = require('lodash');
var models = require('../models');
var middleware = require('../core/middleware');
var AppError = require('../core/app-error');

router.delete('/:machineName', middleware.checkToken, (req, res, next) => {
  var machineName = _.trim(decodeURI(req.params.machineName));
  var uid = req.users.id;
  models.UserTokens.destroy({where: {created_by:machineName, uid: uid}})
  .then((rowNum) => {
    res.send("");
  })
  .catch(e => {
    if (e instanceof AppError.AppError) {
      res.status(406).send(e.message);
    } else {
      next(e);
    }
  });
});

module.exports = router;
