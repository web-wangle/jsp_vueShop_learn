/**
 * @description: 定义商品子类数据文件
 * @author: wangle
 * @update: wangle(2019-08-22)
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySubSchema = new Schema({
  ID:{unique:true,type:String},
  MALL_CATEGORY_ID:{type:String},
  MALL_SUB_NAME:{type:String},
  COMMENTS:{type:String},
  SORT:{type:Number}
},{
  collations: 'CategorySub'
})

mongoose.model('CategorySub',categorySubSchema)
