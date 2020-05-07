const MOCK_SERVER = 'http://localhost:3000/';
const LOCAL_SERVER = 'http://localhost:4000/';

const SERVER = {
  indexInfo: MOCK_SERVER + 'index/1',
  userRegister: LOCAL_SERVER + 'user/register', // ユーザー登録API
  userLogin: LOCAL_SERVER + 'user/login', // ユーザーログインAPI
  getDetailGoodsInfo: LOCAL_SERVER + 'goods/getDetailGoodsInfo', // 商品情報を取得
  getCategoryList: LOCAL_SERVER + 'goods/getCategoryList', // カテゴリを取得
  getCategorySubList: LOCAL_SERVER + 'goods/getCategorySubList', // サブカテゴリを取得
  getGoodsListByCategorySubID: LOCAL_SERVER + 'goods/getGoodsListByCategorySubID', // サブカテゴリの商品情報を取得
};

module.exports = SERVER;
