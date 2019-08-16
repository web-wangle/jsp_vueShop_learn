/**
 * @description: goods路由操作函数文件
 * @author: wangle
 * @update: wangle(2019-08-16)
 */

import mongoose from 'mongoose'
import fs from 'fs'
import {filterGoods} from '../../fsJson'

// 录入所有商品数据
export const insertAllGoodsInfo = async(ctx) => {
  filterGoods()
  fs.readFileSync('./newGoods.json', 'utf8', (err, data) => {
    if(err){
      console.log(err)
    }else{
      data = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      data.map((val, index) => {
        let newGoods = new Goods(val)
        newGoods.save()
          .then(() => {
            saveCount++
            console.log(`成功：${saveCount}`)
          })
          .catch((err) => {
            console.log(`失败：${err}`)
          })
      })
    }
  })
  ctx.body = '开始导入数据...'
}