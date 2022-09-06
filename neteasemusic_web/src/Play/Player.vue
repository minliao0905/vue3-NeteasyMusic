<template>
  <!--  歌曲封面-->

  <div class="play" v-show="playList.length>0"  >
    <div v-if="playList" >
      <player-cover  :song="playList[currentIndex]" />
    </div>

      <play-pure
          :song="playList[currentIndex]"
          :lyric="lyric"
          :current-time="currentTime"
           v-show="isPure"
          class="player-pure-side"
      />
    <audio :src="getSongSrc"
           autoplay
           ref="audio"
           @play="playLoad()"
           @playing="musicPlaying()"
           @error="musicErro()"
           :loop = "schemaIndex == 2 ? true : false"
           @timeupdate="audioTimeUpdate()"
           @pause="musicPause()"
           @ended="musicEnded()"
           ></audio>
    <div class="p player-toggle" :class="[`${'player-toggle-' + theme }`]">
      <div class="player-pre player-toggle-item" @click="preMusic">
        <i class="player-icon iconfont icon--previous"></i>
      </div>
      <div class="player-player-type player-toggle-item" @click="toggle()">
        <i class="player-icon-type iconfont icon-bofang1" v-show="!isPlay"></i>
        <i class="player-icon-type iconfont icon-zanting" v-show="isPlay"></i>
      </div>
      <div class="player-next player-toggle-item" @click="nextMusic">
        <i class="player-icon iconfont icon-next"></i>
      </div>
    </div>
    <div class="p play-progress">
      <div class="play-progress-main">
        <div class="player-progress-current-time player-progress-time">{{getCurrentTime}}</div>
        <b-progress
            v-model:percent="percent"
            :stroke-width="4"
            :track-base-color="getProgressBaseColor"
            :track-color="iconActiveColor"
            show-thumb
            hover-show-thumb
            allow-click
            allow-drag
            is-active
            :disable-transition="currentTime == 0"
            @click="handleAudioProgress"
            @dragend="handleAudioDragEnd"
            @dragbegin="handleAudioBeginDrag"
        />
        <div class="player-progress-time">{{getDurationTime}}</div>
      </div>
    </div>
    <div class="p player-volumn">
        <span @click="toggleVolume">
             <i class="player-small-icon iconfont icon-V" v-show="!isVolume" />
             <i class="player-small-icon iconfont icon-jingyin" v-show="isVolume" />
        </span>
        <div class="play-volumn-progress">
          <b-progress
              v-model:percent="volumnPercent"
              :stroke-width="3"
              :track-base-color="getProgressBaseColor"
              :track-color="iconActiveColor"
              show-thumb
              hover-show-thumb
              allow-click
              allow-drag
              is-active
              @click="handleVolumn"
              @dragend="handleVolumn"
          />
        </div>
    </div>
    <div class="p player-tool">
        <div class="player-tool-schema" @click="toggleSchema()">
          <div title="顺序播放" v-show="schemaIndex==0" >
            <i class="play-small-icon iconfont icon-shunxu"></i>
          </div>
         <div title="随机播放" v-show="schemaIndex==1" >
            <i class="play-small-icon iconfont icon-suiji"></i>
         </div>
         <div title="单曲循环" v-show="schemaIndex==2" >
           <i class="play-small-icon iconfont icon-danqu"></i>
        </div>
        </div>
        <div class="play-tool-lyric" @click="toggleLyric">
          <div title="歌词">
            <i class="player-small-icon iconfont icon-lyric" :class="[this.isShowLyric ? `${'player-icon-' + theme}` :'']"></i>
          </div>
        </div>
        <div class="play-tool-list" @click="toggleMusicList">
          <div title="歌单">
            <i class="player-small-icon iconfont icon-gedan" :class="[this.isShowList ? `${'player-icon-' + theme}` : '']"></i>
           </div>
        </div>
     </div>
  </div>
</template>

<script>
import {_getLyric} from "@/api/detail";

