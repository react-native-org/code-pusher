const { UserTokenModel, UserModel, sequelize, DataStatus } = require('../models');
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
      const [authType, tokenValue] = String(token).split(' ');
      let user;
      // 来自code-push-cli的请求，从DB抓取
      if (authType === 'Bearer') {
        const results = await sequelize.query(sqlMap.GET_USER_BY_BEARER_TOKEN, {
          type: sequelize.QueryTypes.SELECT,
          replacements: {
            token: tokenValue,
            status: DataStatus.Active,
            expiresDate: Date.now()
          }
        });
        user = results[0] || null;
      } else if (authType === 'Basic') {
        // 来自管理平台的请求，从TokenStore抓取
        user = await tokenStore.get(tokenValue);
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
    const user = ctx.state.user;
    const body = {
      account: {
        email: user.email,
        id: user.id,
        linkedProviders: [],
        name: user.username
      }
    };
    ctx.body = body;
  }
}

module.exports = new AccountBiz();
