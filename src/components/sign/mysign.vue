<template>
    <div class="mysign">
      <div class="head">
        <div class="userpic"></div>
        <h1>hhhhh</h1>
      </div>
    </div>
</template>

<script>
    export default {
        name: "mysign"
    }
</script>

<style lang="less">
  @rem:375/10rem;
  .mysign {
    .head {
      padding: 20/@rem;
      height: 150/@rem;
      background-color: #ffd350;
      .userpic {
        width: 80/@rem;
        height: 80/@rem;
        margin: auto;
        border: 1px solid #fff;
        border-radius: 50%;
      }
      h1 {
        margin-top: 20/@rem;
        text-align: center;
      }
    }
  }
</style>