const prefixCls = "player";
import PlayerCover from "@/Play/player-cover";
import {formatDate} from "@/utils/tool";
import BProgress from "@/Play/BProgress";
import {theme} from "@/mixin/global/theme";
import PlayPure from "@/Play/play-pure";
export default {
  name: "Player",
  mixins:[theme],
  components: {PlayerCover,BProgress,PlayPure},
  data(){
    return {
      prefixCls: prefixCls,
      isShade: false,
      isPlay: false,       // 并表示当前是否在播放
      schemaIndex: 0,
      isVolume: false,     //是否静音
      currentIndex:0, //当前音乐播放列表下标
      playList:[],
      percent:0,
      isShowLyric: false, //是否显示歌词,
      isShowList: false, //是否显示播放列表
      id:null,//接收传来的播放列表唯一标识
      lyric: null, //歌词
      volumnPercent: 100, //音量百分比
      currentTime: 0, //当前音乐播放时间
      duration: 0, //音乐总时间
      musicList: [], //歌单
      isPure:false,
    }
  },
  mounted() {
    /**list是音乐列表，index是要播放的音乐在列表中的位置，path是当前播放音乐的路由路径,musicList是歌单信息*/
    this.$bus.on("playMusic", (playList, index, musicList,id) => {
          this.id=id;
          /**初始化播放列表 */
          this.playList = [];
          this.musicList = musicList;
          /**对playList进行处理 */
          let transferList = [];
          /**过滤掉没有音乐地址的歌曲 */
          transferList = playList.filter((item) => {
            return item.src;
          });
          /**对数组进行排序 */
          transferList = transferList.sort((a, b) => {
            return a.index - b.index;
          });
          this.playList = transferList;

          /**在请求歌曲的时候可能有的歌曲不可用，或丢失。导致在播放器中的歌曲列表和页面展示存在差异，可能会出现指定的播放歌曲不服
           * 用一次查找解决问题
           */
          this.setCurrentIndex(index);
          // console.log(this.musicList,this.playList)
    });
    /**监听子组件播放列表双击切换歌曲 */
    this.$bus.on("PlayMusicListItem", index => {
      this.setCurrentIndex(index);
    });
  },
  computed:{
    getSongSrc(){
      return ((this.playList[this.currentIndex]&&this.playList[this.currentIndex].src)||"");
    },
    /**格式化audio currentTime => 'MM:dd' */
    getCurrentTime() {
      /* new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/
      return formatDate(new Date(this.currentTime * 1000), "mm:ss") || "00:00";
    },
    /**格式化duration => 'mm:dd' */
    getDurationTime() {
      return formatDate(new Date(this.duration * 1000), "mm:ss") || "00:00";
    },
    /**播放器class样式 */
    playerClass() {
      return [`${this.prefixCls}`];
    },
    /**进度条背景颜色 */
    getProgressBaseColor() {
      let color = "";
      color = this.theme == "dark" ? "#171719" : "";
      return color;
    },
  },
  methods:{
    /**音乐进度条正在拖拽
     * isMusicDrag设置为true,关闭audio的timeupdate设置进度
     */
    handleAudioBeginDrag() {
      this.isMusicDrag = true;
    },
    /**音乐进度条拖拽结束 */
    handleAudioDragEnd() {
      this.isMusicDrag = false;
      this.setMusicCurrent();
    },
    /**处理音乐进度条点击 */
    handleAudioProgress() {
      this.setMusicCurrent();
    },
    /**音量进度条点击、拖拽事件 */
    handleVolumn() {
      this.setVolume();
    },

    toggleSchema(){
        this.schemaIndex ++;
        this.schemaIndex%=3;
    },
    /**暂停或播放音乐 */
    toggle() {
      console.log(this.playList[this.currentIndex]);
      this.isPlay = !this.isPlay;
      if (this.isPlay && this.$refs.audio.readyState == 4)
        this.$refs.audio.play();
      else {
        this.$refs.audio.pause();
      }
    },
    /**设置要播放的音乐 */
    setCurrentIndex(index) {
      for (let i in this.playList) {
        if (this.playList[i].index == index) {

          this.currentIndex = i;
          break; //break跳出循环------continue跳出本次循环
        }
      }
    },
    /**返回当前的播放时间 */
    audioTimeUpdate(){
      if (this.$refs.audio != null) {
        /**获取currentTime */
        this.currentTime = parseInt(this.$refs.audio.currentTime);
        /**计算音乐播放进度百分比
         * 在拖拽时不设置
         */
        if (!this.isMusicDrag)
          this.percent = parseInt((this.currentTime / this.duration) * 100);
      }
    },
    /**监听音乐已开始播放 */
    musicPlaying() {
      this.isPlay = true;
      /**currentIndex并不等于歌单里音乐，music数组里每个属性index才对应歌单里的顺序 */

      /**音乐播放时发射playing事件
       * @param1 对应歌单正在播放音乐的歌曲下标
       * @param2 正在播放歌曲的音乐名字
       */
      this.$bus.emit(
          "Playing",
          this.playList[this.currentIndex].index,
          this.playList[this.currentIndex].name,
          this.id
      );
      if (this.$refs.player != null) this.$refs.player.isPlay = true;
    },
    /**对播放暂停进行监视 */
    musicPause() {
      this.isPlay = false;
      if (this.$refs.player != null) this.$refs.player.isPlay = false;
    },
    /**音乐出现错误 */
    musicErro() {
      console.log("err");
      if(!this.playList){
        this.$alert("当前音频不可用");
      }
      this.currentIndex++;
    },
    musicEnded(){
      console.log("end:" + this.schemaIndex);
      switch(this.schemaIndex){
        case 0:
          this.currentIndex >= this.playList.length - 1 ? 0  : this.currentIndex++; //循环播放
          break;
        case 1:
          this.currentIndex = Math.floor(Math.random() * this.playList.length); //随机播放
          break;
        case 2: //单曲循环
          this.currentIndex = this.currentIndex;
          break;
      }
    },
  //  监听音乐加载 获取歌词
    playLoad(){
      this.duration = this.$refs.audio.duration;
      _getLyric(this.playList[this.currentIndex].id).then((res) => {
        this.lyric = (res.data.lrc && res.data.lrc.lyric) || "暂无歌词";
      });
    },
    preMusic(){
        if(this.currentIndex >= this.playList.length - 1)
          this.currentIndex = 0;
        else this.currentIndex++;

        this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    nextMusic(){
      let length = this.playList.length;
      this.currentIndex = (this.currentIndex - 1 + length)%length;
      this.$refs.audio.src = this.playList[this.currentIndex].src;
    },
    /**设置浏览器音量 */
    setVolume() {
      if (this.$refs.audio) this.$refs.audio.volume = this.volumnPercent / 100;
    },
    /**设置音乐进度
     * @param 设置的百分比
     */
    setMusicCurrent() {
      this.$refs.audio.currentTime =
          parseInt((this.percent / 100) * this.$refs.audio.duration);
      this.percent =
          parseInt((this.$refs.audio.currentTime / this.$refs.audio.duration) * 100);

      // if()
    },

    /**切换音量
     * 静音--恢复
     */
    toggleVolume() {
      this.isVolume = !this.isVolume;
      /**设置静音 */
      if (this.isVolume) {
        /**保存之前音量 */
        this.preVolumnPercent = this.volumnPercent;
        this.$refs.audio.volume = 0.0;
        this.volumnPercent = 0;
      } else {
        this.$refs.audio.volume = this.preVolumnPercent / 100;
        this.volumnPercent = this.preVolumnPercent;
      }
    },
    toggleLyric() {
      this.isShowLyric = !this.isShowLyric;
    },
    toggleMusicList() {
      this.isShowList = !this.isShowList;
    },

  }
}
</script>

<style scoped lang="less">

.play {
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
.play-progress-main{
  display: flex;
  justify-items: center;
  .player-progress-time{
    padding:0px 5px;
  }
}

  .play-small-icon {
    margin: 0 2px
  }

  .play-progress {
    flex:3;
  }


  .player-tool {
    display: flex;
    flex-direction: row;
    width: 20%;
    justify-content: space-around;
    align-items: center;
  }
  .player-toggle{
    flex: 1;
    padding:0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-item{
     padding:0px 20px;
      text-align: center;
      cursor:pointer;
      i{
        font-size: 1.6em;
      }
    }
    &-light {
      color: var(--light-main-color);
    }
    &-dark {
      color: var(--dark-main-color);
    }
    &-green {
      color: var(--green-main-color);
    }
  }
  .player-volumn {
    flex: 1;
    display: flex;
    justify-content: space-around;
    .play-volumn-progress{
      width: 90%;
    }
  }
}
</style>