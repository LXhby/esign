const User = require('../Model/user');

const encrypt = require('../util/encrypt');

//注册
exports.reg = async (ctx,next)=>{
  const userInfo = ctx.request.body;
  console.log("用户发过来信息",ctx.request.body)
  const tel = userInfo.mobile;
  const password = userInfo.password1;
  await new Promise((resolve,reject)=>{
    User.find({tel},(err,data)=>{
      if (err) return reject(err)
      if (data.length != 0){
        return resolve("")//用户名存在
      }
      const _user = new User({
        tel,
        password:encrypt(password)
      })
      _user.save((err,data)=>{
        if (err){
          reject(err)
        } else{
          resolve(data)
        }
      })
    })
  })
    .then((data)=>{
      if(data){
        ctx.body={
          msg:"注册成功",
          status:1
        }
      }else{
        ctx.body={
          msg:"用户名已存在",
          status:0
        }
      }
    })
    .catch((err)=>{
      ctx.body={
        msg:"注册失败",
        status:0
      }
    })
}

//登录
exports.login = async (ctx,next)=>{
  const userInfo = ctx.request.body;
  console.log(userInfo)
  const tel = userInfo.mobile;
  console.log(tel)
  const password = userInfo.password;
  await new Promise((resolve,reject)=>{
    User.find({tel},(err,data)=>{
      if (err) return reject(err)
      console.log(data)
      if (data.length ===0) return reject("用户名不存在");
      if (data[0].password === encrypt(password)){
        return resolve(data);
      } else{
        resolve("")//密码不对
      }
    })
  })
    .then((data)=>{
      if (!data){
        ctx.body={
          msg:"密码错误",
          status:0
        }
      } else{
        //保存到session
        // ctx.session={
        //   tel,
        //   uid:data[0]._id,
        //   role:data[0].role
        // }

        //保存到cookie
        // ctx.cookies.set("tel",tel,{
        //   domain:"localhost",
        //   path:"/",
        //   maxAge:36e5,
        //   httpOnly:false,
        //   overwrite:false
        // })
        // ctx.cookies.set("uid",data[0]._id,{
        //   domain:"localhost",
        //   path:"/",
        //   maxAge:36e5,
        //   httpOnly:false,
        //   overwrite:false
        // })

        ctx.body={
          status:1,
          msg:"登录成功"
        }
      }
    })
    .catch(err=>{
      ctx.body={
        msg:"登录失败",
        status:0
      }
    })
}
