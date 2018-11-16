const {Schema} = require('./config');
const LectureSchema = new Schema({
  classify: String,
  endtime:String,
  linkman:String,
  location:String,
  logo:String,
  name:String,
  phone:String,
  starttime:String,
  subject:String,
  unit:String,
  project:String,
  isfinished: String,
  userInfo:String
},{
  versionKey:false,
  timestamps:{
    createdAt:"created"}
})
module.exports = LectureSchema
