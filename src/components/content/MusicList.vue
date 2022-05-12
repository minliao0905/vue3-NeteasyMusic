<template>
  <div :class="program + 'playlist'">
<!--    {{musicList}}-->
    <div class="playlist-item" v-for="(item,index) in musicList"  :key="index"
         @mouseenter="handleEnter(index)"
         @mouseleave="handleLeave(index)"
         @click="enterMusicListDetail(index)">
      <div class="playlist-item-box" v-show="index<num" >

         <div class="playlist-item-container" >
           <template v-if="!emptyDesc">
             <transition class="playlist-slide">
                <div  class="playlist-desc" v-show="currentIndex == index">{{item.copywriter}}</div>
             </transition>
             <transition class="playlist-slide">
               <div  class="playlist-count"
                     v-show="
                  emptyDesc ? currentIndex == index : currentIndex != index
                ">
                 <i class="iconfont icon-erji"></i>{{item.playCount}}</div>
             </transition>
           </template>
           <img v-lazy="item.picUrl||item.coverImgUrl" @load="handleRefresh"/>
           <transition class="playlist-slide">
             <div class="playlist-play" v-show="currentIndex == index">
               <i class="iconfont icon-icon_play"></i>
             </div>
           </transition>
               <div
                 class="playlist-name"
                 :class="[`${program + 'playlist-name-' + theme}`]"
             >
               {{ item.name }}
             </div>
         </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "MusicList",
  props:{
    musicList:{
      type:Array,
      default:[],
    },
    /**当描述信息为空时，播放数量滑动显示出来 */
    emptyDesc: {
      type: Boolean,
      default: false,
    },
    num:{
      type:Number,
      default:10,
    }
  },
  data(){
    return {currentIndex: null,}
  },
  methods: {
    handleEnter(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = index;
    },
    handleLeave(index) {
      // if (this.emptyDesc) return;
      this.currentIndex = null;
    },
    enterMusicListDetail(index) {
      this.$router.push(
          "/musiclistdetail/" +
          this.musicList[index].id +
          "/" +
          new Date().getTime()
      );
    },
    /**处理图片加载刷新 */
    handleRefresh() {
      if (this.imgCount == this.musicList.length) {
        this.$emit("refresh");
      }
      this.imgCount++;
    },
  },
  watch:{
    musicList(){
      this.imgCount = 1;
    }
  }
}
</script>

<style scoped lang="less">
.dance-music-playlist{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .playlist-item{
    width: calc(20%);
    padding: 0 10px;
    img{
      width: 100%;
      border-radius: 4px;
    }
   &-playlist-name-dark{
     color: #ffffff;
   }
  }
}
.playlist-item-container {
  cursor: pointer;
  overflow: hidden;
  position: relative;

  .playlist-name {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 1rem;
    text-overflow: ellipsis;
    margin-bottom: 5px;
  }

  .playlist-count {
    background: rgba(0,0,0, 0.4);
    padding: 3px 1px;
    color: white;
    font-size: 0.8rem;
    position: absolute;
    text-align: right;
    width: 100%;
  }
  .playlist-desc{
    position: absolute;
    background: rgba(0,0,0, 0.4);
    padding: 3px 1px;
    color: white;
    font-size: 0.8rem;
    text-align:left;
    width: 100%;
  }
  .playlist-play {
    width: 30px;
    height: 30px;
    position:absolute;
    left: 5px;
    bottom: 25%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-icon_play {
      font-size: 18px;
      color: var(--main-color);
    }
  }
  .playlist-slide-enter-active{
    animation:slideInDown 0.4s;
  }
  .playlist-slide-leave-active {
    animation: slideInDown 0.4s reverse;
  }
}


</style>