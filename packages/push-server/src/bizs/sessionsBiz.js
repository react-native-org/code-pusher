class SessionsBiz {
  constructor() {
    this.deleteUserToken = this.deleteUserToken.bind(this);
  }

  async deleteUserToken(ctx) {
    const userId = ctx.state.user.id;
    const { machineName } = ctx.params;
  }
}

module.exports = new SessionsBiz();
