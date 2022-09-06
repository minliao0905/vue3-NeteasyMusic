<template>

  <div class="player-cover" v-if="song"  >
    <div class="player-cover-left" @mouseenter="isShade =true " @mouseleave="isShade=false" @click="togglePlayPure">
     <div v-if="song.pic||song.picUrl">
       <el-avatar :src="song.pic||song.pigUrl" shape="square"  size="small" >
         <img icon="iconfont icon-chihuahua" size="36px" v-show="isShade"/>
       </el-avatar>
     </div>

    </div>
    <div class="player-cover-right" v-if="song.name||song.artist">
      <div class="player-cover-right-title">{{song.name}}</div>
      <div class="player-cover-right-author">{{song.artist}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCover",
  props:{
    song:{
      type:Object,
      default:() => {}
    }
  },
  data(){
    return {
      isShade:false,
    }
  },
  mounted() {
    // console.log(this.song);
  },
  methods:{
    togglePlayPure(){
      this.$parent.isPure = !this.$parent.isPure;
    }
  }
}
</script>

<style scoped lang="less">
.player-cover{
  width:18%;
  height: 100%;
  z-index:1;
  display: flex;
  flex-direction:row;
  font-size:5px;
  left: 0px;
  &-left{
    padding:0px 10px 0 5px;
    height:60px;
    .el-avatar{
      position: relative;
      height:50px;
      width:50px;
      border:1px solid #449e60;
    }
  }
  &-right{
    flex:1;
    font-size:12px;
    padding: 0px 10px;
    position: relative;
    &-title {
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      width: 100px;
      overflow: hidden;
    }
    &-artist {
      position: absolute;
      bottom: 0px;
    }
  }
}
</style>