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
              <li v-for="(item, index) in category" :key="index" @click="clickCategory(index, item.ID)" :class="{categoryActive:categoryIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="listDiv">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="listItem" v-for="(item, index) in goodList" :key="index">
                  <div class="list-item-img"><img :src="item.IMAGE1" alt="" width="100%"></div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{item.ORI_PRICE}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      active: 0,
      category: [],
      categoryIndex: 0,
      categorySub: [],
      loading: false,
      finished: false,
      isRefresh: false,
      page: 1,
      goodList: [],
      categorySubId:''
    }
  },
  created(){
    this.getCategory()
  },
  mounted(){
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = `${winHeight-46-50}px`
    document.getElementById('listDiv').style.height = `${winHeight-90-50}px`
  },
  methods: {
    onRefresh(){
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      },500)
    },
    onLoad(){
      setTimeout(() => {
        this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
        this.getGoodList()
      },500)
    },
    getCategory(){
      axios({
        url: url.getCategoryList,
        method: 'get'
      })
      .then(res => {
        if(res.data.code == 200 && res.data.message){
          this.category = res.data.message
          this.getCategorySubByCategoryId(this.category[0].ID)
        }else{
          this.$toast('服务器错误，获取数据失败')
        }
      })
      .catch(err => {
        this.$toast('服务器错误，获取数据失败')
      })
    },
    getCategorySubByCategoryId(categoryId){
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {
          categoryId: categoryId
        }
      })
      .then(res => {
        if(res.data.code == 200 && res.data.message){
          this.categorySub=res.data.message
        }else{
          this.$toast('服务器错误，获取数据失败')
        }
      })
      .catch(err => {
        this.$toast('服务器错误，获取数据失败')
      })
    },
    getGoodList(){
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
      .then(res => {
        if(res.data.code == 200 && res.data.message.length){
          this.page++
          this.goodList = this.goodList.concat(res.data.message)
        }else{
          this.finished = true
        }
        this.loading = false
      })
      .catch(err => {
        this.$toast('服务器错误，获取数据失败')
      })
    },
    clickCategory(index, categoryId){
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    onClickCategorySub(index, title){
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    }
  }
}
</script>

<style lang='scss' scoped>
#leftNav{
  background-color: aliceblue;
}
#leftNav ul li{
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive{
  background-color: #fff;
}
.listItem{
  display: flex;
  flex-direction: row;
  font-size:0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding:5px;
}
#listDiv{
  overflow: scroll;
}
.list-item-img{
  flex: 8;
}
.list-item-text{
  flex: 16;
  margin: 10px 0px 0px 10px;
}
</style>
