const Koa = require('koa');
const router = require('./router/router');
const logger = require('koa-logger');

const cors = require('@koa/cors')




const app = new Koa();
app.use(logger())
.use(router.routes())
.use(router.allowedMethods())
.use(cors())

app.listen(8080,()=>{
  console.log('项目启动成功，监听8080端口')
})

