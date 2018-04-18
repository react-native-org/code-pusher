class UserBiz {
  constructor() {
    this.getUserIsAuthenticated = this.getUserIsAuthenticated.bind(this);
  }

  /**
   * 获取用户是否授权，用户code-push login
   */
  async getUserIsAuthenticated(ctx) {}
}

module.exports = new UserBiz();
