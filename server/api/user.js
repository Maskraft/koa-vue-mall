const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();

// ユーザートップページ
router.get('/', async (ctx) => {
  ctx.body = 'User Page Top'
});

// ユーザー登録API
router.post('/register', async (ctx) => {
  const User = mongoose.model('User');
  let newUser = new User(ctx.request.body);

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '登録成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
});

// ユーザーログインAPI
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body;
  console.log(loginUser);
  let userName = loginUser.userName;
  let password = loginUser.password;

  const User = mongoose.model('User');

  // ユーザー名をチェック
  await User.findOne({userName: userName}).exec()
    .then(async (result) => {
      console.log(result);
      if (result) {
        let loginUser = new User();
        // ユーザー名が問題なければ、パスワードをチェック
        await loginUser.comparePassword(password, result.password)
          .then(isMatch => {
            if (isMatch) {
              ctx.body = {code: 200, message: isMatch}
            } else {
              // 本番なら、「ユーザー名もしくはパスワードが間違っている」がセキュリティ的に良い
              ctx.body = {code: 500, message: 'パスワードが間違っている'}
            }
          })
          .catch(error => {
            console.log(error);
            ctx.body = {code: 500, message: error}
          })
      } else {
        // 本番なら、「ユーザー名もしくはパスワードが間違っている」がセキュリティ的に良い
        ctx.body = {code: 500, message: 'ユーザー名が存在しない'}
      }
    })
    .catch(error => {
      console.log(error);
      ctx.body = {code: 500, message: error}
    })
});

module.exports = router;
