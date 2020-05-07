<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品情報"
        left-text="戻る"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">税込価格：￥{{goodsInfo.PRESENT_PRICE|priceFormat}}</div>
    <div>
      <!-- swipeable: スライドで左右コラムの切り替え -->
      <!-- sticky: コラムタイトルバーがページ上部に固定 -->
      <van-tabs swipeable sticky>
        <van-tab title="商品詳細">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="レビュー">
          レビュー製作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button @click="addGoodsToCart" size="large" type="primary">カートに入れる</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">今すぐ購入</van-button>
      </div>
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
        goodsId: '',
        goodsInfo: {},
      }
    },
    filters: {
      priceFormat(price) {
        return priceFormat(price)
      }
    },
    created() {
      this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
      console.log(this.goodsId);
      this.getInfo()
    },
    methods: {
      getInfo() {
        axios({
          url: server.getDetailGoodsInfo,
          method: 'post',
          data: {
            goodsId: this.goodsId
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200 && response.data.message) {
              this.goodsInfo = response.data.message
            } else {
              Toast('サーバエラー　データ取得失敗')
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      addGoodsToCart() {
        let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];
        let isHaveGoods = cartInfo.find(cart => cart.goodsId === this.goodsId);
        console.log(isHaveGoods);

        if (!isHaveGoods) {
          let newGoodsInfo = {
            goodsId: this.goodsInfo.ID,
            name: this.goodsInfo.NAME,
            price: this.goodsInfo.PRESENT_PRICE,
            image: this.goodsInfo.IMAGE1,
            count: 1,
          };
          cartInfo.push(newGoodsInfo);
          localStorage.cartInfo = JSON.stringify(cartInfo);
          Toast.success('カートに入れた')
        } else {
          Toast.success('すでに追加済み')
        }

        this.$router.push({name: 'Cart'})
      }
    },
  }
</script>

<style scoped>
  .goods-name {
    background-color: #fff;
  }

  .goods-price {
    background-color: #fff;
  }

  .detail {
    font-size: 0px;
  }

  .goods-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
  }

  .goods-bottom > div {
    flex: 1;
    padding: 5px;
  }
</style>
