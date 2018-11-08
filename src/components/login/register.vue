<template>
  <div class="register">
    <group title="请设置手机号">
      <x-input title="手机号码" placeholder="请输入手机号码" type="tel"  name="mobile"  mask="999 9999 9999" required :show-clear="false" v-model="confirm.mobile" ref="mobile"></x-input>
    </group>
    <group title="请设置密码" class="pwd">
      <x-input title="输入密码" placeholder="至少六个字符" type="password" required :min="6" v-model="confirm.password1" ></x-input>
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
        confirm:{
          password1: '',
          password2: '',
          mobile:"",
          demo1:false
        },
        bett:function (value) {
          return{
            valid:value === "tt",
            msg:"Must be 2333"
          }
        }
      }
    },
    methods: {
      fn() {
        console.log(1)
      },
      alltrue() {//判断是否都为
        var fullItem = Object.values(this.confirm)

        var errItem = fullItem.filter((item, index) => {
          return item === "" || item === false
        })
        console.log(errItem)
        if (errItem.length != 0) {
          this.$vux.toast.text("请填完整信息")
        } else {
          this.http.post("")
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
