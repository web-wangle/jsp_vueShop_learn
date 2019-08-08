<template>
  <div id="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="registerPanel"></div>
    <van-field v-model="username" label="用户名" right-icon="clear" placeholder="请输入用户名" required @click-right-icon="username=''" />
    <van-field v-model="password" label="密码" placeholder="请输入密码" required />
    <div class="registerButton">
      <van-button type="primary" size="large">马上注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1);
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
