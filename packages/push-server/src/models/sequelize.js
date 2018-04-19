const Sequelize = require('sequelize');
const { dbConfig, sequelizeTableConfig } = require('../config');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect, // 'mysql' | 'sqlite' | 'postgres' | 'mssql',
  pool: Object.assign(
    {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dbConfig.pool
  ),
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

module.exports = {
  sequelize,
  Sequelize,
  sequelizeTableConfig
};
