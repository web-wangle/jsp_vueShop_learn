<template>
  <div class="login">
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="registerPanel">
      <van-field v-model="username" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username=''" :error-message="usernameErrorMsg"></van-field>
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" :error-message="passwordErrorMsg" required></van-field>
      <div class="registerButton">
        <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { truncate } from 'fs';

export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg:'',
      passwordErrorMsg:'',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    LoginAction() {
      this.checkForm() && this.loginUser();
    },
    loginUser() {
      this.openLoading = true;
      axios({
      url: url.login,
      method: 'post',
      data: {
          userName: this.username,
          passWord: this.password
        }
      })
      .then(res => {
        this.openLoading = false;
        if(res.data.code === 200){
          if(res.data.messge === '比对成功'){
            this.$toast.success('登录成功');
          }else{
            this.$toast.fail('用户名或密码错误');
          }
        }else{
          this.$toast.fail('网络错误，请稍后再试');
        }
      })
      .catch(err => {
        this.openLoading = false;
        this.$toast.fail('网络错误，请稍后再试');
      })
    },
    checkForm() {
      let isOk = true;
      if(this.username.length < 5){
        this.usernameErrorMsg = '用户名不能小于5位';
        isOk = false;
      }else{
        this.usernameErrorMsg = ''
      }
      if(this.password.length < 6){
        this.passwordErrorMsg = '密码不能少于6位';
        isOk = false;
      }else{
        this.passwordErrorMsg = '';
      }
      return isOk;
    }
  }
}
</script>

<style lang='scss' scoped>
.registerPanel{
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.registerButton{
  padding-top: 10rem;
  width: 80%;
  margin: 0 auto;
}
</style>
