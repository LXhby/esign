<template>
    <div class="mymeeting">
      <!--搜索框-->
      <group class="head-search">
        <x-input placeholder="请输入会议名称" placeholder-align="center">
          <i slot="label" class="iconfont icon-sousuo " width="24" height="24"></i>
        </x-input>
        <x-button class="searchbtn" mini type="warn">搜索</x-button>
      </group>

      <!--状态-->
      <div style="height:44px;">
        <sticky
          scroll-box="vux_view_box_body"
          ref="sticky"
          :check-sticky-support="false"
          disabled="false">
          <tab :line-width="1" v-model="index">
            <tab-item selected @on-item-click="select">未发布</tab-item>
            <tab-item @on-item-click="select">进行中</tab-item>
            <tab-item @on-item-click="select">已结束</tab-item>
          </tab>
        </sticky>
        <swiper v-model="index"  :show-dots="false">
          <swiper-item >
            <div class="tab-swiper vux-center">11</div>
            <div class="tab-swiper ">12</div>
            <div class="tab-swiper ">13</div>
          </swiper-item>
          <swiper-item >
            <div class="tab-swiper vux-center">21</div>
            <div class="tab-swiper ">22</div>
            <div class="tab-swiper ">23</div>
          </swiper-item>
          <swiper-item >
            <div class="tab-swiper vux-center">31</div>
            <div class="tab-swiper ">32</div>
            <div class="tab-swiper ">33</div>
          </swiper-item>
        </swiper>

        <div @click="createmeeting" class="creatbtn">
          <x-button type="primary">创建会议</x-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { XInput, Group, XButton,Sticky,Tab, TabItem,Swiper, SwiperItem} from 'vux'

  export default {
        name: "mymeeting",
        components:{
          XInput, Group, XButton,Sticky,
          Tab, TabItem,
          Swiper, SwiperItem
        },
        data(){
          return{
            index:0
          }
         },
        methods:{
          select(index){
            this.index = index;
          },
          //创建会议
          createmeeting(){
            this.$router.push({name:"creatmeeting"})
          }
        }
    }
</script>

<style lang="less">
  @rem:360/10rem;
.mymeeting {
  .head-search{
    .weui-cells{
      margin-top: 0;
      background-color: #eee;
    }
    .vux-x-input.weui-cell{
      padding: 0;
      width: 70%;
      margin: 10px 15px;
      background-color: #fff;
      font-size: 13px;
      .icon-sousuo{
        position: relative;
        left: 58/@rem;
      }
    }
    .searchbtn{
      position: absolute;
      top: 8px;
      right: 14px;
      width: 60.31/@rem;
      font-size: 13px;
    }
  }
  .creatbtn{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>
