<template>
  <div class="goods-info" @click="goGoodsPage">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%"/>
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice|priceFormat}}</div>
  </div>
</template>

<script>
  import {priceFormat} from "../../filter/priceFormat";

  export default {
    name: "GoodsInfo",
    props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
    filters: {
      priceFormat(price) {
        return priceFormat(price)
      }
    },
    methods: {
      goGoodsPage() {
        this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}})
      }
    }
  }
</script>

<style scoped>
  .goods-name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
