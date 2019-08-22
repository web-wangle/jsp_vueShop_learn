/**
 * @description: goods路由操作函数文件
 * @author: wangle
 * @update: wangle(2019-08-16)
 */

import mongoose from 'mongoose'
import fs from 'fs'
import newGoods from '../../fsJson'

// 录入所有商品数据
export const insertAllGoodsInfo = async(ctx) => {
  await newGoods()
  const goodsJson = fs.readFileSync('./newGoods.json','utf8')
    if(goodsJson){
      let data = JSON.parse(goodsJson)
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
    }else{
      console.log('导入数据错误...')
    }
  ctx.body = '开始导入数据...'
}