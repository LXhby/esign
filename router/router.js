const Router = require('koa-router');

const router = new Router();

const user = require("../control/user")
const Info = require("../control/lecture")
//注册用户
router.post("/user/reg",user.reg);

//用户登录
router.post("/user/login",user.login);

//创建会议
router.post('/lectureInfo',Info.lectureInfo);


//修改创建会议信息
router.post('/changeInfo/:id',Info.changeInfo);

//获取会议信息
router.get('/lectureList/:id',Info.list);


//删除会议
router.post("/deleteLecture/:id",Info.deleteInfo)

module.exports = router;
