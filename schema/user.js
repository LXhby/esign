const {Schema} = require('./config');
const UserSchema = new Schema({
  tel:String,
  password:String,
  role:{
    type:String,
    default:1
  }
},{
  versionKey:false
})

module.exports = UserSchema;
