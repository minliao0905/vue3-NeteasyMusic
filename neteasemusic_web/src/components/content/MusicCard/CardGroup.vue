<template>
  <div ref="cardGroup" class="card-group" :class="program + 'playlist'"> 
    <el-row :gutter="cardStyle.gutter" >
     
      <el-col v-for="(item,index) in cardList" :key="index"  
         @mouseenter="handleEnter(index)"
         @mouseleave="handleLeave(index)"
         @click="enterMusicListDetail(index)" :span="spanSize" class='playlist-item' >
        
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
           <img v-lazy="item.picUrl||item.coverImgUrl" @load="handleRefresh" :src="item.picUrl||item.coverImgUrl" :key="index" />
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
      </el-col>
    </el-row> 
  </div>
</template>

<script setup>   
import { getCurrentInstance, onBeforeUnmount,onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
 const router = useRouter()
const { proxy } = getCurrentInstance()
const props = defineProps({
  cardList: {
    type: Array,
    default: () => []
  },
  
  cardStyle: {
    type: Object,
    default: () => {
      return {
        gutter: 20,
        style: {
          'margin-bottom': '10px'
        }
      }
    }
  },
  num:{
    type:Number,
    default:12,
  },
   emptyDesc: {
      type: Boolean,
      default: false,
    }
})
 
const sizeArr= {
        2: { min: 0, max: 200 },
        3: { min: 200, max: 500 },
        4: { min: 500, max: 900 },
        6: { min: 900, max: 1600 }
  }
   
 
let clientWidth = 0 // 定义获取屏幕的宽高
const spanSize = ref(6)
let currentIndex = 0
let imgCount = 0
const reSize = w => {
  //  获取屏幕的宽高
  Object.keys(sizeArr).forEach(el => {
    if (w >= sizeArr[el].min && w < sizeArr[el].max) {
      spanSize.value = 24 / Number(el) || 6
    }
  })
  // 获取适配的列
}
const resizeall = () => {
  // debugger
  // clientWidth = document.documentElement.clientWidth
  clientWidth = proxy.$refs.cardGroup.offsetWidth
  // console.log(clientWidth)
  reSize(clientWidth)
}

onMounted(() => {
  resizeall()
  window.onresize = () => {
    resizeall()
  }
  // console.log(proxy.$refs.cardGroup.offsetWidth)
})

onBeforeUnmount(() => {
  window.onresize = null
})
const emits = defineEmits([
  'refresh', 
])
// methods
function handleEnter(index) {
      // if (this.emptyDesc) return;
      currentIndex = index;
    }
 function  handleLeave(index) {
      // if (this.emptyDesc) return;
      currentIndex = null;
    } 
 function   enterMusicListDetail(index) {
        router.push(
          "/musiclistdetail/" +
          props.cardList[index].id +
          "/" +
          new Date().getTime()
      );
    } 
    /**处理图片加载刷新 */
 function   handleRefresh() {
      if ( imgCount ==  props.cardList.length) {
          emits("refresh");
      }
      imgCount++;
    } 
  watch(props.cardList,()=>{ 
      imgCount = 1; 
  })
  
</script>
 <style scoped lang="less">
.card-group {
  width: 100%;
  padding: 20px;
  height: 100%;
  overflow: auto;
  /* 定义为怪异盒模型 */
  box-sizing: border-box;
}
 
.dance-music-playlist{
  width: 100%; 
  .playlist-item{
    width: 100%;
    height:100%;
    padding: 0px;
    max-width: 200px;
    min-width:100px;
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