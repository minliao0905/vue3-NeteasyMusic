<template>
  <div :class="['player-pure', `${'player-pure-' + theme}`]">
    <div class="player-pure-container">
      <el-button class="iconfont icon-min" width="40px" @click="closePure"></el-button>
      <div :class="['player-pure-top',`${'player-pure-top-' + theme}`]" >
        <div  class="player-record">
          <div class="player-record-support">
            <img src="../assets/player/play-bar-support.png" alt="" />
          </div>
          <div class="player-record-bar" :style="barStyle">
            <img src="../assets/player/play-bar.png" alt="" />
          </div>
          <div class="player-pure-pic" :class="['player-pure-pic-' + theme]" v-if="song">
             <img v-lazy="song.pic" alt="" />
          </div>
        </div>
        <div class="player-pure-lyric">
          <div class="player-pure-lyric-desc" v-if="song">
            <div class="song-title">{{ song.name }}</div>
            <div class="song-artist">{{ song.artist }}</div>
          </div>
          <lyric :lyric="lyric" middle :current-time="currentTime" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {theme} from "@/mixin/global/theme";
import lyric from "@/Play/lyric";
export default {
  name: "play-pure",
  mixins:[theme],
  components:{
    lyric
  },
  props:{
    song:{
      type:Object,
      default:() => {}
    },
    lyric:{
      type:String,
      default:"",
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  methods:{
    closePure(){
      this.$parent.isPure = false;
    }
  },
  computed: {
    barStyle() {
      return {
        transform: this.getIsPlay ? `rotate(-7deg)` : `rotate(-45deg)`,
      };
    },
    /**获取是否正在播放歌曲 */
    getIsPlay() {
      return this.$parent.isPlay;
    },
    getOffset() {
      return (this.offset - 1) * this.limit;
    },
  },

}
</script>

<style  lang="less" scoped>
.player-pure {
  width: 100%;
  height: calc(100vh - 58px - 60px);
  overflow-y: auto;
  position: absolute;
  z-index: 2;
  left: 0px;
  bottom: 60px;
  &-light , &-green{
    background: #fff;
  }
  &-dark{
    background:var(--dark-bg-color);
  }
  &-container{
    padding:0 250px;
  }
  .icon-min {
    font-weight: 700;
    position: absolute;
    right: 200px;
    top: 10px;
  }
}
.player-pure-top{
  height:400px;
  display: flex;
  &-light, &-green{
    background: radial-gradient(closest-side, #928e8d, #fff);
  }
  &-dark{
    background: radial-gradient(closest-side,  #3c3532, #16181c);
  }
}
.player-record {
  flex: 1;
  position: relative;
  &-support {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 3;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
    img {
      width: 100%;
    }
  }

  &-bar {
    width: 80px;
    transform-origin: 0 0;
    transform: rotate(-7deg);
    transition: transform 0.3s;
    position: absolute;
    z-index: 2;
    left: 49%;
    top: 17px;
    img {
      width: 100%;
    }
  }
}
.player-pure-pic {
  width: 240px;
  height: 240px;
  border: 40px solid #0e0e11;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  margin: auto;
  animation: rotate 20s linear infinite;
  &-light,
  &-green {
    box-shadow: 0 0 10px #918a85;
  }
  &-dark {
    box-shadow: 0 0 10px #f9f9f9;
  }
  img {
    width: 100%;

    border-radius: 50%;
  }
}
.player-pure-lyric{
  .song-title{
     font-size: 1.5rem;
  }
  .song-artist{
    font-size: 0.5rem;
  }
}
</style>