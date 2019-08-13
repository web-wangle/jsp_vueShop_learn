/**
 * @description: user路由操作函数文件
 * @author: wangle
 * @update: wangle(2019-08-08)
 */

import mongoose from 'mongoose'

// 进入注册页 
export const registerPage = async(ctx) => {
  ctx.body = '这是用户操作首页';
}

// 调用注册接口
export const register = async(ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      messge: '注册成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      messge: err
    }
  })
}