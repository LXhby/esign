const Lecture = require("../Model/lecture")

//存入创建会议的信息
exports.lectureInfo = async (ctx,next)=>{
  const lectureInfo =(ctx.request.body);
  await new Promise((resolve,reject)=>{
    const _lecture = new Lecture(lectureInfo)
    _lecture.save((err,data)=>{
      if (err){
        reject(err)
      } else{
        resolve(data)
      }
    })
  })
    .then((data)=>{
      ctx.body={
        status: 1,
        lectureId :data._id
      }
    })
    .catch((err)=>{
      ctx.body={
        msg:"保存失败，请重输信息",
        status:0
      }
    })

}

//修改
exports.changeInfo = async (ctx,next)=>{
  // ctx.body={
  //   status:1
  // }
  const lectureId = ctx.params.id;
  const isfinished = ctx.request.body;
  console.log(lectureId,isfinished)
  Lecture.updateOne({_id: lectureId},{$set: {isfinished: 1}},err=>{
    if (err){
      return console.log(err)
    } else{
      console.log("创建会议成功")
    }
  })
  ctx.body={
    status:1
  }
}

//会议列表
exports.list = async (ctx,next)=>{
  const userInfo =(ctx.params.id);
  console.log(userInfo)
  await new Promise((resolve,reject)=>{
    Lecture.find({userInfo:userInfo},(err,data)=>{
      if (err) return reject(err)

      if (data.length ===0){
        resolve("")
      } else {
        resolve(data)
      }

    })
  })
    .then((data)=>{
      if (!data){//没有数据
        ctx.body={
          status:0,
          msg:"快去创建会议吧"
        }
      } else{
        ctx.body={
          status:1,
          info:data
        }
      }
    })
    .catch(err=>{
      console.log(err)
    })

}


//删除会议信息
exports.deleteInfo = async (ctx,next)=>{
  const lectureId = (ctx.params.id);
  await new Promise((resolve,reject)=>{
    Lecture.deleteOne({_id:lectureId},(err,data)=>{
        if (err){
          reject(err)
        }else{
          resolve(data)
        }
    })

  })
    .then((data)=>{
      ctx.body={
        status:1,
        msg:"删除成功"
      }
    })
    .catch(err=>{
      console.log(err)
    })
}
