<template>
  <div>
    <swiper :options="swiperData.swiperOption">
          <swiper-slide class="swiperSlide" v-for="(item,index) in swiperData.recommendGoods" :key="index">
            <div class="recommendItem" >
              <img :src="item.image" alt="" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {

    }
  },
  created(){

  },
  props: ['swiperData'],
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang='scss' scoped>
.recommendItem{
  width:99%;
  border-right: 1px solid #eee;
  height: 7.46rem;
  font-size: 12px;
  text-align: center;
  }
</style>
