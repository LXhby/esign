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
          <swiper-item v-for="(item,index1) in uninfo" :key="item._id">
            <div class="list" @click="unin(item._id)">
              <div class="item-left">
                <p>{{item.name}}</p>
                <span>{{item.starttime}}</span>
              </div>
              <x-button type="primary" mini @click.native="deleteItem(item._id)">删除</x-button>
            </div>
            <confirm v-model="show"
                     @on-cancel="onCancel"
                     @on-confirm="onConfirm(item._id)"
                     >
              <p style="text-align:center;">确定要删除咩</p>
            </confirm>
          </swiper-item>
          <swiper-item v-for="(item,index2) in goinfo" :key="item._id">
            <div class="list" @click="goin(item._id)">
              <div class="item-left">
                <p>{{item.name}}</p>
                <span>{{item.starttime}}</span>
              </div>
            </div>
          </swiper-item>
          <swiper-item v-for="(item,index3) in eninfo" :key="item._id">
            <div class="list" @click="enin(item._id)">
              <div class="item-left">
                <p>{{item.name}}</p>
                <span>{{item.starttime}}</span>
              </div>
            </div>
          </swiper-item>
        </swiper>

        <div @click="createmeeting" class="creatbtn">
          <x-button type="primary">创建会议</x-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { XInput, Group, XButton,Sticky,Tab, TabItem,Swiper, SwiperItem,Confirm} from 'vux'

  export default {
        name: "mymeeting",
        components:{
          XInput, Group, XButton,Sticky,
          Tab, TabItem,
          Swiper, SwiperItem,
          Confirm
        },
        data(){
          return{
            index:0,
            uninfo:[],
            goinfo:[],
            eninfo:[],
            show:false,//删除弹窗提示
          }
         },
        methods:{
          select(index){
            this.index = index;
            console.log(index)
          },
          //创建会议
          createmeeting(){
            this.$router.push({name:"creatmeeting"})
          },
          unin(id){//未发布点进去

          },
          goin(id){//进行中点进去

          },
          enin(id){//已结束点进去

          },
          deleteItem(id){//删除
            this.show=true;
          },
          onConfirm(id){//确定要删除
            console.log("删除")
            this.$http.post('/deleteLecture/'+id)
              .then((res)=>{
                if (res.data.status){//删除成功

                }
              })
          },
          onCancel(){//不删除
            console.log("不删除")
          }


        },
        created(){
          const userId = this.$store.state.vux.userInfo;
          console.log(userId)
          if (userId){
            this.$http.get('/lectureList/'+userId)
              .then((res)=>{
                const info = res.data.info;
                if(info){
                  info.forEach((item)=>{
                    if (item.isfinished === "1"){//进行中或者已结束
                      console.log(1)
                      const nowyear = new Date().getFullYear();
                      const nowMonth = new Date().getMonth();
                      const nowDdy = new Date().getDate();
                      const nowDate = new Date(nowyear,nowMonth,nowDdy);
                      const endTime = new Date((item.endtime).replace(/-/g,","));
                      console.log((item.endtime).replace(/-/g,","))
                      console.log(nowDate,"结束时间"+endTime)
                      if (nowDate>endTime) {//已结束
                        this.eninfo.push(item)
                        console.log("已结束",this.eninfo)
                      }else{
                        this.goinfo.push(item)
                        console.log("进行中",this.goinfo)
                      }
                    } else{
                      this.uninfo.push(item)
                      console.log(0,this.uninfo)
                    }
                  })
                }else{
                  this.$vux.toast.text("快去创建会议吧!")
                }
              })
          } else{
            this.$vux.toast.text("请登录")
            this.$router.push({name:'login'})
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
  .list{
    padding: 5/@rem 10/@rem;
    height:40/@rem ;
    border-bottom: 1px solid #ccc;
    .item-left{
      float: left;
      p{
        font-size: 14px;
        font-weight: bold;
      }
    }
    button{
      float: right;
      margin-top: 6/@rem;
    }
  }
  .weui-mask{
    background-color: #fbf9fe;
  }
  .weui-dialog{
    border: 1px solid #ccc;
  }
}
</style>
