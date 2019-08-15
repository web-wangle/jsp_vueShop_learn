/**
 * @description: user路由文件
 * @author: wangle
 * @update: wangle(2019-08-08)
 */

import Router from 'koa-router'
import * as controller from './controller.js'
let router = new Router()

router
  .get('/', controller.registerPage)
  .post('/register', controller.register)
  .post('/login', controller.login)

  export default router;
  