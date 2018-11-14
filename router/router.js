const Router = require('koa-router');

const router = new Router();

const user = require("../control/user")

//注册用户
router.post("/user/reg",user.reg);

//用户登录
router.post("/user/login",user.login);
module.exports = router;
