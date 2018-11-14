const Koa = require('koa');
const router = require('./router/router');
const logger = require('koa-logger');


const body = require('koa-body')

const session = require("koa-session");
const cors = require('@koa/cors')


const app = new Koa();
app.use(cors({
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.keys=["美女"];
const CONFIG ={
  key:"Sid",
  maxAge:36e5,
  overwrite:true,
  httpOnly:true,
  signed:true,
  rolling:true
}
app.use(session(CONFIG,app));
app.use(logger())
app.use(body())


app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,()=>{
  console.log('项目启动成功，监听3000端口')
})

//创建管理员用户 如果管理员已经存在，则返回
// {
//   const {db} = require("./Schema/config");
//   const UserSchema = require("./schema/user");
//   const encrypt = require("./util/encrypt");
//   const User = db.model("users", UserSchema);
//
//   User
//     .find({username: "admin"})
//     .then(data => {
//       if (data.length === 0) {
//         // 管理员不存在  创建
//         new User({
//           username: "admin",
//           password: encrypt("admin"),
//           role: 666,
//           commentNum: 0,
//           articleNum: 0
//         })
//           .save()
//           .then(data => {
//             console.log("管理员用户名 -> admin,  密码 -> admin")
//           })
//           .catch(err => {
//             console.log("管理员账号检查失败")
//           })
//       } else {
//         // 在控制台输出
//         console.log(`管理员用户名 -> admin,  密码 -> admin`)
//       }
//     })
// }

