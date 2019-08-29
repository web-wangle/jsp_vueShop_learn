<template>
  <div id="cart">
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="cardTitle">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div class="cartList">
      <div class="pangRow" v-for="(item, index) in cartInfo" :key="index">
        <div class="pangImg"><img :src="item.image" alt="" width="100%"></div>
        <div class="pangText">
          <div class="pangGoodsName">{{item.Name}}</div>
          <div class="pangControl">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="pangGoodsPrice">
          <div>￥{{item.price | moneyFilter}}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
        </div>
      </div>
      <div class="totalMoney">
          商品总价:￥{{totalMoney | moneyFilter}}
      </div>
    </div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'

export default {
  data () {
    return {
      cartInfo: [],
      isEmpty: false
    }
  },
  created(){
    this.getCartInfo()
  },
  filters: {
    moneyFilter(money){
      return toMoney(money)
    }
  },
  computed: {
    totalMoney(){
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price*item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    getCartInfo(){
      if(localStorage.cartInfo){
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      this.isEmpty = this.cartInfo.length > 0 ? true: false
    },
    clearCart(){
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  }
}
</script>

<style lang='scss' scoped>
.cardTitle{
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px;
  text-align: right;
}
.cartList{
  background-color: #fff;
}
.pangRow{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #E4E7ED;
}
.pangImg{
  flex: 6;
}
.pangText{
  flex: 14;
  padding-left: 10px;
}
.pangControl{
  padding-top: 10px;
}
.pangGoodsPrice{
  flex: 4;
  text-align: right;
}
.totalMoney{
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px;
}
</style>
