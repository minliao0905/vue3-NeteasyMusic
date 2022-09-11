<template>
  <div class="simi">
    <div
      class="simi-item"
      v-for="(item, index) in mvList"
      :key="index"
      @click="playMV(item.id)"
    >
      <div class="left">
        <img :src="item.cover" alt=""  @load="handleLoad" style="height:100px"/>
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
  name: "SimiMvItem",
  props: {
    mvList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playMV(id) {
      this.$router.push("/mv-detail/" + id);
    },
  },
};
</script>
<style lang="scss" scoped>
.count{
  display: flex;
  justify-items: center;  
  align-items: center; 
  font-size: 0.92857rem;
   position: relative;
   top: -100px;
   color: #fff; 
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
    .name  { 
      display: inline-block; 
    text-overflow: ellipsis;
    white-space: nowrap;
    }
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