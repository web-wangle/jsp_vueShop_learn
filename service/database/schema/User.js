/**
 * @description: 测试用User schema模板
 * @author: wangle
 * @update: wangle(2019-08-07)
 */

import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

//创建测试数据——Schema用户
const userSchema = new Schema({
  UserId: ObjectId,
  userName: {unique: true, type: String},
  passWord: String,
  createAt: {type: Date, default: Date.now()},
  lasstLoginAt: {type: Date, default: Date.now()},
})

userSchema.methods = {
  //密码比对的方法
  comparePassword:(_password,password) => {
    return new Promise((res,rej) => {
      if(_password === password){
        res(true)
      }else{
        rej(false)
      }
    })
  }
}

mongoose.model('User',userSchema);
