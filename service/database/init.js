/**
 * @description: mongoDB数据库连接文件
 * @author: wangle
 * @update: wangle(2019-08-07)
 */

import mongoose from 'mongoose'
import glob from 'glob'
import {resolve} from 'path'
const db = "mongodb://127.0.0.1/smile-db"

exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

exports.connect = () => {
  var maxConnectTimes = 0;
  //连接数据库
  mongoose.connect(db);

  function listenDB(err,rej) {
    if (maxConnectTimes < 3) {
      maxConnectTimes++;
      console.log(`***数据库连接错误，错误原因：${err} 正在进行第${maxConnectTimes}次重连...***`)
      mongoose.connect(db);
    } else {
      rej();
      console.log(`***数据库初始化失败，无法重新连接，请手动处理***`);
    }
  }

  return new Promise((res, rej) => {
    //数据库监听
    mongoose.connection.on('disconnected', () => {
      listenDB('连接失败',rej);
    })

    mongoose.connection.on('error', (err) => {
      listenDB(err,rej);
    })

    mongoose.connection.once('open', () => {
      console.log('***数据库连接成功***');
      res();
    })
  })
}