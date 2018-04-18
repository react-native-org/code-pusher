const { sequelize, Sequelize, sequelizeTableConfig } = require('./sequelize');

const UserModel = sequelize.define(
  'user',
  {
    username: { type: Sequelize.STRING(50), allowNull: false },
    password: { type: Sequelize.STRING(255), allowNull: false },
    secretCode: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(50) },
    phone: { type: Sequelize.STRING(50) }
  },
  sequelizeTableConfig
);

module.exports = UserModel;
