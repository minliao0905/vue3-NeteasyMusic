<template>
    <div :class="articleClass" >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
</template>

<script>

export default {
  name: "LayoutArticle",
  computed:{
    articleClass(){
      return [ `${this.program + "article"}`,
        `${this.program + "article-" + this.theme}`,]
    },
    isLoading(){
      return this.$store.state.isloading;
    }
  }
}
</script>

<style scoped lang="less">
.dance-music-article{
  width:82%;
  height:calc(100% - 118px);
  overflow-y: auto;
  &-dark{
    background:var(--dark-bg-color);
    color:var(--dark-article-color);
  }
}
</style>