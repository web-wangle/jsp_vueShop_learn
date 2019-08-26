/**
 * @description: goods路由文件
 * @author: wangle
 * @update: wangle(2019-08-16)
 */

import Router from 'koa-router'
import * as controller from './controller.js'
let router = new Router()

router
  .get('/insertAllGoodsInfo', controller.insertAllGoodsInfo)
  .get('/insertAllCategory', controller.insertAllCategory)
  .get('/insertAllCategorySub', controller.insertAllCategorySub)

  export default router;