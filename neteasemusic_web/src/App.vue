<template>
  <div id="app">  
      <Home></Home>
  </div>

</template>
<script> 
import Home from '@/views/Home.vue'

export default {
  components: { Home },
  name:"App",
  
}
</script>
<style scoped lang="less">
@import url("./style/index.css");
#app{
  width:100%;
  height:100vh;
  overflow:hidden;
  position: relative;
}
</style>