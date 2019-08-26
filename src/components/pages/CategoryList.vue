<template>
  <div id="categoryList">
    <div class="navbarDiv">
      <van-nav-bar title="类别搜索"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li v-for="(item, index) in category" :key="index" @click="clickCategory(index)" :class="{categoryActive:categoryIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">右侧列表</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'

export default {
  data () {
    return {
      category: [],
      categoryIndex: 0
    }
  },
  created(){
    this.getCategory()
  },
  mounted(){
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = `${winHeight-46}px`
  },
  methods: {
    getCategory(){
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
      .then(res => {
        if(res.data.code == 200 && res.data.message){
          this.category = res.data.message
        }else{
          this.$toast('服务器错误，获取数据失败')
        }
      })
      .catch(err => {
        this.$toast('服务器错误，获取数据失败')
      })
    },
    clickCategory(index){
      this.categoryIndex = index
    }
  }
}
</script>

<style lang='scss' scoped>
#leftNav ul li{
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive{
  background-color: red;
}
</style>
