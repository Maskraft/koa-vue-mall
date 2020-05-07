const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();

// 商品情報をDBに導入
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', function (err, data) {
    data = JSON.parse(data);
    let savedCount = 0;
    const Goods = mongoose.model('Goods');
    data.map((value, index) => {
      console.log(value);
      let newGoods = new Goods(value);
      newGoods.save()
        .then(() => {
          savedCount++;
          console.log('成功' + savedCount);
        })
        .catch(error => {
          console.log(MediaStreamErrorEvent);
        })
    })
  });
  ctx.body = 'データ導入開始'
});

// カテゴリ情報をDBに導入
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', function (err, data) {
    data = JSON.parse(data);
    let savedCount = 0;
    const Category = mongoose.model('Category');
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value);
      newCategory.save()
        .then(() => {
          savedCount++;
          console.log('成功' + savedCount)
        })
        .catch(error => {
          console.log('失敗：' + error)
        })
    })
  });
  ctx.body = 'データ導入開始'
});

// サブカテゴリ情報をDBに導入
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model('CategorySub');
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub.save()
        .then(() => {
          saveCount++;
          console.log('成功' + saveCount)
        })
        .catch(error => {
          console.log('失敗:' + error)
        })
    })
  });
  ctx.body = "データ導入開始"
});

// 商品情報を取得
router.post('/getDetailGoodsInfo', async (ctx) => {

  // 旧 書き方
  // let goodsId = ctx.request.body.goodsId;
  // const Goods = mongoose.model('Goods');
  // await Goods.findOne({ID: goodsId}).exec()
  //   .then(async (result) => {
  //     ctx.body = {code: 200, message: result}
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     ctx.body = {code: 500, message: error}
  //   });

  // 新 書き方
  try {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model('Goods');
    let result = await Goods.findOne({ID: goodsId}).exec();
    ctx.body = {code: 200, message: result}
  } catch (error) {
    ctx.body = {code: 500, message: error}
  }

});

// カテゴリを取得
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category');
    let result = await Category.find().exec();
    ctx.body = {code: 200, message: result}
  } catch (error) {
    ctx.body = {code: 500, message: error}
  }
});

// サブカテゴリを取得
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId;
    const CategorySub = mongoose.model('CategorySub');
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
});

// 商品情報からサブカテゴリIDを取得
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId;
    let page = ctx.request.body.page;
    let limit = 10; // 1ページの表示数
    let skip = (page - 1) * limit; // スキップ数

    const Goods = mongoose.model('Goods');
    let result = await Goods.find({SUB_ID: categorySubId}).skip(skip).limit(limit).exec();
    ctx.body = {code: 200, message: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
});

module.exports = router;
