const path = require('path');

module.exports = {
  port: 7000,
  routesPath: path.join(__dirname, '..', 'routes'),
  sequelizeTableConfig: {
    timestamps: true, // 自动追加时间戳，updatedAt, createdAt
    paranoid: true, // 假删除功能
    underscored: false, // 不使用下划线列名
    freezeTableName: true, // 冻结表名
    version: true // 自动为记录生成版本号，乐观锁
  }
};
