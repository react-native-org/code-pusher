const { UserModel, UserTokenModel } = require('../src/models');

async function init() {
  await UserModel.sync({ force: true });
  await UserTokenModel.sync({ force: true });
  await UserModel.create({
    username: 'admin',
    password: 'admin',
    secretCode: 'test'
  });
  await UserTokenModel.create({
    userId: 1,
    tokenName: 'test token',
    token: 'testtoken',
    status: 'Active',
    expiresDate: Date.now() + 3600 * 24 * 30
  });
}

init();
