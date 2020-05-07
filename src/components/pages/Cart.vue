<template>
  <div>

    <div class="navbar-div">
      <van-nav-bar title="カート"/>
    </div>

    <div class="cart-list">
      <div class="goods-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="goods-img">
          <img :src="item.image" width="100%">
        </div>
        <div class="goods-text">
          <div class="goods-name">
            {{item.name}}
          </div>
          <div class="goods-counter">
            <van-stepper v-model="item.count"/>
          </div>
        </div>
        <div class="goods-price">
          <div>
            ￥{{item.price|priceFormat}}
          </div>
          <div>
            x{{item.count}}
          </div>
          <div class="subTotalPrice">
            ￥{{item.price*item.count | priceFormat}}
          </div>
        </div>
      </div>
    </div>

    <div class="cart-bottom">
      <van-row>
        <van-col span="12">
          <div class="cart-title">
            <van-button @click="clearCart" size="small" type="danger" plain>
              カートを空にする
            </van-button>
          </div>
        </van-col>
        <van-col span="12">
          <div class="totalPrice">
            合計：￥{{totalPrice | priceFormat}}
          </div>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
  import {priceFormat} from "../../filter/priceFormat";

  export default {
    data() {
      return {
        cartInfo: [], // カート内の商品
        isEmpty: false,
      }
    },
    created() {
      this.getCartInfo()
    },
    computed: {
      totalPrice() {
        let totalPrice = 0;
        this.cartInfo.forEach((item, index) => {
          totalPrice += item.price * item.count
        });
        localStorage.cartInfo = JSON.stringify(this.cartInfo);
        return totalPrice
      }
    },
    filters: {
      priceFormat(price) {
        return priceFormat(price)
      }
    },
    methods: {
      // カート内の商品情報を取得
      getCartInfo() {
        // localStorage内にカートデータがあるか
        if (localStorage.cartInfo) {
          this.cartInfo = JSON.parse(localStorage.cartInfo)
        }
        console.log(' this.cartInfo:' + JSON.stringify(this.cartInfo));
        this.isEmpty = this.cartInfo.length > 0
      },
      // カートを空にする
      clearCart() {
        localStorage.removeItem('cartInfo');
        this.cartInfo = []
      }
    },
  }
</script>

<style scoped>
  .cart-title {
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
    text-align: left;
  }

  .cart-list {
    background-color: #fff;
  }

  .goods-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0.5rem;
    font-size: 0.85rem;
    border-bottom: 1px solid #e4e7ed;
  }

  .goods-img {
    flex: 6;
  }

  .goods-text {
    flex: 14;
    padding-left: 10px;
  }

  .goods-counter {
    padding-top: 10px;
  }

  .goods-price {
    flex: 4;
    text-align: right;
  }

  .subTotalPrice {
    color: red;
  }

  .totalPrice {
    color: red;
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    padding: 5px;
  }

  .cart-bottom {
    height: 2rem;
    line-height: 2rem;
  }
</style>
