const mongoose = require('moongoose');
const db = mongoose.createConnection('mongodb://localhost:27017/esign',{userNewParser:true})

const Schema = mongoose.Schema;
mongoose.promise = global.Promise;

db.on('erro',()=>{
  console.log('数据库连接失败')
})
db.on('open',()=>{
  console.log('数据库连接成功')
})

module.exports ={
  db,
  Schema
}
