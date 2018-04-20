const { UserTokenModel, DataStatus } = require('../models');

class AccessKeysBiz {
  constructor() {}

  createAccessKey(ctx) {}

  deleteAccessKey(ctx) {}

  /**
   * 获取用户所有的Access Keys
   * @param {*} ctx
   */
  async getAccessKeyList(ctx) {
    const userId = ctx.state.user.id;
    const now = Date.now();
    const results = await UserTokenModel.findAll({
      where: { userId, status: DataStatus.Active, expiresDate: { $gt: now } }
    });
    const body = results.map(x => {
      return {
        id: x.id,
        name: '(hidden)',
        createdTime: new Date(x.createdAt).valueOf(),
        createdBy: `用户创建`,
        expires: x.expiresDate,
        friendlyName: x.tokenName,
        isSession: false,
        description: x.description
      };
    });
    ctx.body = body;
  }
}

module.exports = new AccessKeysBiz();
