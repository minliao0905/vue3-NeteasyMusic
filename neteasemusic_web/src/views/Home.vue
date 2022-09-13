
<template>
  <div id="app">
    <LayoutHeader/>
    <div class="app-body">
        <LayoutAside/>
    <LayoutArticle/>
    </div> 
    <LayoutFooter/>
  </div>
  
</template>
<script>
import LayoutHeader from "@/layout/Header"
import LayoutAside from "@/layout/Aside"
import LayoutArticle from "@/layout/Article"
import  LayoutFooter from "@/layout/Footer"

export default {
  name:"App",
  components:{
      LayoutHeader,
      LayoutAside,
      LayoutArticle,
       LayoutFooter,
  }
}
</script>
<style scoped lang="less">
@import url("../style/index.css");
#app{
  width:100%;
  height:100vh;
  overflow:hidden;
  position: relative;
}
.app-body{
  display: flex;
  height: 100%;
}
</style>
