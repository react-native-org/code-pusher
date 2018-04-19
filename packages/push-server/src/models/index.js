const UserModel = require('./UserModel');
const UserTokenModel = require('./UserTokenModel');
const { sequelize } = require('./sequelize');

module.exports = {
  sequelize,
  UserModel,
  UserTokenModel
};
