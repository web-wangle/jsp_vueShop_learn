/**
 * @description: user路由操作函数文件
 * @author: wangle
 * @update: wangle(2019-08-08)
 */

// 进入注册页 
export const registerPage = async(ctx) => {
  ctx.body = '这是用户操作首页';
}

// 调用注册接口
export const register = async(ctx) => {
  ctx.body = ctx.request.body;
}