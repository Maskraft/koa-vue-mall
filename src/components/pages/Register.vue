<template>
  <div>
    <van-nav-bar
      title="ユーザー登録"
      left-text="戻る"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
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
      <div class="register-button">
        <van-button @click="registerAction" :loading="openLoading" type="primary" size="large">
          今すぐ登録
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
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        openLoading: false, // ユーザー登録のLoading状態を起動するか
        usernameErrMsg: '',
        passwordErrMsg: '',
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      registerAction(){
        this.checkForm() && this.axiosUserRegister()
      },
      axiosUserRegister() {
        this.openLoading = true;
        axios({
          url: server.userRegister,
          method: 'post',
          data: {
            userName: this.username,
            password: this.password
          }
        })
          .then(response => {
            console.log(response);
            if (response.data.code === 200) {
              Toast.success(response.data.message);
              this.$router.push('/')
            } else {
              console.log(response.data.message);
              this.openLoading = false;
              Toast.fail('登録失敗')
            }
          })
          .catch((error) => {
            console.log(error);
            this.openLoading = false;
            Toast.fail('登録失敗')
          })
      },
      checkForm(){
        let isOk = true;

        if (this.username.length<5){
          this.usernameErrMsg = 'ユーザー名が5桁未満';
          isOk=false
        }else{
          this.usernameErrMsg = '';
        }

        if (this.password.length<6){
          this.passwordErrMsg = 'パスワードが6桁未満';
          isOk=false
        }else{
          this.passwordErrMsg = '';
        }

        return isOk
      }
    }
  }
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 30px;
  }

  .register-button {
    padding-top: 10px;
  }
</style>
