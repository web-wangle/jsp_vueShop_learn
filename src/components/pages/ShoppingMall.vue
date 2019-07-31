<template>
  <div id="ShoppingMall">
    <div class="searchBar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" alt="">
        </van-col>
        <van-col span="16">
          <input type="text" class="searchInput" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiperArea">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="typeBar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" alt="" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <div class="adBanner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" alt="" width="100%">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category:[],
      adBanner: ''
    };
  },
  created(){
    axios({
      url: 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/index',
      method: 'get'
    })
    .then(res => {
      if(res.status == 200){
        this.category = res.data.data.category;
        this.adBanner = res.data.data.advertesPicture;
        this.bannerPicArray = res.data.data.slides;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
};
</script>

<style lang='scss' scoped>
.searchBar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
  .van-col{
    height: 2.2rem;
    @include howToCenter(middle);
  }
  img{
    height: 1.3rem;
  }
}
.searchInput {
  width: 100%;
  height: 1.3rem;
  border-top:0px;
  border-left:0px;
  border-right:0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiperArea{
  width: 100%;
  height: 7rem;
  margin-top: 0.06rem;
  .van-swipe{
    width: 100%;
    height: 7rem;
    img{
      width: 100%;
      height: 7rem;
    }
  }
}
.typeBar{
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div{
    box-sizing: border-box;
    width: 20%;
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
  }
}
</style>
