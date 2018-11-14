<template>
    <div class="create1">
      <div class="nav">
        <sticky>
          <step v-model="step1" background-color='#fbf9fe'>
          <step-item title="第一步" ></step-item>
          <step-item title="第二步"></step-item>
          <step-item title="第三步" ></step-item>
        </step>
        </sticky>
      </div>

      <h2>会议基本资料</h2>
      <div class="bd">
        <group class="userInfo">
          <x-input title="会议名称" v-model="confirm.name" placeholder="不超过30个字符" required ref="name" ></x-input>
          <x-input  title="会议主题"  placeholder-align="right" text-align="right" v-model="confirm.subject" required ref="subject" ></x-input>
          <selector title="会议分类" placeholder="点击选择所属分类" v-model="confirm.classify" name="district" :options="list" @on-change="onchange" ref="classfiy" ></selector>
          <x-input required title="会议地址"  placeholder-align="right"  v-model="confirm.location" placeholder="请输入会议地点" text-align="right" ref="localtion" ></x-input>
          <x-input  :required="true" title="联系人" label-width="8rem" placeholder-align="right" text-align="right" v-model="confirm.linkman" ref="linkman" ></x-input>
          <x-input  :required="true" is-type="china-mobile" title="联系电话"  placeholder-align="right" text-align="right" v-model="confirm.phone" ref="phone"></x-input>
          <datetime v-model="confirm.starttime" title="会议开始时间" start-date="2015-10-18" placeholder="点击选择日期" ref="starttime"></datetime>
          <datetime v-model="confirm.endtime"   title="会议结束时间" placeholder="点击选择日期" ref="endtime"></datetime>
        </group>
      </div>
      <flexbox class="bottom" @click.native="next">
        <flexbox-item>
          <x-button type="primary">下一步</x-button>
        </flexbox-item>
      </flexbox>
    </div>


</template>

<script>
  import {Step, StepItem,Sticky,Flexbox, FlexboxItem,XButton,XInput, Group,Selector,Datetime} from "vux"
    export default {
        name: "creatmeeting",
        components:{
          Step, StepItem,Sticky,
          Flexbox, FlexboxItem,
          XButton,
          XInput, Group,
          Selector,
          Datetime
        },
      data(){
          return{
            disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
            step1:0,
            confirm:{
              name:"",
              subject:"",
              location:"",
              starttime:"",
              endtime:"",
              classify:"",
              linkman:""
            },
            list: [{ key: '专家共识', value: '专家共识' }, { key: '学术交流', value: '学术交流' }, { key: '继续教育培训', value: '继续教育培训' }, { key: '患者教育', value: '患者教育' }],
          }
      },
      methods:{
        validate(){//表单提交
          const formValue = this.$refs;
          const fullItem = [];
          for (const key in formValue){
            const eachItem = {};
            if (key == "classfiy" || key == "starttime" || key == "endtime" ) {
              Reflect.set(eachItem,key,formValue[key]["value"])
            }else{
              Reflect.set(eachItem,key,formValue[key]["valid"])
            }
            fullItem.push(eachItem)
          }
          const errItem = fullItem.filter((item,index,key)=>{
            const value = Object.keys(item)
            return item[value] === false || item[value] === ""
          })
          console.log(errItem)
          if (errItem.length != 0){
            errItem.forEach((item)=>{
              switch (Object.keys(item)[0]) {
                case "name":
                  this.$vux.toast.text("请填写会议名称");
                  this.confirm.name="";
                  break;
                case "subject":
                  this.$vux.toast.text("请填写会议主题");
                  this.confirm.subject="";
                  break;
                case "localtion":
                  this.$vux.toast.text("请填写会议地址");
                  this.confirm.location="";
                  break;
                case "linkman":
                  this.$vux.toast.text("请填写联系人");
                  this.confirm.linkname="";
                  break;
                case "classifiy":
                  this.$vux.toast.text("请填写会议分类");
                  this.confirm.classify="";
                  break;
                case "starttime":
                  this.$vux.toast.text("请填写会议开始时间");
                  this.confirm.starttime="";
                  break;
                case "endtime":
                  this.$vux.toast.text("请填写会议结束时间");
                  this.confirm.endtime="";
                  break;
                case "phone":
                  this.$vux.toast.text("请填写联系电话");
                  this.confirm.phone="";
                  break;
              }
            })
          } else{
            //先保存到store
            this.$store.commit('setLecture',{lecture:this.confirm})
            this.$router.push({name:"creatmeeting2"})
          }


        },
        next(){
          this.validate();
        },
        onchange(val){
          console.log(val)
        }
      }
    }
</script>

<style lang="less">
  @rem : 375/10rem;
.create1{
  .nav{
    padding: 10/@rem;
    .vux-step-item-title{
      font-size: 14px;
    }
  }
  h2{
    font-size: 18px;
    text-align: center;
  }
  .bd{
    p{
      font-size: 17px;
    }
    span{
      font-size: 17px;
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
