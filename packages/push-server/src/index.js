const path = require('path');
const fastKoa = require('fast-koa');
const config = require('./config');
const { accountBiz } = require('./bizs');

fastKoa.initApp({
  routesPath: config.routesPath,
  enableHelmet: true,
  enableLogger: true,
  enableResponseTime: true,
  enableCors: true,
  bodyOptions: {
    multipart: true,
    formidable: {
      maxFields: 10,
      maxFieldsSize: 1024 * 1024 * 10 // 10M
    }
  },
  onRoutesLoading(app) {
    app.use(accountBiz.setUser);
  }
});

fastKoa
  .listen(config.port)
  .then(server => {
    const addr = server.address();
    console.log(`Server started. listen ${addr.port}`);
  })
  .catch(console.error);
