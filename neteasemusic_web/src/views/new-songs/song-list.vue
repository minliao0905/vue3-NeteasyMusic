<template>
  <div class="table-list" v-if="musicList.length">
    <el-table  stripe :stripe-background-color="getStripeColor"
           style="cursur: pointer"
          @row-dblclick="handleDbclick"
          :row-class-name="tableRowClassName" 
         :data="musicList">
      <el-table-column width="50"  type='index' :index="indexMethod"></el-table-column>
        <el-table-column  label="操作" width="60">
          <template #default="scope">
             <div  v-if="lines[1]" class="dance-music-table-tr-td-two"
              >
            <i class="iconfont icon-xihuan" v-if="!newsongs" />
            <div class="dance-music-table-tr-td-two-card" v-if="newsongs">
              <img v-lazy="scope.row.pic" alt="" />
              <div class="card-play">
                <i class="iconfont icon-icon_play"></i>
              </div>
            </div>
          </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题"  ></el-table-column>
        <el-table-column prop="artist" label="歌手" class="table-list-body-artist"></el-table-column>
        <el-table-column prop="album" label="专辑"></el-table-column>
        <el-table-column prop="time" label="时长" width="120"></el-table-column>
    </el-table>     
  </div>
</template>
<script>
import { randomStr } from "utils/random";
import { theme } from "mixin/global/theme";
import { playMusic } from "mixin/global/play-music";
import { playing } from "@/Play/playing";
export default {
  name: "TableList",
  mixins: [theme, playing, playMusic],
  props: {
    musicList: {
      type: Array,
      default: [],
    },
    /**判断显示哪几列 */
    lines: {
      type: Array,
      default: () => [true, true, true, true, true, true],
    },
    showHead: {
      type: Boolean,
      default: true,
    },
    /**如果是播放器内使用双击时只设置index，不提供musicList节省性能 */
    player: {
      type: Boolean,
      default: false,
    },
    /**是否是最新音乐页面使用 */
    newsongs: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: null,
    },
  },
  computed: {
    /**table-head split 颜色 */
    getSplitColor() {
      let splitColor = "";
      splitColor = this.theme == "dark" ? "var(--dark-border-color)" : "var(--border)";
      return splitColor;
    },
    getLength() {
      return this.length;
    },
  },
  data() {
    return {
      refreshTag: 0, //判断什么时候发送刷新标记
      id: randomStr(),
    };
  },
  methods: {
     indexMethod(index) {
      if (index < 10) {
        index = index + 1;
        return "0" + index;
      }
      return index;
    },
    /**处理双击事件 */
    handleDbclick(index) {
      if (this.player) {
        this.$bus.$emit("PlayMusicListItem", index);
        return;
      }
      console.log("song-list:" + this.id);
      this.playMusic(index);
    },
    /**获取音乐列表下标 */
    getListIndex(index) {
      let currentIndex = 0;
      currentIndex = index < 9 ? "0" + (index + 1) : index + 1;
      if (currentIndex == this.getLength) {
        this.$emit("refresh");
      }
      return currentIndex;
    },
    tableRowClassName({row,rowIndex})
   {
       row.index = rowIndex;
   }  },
};
</script>
<style lang="less" scoped>
.table-list {
  width: 100%;
  font-size: 13px;
}
.table-body {
  cursor: pointer;
}
.v {
  &-light {
    color: var(--primary);
  }
  &-dark {
    color: var(--main-color);
  }
  &-green {
    color: var(--green-main-color);
  }
}
.dance-music-table-tr-newsongs {
  display: flex;
  align-items: center;
}
.dance-music-table-tr-td-two {
  img {
    width: 100%;
    border-radius: 4px;
  }
  &-card {
    position: relative;
  }
  .card-play {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-icon_play {
      font-size: 14px;
      color: var(--main-color);
    }
  }
}
</style>