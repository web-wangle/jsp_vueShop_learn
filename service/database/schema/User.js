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

// userSchema.pre('save', (next) => {
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
//     if(err) return next(err);
//     bcrypt.hash(this.password,salt,(err,hash) => {
//       if(err) return next(err);
//       this.password = hash;
//       next();
//     })
//   })
// })

mongoose.model('User',userSchema);
