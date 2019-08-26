/**
 * @description: 商品数据过滤文件
 * @author: wangle
 * @update: wangle(2019-08-22)
 */
import fs from 'fs'
import path from 'path'

let pushData = []
const __Path = path.resolve(__dirname,'data_json')

const newGoods = () => {
  filterGoods()
  createNewGoods()
}

//过滤数据
const filterGoods = () => {
  const filterGoodsJson = fs.readFileSync(`${__Path}/goods.json`, 'utf8')
    let newData = JSON.parse(filterGoodsJson)
    let i = 0
    newData.RECORDS.map(function(value,index){
      if(value.IMAGE1!=null){
        i++
        pushData.push(value)
      } 
    })
}

// 创建过滤后的文件
const createNewGoods = () => {
  const createGoodsJson = fs.writeFileSync(`${__Path}/newGoods.json`,JSON.stringify(pushData))
    if(createGoodsJson > 0) console.log('写文件操作失败')
    else console.log('写文件操作成功')
}

export default newGoods