<template>
   <div class="musiclistlive">
     <div class="list-item" v-for="(item,index) in subs" :key="index">
        <div class="avatar">
          <el-avatar :src="item.avatarUrl" @load="handleImgLoad" ></el-avatar>
        </div>
       <div class="name">
           {{item.nickname}}
       </div>
     </div>
   </div>
</template>

<script>
export default {
  name: "MusicListLive",
  data(){
    return {
      imgCount:1,
    }
  },
  props:{
    subs:{
      type:Array,
      default:[]
    }
  },
  methods: {
    handleImgLoad() {
      if (this.imgCount == this.subs.length) this.$bus.emit("refresh");
      this.imgCount++;
    },
  },
}
</script>

<style scoped lang="less">
.musiclistlive{
  padding:10px 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .list-item{
    width: 80px;
    font-size: 10px;
     .name{
       width: 80%;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
  }
}
</style>