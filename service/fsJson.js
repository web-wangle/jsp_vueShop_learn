import fs from 'fs'

let pushData = []

const newGoods = () => {
  return new Promise((res, rej) => {
    filterGoods().then(()=>{
      createNewGoods();
    })
    res('success')
  })
}

//过滤数据
const filterGoods = () => {
  return new Promise((res, rej) => {
  fs.readFile('./data_json/goods.json', 'utf8', (err, data) =>{
    let newData = JSON.parse(data)
    let i = 0
    newData.RECORDS.map(function(value,index){
      if(value.IMAGE1!=null){
        i++
        pushData.push(value)
      } 
    })
    res(pushData);
    })
  })
}

// 创建过滤后的文件
const createNewGoods = () => {
  return new Promise((res, rej) => {
    fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
      if(err) console.log('写文件操作失败')
      else console.log('写文件操作成功')
    })
  })
  res('success');
}

export default newGoods