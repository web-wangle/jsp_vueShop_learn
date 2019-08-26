/**
 * @description: goods路由操作函数文件
 * @author: wangle
 * @update: wangle(2019-08-16)
 */

import mongoose from 'mongoose'
import fs from 'fs'
import newGoods from '../../fsJson'
import path from 'path'

const dataJson_path = path.resolve(__dirname,'../../data_json')

// 录入所有商品数据
export const insertAllGoodsInfo = async(ctx) => {
  newGoods()
  const goodsJson = fs.readFileSync(`${dataJson_path}/newGoods.json`,'utf8')
    if(goodsJson){
      let data = JSON.parse(goodsJson)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      console.log(Object.keys(data).length)
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

// 录入商品大类数据
export const insertAllCategory = async(ctx) => {
  const categoryJson = fs.readFileSync(`${dataJson_path}/category.json`,'utf8')
    if(categoryJson){
      let data = JSON.parse(categoryJson)
      let saveCount = 0
      const Category = mongoose.model('Category')
      data.RECORDS.map((val, index) => {
        let newCategory = new Category(val)
        newCategory.save()
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

// 录入商品子类数据
export const insertAllCategorySub = async(ctx) => {
  const categorySubJson = fs.readFileSync(`${dataJson_path}/category.json`,'utf8')
    if(categorySubJson){
      let data = JSON.parse(categorySubJson)
      let saveCount = 0
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((val, index) => {
        let newCategorySub = new CategorySub(val)
        newCategorySub.save()
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

//商品数据查询接口
export const getDetailGoodsInfo = async(ctx) => {
  try{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID: goodsId}).exec()
    ctx.body = {code: 200, message: result}
  }catch(err){
    ctx.body = {code: 500, message: err}
  }
}

//商品数据类别查询接口
export const getCategoryList = async(ctx) => {
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {code: 200, message: result}
  }catch(err){
    ctx.body = {code: 500, message: err}
  }
}

//根据商品类别获取列表接口
export const getGoodsListByCategorySubID = async(ctx) =>{
  try{
    let categorySubId = ctx.request.query.categoryId
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID:categorySubId}).exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
}