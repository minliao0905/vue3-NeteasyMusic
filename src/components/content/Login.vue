<template>
<div class="login">
  <div class="back">
    <div class="x" @click="hiddenLogin">
      <i class="vbestui-iconfont icon-close"></i>
    </div>
    <div class="son">
      <i class="iconfont icon-Phone phone"></i>
    </div>
  </div>
  <div class="main">
      <el-form>
        <el-form-item label="name">
          <el-input v-model="form.name"/>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",

}
</script>

<style scoped>

</style>