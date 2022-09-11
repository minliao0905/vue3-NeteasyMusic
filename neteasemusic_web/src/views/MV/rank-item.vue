<template>
  <div
    class="simi"
    v-if="item != null"
    @mouseenter="isShowIcon = true"
    @mouseleave="isShowIcon = false"
  >
    <div class="simi-item" @click="playMV()">
      <div class="left">
        <transition name="dance-music-opacity">
          <div class="mv-play" v-show="isShowIcon">
            <i class="iconfont icon-icon_play"></i>
          </div>
        </transition>
        <img :src="item.cover" alt @load="handleLoad" style="height:100px;"/>
        <div class="count">
          <i class="iconfont icon-shipin"></i>
          <div class="play-count">{{ item.count }}</div>
        </div> 
      </div>
      <div class="right">
        <div class="name">
          <span>MV</span>
          {{ item.name }}
        </div>
        <div class="artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RankItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    playMV() {
      this.$router.push("/mv-detail/" + this.item.id);
    },
    handleLoad() {
      this.$emit("refresh");
    },
  },
  data() {
    return {
      isShowIcon: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.count{
  display: flex;
  justify-items: center;  
  align-items: center; 
   font-size: 0.92857rem; 
  .play-count{
    margin-left:5px;
  }
}
.simi-item{
  display:flex;
  align-items: center ;
  position:relative;
  .left{
    position: relative;
  }
  .right{
    margin-left:15px; 
    margin-top:-20px;
    height:100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.mv-play{
  position:absolute;
   left:45%;
   top: 40px;
   color:red;
   border-radius: 50%;
   width: 24px;
   height: 24px;
   text-align: center;
   background: rgba(0,0,0,0.2);
}
</style>