<template>
  <div class="floor">
    <div class="floorAnomaly">
      <div class="floorOne"><img :src="floorData0.image" alt="" width="100%"></div>
      <div>
        <div class="floorTwo"><img :src="floorData1.image" alt="" width="100%"></div>
        <div><img :src="floorData2.image" alt="" width="100%"></div>
      </div>
    </div>
    <div class="floorRule">
      <div v-for="(item,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" alt="" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['floorData'],
  data () {
    return {
      floorData0: [],
      floorData1: [],
      floorData2: [],
    }
  },
  watch: {
    floorData(){
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
}
</script>

<style lang='scss' scoped>
.floorAnomaly{
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  &.div{
    width: 10rem;
    box-sizing: border-box;
  }
}
.floorOne{
  border-right: 1px solid #ddd;
}
.floorTwo{
  border-bottom: 1px solid #ddd;
}
.floorRule{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
  div{
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
    &:nth-child(odd){
      border-right: 1px solid #ddd;
    }
  }
}
</style>
