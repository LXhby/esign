<template>
  <div class="create3">
    <div class="nav">
      <sticky>
        <step v-model="step1" background-color='#fbf9fe'>
          <step-item title="第一步" ></step-item>
          <step-item title="第二步"></step-item>
          <step-item title="第三步" ></step-item>
        </step>
      </sticky>
      <h3>讲者邀请及确认函资料补充</h3>
      <group >
        <x-textarea title="项目发起单位" :max="150" v-model="unit"></x-textarea>
        <x-textarea title="公益项目名称" :max="150"  v-model="project" ></x-textarea>
      </group>
      <flexbox class="bottom">
        <flexbox-item>
          <x-button type="primary" @click.native="pre">上一步</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="next">查看二维码</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import {Step, StepItem,Sticky,XTextarea,Group,Flexbox, FlexboxItem,XButton} from "vux"
  export default {
    components:{
      Step, StepItem,Sticky,
      XTextarea,Group,
      Flexbox, FlexboxItem,XButton
    },
    data(){
      return{
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
        step1:2,
        unit:"",
        project:""
      }
    },
    methods:{
      pre(){
        this.$router.go(-1)
      },
      next(){
        const lectureInfo = this.$store.state.vux.lecture;
        const userInfo = this.$store.state.vux.userInfo;
        console.log(userInfo)
        if (this.unit || this.project){//填了信息
          if (lectureInfo){//没有刷新
            let Info ={
              clssify:lectureInfo.classify,
              endtime:lectureInfo.endtime,
              linkman:lectureInfo.linkman,
              location:lectureInfo.location,
              logo:lectureInfo.logo,
              name:lectureInfo.name,
              phone:lectureInfo.phone,
              starttime:lectureInfo.starttime,
              subject:lectureInfo.subject,
              unit: this.unit,
              project: this.project,
              isfinished:0,
              userInfo:userInfo
            }
            this.$http.post("/lectureInfo",Info)
              .then((res)=>{
                if (res.data.status){
                  const lecture = null;
                  const lectureId = res.data.lectureId;
                  this.$store.commit("setLecture",{lecture:lecture})
                  this.$router.push({name:"erweima",query:{lectureId:lectureId}})
                } else{
                  this.$vux.toast.text(res.data.msg)
                }
              })



          }else{
            this.$router.push({name:"creatmeeting"})
          }
        } else{
          this.$vux.toast.text("请完善信息")
        }



        // this.$http.post('/lectureInfo',)
      }
    }
  }
</script>

<style lang="less">
  @rem : 375/10rem;
  .create3{
    .nav{
      padding: 10/@rem;
      .vux-step-item-title{
        font-size: 14px;
      }

    }
    .vux-x-textarea{
      margin-bottom: 10/@rem;
      background-color: #eee;
      .weui-textarea{
        background-color: #eee;
      }
    }
    .bottom{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
