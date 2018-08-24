'use strict';
var Promise = require('bluebird');
var models = require('../../models');
var _ = require('lodash');
var common = require('../utils/common');
var factory = require('../utils/factory');
var AppError = require('../app-error');
var config    = require('../config');
var log4js = require('log4js');
var log = log4js.getLogger("cps:ClientManager");
var Sequelize = require('sequelize');

var proto = module.exports = function (){
  function ClientManager() {

  }
  ClientManager.__proto__ = proto;
  return ClientManager;
};

const UPDATE_CHECK = "UPDATE_CHECK";
const CHOSEN_MAN = "CHOSEN_MAN";
const EXPIRED = 600;

proto.getUpdateCheckCacheKey = function(deploymentKey, appVersion, label, packageHash) {
  return [UPDATE_CHECK, deploymentKey, appVersion, label, packageHash].join(':');
}

proto.clearUpdateCheckCache = function(deploymentKey, appVersion, label, packageHash) {
  log.debug('clear cache Deployments key:', deploymentKey);
  let redisCacheKey = this.getUpdateCheckCacheKey(deploymentKey, appVersion, label, packageHash);
  var client = factory.getRedisClient("default");
  return client.keysAsync(redisCacheKey)
  .then((data) => {
    if (_.isArray(data)) {
      return Promise.map(data, (key) => {
        return client.delAsync(key);
      });
    }
    return null;
  })
  .finally(() => client.quit());
}

proto.updateCheckFromCache = function(deploymentKey, appVersion, label, packageHash, clientUniqueId) {
  const self = this;
  var updateCheckCache = _.get(config, 'common.updateCheckCache', false);
  if (updateCheckCache === false) {
    return self.updateCheck(deploymentKey, appVersion, label, packageHash);
  }
  let redisCacheKey = self.getUpdateCheckCacheKey(deploymentKey, appVersion, label, packageHash);
  var client = factory.getRedisClient("default");
  return client.getAsync(redisCacheKey)
  .then((data) => {
    if (data) {
      try {
        log.debug('updateCheckFromCache read from catch');
        var obj = JSON.parse(data);
        return obj;
      } catch (e) {
      }
    }
    return self.updateCheck(deploymentKey, appVersion, label, packageHash, clientUniqueId)
    .then((rs) => {
      try {
        log.debug('updateCheckFromCache read from db');
        var strRs = JSON.stringify(rs);
        client.setexAsync(redisCacheKey, EXPIRED, strRs);
      } catch (e) {
      }
      return rs;
    });
  })
  .finally(() => client.quit());
}

proto.getChosenManCacheKey = function(deploymentKey, appVersion, clientUniqueId, rollout) {
  return [CHOSEN_MAN, deploymentKey, appVersion, clientUniqueId, rollout].join(':');
}

