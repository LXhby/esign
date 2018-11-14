<template>
  <div class="create2">
    <div class="nav">
      <sticky>
        <step v-model="step1" background-color='#fbf9fe'>
          <step-item title="第一步" ></step-item>
          <step-item title="第二步"></step-item>
          <step-item title="第三步" ></step-item>
        </step>
      </sticky>
    </div>
    <div class="bd">
      <div class="select-img">
        <h3>点击图片，选择捐赠logo</h3>
        <ul class="img-list clearFix">
          <li v-for="(item,index) in img_item" :key="index">
            <img :src="item.picurl" alt="" @click="selectpic">
          </li>
        </ul>
      </div>
      <div class="select-img">
        <h3>或点击这里，自定义捐赠logo</h3>
        <ul class="img-list clearFix">
          <li @click="choseimg">
            <input class="choseimg" type="file" id="chose" ref="ipt">
            <img src= '/src/assets/image/加号.png' ref="iptimg" class="iptimg">
          </li>
        </ul>
      </div>
    </div>
    <flexbox class="bottom">
      <flexbox-item>
        <x-button type="primary" @click.native="pre">上一步</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary" @click.native="next">下一步</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import {Step, StepItem,Sticky,Flexbox, FlexboxItem,XButton} from "vux"
  export default {
    components:{
      Step, StepItem,Sticky,
      Flexbox, FlexboxItem,XButton
    },
    data(){
      return{
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent),
        step1:1,
        img_item:[
          {picurl:'/src/assets/image/1.jpeg'},
          {picurl:'/src/assets/image/2.jpeg'},
        ]
      }
    },
    methods:{
      pre(){
        this.$router.go(-1)
      },
      selectpic(e){
        this.$refs.iptimg.src = e.target.src;
      },
      choseimg(){
        const that = this;
        this.$refs.ipt.addEventListener('change',function () {
            if (this.value){
              console.log(this.files[0])
              let oFile = this.files[0];
              let blob = new Blob([oFile]);
              let url = window.URL.createObjectURL(blob);
              that.$refs.iptimg.src = url
            }
        })
      },
      next(){
        const preurl =(this.$refs.iptimg.src);
        const checkurl = "http://wechat.papweixin.local/src/assets/image/%E5%8A%A0%E5%8F%B7.png"
        if (preurl != checkurl){//成功保存图片
          const lecture ={logo:preurl}
            this.$store.commit('setLecture',{lecture:lecture})
            this.$router.push({name:"creatmeeting3"})
        }else{
          this.$vux.toast.text("请选择图片")
        }
      }
    }
  }
</script>

<style lang="less">
  @rem : 375/10rem;
  .create2{
    .nav{
      padding: 10/@rem;
      .vux-step-item-title{
        font-size: 14px;
      }
    }
    .bd{
      .select-img{
        margin: 20/@rem;
        padding: 10/@rem;
        box-shadow: 1px 1px 5px rgba(0,0,0,.2),-1px -1px 5px rgba(0,0,0,.2);
        .img-list{
          li{
            position: relative;
            float: left;
            padding-top: 10/@rem;
            margin-right: 5/@rem;
            .choseimg{
              width: 100/@rem;
              height: 100/@rem;
              border:0;
            }
            .iptimg{
              position: absolute;
              top: 10/@rem;
              left: 0;
            }
          }
          img{
            width: 100/@rem;
            height: 100/@rem;
          }
        }
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
