/**
 * @description: koa服务器端相应配置操作
 * @author: wangle
 * @update: wangle(2019-08-07)
 */

const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js')

;(async() => {
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  let oneUser = new User({userName: 'wangle',password: '12345'});
  oneUser.save().then(() => {
    console.log('插入数据成功');
  })

  let users = await User.findOne({}).exec();
  console.log('----------')
  console.log(users)
  console.log('----------')
})()

app.use(async(ctx) => {
  ctx.body = 'hello koa'
})

app.listen(3000,() => {
  console.log(`server starting at port 3000`)
})
