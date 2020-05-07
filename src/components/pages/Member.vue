<template>
  <div>

    <div v-if="isLogin">
      <div>
        <van-nav-bar title="マイページ"/>
      </div>
      <div class="top">
        <van-icon name="smile-o" size="70" class="top-img"/>
      </div>
      <div class="logout">
        <div>
          <van-button @click="logout" type="danger">ログアウト</van-button>
        </div>
      </div>
      <div class="bottom">
        <van-cell-group>
          <van-cell title="注文履歴" is-link/>
          <van-cell title="お届け先管理" is-link/>
          <van-cell title="プレミアム会員" is-link/>
          <van-cell title="お問合せ" is-link/>
        </van-cell-group>
      </div>
    </div>

    <div v-else>
      <div>
        <van-nav-bar title="マイページ"/>
      </div>
      <div class="top">
        <van-icon name="user-o" size="70" class="top-img"/>
      </div>
      <div class="login">
        <div>
          <van-button @click="goRegisterPage" type="warning">ユーザー登録</van-button>
        </div>
        <div>
          <van-button @click="goLoginPage" type="primary">ログイン</van-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLogin: false
      }
    },
    created() {
      if (localStorage.userInfo) {
        this.isLogin = true
      }
    },
    methods: {
      goRegisterPage() {
        this.$router.push({name: 'Register'})
      },
      goLoginPage() {
        this.$router.push({name: 'Login'})
      },
      logout() {
        localStorage.removeItem('userInfo');
        this.isLogin = false;
      }
    }
  }
</script>

<style scoped>
  .top-img {
    background-color: #f0f0f0;
  }

  .top {
    height: 5rem;
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 1rem;
    background-color: #fff;
  }

  .login {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px 10px 15px 10px;
  }
  .login div {
    flex: 1;
    text-align: center;
  }

  .logout {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 10px 10px 15px 10px;
  }
  .logout div {
    flex: 1;
    text-align: center;
  }
</style>
