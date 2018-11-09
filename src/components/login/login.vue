<template>
    <div class="login">
      <group>
        <x-input title="手机号码" placeholder="请输入手机号码" type="tel"  name="mobile"  mask="999 9999 9999" required v-model="confirm.mobile" ref="mobile"></x-input>
      </group>
      <group>
        <x-input title="输入密码" placeholder="请输入手机号码" type="password" required v-model="confirm.password1" ></x-input>
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
  @rem:375/10rem;
.login{
  width: 100%;
  .btn{
    margin-top: 20px/@rem;
    padding: 0 20px/@rem;
  }
}
</style>
