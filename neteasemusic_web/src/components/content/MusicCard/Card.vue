<template>
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

</template>

<script>
export default {
   props:{
    musicList:{
    type:Array,
    default:() => { return []}
   }
   }
}
</script>

<style>

</style>