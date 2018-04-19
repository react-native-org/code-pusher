const { UserTokenModel, UserModel, sequelize } = require('../models');
const { tokenStore, sqlMap } = require('../common');

class AccountBiz {
  constructor() {
    this.getAccountInfoByToken = this.getAccountInfoByToken.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  /**
   * 根据Token，设置用户信息
   * @param {*} ctx
   * @param {*} next
   */
  async setUser(ctx, next) {
    const token = ctx.headers['authorization'];
    if (token) {
      // 从TokenStore抓取数据
      let user = await tokenStore.get(token);
      // 从DB抓一次
      if (!user) {
        const results = await sequelize.query('', { type: sequelize.QueryTypes.SELECT });
      }
      ctx.state.user = user;
    }
    await next();
  }

  /**
   * 检查用户是否登录，未登录直接返回401
   * @param {*} ctx
   * @param {*} next
   */
  async checkUserExists(ctx, next) {
    if (!ctx.state.user) {
      ctx.status = 401;
      ctx.body = '';
      return;
    }
    await next();
  }

  /**
   * 获取用户的信息
   * @param {*} ctx
   */
  async getAccountInfoByToken(ctx) {
    console.log('');
  }
}

module.exports = new AccountBiz();
