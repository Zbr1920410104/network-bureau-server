import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';

// 跨域
import cors from 'koa2-cors';

// 路由
import users from './src/routes/user/user';
// import businessManager from './src/routes/businessManager/businessManager';
// import review-manager from './src/routes/review-manager/review-manager';
// import staff from './src/routes/staff/staff';

import file from './src/routes/file/file';

// 中间件
import verifyToken from './src/middle/verify-token';
import param from './src/middle/param';
import verifyAuth from './src/middle/verify-auth';
import error from './src/middle/error';

// 返回前台的对象
import Result from './src/util/response';

const app = new Koa();

app.use(cors());

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(error);
app.use(require('koa-static')(__dirname + '/public'));
app.use(verifyToken);
app.use(verifyAuth);
app.use(param);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(users.routes(), users.allowedMethods());
app.use(file.routes(), file.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  ctx.res.writeHead(err.statusCode || err.status, {
    'content-Type': 'application/json'
  });
  ctx.res.end(
    JSON.stringify(
      new Result({
        status: err.statusCode || err.status,
        msg: err.message
      })
    )
  );
  console.error('server error', err, ctx);
});

module.exports = app;
