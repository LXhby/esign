<template>
    <div class="index">
      <div class="head">
        <div class="userpic"></div>
        <h1>hhhhh</h1>
      </div>
      <grid :cols="3" class="grid-nav">
        <grid-item v-for="(item,index) in gridlist" :key="index" :link="item.url">
          <svg slot="icon" class="icon" aria-hidden="true">
            <use :xlink:href="'#icon-' + item.icon"></use>
          </svg>
          <h2>{{item.title}}</h2>
        </grid-item>
      </grid>







    </div>
</template>

<script>
  import { Grid, GridItem} from 'vux'
    export default {
        name: "index",
      created(){
          console.log(this)
      },
      data(){
          return{
            gridlist:[
              {
                title:'我的签到',
                icon:'zhanghuyue',
                url:'/mysign'
              },
              {
                title:'我的会议',
                icon:'huiyi',
                url:'/mymeeting'
              },
              {
                title:'会员中心',
                icon:'huiyuan'
              },
              {
                title:'账户流水',
                icon:'zhanghuyue'
              },
              {
                title:'体验签到',
                icon:'qiandao'
              },
              {
                title:'我的资料',
                icon:'14'
              },
              {
                title:'联系我们',
                icon:'lianxi'
              }
            ]
          }
      },
      components:{
        Grid, GridItem
      }
    }
</script>

<style lang="less">
  @rem:375/10rem;
.index{
  .head{
    padding: 20/@rem;
    height: 150/@rem;
    background-color: #ffd350;
    .userpic{
      width: 80/@rem;
      height: 80/@rem;
      margin: auto;
      border:1px solid #fff;
      border-radius: 50%;
    }
    h1{
      margin-top: 20/@rem;
      text-align: center;
    }
  }
  .grid-nav{
    position: relative;
    bottom:20/@rem ;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 20/@rem 20/@rem 0 0 ;
  }
  h2{
    padding: 10/@rem;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
  .weui-grid__icon {
    width: 40px;
    height: 40px;
    .icon {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
