<template>
    <div class="login">
      <h3>欢迎来到医签到</h3>
      <group>
        <x-input title="手机号码" placeholder="请输入手机号码" is-type="china-mobile"  name="mobile"  mask="999 9999 9999" required v-model="confirm.mobile" ref="mobile"></x-input>
      </group>
      <group>
        <x-input title="输入密码" placeholder="请输入手机号码" type="password" required v-model="confirm.password" ></x-input>
      </group>
      <div class="btn">
        <flexbox>
          <flexbox-item>
            <x-button @click.native="submitForm()" type="primary">提交</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button link="/register" type="primary">注册</x-button>
          </flexbox-item>
        </flexbox>
      </div>

    </div>
</template>

<script>
  import { XInput, Group, XButton, Cell,CheckIcon,Flexbox, FlexboxItem } from 'vux'
    export default {
        name: "login",
      created(){

      },
      components: {
        XInput,
        XButton,
        Group,
        Cell,
        CheckIcon,
        Flexbox, FlexboxItem
      },
      data(){
        return{
          style: '',
          confirm:{
            password: '',
            mobile:"",
          }
        }
      },
      methods: {
        alltrue() {//判断是否都为
          var fullItem = Object.values(this.confirm)

          var errItem = fullItem.filter((item, index) => {
            return item === "" || item === false
          })
          console.log(errItem)
          if (errItem.length != 0) {
            this.$vux.toast.text("请填完整信息")
          } else {
            this.$http.post("/user/login",this.confirm)
              .then((res)=>{
                this.$vux.toast.text(res.data.msg)
                  if (res.data.status){//成功登录
                    this.$store.commit('setUserInfo',{userInfo:this.confirm.mobile})
                    this.$router.push({name:'index'})
                  } else{
                    this.confirm.password="";
                    this.confirm.mobile="";
                  }
              })

          }
        },
        submitForm() {
          this.alltrue();
        }
      }
    }
</script>

<style lang="less">
  @rem:375/10rem;
.login{
  width: 100%;
  margin-top: 100/@rem;
  h3{
    text-align: center;
  }
  .btn{
    margin-top: 20/@rem;
    padding: 0 20/@rem;
  }
}
</style>
