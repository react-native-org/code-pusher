var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');
var security = require('../core/utils/security');
var middleware = require('../core/middleware');

router.get('/', middleware.checkToken, (req, res) => {
  var userInfo = {
    email:req.users.email,
    id:req.users.identical,
    linkedProviders: [],
    name:req.users.username,
  };
  res.send({account:userInfo});
});

module.exports = router;
