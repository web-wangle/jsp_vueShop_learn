<template>
  <div id="goods">
    <div class="navbarDiv">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="topimageDiv">
      <img :src="goodsInfo.IMAGE1" alt="" width="100%">
    </div>
    <div class="goodsName">{{goodsInfo.NAME}}</div>
    <div class="goodsPrice">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">正在制作中</van-tab>
      </van-tabs>
    </div>
    <div class="goodsBottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {toMoney} from '@/filter/moneyFilter.js'

export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {}
    }
  },
  created(){
    this.goodsId = this.$route.query.goodsId
    this.getInfo()
  },
  filters: {
    moneyFilter(money){
      return toMoney(money)
    }
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      })
      .then(res =>{
        if(res.data.code == 200 && res.data.message){
          this.goodsInfo = res.data.message
        }else{
          this.$toast('服务器错误，获取数据失败')
        }
      })
      .catch(err =>{
        this.$toast('服务器错误，获取数据失败')
      })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    addGoodsToCart(){
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)
      if(!isHaveGoods){
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo)
        localStorage.cartInfo=JSON.stringify(cartInfo)
        this.$toast.success('添加成功')
      }else{
        this.$toast.success('已有此商品')
      }
      this.$router.push({name: 'Cart'})
    }
  }
}
</script>

<style lang='scss' scoped>
.detail{
  font-size: 0px;
  margin-bottom: 60px;
}
.goodsName{
  background-color: #fff;
}
.goodsPrice{
  background-color: #fff
}
.goodsBottom{
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goodsBottom>div{
  flex: 1;
  padding: 5px;
}
</style>
