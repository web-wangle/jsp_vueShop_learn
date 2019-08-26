/**
 * @description: 定义商品大类数据文件
 * @author: wangle
 * @update: wangle(2019-08-22)
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_NAME:{type:String},
  IMAGE:{type:String},
  TYPE:{type:Number},
  SORT:{type:Number},
  COMMENTS:{type:String}
},{
  collations: 'Category'
})

mongoose.model('Category',categorySchema)
