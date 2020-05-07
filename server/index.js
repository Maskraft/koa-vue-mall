const Koa = require('koa');
const koa = new Koa();
const {connect, initSchemas} = require('./database/init');
const mongoose = require('mongoose');

// パーサー
const bodyParser = require('koa-bodyparser');
koa.use(bodyParser());

// ドメインを跨ぐ通信をサポートする
const cors = require('koa2-cors');
koa.use(cors());

// すべての子ルーターをimport
const Router = require('koa-router');
let user = require('./api/user.js');
let home = require('./api/home.js');
let goods = require('./api/goods.js');

// すべての子ルーターを登録
let router = new Router();
router.use('/user', user.routes());
router.use('/home', home.routes());
router.use('/goods', goods.routes());

// ルーターのミドルウェアを設定
koa.use(router.routes());
koa.use(router.allowedMethods());

;(async () => {
  await connect();
  initSchemas();
})();

koa.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
});

koa.listen(4000, () => {
  console.log('[Koa Server] starting at port 4000')
});
