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

//登录接口
export const login = async(ctx) =>{
  const User = mongoose.model('User')

  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password

  //查找用户名是否存在，如果存在开始比对密码
  await User.findOne({userName: userName}).exec().then(async(res) =>{
    if(res){
      //用户名存在，开始比对密码
      let newUser = new User()
      await newUser.comparePassword(password, res.password)
      .then((res) => {
        if(res){
          ctx.body = { code: 200, message: '比对成功' }
        }else{
          ctx.body = { code: 200, message: '比对失败' }
        }
      })
      .catch((err) => {
        ctx.body = { code: 500, message: err }
      })
    }else{
      ctx.body = {
        code: 200,
        messge: '用户名或密码错误'
      }
    }
  })
}