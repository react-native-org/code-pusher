const { UserModel, UserTokenModel } = require('../src/models');

UserModel.sync({ force: true });
UserTokenModel.sync({ force: true });
