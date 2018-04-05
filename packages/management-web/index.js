const Koa = require('koa');
const next = require('next');
const helmet = require('koa-helmet');
const Router = require('koa-router');

const koaApp = new Koa();
const router = new Router();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handleRequest = app.getRequestHandler();

router.get('/a', async ctx => {
  await app.render(ctx.req, ctx.res, '/b', ctx.query);
  ctx.respond = false;
});

router.get('/b', async ctx => {
  await app.render(ctx.req, ctx.res, '/a', ctx.query);
  ctx.respond = false;
});

router.get('*', async ctx => {
  await handleRequest(ctx.req, ctx.res);
  ctx.respond = false;
});

koaApp.use(async (ctx, next) => {
  ctx.res.statusCode = 200;
  await next();
});

koaApp.use(router.routes());
koaApp.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
