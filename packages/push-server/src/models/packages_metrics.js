"use strict";

var _ = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var PackagesMetrics = sequelize.define("PackagesMetrics", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    package_id: DataTypes.INTEGER(10),
    active: DataTypes.INTEGER(10),
    downloaded: DataTypes.INTEGER(10),
    failed: DataTypes.INTEGER(10),
    installed: DataTypes.INTEGER(10),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: 'packages_metrics',
    underscored: true,
    paranoid: true
  });

  PackagesMetrics.addOne = function (packageId, fieldName) {
    var self = this;
    var sql = 'UPDATE packages_metrics SET  `' + fieldName + '`=`' + fieldName + '` + 1 WHERE package_id = :package_id';
    return sequelize.query(sql, { replacements: { package_id: packageId}})
    .spread(function(results, metadata) {
      if (_.eq(results.affectedRows, 0)) {
        var params = {
          package_id: packageId,
          active: 0,
          downloaded: 0,
          failed: 0,
          installed: 0,
        };
        params[fieldName] = 1;
        return self.create(params);
      }else {
        return true;
      }
    });
  };

  PackagesMetrics.addOneOnDownloadById = function (packageId) {
    return this.addOne(packageId, 'downloaded');
  };

  PackagesMetrics.addOneOnFailedById = function (packageId) {
    return this.addOne(packageId, 'failed');
  };

  PackagesMetrics.addOneOnInstalledById = function (packageId) {
    return this.addOne(packageId, 'installed');
  };

  PackagesMetrics.addOneOnActiveById = function (packageId) {
    return this.addOne(packageId, 'active');
  };

  return PackagesMetrics;
};
