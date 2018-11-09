<template>
    <div class="mymeeting">
      <group class="head-search">
        <x-input placeholder="请输入会议名称" placeholder-align="center">
          <i slot="label" class="iconfont icon-sousuo " width="24" height="24"></i>
        </x-input>
        <x-button class="searchbtn" mini type="warn">搜索</x-button>
      </group>
    </div>
</template>

<script>
  import { XInput, Group, XButton} from 'vux'

  export default {
        name: "mymeeting",
        components:{
          XInput, Group, XButton
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
}
</style>
