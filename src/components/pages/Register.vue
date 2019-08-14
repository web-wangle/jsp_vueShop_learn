<template>
  <div id="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="registerPanel"></div>
    <van-field v-model="username" label="用户名" right-icon="clear" placeholder="请输入用户名" required @click-right-icon="username=''" />
    <van-field v-model="password" label="密码" placeholder="请输入密码" required />
    <div class="registerButton">
      <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { truncate } from 'fs';

export default {
  // github怎么跪了
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
      this.checkForm() && this.registerUser();
    },
    registerUser() {
      this.openLoading = true;
      axios({
      url: url.registerUser,
      method: 'post',
      data: {
          userName: this.username,
          passWord: this.password
        }
      })
      .then(res => {
        this.openLoading = false;
        if(res.data.code === 200){
          this.$toast.success('注册成功');
        }else{
          this.$toast.fail('注册失败');
        }
      })
      .catch(err => {
        this.openLoading = false;
        this.$toast.fail('注册失败');
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
