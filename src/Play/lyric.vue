<template>
  <div class="player-lyric"  :style="lyricStyle" @mouseenter="handleRefresh">
    <Scroll
        ref="scroll"
        :disable-bar="disableBar"
        :height="height"
        disable-wheel
        @moveStart="isDrag = true"
        @moveEnd="isDrag = false"
    >
      <ul>
        <li v-for="(item,index) in lyricArray" :key="index"
            :class="[
            index == lyricIndex ? `${'player-action-' + theme}` : '',
            middle ? 'player-action-middle' : '',
          ]">
          {{item[1]}}
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll";
import {theme} from "@/mixin/global/theme";
import {forcible} from "@/mixin/components/forcible-refresh";
import {parseLyric} from "@/utils/parse-lyric";

export default {
  name: "play-lyric",
  components: { Scroll },
  mixins:[theme,forcible],
  props: {
    disableBar: {
      type: Boolean,
      default: false,
    },
    lyric: {
      type: String,
      default() {
        return "";
      },
    },
    height: {
      type: String,
      default: "",
    },
    currentTime: {
      type: Number,
      default: 0,
    },
    /**列表还是一行
     * 列表当前歌词在中间时才滚动
     * true是列表形式，字体较小
     */
    middle: {
      type: Boolean,
      default: false,
    },
    /**在middle为true时，即列表形式歌单时有效，
     * 作用：设置第几行歌词滚动
     * 同时动态计算此时歌词列表高度
     */
    scrollNum: {
      type: Number,
      default: 5,
    },
  },
  data(){
    return {
      lyricArray:[],
      lyricIndex:-1,
      midIndex:0,
      length:0,
      isDrag:false,
    }
  },
  watch:{
     lyric(){
       this.lyricIndex = -1;
       this.midIndex = 0;
       this.$refs.scroll.scrollTo=(0,0,true);
       /**格式化歌词 */
       this.lyricArray = parseLyric(this.lyric);
       // console.log(this.lyricArray)
       /**歌词改变，歌词列表刷新后重新计算刷新滚动条 */
       this.$nextTick(() => {
         this.update();
         this.$refs.scroll.setScrollTop(0);
         /**歌曲切换歌词滚动到最顶部 */
       });
     },
    currentTime(currentTime) {
      /**歌词对应时间判断 */
      for (let i = 0; i < this.lyricArray.length; i++) {
        const line = this.lyricArray[i];
        const nextLine = this.lyricArray[i + 1];
        /**如果歌曲currentTime大于当前行歌曲时间，并且，下一行不为空或者当前currentTime小于下一行时间 */
        if (
            currentTime >= line[0] &&
            (!nextLine || currentTime < nextLine[0])
        ) {
          this.lyricIndex = i;
          /**如果歌词展示形式为列表，需要活跃歌词在中间时才滚动 */
          if (this.middle) {
            if (
                this.lyricIndex < this.scrollNum ||
                this.lyricIndex > this.lyricArray.length - this.scrollNum
            ){
              return;
            }

              /**拖动进度条小球时不能自动滚动 */
              if (!this.isDrag) {
                // console.log(this.lyricIndex)
                this.$refs.scroll.setScrollTop(
                   30*(this.lyricIndex-this.scrollNum)
                );
              }
            } else {
              this.$refs.scroll.setScrollTop(30*this.lyricIndex);
            }
        }
      }
    },
  },
  computed: {
    lyricStyle() {
      return {
        height: this.middle
            ? `${(this.scrollNum * 2 + 1) * 30}px`
            : this.height,
      };
    },
  },
  methods:{
    update(){
      this.$refs.scroll.update();
      // this.$refs.scroll.setScrollTop(0);
    },
  }
}
</script>

<style scoped lang="less">
.player-lyric {
  padding: 0px 20px;
  overflow: hidden;
}
.player-lyric ul {
  text-align: center;
  list-style-type: none;
}
.player-lyric ul li {
  height: 30px;
  line-height: 30px;
  padding: 5px 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* list 形式时middle为true--改变字号 */
.player-action-middle {
  font-size: 13px;
  text-align: left;
}
.player-action-light {
  font-size: 20px ;
  color: var(--primary);
}
.player-action-dark {
  font-size: 20px;
  color: #b82525;
}
.player-action-green {
  font-size: 20px;
  color: var(--green-main-color);
}


</style>