proto.random = function(rollout) {
  var r = Math.ceil(Math.random()*10000);
  if (r < rollout * 100) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

proto.chosenMan = function (rollout, deploymentKey, appVersion, clientUniqueId) {
  var self = this;
  if (rollout >= 100) {
    return Promise.resolve(true);
  }
  var rolloutClientUniqueIdCache = _.get(config, 'common.rolloutClientUniqueIdCache', false);
  if (rolloutClientUniqueIdCache === false) {
    return self.random(rollout);
  } else {
    var client = factory.getRedisClient("default");
    var redisCacheKey = self.getChosenManCacheKey(deploymentKey, appVersion, clientUniqueId, rollout);
    return client.getAsync(redisCacheKey)
    .then((data) => {
      if (data == 1) {
        return true;
      } else if (data == 2) {
        return false;
      } else {
        return self.random(rollout)
        .then((r)=>{
           return client.setexAsync(redisCacheKey, 60*60*24*7, r ? 1:2)
            .then(()=>{
              return r;
            });
        });
      }
    })
    .finally(() => client.quit());
  }
}

proto.updateCheck = function(deploymentKey, appVersion, label, packageHash, clientUniqueId) {
  var rs = {
    downloadURL: "",
    downloadUrl: "",
    description: "",
    isAvailable: false,
    isMandatory: false,
    appVersion: appVersion,
    packageHash: "",
    label: "",
    packageSize: 0,
    updateAppVersion: false,
    shouldRunBinaryVersion: false,
    rollout: 100
  };
  var self = this;
  if (_.isEmpty(deploymentKey) || _.isEmpty(appVersion)) {
    return Promise.reject(new AppError.AppError("please input deploymentKey and appVersion"))
  }
  return models.Deployments.findOne({where: {deployment_key: deploymentKey}})
  .then((dep) => {
    if (_.isEmpty(dep)) {
      throw new AppError.AppError('Not found deployment, check deployment key is right.');
    }
    var version = common.parseVersion(appVersion);
    return models.DeploymentsVersions.findAll({where: {
      deployment_id: dep.id,
      min_version: { [Sequelize.Op.lte]: version },
      max_version: { [Sequelize.Op.gt]: version }
    }})
    .then((deploymentsVersionsMore) => {
      var distance = 0;
      var item = null;
      _.map(deploymentsVersionsMore, function(value, index) {
        if (index == 0) {
          item = value;
          distance = value.max_version - value.min_version;
        } else {
          if (distance > (value.max_version - value.min_version)) {
            distance = value.max_version - value.min_version;
            item = value;
          }
        }
      });
      log.debug(item);
      return item;
    });
  })
  .then((deploymentsVersions) => {
    var packageId = _.get(deploymentsVersions, 'current_package_id', 0);
    if (_.eq(packageId, 0) ) {
      return;
    }
    return models.Packages.findById(packageId)
    .then((packages) => {
      if (packages
        && _.eq(packages.deployment_id, deploymentsVersions.deployment_id)
        && !_.eq(packages.package_hash, packageHash)) {
        rs.downloadUrl = rs.downloadURL = common.getBlobDownloadUrl(_.get(packages, 'blob_url'));
        rs.description = _.get(packages, 'description', '');
        rs.isAvailable = _.eq(packages.is_disabled, 1) ? false : true;
        rs.isMandatory = _.eq(packages.is_mandatory, 1) ? true : false;
        rs.appVersion = appVersion;
        rs.packageHash = _.get(packages, 'package_hash', '');
        rs.label = _.get(packages, 'label', '');
        rs.packageSize = _.get(packages, 'size', 0);
        rs.rollout = _.get(packages, 'rollout', 100);
      }
      return packages;
    })
    .then((packages) => {
      //增量更新
      if (!_.isEmpty(packages) && !_.eq(_.get(packages, 'package_hash', ""), packageHash)) {
        return models.PackagesDiff.findOne({where: {package_id:packages.id, diff_against_package_hash: packageHash}})
        .then((diffPackage) => {
          if (!_.isEmpty(diffPackage)) {
            rs.downloadURL = common.getBlobDownloadUrl(_.get(diffPackage, 'diff_blob_url'));
            rs.downloadUrl = common.getBlobDownloadUrl(_.get(diffPackage, 'diff_blob_url'));
            rs.packageSize = _.get(diffPackage, 'diff_size', 0);
          }
          return;
        });
      } else {
        return;
      }
    });
  })
  .then(() => {
    return rs;
  });
};

proto.getPackagesInfo = function (deploymentKey, label) {
  if (_.isEmpty(deploymentKey) || _.isEmpty(label)) {
    return Promise.reject(new AppError.AppError("please input deploymentKey and label"))
  }
  return models.Deployments.findOne({where: {deployment_key: deploymentKey}})
  .then((dep) => {
    if (_.isEmpty(dep)) {
      throw new AppError.AppError('does not found deployment');
    }
    return models.Packages.findOne({where: {deployment_id: dep.id, label: label}});
  })
  .then((packages) => {
    if (_.isEmpty(packages)) {
      throw new AppError.AppError('does not found packages');
    }
    return packages;
  });
};

proto.reportStatusDownload = function(deploymentKey, label, clientUniqueId) {
  return this.getPackagesInfo(deploymentKey, label)
  .then((packages) => {
    return Promise.all([
      models.PackagesMetrics.addOneOnDownloadById(packages.id),
      models.LogReportDownload.create({
        package_id: packages.id,
        client_unique_id: clientUniqueId
      })
    ]);
  });
};

proto.reportStatusDeploy = function (deploymentKey, label, clientUniqueId, others) {
  return this.getPackagesInfo(deploymentKey, label)
  .then((packages) => {
    var constConfig = require('../const');
    var status =  _.get(others, "status");
    var packageId = packages.id;
    if (_.eq(status, "DeploymentSucceeded")) {
      return Promise.all([
        models.LogReportDeploy.create({
          package_id: packageId,
          client_unique_id: clientUniqueId,
          previous_label: _.get(others, 'previousLabelOrAppVersion'),
          previous_deployment_key: _.get(others, 'previousDeploymentKey'),
          status: constConfig.DEPLOYMENT_SUCCEEDED
        }),
        models.PackagesMetrics.addOneOnInstalledById(packageId),
        models.PackagesMetrics.addOneOnActiveById(packageId),
      ]);
    } else if (_.eq(status, "DeploymentFailed")) {
      return Promise.all([
        models.LogReportDeploy.create({
          package_id: packageId,
          client_unique_id: clientUniqueId,
          previous_label: _.get(others, 'previousLabelOrAppVersion'),
          previous_deployment_key: _.get(others, 'previousDeploymentKey'),
          status: constConfig.DEPLOYMENT_FAILED
        }),
        models.PackagesMetrics.addOneOnInstalledById(packageId),
        models.PackagesMetrics.addOneOnFailedById(packageId),
      ]);
    }else {
      return;
    }
  });
};
