<template>
  <div class="register">
    <group title="请设置手机号">
      <x-input title="手机号码" placeholder="请输入手机号码" is-type="china-mobile"  name="mobile"  mask="999 9999 9999" required v-model="confirm.mobile" ref="mobile" ></x-input>
    </group>
    <group title="请设置密码" class="pwd">
      <x-input title="输入密码" placeholder="至少六个字符" type="password" required :min="6" v-model="confirm.password1" ref="password1"></x-input>
      <x-input title="确认密码" v-model="confirm.password2" :equal-with="confirm.password1" type="password" ref="password2"></x-input>
    </group>
    <div class="btn">
      <x-button @click.native="submitForm()" type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell,CheckIcon } from 'vux'
  export default {
    name: "login",
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      CheckIcon
    },
    data(){
      return{
        style: '',
        icon_type1:"",
        icon_type2:"",
        confirm:{
          password1: '',
          password2: '',
          mobile:"",
        },

      }
    },
    methods: {
      alltrue() {//判断是否都为
        var fullItem = [
          {password1: this.$refs.password1.valid},
          {password2: this.$refs.password2.valid},
          {mobile:this.$refs.mobile.valid}]
        var errItem = fullItem.filter((item, index,key) => {
          const value = Object.keys(item)
          return item[value] === false
        })
        console.log(errItem)
        if (errItem.length != 0) {
          errItem.forEach((item)=>{
            console.log(Object.keys(item))
            switch (Object.keys(item)[0]) {
              case "mobile":
                this.$vux.toast.text("请重输手机号");
                this.confirm.mobile="";
                break;
              case "password1":
                this.$vux.toast.text("请重输密码");
                this.confirm.password1="";
                break;
              case "password2":
                this.$vux.toast.text("请重新确认密码");
                this.confirm.password2="";
                break;
            }
          })
        } else {
          this.$http.post("/user/reg",this.confirm).then((res)=>{
            this.$vux.toast.text(res.data.msg)
            if (res.data.status){
              this.$router.push({name:"login"})
            } else{
              this.confirm.password1="";
              this.confirm.password2="";
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
.register{
  .pwd{
    margin-bottom: 20px;
  }
  .btn{
    padding: 0 20px;
  }
}
</style>
