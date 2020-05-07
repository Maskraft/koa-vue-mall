<template>
  <div>
    <!-- search bar -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="70%" class="location-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5" class="search-button">
          <van-button size="mini">搜索</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(swiper,index) in swiperImages" :key="index">
          <img v-lazy="swiper.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type bar -->
    <div class="category-bar">
      <div v-for="(cate,index) in this.category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- ad banner -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>

    <!-- recommend area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price|priceFormat}} (￥{{item.mallPrice|priceFormat}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!-- floor area -->
    <floor :floor-data="floor1" :floor-title="floorName.floor1"></floor>
    <floor :floor-data="floor2" :floor-title="floorName.floor2"></floor>
    <floor :floor-data="floor3" :floor-title="floorName.floor3"></floor>

    <!-- hot goods area -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goods-id="item.goodsId" :goods-image="item.image" :goods-name="item.name"
                          :goods-price="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

    <!-- test swiper area -->
    <!--    <swiper-default></swiper-default>-->
    <!--    <swiper-default2></swiper-default2>-->
    <!--    <swiper-default3></swiper-default3>-->
    <!--    <swiper-text></swiper-text>-->

  </div>
</template>

<script>
  import axios from 'axios'
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  import SwiperDefault from '@/components/swiper/SwiperDefault'
  import SwiperDefault2 from '@/components/swiper/SwiperDefault2'
  import SwiperDefault3 from '@/components/swiper/SwiperDefault3'
  import SwiperText from "../swiper/SwiperText";
  import Floor from "../floor/Floor";
  import {priceFormat} from "../../filter/priceFormat";
  import GoodsInfo from "../goods/GoodsInfo";
  import server from "@/server.config";
  import {Toast} from "vant";

  export default {
    components: {
      Swiper,
      SwiperSlide,
      SwiperDefault,
      SwiperDefault2,
      SwiperDefault3,
      SwiperText,
      Floor,
      GoodsInfo,
    },
    filters: {
      priceFormat(price) {
        return priceFormat(price)
      }
    },
    data() {
      return {
        swiperOptions: {
          slidesPerView: 3
        },
        msg: 'Shopping Mall',
        locationIcon: require('@/assets/images/location.png'),
        swiperImages: [],
        category: [],
        adBanner: '',
        recommendGoods: [],
        floor1: [],
        floor2: [],
        floor3: [],
        floorName: {},
        hotGoods: [],
      }
    },
    created() {
      axios({
        // Koaサーバーからデータを取得
        url: server.indexInfo,
        method: 'get'
      })
        .then(response => {
          if (response.status === 200) {
            this.category = response.data.data.category;
            this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
            this.swiperImages = response.data.data.slides;
            this.recommendGoods = response.data.data.recommend;
            this.floor1 = response.data.data.floor1;
            this.floor2 = response.data.data.floor2;
            this.floor3 = response.data.data.floor3;
            this.floorName = response.data.data.floorName;
            this.hotGoods = response.data.data.hotGoods;
          } else {
            Toast('サーバエラー　データ取得失敗')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style scoped>
  .search-bar {
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
    overflow: hidden;
  }

  .search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }

  .search-button {
    text-align: center;
  }

  .location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
  }

  .swiper-area {
    clear: both;
    max-height: 9rem;
    overflow: hidden;
  }

  .category-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .category-bar div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex: 1;
  }

  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
  }

  .recommend-title {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
  }

  .recommend-body {
    border-bottom: 1px solid #eee;
  }

  .recommend-item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  .hot-area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
  }

  .hot-goods{
    height: 125rem;
    overflow: hidden;
    background-color: #fff;
  }

</style>
