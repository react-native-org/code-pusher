require('babel-register');
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
// const React = require('react');
// const { createStore } = require('redux');
// const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
// const { Helmet } = require('react-helmet');
// const staticCache = require('koa-static-cache');
const { createApp, createAppStore } = require('../src');

const app = new Koa();

// app.use(
//   staticCache(path.join(__dirname, 'dist/assets'), {
//     prefix: '/assets',
//     dynamic: true
//   })
// );
app.use(handleRequest);

app.listen(7772, err => {
  console.log(err, 'started');
});
