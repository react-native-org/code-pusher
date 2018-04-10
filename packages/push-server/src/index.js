const path = require('path');
const fastKoa = require('fast-koa');
const config = require('./config');

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
  }
});

fastKoa
  .listen(config.port)
  .then(server => {
    const addr = server.address();
    console.log(`Server started. listen ${addr.port}`);
  })
  .catch(console.error);
