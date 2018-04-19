class UserBiz {
  constructor() {
    this.getUserIsAuthenticated = this.getUserIsAuthenticated.bind(this);
  }

  /**
   * 获取用户是否授权，用户code-push login
   */
  async getUserIsAuthenticated(ctx) {
    const authorization = ctx.headers['Authorization'];
    ctx.body = {
      authenticated: true
    };
  }
}

module.exports = new UserBiz();
