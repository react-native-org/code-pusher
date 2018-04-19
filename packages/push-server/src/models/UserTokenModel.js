const { sequelize, Sequelize, sequelizeTableConfig } = require('./sequelize');

const UserSessionModel = sequelize.define(
  'user_token',
  {
    userId: { type: Sequelize.INTEGER, allowNull: false },
    tokenName: { type: Sequelize.STRING(255), allowNull: false },
    token: { type: Sequelize.STRING(255), allowNull: false },
    status: { type: Sequelize.STRING(50) },
    expiresDate: { type: Sequelize.BIGINT, allowNull: false },
    description: { type: Sequelize.STRING(1000) },
    isForSession: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
  },
  sequelizeTableConfig
);

module.exports = UserSessionModel;
