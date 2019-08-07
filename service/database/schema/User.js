/**
 * @description: 测试用User schema模板
 * @author: wangle
 * @update: wangle(2019-08-07)
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//创建测试数据——Schema用户
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lasstLoginAt: {type: Date, default: Date.now()},
})

mongoose.model('User',userSchema);
