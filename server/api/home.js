const Router = require('koa-router');
const fs = require('fs');

let router = new Router();

// テスト用
router.get('/', async (ctx) => {
  ctx.body = 'Home Page Top'
});

module.exports = router;
