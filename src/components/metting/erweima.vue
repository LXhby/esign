<template>
    <div class="seeimg">
      <x-dialog :show.sync="show2" class="dialog-demo">
        <div class="img-box">
          <img src="/src/assets/image/二维码.png">
        </div>
        <div >
          <span class="vux-close" @click="pre">返回</span>
          <span class="vux-close" @click="next">完成</span>
        </div>
      </x-dialog>
    </div>
</template>

<script>
  import { XDialog } from 'vux'
    export default {
      name: "erweima",
      created(){
        this.lectureId = this.$route.query.lectureId;


      },
      components: {
        XDialog
      },
      data(){
        return{
          show2:true,
          lectureId:""
        }
      },
      methods:{
        pre(){
          this.$router.push({name:'mymeeting'})
        },
        next(){
          const isfinished = {isfinished:1};
          this.$http.post("/changeInfo/"+this.lectureId,isfinished)
            .then((res)=>{
              if (res.data.status){
                this.$router.push({name:'mymeeting'})
              }
            })

        }
      }

    }
</script>

<style lang="less">
.seeimg{
  .vux-close{
    font-size: 24px;
  }
}
</style>
