/**
 * @description: koa服务器端相应配置操作
 * @author: wangle
 * @update: wangle(2019-08-08)
 */

import Koa from 'koa'
import mongoose from 'mongoose'
import {connect,initSchemas} from './database/init.js'
import Router from 'koa-router'
import routes from '../service/appApi'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'

const app = new Koa()

app.use(bodyParser)
app.use(cors())

// 自动设置路由
const router = new Router();
for (let i in routes){
  for(let j in routes[i]){
    router.use(`/${i}`, routes[i][j].routes(), routes[i][j].allowedMethods())
  }
}

// ;(async ()=>{
//   await connect()
//   initSchemas()
// })()

app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000,() => {
  console.log(`server starting at port 3000`)
})
