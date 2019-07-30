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
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png")
    };
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
</style>
