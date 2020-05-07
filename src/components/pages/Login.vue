<template>
  <div>
    <van-nav-bar
      title="ユーザーログイン"
      left-text="戻る"
      left-arrow
      @click-left="goBack"
    />
    <div class="login-panel">
      <van-field
        v-model="username"
        label="ユーザー名"
        placeholder="ユーザー名を入力してください"
        required
        right-icon="clear"
        @click-right-icon="username=''"
        :error-message="usernameErrMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="パスワード"
        placeholder="パスワードを入力してください"
        required
        right-icon="clear"
        @click-right-icon="password=''"
        :error-message="passwordErrMsg"
      />
      <div class="login-button">
        <van-button @click="loginAction" :loading="openLoading" type="primary" size="large">
          ログイン
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import server from "@/server.config";
  import {Toast} from "vant";

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        openLoading: false, // ユーザー登録のLoading状態を起動するか
        usernameErrMsg: '',
        passwordErrMsg: '',
      }
    },
    created() {
      // if (localStorage.userInfo) {
      //   Toast.success('ログイン済み');
      //   this.$router.push({name: 'Member'});
      // }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      loginAction() {
        this.checkForm() && this.axiosUserLogin()
      },
      axiosUserLogin() {
        this.openLoading = true;
        axios({
          url: server.userLogin,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200 && response.data.message) {
              new Promise(((resolve, reject) => {
                localStorage.userInfo = {userName: this.username};
                setTimeout(() => {
                  resolve()
                }, 200)
              }))
                .then(() => {
                  Toast.success('ログイン成功');
                  this.$router.push('/')
                })
                .catch(err => {
                  Toast.fail('ログイン失敗');
                  console.log(err);
                })
            } else {
              Toast.fail(response.data.message);
              this.openLoading = false
            }
          })
          .catch((error) => {
            Toast.fail('ログインエラー');
            this.openLoading = false
          })
      },
      checkForm() {
        let isOk = true;

        if (this.username.length < 5) {
          this.usernameErrMsg = 'ユーザー名が5桁未満';
          isOk = false
        } else {
          this.usernameErrMsg = '';
        }

        if (this.password.length < 6) {
          this.passwordErrMsg = 'パスワードが6桁未満';
          isOk = false
        } else {
          this.passwordErrMsg = '';
        }

        return isOk
      }
    }
  }
</script>

<style scoped>
  .login-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 30px;
  }

  .login-button {
    padding-top: 10px;
  }
</style>
