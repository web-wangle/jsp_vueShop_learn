/**
 * @description: 请求基地址配置文件
 * @author: wangle
 * @update: wangle(2019-08-07)
 */

const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://127.0.0.1:3000/"
const URL = {
    getShoppingMallInfo: `${BASEURL}index`,
    getGoodsInfo: `${BASEURL}getGoodsInfo`,
    registerUser: `${LOCALURL}user/register`,
    login: `${LOCALURL}user/login`,
    getDetailGoodsInfo: `${LOCALURL}goods/getDetailGoodsInfo`,
    getCategoryList: `${LOCALURL}goods/getCategoryList`,
    getCategorySubList:  `${LOCALURL}goods/getCategorySubList`,
    getGoodsListByCategorySubID: `${LOCALURL}goods/getGoodsListByCategorySubID`
}

module.exports = URL
