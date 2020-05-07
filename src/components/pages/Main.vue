<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <van-tabbar v-model="activeIndex" @change="onClickTabbar(activeIndex)">
      <van-tabbar-item icon="shop">トップ</van-tabbar-item>
      <van-tabbar-item icon="records">カテゴリ</van-tabbar-item>
      <van-tabbar-item icon="cart">カート</van-tabbar-item>
      <van-tabbar-item icon="contact">マイページ</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 0,
      }
    },
    created() {
      this.changeTabbarActiveIndex()
    },
    updated() {
      this.changeTabbarActiveIndex()
    },
    methods: {
      changeTabbarActiveIndex() {
        switch (this.$route.path) {
          case '/':
            this.activeIndex = 0;
            break;
          case '/category-list':
            this.activeIndex = 1;
            break;
          case '/cart':
            this.activeIndex = 2;
            break;
          case '/member':
            this.activeIndex = 3;
            break;
        }
      },
      onClickTabbar(activeIndex) {
        switch (activeIndex) {
          case 0:
            this.$router.push({name: 'ShoppingMall'});
            break;
          case 1:
            this.$router.push({name: 'CategoryList'});
            break;
          case 2:
            this.$router.push({name: 'Cart'});
            break;
          case 3:
            this.$router.push({name: 'Member'});
            break;
        }
      }
    },
  }
</script>

<style scoped>

</style>
