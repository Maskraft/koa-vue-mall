<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="カテゴリ一覧"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="onClickCategory(index,item.ID)" :class="{categoryActive:categoryIndex===index}"
                  v-for="(item,index) in category" :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE|priceFormat}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import server from '@/server.config'
  import {Toast} from "vant";
  import {priceFormat} from "../../filter/priceFormat";

  export default {
    data() {
      return {
        categoryIndex: 0,
        category: [],
        active: 0, // 選択中のサブカテゴリ
        categorySub: [],
        categorySubId: '', // サブカテゴリID
        page: 1, // 商品リストのページ数
        goodList: [], // 商品リスト
        loading: false, // 上スクロール時、ローディング
        finished: false, // 上スクロール時、全データがローディング完了か
        isRefresh: false, // 下スクロール時、リフレッシュ
        errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"',  //错误图片显示路径
      }
    },
    created() {
      this.getCategory();
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById("leftNav").style.height = winHeight - 46 - 50 + 'px';
      document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
    },
    filters: {
      priceFormat(price) {
        return priceFormat(price)
      }
    },
    methods: {
      // カテゴリを取得
      getCategory() {
        axios({
          url: server.getCategoryList,
          method: 'get'
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200 && response.data.message) {
              this.category = response.data.message;
              this.getCategorySubByCategoryId(this.category[0].ID)
            } else {
              Toast('サーバエラー　データ取得失敗')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      // カテゴリがクリックされた時
      onClickCategory(index, categoryId) {
        this.categoryIndex = index;
        this.page = 1;
        this.finished = false;
        this.goodList = [];
        this.getCategorySubByCategoryId(categoryId);
      },
      // カテゴリIDでサブカテゴリを取得
      getCategorySubByCategoryId(categoryId) {
        axios({
          url: server.getCategorySubList,
          method: 'post',
          data: {categoryId: categoryId}
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200 && response.data.message) {
              this.categorySub = response.data.message;
              this.active = 0;
              this.categorySubId = this.categorySub[0].ID;
              this.onLoad()
            } else {
              Toast('サーバエラー　データ取得失敗')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      // デフォルト or 上スクロール時、商品情報をローディング
      onLoad() {
        setTimeout(() => {
          this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
          this.getGoodList()
        }, 1000)
      },
      // 下スクロール時、商品情報をリフレッシュ
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList = [];
          this.page = 1;
          this.onLoad()
        }, 500);
      },
      // サブカテゴリIDで商品リストを取得
      getGoodList() {
        axios({
          url: server.getGoodsListByCategorySubID,
          method: 'post',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200 && response.data.message.length) {
              this.page++;
              this.goodList = this.goodList.concat(response.data.message)
            } else {
              this.finished = true;
            }
            this.loading = false;
            console.log(this.finished)
          })
          .catch(error => {
            console.log(error)
          })
      },
      // サブカテゴリがクリックされた時
      onClickCategorySub(index, title) {
        this.categorySubId = this.categorySub[index].ID;
        console.log(this.categorySubId);
        this.goodList = [];
        this.finished = false;
        this.page = 1;
        this.onLoad()
      },
      // 商品情報ページへ移動
      goGoodsInfo(id) {
        this.$router.push({name: 'Goods', params: {goodsId: id}})
      }
    }
  }
</script>

<style scoped>
  #leftNav {
    background-color: aliceblue;
  }

  #leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
  }

  .categoryActive {
    background-color: #fff;
  }

  .list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
  }

  #list-div {
    overflow: scroll;
  }

  .list-item-img {
    flex: 8;
  }

  .list-item-text {
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
